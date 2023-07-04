import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class CameraBase {
    constructor(experience) {
        this.experience = experience
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControl()
    }

    getWorldSizeAtDistance(distance) {
        const fovRadians = THREE.MathUtils.degToRad(this.instance.fov);
        const h = 2 * Math.tan(fovRadians * 0.5) * distance;
        const w = h * this.instance.aspect;
        return { w, h }
    }

    getWorldPosFromNDC(ndc, distance) {
        var vector = new THREE.Vector3(ndc.x, ndc.y, 0.2);

        const cameraWorldPos = new THREE.Vector3();
        this.instance.getWorldPosition(cameraWorldPos)

        vector.unproject(this.instance);

        var dir = vector.sub(cameraWorldPos).normalize();

        return cameraWorldPos.clone().add(dir.multiplyScalar(distance));
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100)
        this.instance.position.z = 3
        this.scene.add(this.instance)
    }

    setOrbitControl() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}