import * as THREE from 'three'
import CameraBase from '../Common/CameraBase'

export default class CameraSample extends CameraBase {
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