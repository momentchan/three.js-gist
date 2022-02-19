import * as THREE from 'three'
import RendererBase from '../Common/RendererBase'

export default class RendererSample extends RendererBase {
    setInstance(){
        super.setInstance()
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor('#211d20')
    }
}