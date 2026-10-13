import * as THREE from 'three'

/**
 * Centre a loaded model on the origin, sit it on the ground plane, and scale it
 * so its longest horizontal axis measures `targetLength`.
 *
 * Deliberately idempotent. Box3.setFromObject measures in *world* space, so
 * measuring a model that has already been transformed folds the previous scale
 * into the next one — run it twice and the model lands at a different size.
 * React StrictMode runs layout effects twice on every mount, which is exactly
 * how that shipped as "the car is sometimes small, sometimes big". Resetting
 * the transform before measuring makes repeat calls land on the same answer.
 *
 * Returns the applied scale, or 0 if the object has no measurable bounds.
 */
export function normaliseModel(object, targetLength) {
  object.position.set(0, 0, 0)
  object.scale.setScalar(1)
  object.updateMatrixWorld(true)

  const box = new THREE.Box3().setFromObject(object)
  const size = box.getSize(new THREE.Vector3())
  const centre = box.getCenter(new THREE.Vector3())

  const longest = Math.max(size.x, size.z)
  if (!Number.isFinite(longest) || longest <= 0) return 0

  const scale = targetLength / longest

  /*
   * three composes the local matrix as translate * rotate * scale, so the
   * offset is applied in parent units and is not affected by the scale above.
   * The box was measured at scale 1, so the offsets have to be scaled by hand —
   * otherwise the model is mis-centred and floats or sinks by however far the
   * asset's own origin sits from its centre.
   */
  object.scale.setScalar(scale)
  object.position.set(-centre.x * scale, -box.min.y * scale, -centre.z * scale)
  object.updateMatrixWorld(true)

  return scale
}
