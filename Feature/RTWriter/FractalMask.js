import * as THREE from 'three'
import { fractalShader } from '../../Shader/fractalShader'
import RTWriter from './RTWriter';
import BufferCamera from './BufferCamera';

export default class FractalMask extends RTWriter {
    constructor(experience) {
        super(experience, new BufferCamera(experience), 0.02)

        this.time = experience.time
        this.t = 0
        this.fractalSpeed = 0.1

        const geometry = new THREE.PlaneGeometry(this.sizes.width, this.sizes.height)
        this.material = new THREE.ShaderMaterial(fractalShader)
        this.material.uniforms.uAspect.value = this.sizes.aspect

        this.mesh = new THREE.Mesh(geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {
        super.update()
        this.t += this.time.delta
        this.material.uniforms.uTime.value = this.t / 1000
        this.material.uniforms.uSpeed.value = this.fractalSpeed
    }
}