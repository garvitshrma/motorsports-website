import { Component, Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import CarModel from './CarModel'
import { CAMERA } from './carConfig'

/* -------------------------------------------------------------------------- */
/*  Studio environment                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Reflections come from a procedurally generated room, not a downloaded HDR.
 * No network request, no CDN dependency, and the intensity stays controlled.
 */
function StudioEnvironment({ intensity = 0.55 }) {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const rt = pmrem.fromScene(new RoomEnvironment(), 0.04)
    scene.environment = rt.texture
    scene.environmentIntensity = intensity

    return () => {
      scene.environment = null
      rt.dispose()
      pmrem.dispose()
    }
  }, [gl, scene, intensity])

  return null
}

/* -------------------------------------------------------------------------- */
/*  Camera rig                                                                */
/* -------------------------------------------------------------------------- */

/** Sways with the cursor and dollies through the hero as the page scrolls. */
function CameraRig({ scrollRef, pointerRef }) {
  const cam = useRef()
  const target = new THREE.Vector3(...CAMERA.TARGET)

  useFrame((_, delta) => {
    if (!cam.current) return
    const damp = 1 - Math.pow(0.002, delta)
    const scroll = scrollRef.current
    const { x: px, y: py } = pointerRef.current

    const [bx, by, bz] = CAMERA.POSITION
    const wantX = bx + px * CAMERA.POINTER_SWAY
    const wantY = by + py * -CAMERA.POINTER_SWAY * 0.5 + scroll * CAMERA.SCROLL_RISE
    const wantZ = bz + scroll * CAMERA.SCROLL_DOLLY

    cam.current.position.x += (wantX - cam.current.position.x) * damp
    cam.current.position.y += (wantY - cam.current.position.y) * damp
    cam.current.position.z += (wantZ - cam.current.position.z) * damp
    cam.current.lookAt(target)
  })

  return (
    <PerspectiveCamera
      ref={cam}
      makeDefault
      fov={CAMERA.FOV}
      near={0.1}
      far={60}
      position={CAMERA.POSITION}
    />
  )
}

/* -------------------------------------------------------------------------- */
/*  Lighting                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A pit-garage lighting setup: hard key from high front-left, cool rim behind
 * to separate the silhouette from the dark ground, and a low fill so the
 * underside never goes fully black. No coloured neon.
 */
function Lighting({ quality }) {
  const shadows = quality === 'high'

  return (
    <>
      <ambientLight intensity={0.32} />

      <directionalLight
        position={[5.5, 8, 4.5]}
        intensity={2.5}
        castShadow={shadows}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
      >
        <orthographicCamera attach="shadow-camera" args={[-5, 5, 5, -5, 0.5, 25]} />
      </directionalLight>

      {/* rim / kicker — carves the edge of the bodywork out of the background */}
      <spotLight
        position={[-6.5, 4.5, -5.5]}
        angle={0.7}
        penumbra={1}
        intensity={55}
        distance={26}
        color="#e8ecf2"
      />

      {/* low fill from the front-right, mimics bounce off a workshop floor */}
      <pointLight position={[3.5, 0.7, 3.5]} intensity={9} distance={16} color="#fff6ee" />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/*  Error boundary (must live INSIDE the Canvas — R3F owns its own root)      */
/* -------------------------------------------------------------------------- */

class SceneBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('[CarScene] scene failed, falling back to technical drawing:', error?.message)
    this.props.onFail?.()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

export default function CarScene({
  scrollRef,
  pointerRef,
  quality = 'high',
  active = true,
  reduced = false,
  onFail,
}) {
  const shadows = quality === 'high'

  return (
    <Canvas
      dpr={quality === 'high' ? [1, 2] : [1, 1.5]}
      shadows={shadows}
      frameloop={active ? 'always' : 'never'}
      gl={{
        antialias: quality === 'high',
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <CameraRig scrollRef={scrollRef} pointerRef={pointerRef} />
      <Lighting quality={quality} />
      <StudioEnvironment intensity={quality === 'high' ? 0.55 : 0.45} />

      <SceneBoundary onFail={onFail}>
        <Suspense fallback={null}>
          <CarModel
            scrollRef={scrollRef}
            pointerRef={pointerRef}
            quality={quality}
            reduced={reduced}
          />
        </Suspense>
      </SceneBoundary>

      {/* Grounds the car. Without this it reads as a floating render. */}
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.82}
        scale={12}
        blur={2.4}
        far={4.5}
        resolution={quality === 'high' ? 1024 : 512}
        color="#000000"
        frames={quality === 'high' ? Infinity : 1}
      />
    </Canvas>
  )
}
