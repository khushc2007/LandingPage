"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Layers, RotateCcw, Maximize2, Minimize2 } from "lucide-react"

// ── Sensor metadata ──
const SENSORS = [
  { label: "pH Sensor",    color: "#00e5ff", value: "7.2",   unit: ""    },
  { label: "Turbidity",    color: "#00ff88", value: "12",    unit: "NTU" },
  { label: "TDS Monitor",  color: "#00e5ff", value: "145",   unit: "ppm" },
  { label: "Ammonia",      color: "#ffd700", value: "0.30",  unit: "mg/L"},
  { label: "ORP Sensor",   color: "#00ff88", value: "320",   unit: "mV"  },
]

const LAYER_LABELS = [
  { label: "Swirl Chamber",   color: "#00D4FF" },
  { label: "Oil Membrane",    color: "#FFD700" },
  { label: "Residue Filter",  color: "#00FFB2" },
  { label: "Sensor Core",     color: "#00D4FF" },
  { label: "Pump Routing",    color: "#FF6622" },
]

// ── Three.js scene factory ──
function buildTankScene(THREE: any, canvas: HTMLCanvasElement, explodedRef: React.MutableRefObject<boolean>) {
  const LAYER_Y = [-1.55, -0.75, 0.05, 0.85, 1.65]
  const EXPLODE_OFFSETS = [-2.2, -1.1, 0, 1.1, 2.2]

  const clock = new THREE.Clock()
  const scene = new THREE.Scene()
  scene.background = null  // transparent — CSS sets the background
  scene.fog = new THREE.FogExp2(0x020d1a, 0.032)

  const w = canvas.clientWidth || 800
  const h = canvas.clientHeight || 600
  const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
  camera.position.set(0, 0.4, 8.5)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.setClearColor(0x000000, 0)

  // ── Lighting ──
  scene.add(new THREE.HemisphereLight(0x0a1628, 0x000408, 0.7))
  const key = new THREE.DirectionalLight(0x88ddff, 1.6)
  key.position.set(4, 6, 7); key.castShadow = true; scene.add(key)
  const rimL = new THREE.PointLight(0x00e5ff, 4, 20); rimL.position.set(-7, 3, -3); scene.add(rimL)
  const rimR = new THREE.PointLight(0x00ff88, 3, 20); rimR.position.set(7, 2, -3); scene.add(rimR)
  const back = new THREE.DirectionalLight(0x0033ff, 0.6); back.position.set(0, -3, -8); scene.add(back)
  const top  = new THREE.PointLight(0x00c8ff, 2, 14); top.position.set(0, 8, 0); scene.add(top)

  // ── Floor ──
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 24),
    new THREE.MeshPhysicalMaterial({ color: 0x010810, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.6 })
  )
  floor.rotation.x = -Math.PI / 2; floor.position.y = -3.2; floor.receiveShadow = true
  scene.add(floor)

  // Grid
  const gridMat = new THREE.LineBasicMaterial({ color: 0x0a2040, transparent: true, opacity: 0.3 })
  const gridGroup = new THREE.Group()
  for (let i = -8; i <= 8; i++) {
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8,0,i),new THREE.Vector3(8,0,i)]), gridMat))
    gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i,0,-8),new THREE.Vector3(i,0,8)]), gridMat))
  }
  gridGroup.position.y = -3.18; scene.add(gridGroup)

  // ── Tank ──
  const tank = new THREE.Group(); scene.add(tank)

  const shellMat = new THREE.MeshPhysicalMaterial({ color: 0x88ccff, transparent: true, opacity: 0.07, roughness: 0.01, metalness: 0.1, side: THREE.DoubleSide, depthWrite: false })
  tank.add(new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 4.6, 64, 1, true), shellMat))

  const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x00ccff, roughness: 0.1, metalness: 0.85, transparent: true, opacity: 0.55 })
  ;[-2.3, -1.55, -0.75, 0.05, 0.85, 1.65, 2.3].forEach(y => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.018, 16, 80), ringMat)
    ring.rotation.x = Math.PI / 2; ring.position.y = y; tank.add(ring)
  })

  const capMat = new THREE.MeshPhysicalMaterial({ color: 0x1a2840, roughness: 0.12, metalness: 0.9 })
  const topCap = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.09, 64), capMat); topCap.position.y = 2.34; tank.add(topCap)
  const botCap = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.09, 64), capMat); botCap.position.y = -2.34; tank.add(botCap)

  // ── Layers ──
  const layers: any[] = []
  const layerColors = [0x0033aa, 0x003355, 0x002244, 0x001133, 0x001020]
  const layerOpacity = [0.13, 0.16, 0.13, 0.20, 0.16]
  layerColors.forEach((color, i) => {
    const g = new THREE.Group()
    g.userData = { index: i, baseY: LAYER_Y[i] }
    g.add(new THREE.Mesh(
      new THREE.CylinderGeometry(1.12, 1.12, 0.72, 64, 1, true),
      new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: layerOpacity[i], roughness: 0.1, metalness: 0.15, side: THREE.DoubleSide, depthWrite: false })
    ))
    const glowRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.06, 0.009, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.6 })
    )
    glowRing.rotation.x = Math.PI / 2; glowRing.position.y = 0.36; g.add(glowRing)
    g.position.y = LAYER_Y[i]; layers.push(g); tank.add(g)
  })

  // ── Propeller ──
  const propeller = new THREE.Group()
  const bladeMat = new THREE.MeshPhysicalMaterial({ color: 0x90caf9, metalness: 0.92, roughness: 0.08 })
  for (let i = 0; i < 4; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.15), bladeMat)
    blade.rotation.y = (Math.PI / 2) * i; propeller.add(blade)
  }
  propeller.add(new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.12, 16), bladeMat))
  propeller.position.y = LAYER_Y[0]; tank.add(propeller)

  // Oil compartment
  tank.add(Object.assign(new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.5, 24),
    new THREE.MeshPhysicalMaterial({ color: 0xffd700, transparent: true, opacity: 0.28, roughness: 0.1, metalness: 0.5 })
  ), { position: new THREE.Vector3(1.1, LAYER_Y[1], 0) }))

  // Sensor core
  tank.add(Object.assign(new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.22, 0.65, 32),
    new THREE.MeshPhysicalMaterial({ color: 0x001a33, roughness: 0.2, metalness: 0.85, emissive: 0x003366, emissiveIntensity: 0.6 })
  ), { position: new THREE.Vector3(0, LAYER_Y[3], 0) }))

  // Pumps
  const mkPump = (color: number, emissive: number, x: number) => {
    const g = new THREE.Group()
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.3, 24), new THREE.MeshPhysicalMaterial({ color, metalness: 0.9, roughness: 0.1, emissive, emissiveIntensity: 0.35 })))
    g.position.set(x, LAYER_Y[4], 0); tank.add(g); return g
  }
  const pumpA = mkPump(0x00e5ff, 0x00aadd, -0.45)
  const pumpB = mkPump(0xff6622, 0xff4400,  0.45)

  // ── Sensor nodes ──
  const sensorNodes: any[] = []
  const sensorColors = [0x00e5ff, 0x00ff88, 0xffd700, 0xff6699, 0x44aaff]
  ;[0, 72, 144, 216, 288].map(d => d * Math.PI / 180).forEach((angle, i) => {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 16, 16),
      new THREE.MeshPhysicalMaterial({ color: sensorColors[i], emissive: sensorColors[i], emissiveIntensity: 1.5, roughness: 0.1, metalness: 0.3 })
    )
    sphere.position.set(Math.cos(angle) * 0.16, LAYER_Y[3], Math.sin(angle) * 0.16)
    scene.add(sphere); sensorNodes.push({ mesh: sphere })
  })

  // ── Pipes ──
  const pipeMat = new THREE.MeshPhysicalMaterial({ color: 0x2a4060, roughness: 0.2, metalness: 0.85 })
  const inlet = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 1.2, 16), pipeMat)
  inlet.position.set(0.35, 3.0, 0); scene.add(inlet)
  const outA = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), new THREE.MeshPhysicalMaterial({ color: 0x00c8dd, metalness: 0.9, roughness: 0.1 }))
  outA.rotation.z = Math.PI / 2; outA.position.set(-1.6, LAYER_Y[4], 0); scene.add(outA)
  const outB = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), new THREE.MeshPhysicalMaterial({ color: 0xff5500, metalness: 0.9, roughness: 0.1 }))
  outB.rotation.z = Math.PI / 2; outB.position.set(1.6, LAYER_Y[4], 0); scene.add(outB)

  // ── Particles ──
  function buildParticles(count: number, color: number, size: number, initFn: (pos: Float32Array, i: number) => void) {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) initFn(pos, i)
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.75, depthWrite: false, sizeAttenuation: true }))
    pts.userData = { count, initFn }; scene.add(pts); return pts
  }

  const waterParticles = buildParticles(160, 0x00ddff, 0.028, (pos, i) => {
    pos[i*3]=0.35+(Math.random()-.5)*.06; pos[i*3+1]=2.3+Math.random()*1.5; pos[i*3+2]=(Math.random()-.5)*.06
  })
  const swirlParticles = buildParticles(260, 0x0099cc, 0.018, (pos, i) => {
    const a=Math.random()*Math.PI*2, r=0.15+Math.random()*.85
    pos[i*3]=Math.cos(a)*r; pos[i*3+1]=LAYER_Y[0]+(Math.random()-.5)*.6; pos[i*3+2]=Math.sin(a)*r
  })
  const oilParticles = buildParticles(55, 0xffdd44, 0.022, (pos, i) => {
    const a=Math.random()*Math.PI*2, r=Math.random()*.9
    pos[i*3]=Math.cos(a)*r; pos[i*3+1]=LAYER_Y[1]-.3+Math.random()*.2; pos[i*3+2]=Math.sin(a)*r
  })

  function updateParticles(pts: any, type: string) {
    const pos = pts.geometry.attributes.position
    const count = pts.userData.count
    for (let i = 0; i < count; i++) {
      let x=pos.array[i*3], y=pos.array[i*3+1], z=pos.array[i*3+2]
      if (type==='inlet') {
        y-=0.024+Math.random()*.005; x+=(Math.random()-.5)*.003
        if(y<-2.5){x=0.35+(Math.random()-.5)*.06; y=2.3+Math.random()*.8; z=(Math.random()-.5)*.06}
      } else if (type==='swirl') {
        const a=Math.atan2(z,x), rr=Math.sqrt(x*x+z*z)
        const na=a+0.025, nr=Math.min(rr+.004,1.05)
        x=Math.cos(na)*nr; z=Math.sin(na)*nr; y-=.005
        if(rr>1.08||y<LAYER_Y[0]-.4){const a2=Math.random()*Math.PI*2,r2=.1+Math.random()*.4; x=Math.cos(a2)*r2; y=LAYER_Y[0]+(Math.random()-.5)*.55; z=Math.sin(a2)*r2}
      } else if (type==='oil') {
        y+=.009+Math.random()*.003; x+=(Math.random()-.5)*.005; z+=(Math.random()-.5)*.005
        if(y>LAYER_Y[1]+.38){const a=Math.random()*Math.PI*2,r=Math.random()*.85; x=Math.cos(a)*r; y=LAYER_Y[1]-.35; z=Math.sin(a)*r}
      }
      pos.array[i*3]=x; pos.array[i*3+1]=y; pos.array[i*3+2]=z
    }
    pos.needsUpdate = true
  }

  // ── Mouse orbit ──
  const mouse = { x: 0, y: 0 }
  const drag = { active: false, lastX: 0, rotY: 0 }

  const onMouseDown = (e: MouseEvent) => { drag.active=true; drag.lastX=e.clientX }
  const onMouseMove = (e: MouseEvent) => {
    if (drag.active) { drag.rotY += (e.clientX-drag.lastX)*.012; drag.lastX=e.clientX }
    else {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX-rect.left)/rect.width - 0.5)*2
      mouse.y = -((e.clientY-rect.top)/rect.height - 0.5)*2
    }
  }
  const onMouseUp = () => { drag.active=false }
  const onTouchStart = (e: TouchEvent) => { drag.active=true; drag.lastX=e.touches[0].clientX }
  const onTouchMove = (e: TouchEvent) => {
    if(!drag.active) return
    drag.rotY += (e.touches[0].clientX-drag.lastX)*.012; drag.lastX=e.touches[0].clientX
  }
  canvas.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mousemove', onMouseMove, {passive:true})
  window.addEventListener('mouseup', onMouseUp)
  canvas.addEventListener('touchstart', onTouchStart, {passive:true})
  canvas.addEventListener('touchmove', onTouchMove, {passive:true})
  canvas.addEventListener('touchend', onMouseUp)

  // ── Animate ──
  let animReq = 0
  let autoRotY = 0

  function animate() {
    animReq = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()
    const isExploded = explodedRef.current

    // Auto-rotate when not dragging
    if (!drag.active) autoRotY += 0.006
    tank.rotation.y = autoRotY + drag.rotY

    // Explode / assemble layers
    layers.forEach((layer, i) => {
      const targetY = isExploded ? LAYER_Y[i]+EXPLODE_OFFSETS[i] : LAYER_Y[i]
      layer.position.y += (targetY-layer.position.y)*.055
      const glowRing = layer.children[1]
      if (glowRing) glowRing.material.opacity = isExploded ? .85+Math.sin(t*3+i)*.12 : .6
    })

    propeller.rotation.y = t*4
    const sA=1+Math.sin(t*3)*.07; pumpA.scale.set(sA,1,sA)
    const sB=1+Math.sin(t*3+1)*.07; pumpB.scale.set(sB,1,sB)
    sensorNodes.forEach((s,i)=>{
      const v=1+Math.sin(t*2.5+i*1.3)*.8
      s.mesh.material.emissiveIntensity=v
      s.mesh.scale.setScalar(1+Math.sin(t*2.5+i*1.3)*.15)
    })

    updateParticles(waterParticles,'inlet')
    updateParticles(swirlParticles,'swirl')
    updateParticles(oilParticles,'oil')

    // Subtle camera drift from mouse
    camera.position.x += (mouse.x*.8-camera.position.x)*.03
    camera.position.y += (mouse.y*.4+.4-camera.position.y)*.03
    camera.lookAt(0,0,0)
    renderer.render(scene,camera)
  }
  animate()

  // ── Resize ──
  const onResize = () => {
    const w2=canvas.clientWidth, h2=canvas.clientHeight
    camera.aspect=w2/h2; camera.updateProjectionMatrix()
    renderer.setSize(w2,h2)
  }
  window.addEventListener('resize', onResize)

  // ── Visibility pause ──
  const onVisibility = () => { if(document.hidden) cancelAnimationFrame(animReq); else animate() }
  document.addEventListener('visibilitychange', onVisibility)

  return () => {
    cancelAnimationFrame(animReq)
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVisibility)
    canvas.removeEventListener('mousedown', onMouseDown)
    canvas.removeEventListener('touchstart', onTouchStart)
    canvas.removeEventListener('touchmove', onTouchMove)
    canvas.removeEventListener('touchend', onMouseUp)
    renderer.dispose()
  }
}

// ── React component ──
export default function TankSimulationSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mountRef   = useRef<HTMLDivElement>(null)
  const explodedRef = useRef(false)
  const [exploded, setExploded]   = useState(false)
  const [loaded,   setLoaded]     = useState(false)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const toggleExplode = () => {
    explodedRef.current = !explodedRef.current
    setExploded(v => !v)
  }

  // Lazy-load Three.js only when section is visible
  useEffect(() => {
    if (!isInView || !mountRef.current) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'width:100%;height:100%;display:block;border-radius:12px;'
    mountRef.current.appendChild(canvas)

    let cleanup: (() => void) | undefined

    if ((window as any).THREE) {
      cleanup = buildTankScene((window as any).THREE, canvas, explodedRef)
      setLoaded(true)
    } else {
      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
      script.async = true
      script.onload = () => {
        cleanup = buildTankScene((window as any).THREE, canvas, explodedRef)
        setLoaded(true)
      }
      document.head.appendChild(script)
      return () => { cleanup?.(); canvas.remove(); script.remove() }
    }

    return () => { cleanup?.(); canvas.remove() }
  }, [isInView])

  return (
    <section id="tank" ref={sectionRef} className="relative py-32 px-6 overflow-hidden">

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[350px] w-[350px] rounded-full bg-accent/4 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-primary uppercase">
            <Layers className="h-3.5 w-3.5" />
            Interactive 3D Model
          </span>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Inside the{" "}
            <span className="text-primary glow-text">WATER·IQ</span>
            <br />System
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Drag to rotate. Explore every layer of the five-stage AI treatment
            system — from swirl separation to intelligent pump routing.
          </p>
        </motion.div>

        {/* Main interactive card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="glass glow-cyan rounded-3xl p-1"
          style={{ border: "1px solid rgba(0,212,255,0.18)" }}
        >
          <div className="rounded-[22px] overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(3,11,18,0.95) 0%, rgba(10,22,40,0.9) 100%)" }}>

            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-white/15" />
                  <div className="h-3 w-3 rounded-full bg-white/15" />
                  <div className="h-3 w-3 rounded-full bg-white/15" />
                </div>
                <span className="font-mono text-xs tracking-widest text-white/30 uppercase">
                  WATER·IQ — 3D System Viewer
                </span>
              </div>
              <div className="flex items-center gap-2">
                {loaded && (
                  <span className="flex items-center gap-1.5 text-[10px] text-accent/70">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    Live simulation
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">

              {/* Canvas */}
              <div className="relative flex-1" style={{ minHeight: "520px" }}>
                {/* Loading state */}
                {!loaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#030B12]/80">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary"
                    />
                    <span className="text-xs tracking-widest text-white/30 uppercase">Initialising scene…</span>
                  </div>
                )}
                {/* Drag hint */}
                {loaded && (
                  <motion.div
                    initial={{ opacity: 0.7 }} animate={{ opacity: 0 }} transition={{ delay: 3, duration: 1.5 }}
                    className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full glass px-4 py-2 text-[10px] tracking-widest text-white/50 uppercase"
                  >
                    ↔ Drag to rotate
                  </motion.div>
                )}
                <div ref={mountRef} className="h-full w-full" style={{ minHeight: "520px", cursor: "grab" }} />
              </div>

              {/* Side panel */}
              <div className="flex w-full flex-col gap-0 border-t border-white/[0.06] lg:w-72 lg:border-l lg:border-t-0">

                {/* Sensor readings */}
                <div className="border-b border-white/[0.06] p-5">
                  <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Live Sensor Readings
                  </div>
                  <div className="flex flex-col gap-3">
                    {SENSORS.map((s) => (
                      <div key={s.label} className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <motion.div
                            className="h-2 w-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}` }}
                            animate={{ opacity: [1, 0.35, 1], scale: [1, 0.65, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 0.8 }}
                          />
                          <span className="text-[11px] text-white/55">{s.label}</span>
                        </div>
                        <span className="font-mono text-xs font-bold" style={{ color: s.color }}>
                          {s.value}<span className="text-white/30 font-normal ml-0.5">{s.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layer legend */}
                <div className="border-b border-white/[0.06] p-5">
                  <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    System Layers
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {LAYER_LABELS.map((l, i) => (
                      <div key={l.label} className="flex items-center gap-2.5">
                        <span className="font-mono text-[9px] text-white/25 w-4">{String(i+1).padStart(2,'0')}</span>
                        <div className="h-px w-3 opacity-50" style={{ backgroundColor: l.color }} />
                        <span className="text-[11px] text-white/55">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                    Controls
                  </div>
                  <motion.button
                    onClick={toggleExplode}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-xs font-semibold transition-all"
                    style={{
                      background: exploded ? "rgba(0,212,255,0.15)" : "rgba(255,255,255,0.04)",
                      borderColor: exploded ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.1)",
                      color: exploded ? "#00D4FF" : "rgba(255,255,255,0.65)",
                      boxShadow: exploded ? "0 0 20px rgba(0,212,255,0.2)" : "none",
                    }}
                  >
                    {exploded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                    {exploded ? "Assemble Layers" : "Explode View"}
                  </motion.button>

                  <motion.button
                    onClick={() => { explodedRef.current=false; setExploded(false) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 text-xs text-white/40 transition-all hover:text-white/60"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset View
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom spec cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { val: "5-Stage",  lbl: "Separation Layers" },
            { val: "0.5s",     lbl: "AI Decision Time"  },
            { val: "99.7%",    lbl: "Classification Acc" },
            { val: "12L/min",  lbl: "Flow Rate"          },
          ].map((s, i) => (
            <motion.div
              key={s.lbl}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55 + i * 0.08 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="glass glow-cyan rounded-2xl p-4 text-center"
            >
              <div className="font-mono text-xl font-bold text-primary">{s.val}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/35">{s.lbl}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
