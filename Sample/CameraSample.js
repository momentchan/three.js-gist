import Camera from '../Common/Camera.js'

export default class CameraSample extends Camera {
    setInstance(){
        super.setInstance()
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(6, 4, 8)
    }
}