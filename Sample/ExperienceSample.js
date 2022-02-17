import Experience from '../Common/Experience.js'
import WorldSample from './WorldSample.js'
import RendererSample from './RendererSample.js'
import CameraSample from './CameraSample.js'

export default class ExperienceSample extends Experience {
    constructor(canvas, sources){
        super(canvas, sources)

        this.world = new WorldSample(this)
        this.camera = new CameraSample (this)
        this.renderer = new RendererSample(this)
    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.world.update()
        this.camera.update()
        this.renderer.update()
    }

    destroy(){
        super.destroy()
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
    }
}