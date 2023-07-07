import * as THREE from 'three'
import { fractalShader } from '../../shaders/postProcessing/fractalShader'
import BufferCamera from './BufferCamera';

export default class FractalMask {
    constructor(experience) {
        this.sizes = experience.sizes
        this.time = experience.time
        this.renderer = experience.renderer.instance

        this.scene = new THREE.Scene()
        this.camera = new BufferCamera(experience)

        const geometry = new THREE.PlaneGeometry(this.sizes.width, this.sizes.height)
        this.rtTexture = new THREE.WebGLRenderTarget(this.sizes.width * 0.02, this.sizes.height * 0.02)

        this.material = new THREE.ShaderMaterial(fractalShader)
        this.material.uniforms.uAspect.value = this.sizes.aspect

        this.mesh = new THREE.Mesh(geometry, this.material)
        this.scene.add(this.mesh)

        this.t = 0
        this.fractalSpeed = 0.1
    }

    getTexture() {
        return this.rtTexture.texture
    }

    update() {
        this.t += this.time.delta
        this.material.uniforms.uTime.value = this.t / 1000
        this.material.uniforms.uSpeed.value = this.fractalSpeed

        this.renderer.setRenderTarget(this.rtTexture);
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera.instance)
    }

    resize() {
        this.camera.resize()
    }
}