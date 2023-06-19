import EventEmitter from "./EventEmitter"
import FPS from './FPS'

export default class Time extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.start = Date.now()
        this.fps = new FPS()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16
        this.tick()
    }

    tick() {
        this.fps.stats.begin()
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        
        window.requestAnimationFrame(() => {
            this.tick()
        })
        
        this.trigger('tick')
        this.fps.stats.end()
    }
}