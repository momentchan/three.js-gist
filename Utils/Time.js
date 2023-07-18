import EventEmitter from "./EventEmitter"
import FPS from './FPS'

export default class Time extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.start = Date.now()
        
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        
        this.fpsOn = false

        if(this.fpsOn)
            this.fps = new FPS()

        this.tick()
    }

    tick() {
        if (this.fpsOn)
            this.fps.stats.begin()

        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start

        window.requestAnimationFrame(() => {
            this.tick()
        })

        this.trigger('tick')

        if (this.fpsOn)
            this.fps.stats.end()
    }
}