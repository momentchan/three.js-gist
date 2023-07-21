import * as THREE from 'three'

/**
 * Class renders scene to a render texture
 */
export default class RTWriter {
    constructor(experience, camera, downSamplingScale) {
        this.renderer = experience.renderer.instance
        this.sizes = experience.sizes

        this.camera = camera
        this.scene = new THREE.Scene()
        this.target = new THREE.WebGLRenderTarget(this.sizes.width * downSamplingScale, this.sizes.height * downSamplingScale)
    }

    getTexture() {
        return this.target.texture
    }

    update() {
        this.renderer.setRenderTarget(this.target);
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera.instance)
    }

    resize() {
        this.camera.resize()
    }

    dispose() {
        this.target.dispose()
        this.camera.controls.dispose()

        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
                child.material.dispose()
            }
        })
    }
}