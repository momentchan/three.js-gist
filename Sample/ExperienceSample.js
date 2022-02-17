import Camera from '../Camera.js'
import Renderer from '../Renderer.js'
import Experience from '../Experience.js'
import WorldSample from './WorldSample.js'

export default class ExperienceSample extends Experience {
    constructor(canvas, sources){
        super(canvas, sources)

        this.world = new WorldSample(this)
        this.camera = new Camera (this)
        this.renderer = new Renderer(this)
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