import * as THREE from 'three'
import BufferCamera from './BufferCamera';

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
}