/**
 * EVERY TUNABLE FOR THE HERO VEHICLE LIVES HERE.
 * ---------------------------------------------------------------------------
 * Drop a new car at /public/models/car.glb and, if it sits oddly, adjust the
 * numbers below — no component code needs to change.
 */

/** Swap this path to point at a different asset. */
export const MODEL_URL = '/models/car.glb'

export const CAR = {
  /**
   * The model is auto-centred and auto-scaled so its longest horizontal axis
   * measures TARGET_LENGTH world units. This keeps framing identical no matter
   * what units the .glb was authored in.
   */
  TARGET_LENGTH: 4.2,

  /** Base yaw, radians. 0 = whatever the model calls forward. -0.42 gives a 3/4 front. */
  BASE_YAW: -0.42,

  /** Extra yaw applied across the hero scroll — car turns toward profile as you descend. */
  SCROLL_YAW: -0.78,

  /** Fine corrections if the exported model is not Y-up / Z-forward. */
  PITCH: 0,
  ROLL: 0,

  /** Nudge the car off the layout centre so it breaks the grid to the right. */
  OFFSET: [0.18, 0, 0],

  /** How far the car leans toward the cursor. Restrained on purpose. */
  POINTER_YAW: 0.1,
  POINTER_PITCH: 0.035,

  /** Idle breathing — a parked car on a turntable that has almost stopped. */
  IDLE_AMPLITUDE: 0.022,
  IDLE_SPEED: 0.22,

  /**
   * The .glb may ship animation clips. They are inspected and logged on load
   * but NOT played by default — most exported clips are turntable spins that
   * fight the scroll choreography. Set to true (or name a clip) once you have
   * checked what the asset actually contains.
   */
  PLAY_CLIPS: false,
  CLIP_NAME: null,
}

export const CAMERA = {
  FOV: 32,
  /** Hero framing: slightly above the roofline, looking down the nose. */
  POSITION: [0.15, 1.15, 6.6],
  TARGET: [0, 0.15, 0],
  /** Camera settles lower and closer as the hero scrolls away. */
  SCROLL_DOLLY: -0.85,
  SCROLL_RISE: -0.35,
  POINTER_SWAY: 0.28,
}
