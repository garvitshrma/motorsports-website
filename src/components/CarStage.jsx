import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { MODEL_URL } from '../three/carConfig'
import { setExpectsAssets } from '../lib/boot'
import VehicleDrawing from '../three/VehicleDrawing'
import './CarStage.css'

// The whole three.js stack sits behind this boundary — nothing 3D is fetched
// until the stage is actually on screen.
const CarScene = lazy(() => import('../three/CarScene'))

/* -------------------------------------------------------------------------- */

/** Visitors who ask for reduced motion get a still, upright vehicle. */
function reducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function detectQuality() {
  if (typeof window === 'undefined') return 'off'

  // WebGL support gate.
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') || c.getContext('webgl')
    if (!gl) return 'off'
  } catch {
    return 'off'
  }

  const coarse = window.matchMedia('(max-width: 900px)').matches
  const thin = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
  const lowMem = navigator.deviceMemory && navigator.deviceMemory < 4

  if (lowMem) return 'off'
  return coarse || thin ? 'low' : 'high'
}

/**
 * Confirms the asset is really there before mounting the scene.
 * The SPA rewrite makes a missing file return index.html with a 200, so the
 * content-type has to be checked too — otherwise HTML gets fed to GLTFLoader.
 */
async function probeModel(signal) {
  try {
    const res = await fetch(MODEL_URL, { method: 'HEAD', signal })
    if (!res.ok) return false
    const type = res.headers.get('content-type') || ''
    return !type.includes('text/html')
  } catch {
    return false
  }
}

/* -------------------------------------------------------------------------- */

/**
 * Hero vehicle stage.
 *
 * Owns the scroll and pointer values as refs so neither ever triggers a React
 * render — the 3D scene reads them directly inside its frame loop.
 */
export default function CarStage({ progressTargetRef }) {
  const wrap = useRef(null)
  const scrollRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })

  const [quality, setQuality] = useState(null) // null = still deciding
  const [hasModel, setHasModel] = useState(null)
  const [failed, setFailed] = useState(false)
  const [inView, setInView] = useState(false)
  const [everSeen, setEverSeen] = useState(false)

  // --- capability + asset checks -------------------------------------------
  useEffect(() => {
    setQuality(detectQuality())
    const ac = new AbortController()
    probeModel(ac.signal).then(setHasModel)
    return () => ac.abort()
  }, [])

  // --- only run the frame loop while the stage is on screen -----------------
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setEverSeen(true)
      },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // --- scroll progress through the hero -------------------------------------
  useEffect(() => {
    const target = progressTargetRef?.current ?? wrap.current
    if (!target) return

    let frame = 0
    const measure = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const span = rect.height || 1
      // 0 while the hero is fully in place, 1 once it has scrolled away.
      const p = Math.min(1, Math.max(0, -rect.top / span))
      scrollRef.current = p
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [progressTargetRef])

  // --- pointer parallax (desktop only, and not for reduced-motion) ----------
  useEffect(() => {
    if (quality !== 'high' || reducedMotion()) return
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [quality])

  const use3D = quality && quality !== 'off' && hasModel === true && !failed
  const deciding = quality === null || hasModel === null

  // Tell the loading screen whether it should wait for a model at all.
  useEffect(() => {
    if (deciding) return
    setExpectsAssets(Boolean(use3D))
  }, [deciding, use3D])

  return (
    <div className="stage" ref={wrap} aria-hidden={!use3D}>
      {use3D && everSeen && (
        <Suspense fallback={<StageStatus label="LOADING GEOMETRY" />}>
          <CarScene
            scrollRef={scrollRef}
            pointerRef={pointerRef}
            quality={quality}
            active={inView}
            reduced={reducedMotion()}
            onFail={() => setFailed(true)}
          />
        </Suspense>
      )}

      {!use3D && !deciding && (
        <div className="stage__fallback">
          <VehicleDrawing />
          <p className="stage__note mono-sm">
            <span className="stage__dot" />
            {hasModel === false
              ? 'GEOMETRY PENDING — ADD /models/car.glb'
              : 'STATIC ELEVATION — 3D DISABLED ON THIS DEVICE'}
          </p>
        </div>
      )}

      {deciding && <StageStatus label="INITIALISING" />}
    </div>
  )
}

function StageStatus({ label }) {
  return (
    <div className="stage__status mono-sm">
      <span className="stage__dot" />
      {label}
    </div>
  )
}
