"use client"

import { useEffect, useRef, useCallback } from "react"

interface TankThreeBackgroundProps {
  className?: string
  scrollProgress?: number
}

export default function TankThreeBackground({ className = "", scrollProgress = 0 }: TankThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    scene: any; camera: any; renderer: any; clock: any;
    tank: any; layers: any[]; sensorNodes: any[];
    waterParticles: any; swirlParticles: any; oilParticles: any;
    propeller: any; pumpA: any; pumpB: any;
    animReq: number; exploded: boolean; THREE: any;
    mouse: { x: number; y: number }
    scrollProg: number
  } | null>(null)

  const scrollRef = useRef(scrollProgress)
  scrollRef.current = scrollProgress

  const buildScene = useCallback((THREE: any, canvas: HTMLCanvasElement) => {
    const LAYER_Y = [-1.55, -0.75, 0.05, 0.85, 1.65]
    const EXPLODE_OFFSETS = [-2.8, -1.4, 0, 1.4, 2.8]

    const clock = new THREE.Clock()
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x020810)
    scene.fog = new THREE.FogExp2(0x020d1a, 0.042)

    const w = canvas.clientWidth || window.innerWidth
    const h = canvas.clientHeight || window.innerHeight
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100)
    camera.position.set(0, 0.5, 9)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(w, h)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1

    // ── LIGHTING ──
    scene.add(new THREE.HemisphereLight(0x0a1628, 0x000408, 0.6))
    const key = new THREE.DirectionalLight(0x88ddff, 1.4)
    key.position.set(3, 5, 6); key.castShadow = true; scene.add(key)
    const rimL = new THREE.PointLight(0x00e5ff, 3, 18); rimL.position.set(-6, 2, -2); scene.add(rimL)
    const rimR = new THREE.PointLight(0x00ff88, 2, 18); rimR.position.set(6, 1, -2); scene.add(rimR)
    const back = new THREE.DirectionalLight(0x0033ff, 0.5); back.position.set(0, -2, -8); scene.add(back)
    const top = new THREE.PointLight(0x00c8ff, 1.5, 12); top.position.set(0, 7, 0); scene.add(top)

    // ── ENVIRONMENT ──
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshPhysicalMaterial({ color: 0x010810, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.85 })
    )
    floor.rotation.x = -Math.PI / 2; floor.position.y = -3.5; floor.receiveShadow = true
    scene.add(floor)
    const gridMat = new THREE.LineBasicMaterial({ color: 0x0a2040, transparent: true, opacity: 0.35 })
    const gridGroup = new THREE.Group()
    for (let i = -10; i <= 10; i++) {
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-10, 0, i), new THREE.Vector3(10, 0, i)]), gridMat))
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, 0, -10), new THREE.Vector3(i, 0, 10)]), gridMat))
    }
    gridGroup.position.y = -3.48; scene.add(gridGroup)

    // ── TANK ──
    const tank = new THREE.Group(); scene.add(tank)
    const shellMat = new THREE.MeshPhysicalMaterial({ color: 0x88ccff, transparent: true, opacity: 0.08, roughness: 0.02, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false })
    tank.add(new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 4.6, 64, 1, true), shellMat))
    const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x00ccff, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.5 });
    [-2.3, -1.55, -0.75, 0.05, 0.85, 1.65, 2.3].forEach(y => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.018, 16, 80), ringMat)
      ring.rotation.x = Math.PI / 2; ring.position.y = y; tank.add(ring)
    })
    const capMat = new THREE.MeshPhysicalMaterial({ color: 0x1a2840, roughness: 0.15, metalness: 0.85 })
    const topCap = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.08, 64), capMat); topCap.position.y = 2.34; tank.add(topCap)
    const botCap = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.08, 64), capMat); botCap.position.y = -2.34; tank.add(botCap)

    // Layers
    const layers: any[] = []
    const layerColors = [0x0033aa, 0x003355, 0x002244, 0x001133, 0x001020]
    const layerOpacities = [0.12, 0.15, 0.12, 0.18, 0.15]
    layerColors.forEach((color, i) => {
      const g = new THREE.Group()
      g.userData = { index: i, baseY: LAYER_Y[i] }
      const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(1.12, 1.12, 0.72, 64, 1, true),
        new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: layerOpacities[i], roughness: 0.1, metalness: 0.15, side: THREE.DoubleSide, depthWrite: false })
      )
      g.add(mesh)
      const glowRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.06, 0.008, 12, 80),
        new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.6 })
      )
      glowRing.rotation.x = Math.PI / 2; glowRing.position.y = 0.36; g.add(glowRing)
      g.position.y = LAYER_Y[i]; layers.push(g); tank.add(g)
    })

    // Propeller
    const propeller = new THREE.Group()
    const bladeMat = new THREE.MeshPhysicalMaterial({ color: 0x90caf9, metalness: 0.9, roughness: 0.1 })
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.15), bladeMat)
      blade.rotation.y = (Math.PI / 2) * i; propeller.add(blade)
    }
    propeller.add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 16), bladeMat))
    propeller.position.y = LAYER_Y[0]; tank.add(propeller)

    // Oil compartment
    const oilComp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.18, 0.5, 24),
      new THREE.MeshPhysicalMaterial({ color: 0xffd700, transparent: true, opacity: 0.25, roughness: 0.1, metalness: 0.5 })
    )
    oilComp.position.set(1.1, LAYER_Y[1], 0); tank.add(oilComp)

    // Sensor core
    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.65, 32),
      new THREE.MeshPhysicalMaterial({ color: 0x001a33, roughness: 0.2, metalness: 0.8, emissive: 0x003366, emissiveIntensity: 0.5 })
    )
    core.position.y = LAYER_Y[3]; tank.add(core)

    // Pumps
    const pumpMat = (c: number, e: number) => new THREE.MeshPhysicalMaterial({ color: c, metalness: 0.9, roughness: 0.1, emissive: e, emissiveIntensity: 0.3 })
    const pumpA = new THREE.Group()
    pumpA.add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 24), pumpMat(0x00e5ff, 0x00aadd)))
    pumpA.position.set(-0.45, LAYER_Y[4], 0); tank.add(pumpA)
    const pumpB = new THREE.Group()
    pumpB.add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 24), pumpMat(0xff6622, 0xff4400)))
    pumpB.position.set(0.45, LAYER_Y[4], 0); tank.add(pumpB)

    // ── SENSOR NODES ──
    const sensorNodes: any[] = []
    const sensorColors = [0x00e5ff, 0x00ff88, 0xffd700, 0xff6699, 0x44aaff]
    ;[0, 72, 144, 216, 288].map(d => d * Math.PI / 180).forEach((angle, i) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.038, 16, 16),
        new THREE.MeshPhysicalMaterial({ color: sensorColors[i], emissive: sensorColors[i], emissiveIntensity: 1.5, roughness: 0.1, metalness: 0.3 })
      )
      sphere.position.set(Math.cos(angle) * 0.16, LAYER_Y[3], Math.sin(angle) * 0.16)
      scene.add(sphere)
      sensorNodes.push({ mesh: sphere })
    })

    // ── PIPES ──
    const pipeMat = new THREE.MeshPhysicalMaterial({ color: 0x2a4060, roughness: 0.2, metalness: 0.85 })
    const inlet = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.2, 16), pipeMat)
    inlet.position.set(0.35, 3.0, 0); scene.add(inlet)
    const outA = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12), new THREE.MeshPhysicalMaterial({ color: 0x00c8dd, metalness: 0.9, roughness: 0.1 }))
    outA.rotation.z = Math.PI / 2; outA.position.set(-1.65, LAYER_Y[4], 0); scene.add(outA)
    const outB = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12), new THREE.MeshPhysicalMaterial({ color: 0xff5500, metalness: 0.9, roughness: 0.1 }))
    outB.rotation.z = Math.PI / 2; outB.position.set(1.65, LAYER_Y[4], 0); scene.add(outB)

    // ── PARTICLES ──
    function buildParticles(count: number, color: number, size: number, initFn: Function) {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) initFn(pos, i)
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mat = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.72, depthWrite: false, sizeAttenuation: true })
      const pts = new THREE.Points(geo, mat)
      pts.userData = { count, initFn }
      scene.add(pts); return pts
    }

    const waterParticles = buildParticles(180, 0x00ddff, 0.028, (pos: Float32Array, i: number) => {
      pos[i * 3] = 0.35 + (Math.random() - 0.5) * 0.06
      pos[i * 3 + 1] = 2.3 + Math.random() * 1.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.06
    })
    const swirlParticles = buildParticles(300, 0x0099cc, 0.018, (pos: Float32Array, i: number) => {
      const a = Math.random() * Math.PI * 2, r = 0.15 + Math.random() * 0.85
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = LAYER_Y[0] + (Math.random() - 0.5) * 0.6; pos[i * 3 + 2] = Math.sin(a) * r
    })
    const oilParticles = buildParticles(60, 0xffdd44, 0.022, (pos: Float32Array, i: number) => {
      const a = Math.random() * Math.PI * 2, r = Math.random() * 0.9
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = LAYER_Y[1] - 0.3 + Math.random() * 0.2; pos[i * 3 + 2] = Math.sin(a) * r
    })

    // ── ANIMATE ──
    const mouse = { x: 0, y: 0 }
    let exploded = false

    function updateParticles(pts: any, type: string) {
      const pos = pts.geometry.attributes.position
      const count = pts.userData.count
      for (let i = 0; i < count; i++) {
        let x = pos.array[i * 3], y = pos.array[i * 3 + 1], z = pos.array[i * 3 + 2]
        if (type === 'inlet') {
          y -= 0.025 + Math.random() * 0.005
          x += (Math.random() - 0.5) * 0.003
          if (y < -2.5) { x = 0.35 + (Math.random() - 0.5) * 0.06; y = 2.3 + Math.random() * 0.8; z = (Math.random() - 0.5) * 0.06 }
        } else if (type === 'swirl') {
          const angle = Math.atan2(z, x), rr = Math.sqrt(x * x + z * z)
          const na = angle + 0.025, nr = Math.min(rr + 0.004, 1.05)
          x = Math.cos(na) * nr; z = Math.sin(na) * nr; y -= 0.005
          if (rr > 1.08 || y < LAYER_Y[0] - 0.4) {
            const a2 = Math.random() * Math.PI * 2, r2 = 0.1 + Math.random() * 0.4
            x = Math.cos(a2) * r2; y = LAYER_Y[0] + (Math.random() - 0.5) * 0.55; z = Math.sin(a2) * r2
          }
        } else if (type === 'oil') {
          y += 0.009 + Math.random() * 0.003
          x += (Math.random() - 0.5) * 0.005; z += (Math.random() - 0.5) * 0.005
          if (y > LAYER_Y[1] + 0.38) {
            const a = Math.random() * Math.PI * 2, r = Math.random() * 0.85
            x = Math.cos(a) * r; y = LAYER_Y[1] - 0.35; z = Math.sin(a) * r
          }
        }
        pos.array[i * 3] = x; pos.array[i * 3 + 1] = y; pos.array[i * 3 + 2] = z
      }
      pos.needsUpdate = true
    }

    let animReq = 0
    function animate() {
      animReq = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const sp = scrollRef.current

      // Scroll-driven camera & explode
      // 0–0.4 → idle rotation
      // 0.4–0.7 → zoom in
      // 0.7–0.9 → exploded view
      // 0.9–1.0 → reassemble
      const zoomTarget = sp < 0.4 ? 9 : sp < 0.7 ? 9 - (sp - 0.4) / 0.3 * 1.5 : 7.5
      camera.position.z += (zoomTarget - camera.position.z) * 0.05

      const shouldExplode = sp > 0.65 && sp < 0.92
      if (shouldExplode !== exploded) exploded = shouldExplode

      // Layer explode/assemble
      layers.forEach((layer, i) => {
        const targetY = exploded ? LAYER_Y[i] + EXPLODE_OFFSETS[i] : LAYER_Y[i]
        layer.position.y += (targetY - layer.position.y) * 0.05
        const glowRing = layer.children[1]
        if (glowRing) glowRing.material.opacity = exploded ? 0.9 + Math.sin(t * 3 + i) * 0.1 : 0.6
      })

      // Tank rotation (slows and stops when exploded)
      if (!exploded) {
        tank.rotation.y = t * 0.12
      } else {
        tank.rotation.y += (0 - tank.rotation.y) * 0.03
      }

      propeller.rotation.y = t * 4
      const sA = 1 + Math.sin(t * 3) * 0.07; pumpA.scale.set(sA, 1, sA)
      const sB = 1 + Math.sin(t * 3 + 1) * 0.07; pumpB.scale.set(sB, 1, sB)
      sensorNodes.forEach((s, i) => {
        const intensity = 1.0 + Math.sin(t * 2.5 + i * 1.3) * 0.8
        s.mesh.material.emissiveIntensity = intensity
        s.mesh.scale.setScalar(1 + Math.sin(t * 2.5 + i * 1.3) * 0.15)
      })

      updateParticles(waterParticles, 'inlet')
      updateParticles(swirlParticles, 'swirl')
      updateParticles(oilParticles, 'oil')

      camera.position.x += (mouse.x * 1.6 - camera.position.x) * 0.04
      camera.position.y += (mouse.y * 0.7 + 0.5 - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    sceneRef.current = { scene, camera, renderer, clock, tank, layers, sensorNodes, waterParticles, swirlParticles, oilParticles, propeller, pumpA, pumpB, animReq, exploded: false, THREE, mouse, scrollProg: 0 }

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Resize
    const onResize = () => {
      const el = mountRef.current
      if (!el) return
      const w2 = el.clientWidth, h2 = el.clientHeight
      camera.aspect = w2 / h2; camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', onResize)

    // Visibility
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(animReq)
      else animate()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(animReq)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      renderer.dispose()
    }
  }, [])

  useEffect(() => {
    if (!mountRef.current) return

    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    mountRef.current.appendChild(canvas)

    let cleanup: (() => void) | undefined

    // Lazy-load Three.js from CDN
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.async = true
    script.onload = () => {
      cleanup = buildScene((window as any).THREE, canvas)
    }
    document.head.appendChild(script)

    return () => {
      cleanup?.()
      canvas.remove()
      script.remove()
    }
  }, [buildScene])

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
    />
  )
}
