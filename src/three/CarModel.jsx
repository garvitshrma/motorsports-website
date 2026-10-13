import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import { CAR, MODEL_URL } from './carConfig'
import { normaliseModel } from './normaliseModel'

/**
 * The vehicle itself.
 *
 * Geometry is never touched — the model is only centred, uniformly scaled to a
 * predictable size, and given shadow flags. Everything else is transform.
 */
export default function CarModel({ scrollRef, pointerRef, quality, reduced = false }) {
  const outer = useRef()
  const inner = useRef()

  const { scene, animations } = useGLTF(MODEL_URL)

  // Clone so the same asset could be mounted twice (hero + vehicles page)
  // without the two instances sharing a transform.
  const model = useMemo(() => scene.clone(true), [scene])
  const { actions, names } = useAnimations(animations, inner)

  // --- normalise: centre on origin, sit on the ground plane, scale to fit ----
  useLayoutEffect(() => {
    normaliseModel(model, CAR.TARGET_LENGTH)

    model.traverse((node) => {
      if (!node.isMesh) return
      node.castShadow = quality !== 'low'
      node.receiveShadow = quality !== 'low'
      node.frustumCulled = true

      const materials = Array.isArray(node.material) ? node.material : [node.material]
      for (const mat of materials) {
        if (!mat) continue
        // Controlled reflections: let the studio environment do the work
        // rather than blowing out every surface.
        mat.envMapIntensity = 0.7
        if (mat.map) mat.map.anisotropy = quality === 'high' ? 8 : 2
        mat.needsUpdate = true
      }
    })
  }, [model, quality])

  // --- optional clips --------------------------------------------------------
  useEffect(() => {
    if (!names.length) return
    if (!CAR.PLAY_CLIPS) {
      // Surfaced so the asset can be inspected without extra tooling.
      console.info('[CarScene] clips available in car.glb:', names.join(', '))
      return
    }
    const clip = CAR.CLIP_NAME ?? names[0]
    actions[clip]?.reset().fadeIn(0.4).play()
    return () => void actions[clip]?.fadeOut(0.3)
  }, [actions, names])

  // --- motion ----------------------------------------------------------------
  // Everything reads from refs, so scroll and pointer never trigger a re-render.
  useFrame((state, delta) => {
    if (!outer.current) return
    const damp = 1 - Math.pow(0.0015, delta) // frame-rate independent easing
    const scroll = scrollRef.current
    const { x: px, y: py } = pointerRef.current

    const idle = reduced
      ? 0
      : Math.sin(state.clock.elapsedTime * CAR.IDLE_SPEED) * CAR.IDLE_AMPLITUDE

    const targetYaw =
      CAR.BASE_YAW + CAR.SCROLL_YAW * scroll + px * CAR.POINTER_YAW + idle
    const targetPitch = CAR.PITCH + py * CAR.POINTER_PITCH
    // Bank into the turn: roll opposes yaw, the way a car leans through a bend.
    const targetRoll = CAR.ROLL - px * (reduced ? 0 : CAR.POINTER_ROLL)

    outer.current.rotation.y += (targetYaw - outer.current.rotation.y) * damp
    outer.current.rotation.x += (targetPitch - outer.current.rotation.x) * damp
    outer.current.rotation.z += (targetRoll - outer.current.rotation.z) * damp
  })

  return (
    <group ref={outer} position={CAR.OFFSET} rotation={[CAR.PITCH, CAR.BASE_YAW, CAR.ROLL]}>
      <primitive ref={inner} object={model} />
    </group>
  )
}

// Warm the cache as soon as this chunk is fetched. Guarded: a missing asset
// must not throw at module scope.
try {
  useGLTF.preload(MODEL_URL)
} catch {
  /* asset not present yet — the stage falls back to the technical drawing */
}
