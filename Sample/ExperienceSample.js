import Experience from '../Experience.js'
import WorldSample from './WorldSample.js'

export default class ExperienceSample extends Experience {
    constructor(canvas, sources){
        super(canvas, sources)

        this.world = new WorldSample(this)
    }

    update() {
        super.update()
        this.world.update()
    }
}