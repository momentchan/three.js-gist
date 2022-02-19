import ExperienceBase from '../Common/ExperienceBase'
import WorldSample from './WorldSample'
import RendererSample from './RendererSample'
import CameraSample from './CameraSample'

export default class ExperienceSample extends ExperienceBase {
    constructor(canvas, sources){
        super(canvas, sources)

        this.world = new WorldSample(this)
        this.camera = new CameraSample (this)
        this.renderer = new RendererSample(this)
    }

    resize(){
        super.resize()
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        super.update()
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