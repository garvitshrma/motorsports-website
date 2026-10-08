/**
 * A tiny progress bus shared between the loading screen and the 3D stage.
 *
 * The loading screen lives in the main bundle; the car scene lives in a lazy
 * three.js chunk. Rather than import one from the other (which would drag the
 * whole 3D stack into the first paint), both talk through this module.
 */

let assetProgress = 0
/** null = not decided yet, false = no 3D on this device, true = a model is loading */
let expectsAssets = null

const listeners = new Set()

function emit() {
  for (const fn of listeners) fn(snapshot())
}

export function snapshot() {
  return { assetProgress, expectsAssets }
}

export function subscribe(fn) {
  listeners.add(fn)
  fn(snapshot())
  return () => listeners.delete(fn)
}

/**
 * Called from the 3D chunk as the model downloads and parses.
 *
 * three's loading manager reports `loaded / total`, and `total` grows whenever
 * a new item is queued — so when the .glb finishes and its textures are added,
 * the ratio drops back down. Left alone that makes the loading bar run
 * backwards. Progress here is therefore a high-water mark: it only ever moves
 * forward.
 */
export function setAssetProgress(value) {
  const next = Math.max(0, Math.min(100, value))
  if (next <= assetProgress) return
  assetProgress = next
  emit()
}

/** Called once the stage knows whether it will load anything at all. */
export function setExpectsAssets(value) {
  if (expectsAssets === value) return
  expectsAssets = value
  if (value === false) assetProgress = 100
  emit()
}
