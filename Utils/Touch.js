import * as THREE from 'three'
import EventEmitter from './EventEmitter'

export default class Touch extends EventEmitter {
    constructor(canvas) {
        super()

        this.canvas = canvas

        this.touchX = 0
        this.touchY = 0

        this.isTouched = false

        const deviceType = this.isTouchDevice() ? "touch" : "mouse"

        const events = {
            "mouse": {
                start: "mousedown",
                move: "mousemove",
                end: "mouseup"
            },
            "touch": {
                start: "touchstart",
                move: "touchmove",
                end: "touchend"
            }
        }

        this.canvas.addEventListener(events[deviceType].start, e => this.onStart(e))
        this.canvas.addEventListener(events[deviceType].move, e => this.onMove(e))
        this.canvas.addEventListener(events[deviceType].end, e => this.onEnd(e))
        this.canvas.addEventListener(events[deviceType].end, e => this.onEnd(e))
        this.canvas.addEventListener('click', e => this.onClick(e))
        this.touches = []

        this.click = null

        console.log(this.deviceType)
    }

    isTouchDevice() {
        try {
            document.createEvent("TouchEvent")
            return true;
        } catch (e) {
            return false
        }
    }

    onClick(event) {
        const { ndcX, ndcY } = this.getTouchPosition(event)
        this.click = new THREE.Vector2(ndcX, ndcY)
        // console.log(this.click);

        this.trigger('click')
    }

    getTouchPosition(event) {
        const rect = this.canvas.getBoundingClientRect()

        const x = this.isTouchDevice() ? event.touches[0].clientX : event.clientX
        const y = this.isTouchDevice() ? event.touches[0].clientY : event.clientY

        const screenX = x - rect.left
        const screenY = y - rect.top

        const ndcX = (screenX / rect.width) * 2 - 1
        const ndcY = -(screenY / rect.height) * 2 + 1

        return { ndcX, ndcY } // (-1, 1)
        // console.log(`${ndcX} ${ndcY}`);
    }

    /**
     *  Touch
     */
    onStart(event) {
        this.isTouched = true
        this.touches.length = 0

        const { ndcX, ndcY } = this.getTouchPosition(event)
        this.touchX = ndcX
        this.touchY = ndcY

        this.trigger('onStart')
    }

    onMove(event) {
        event.preventDefault()

        if (this.isTouched) {
            const { ndcX, ndcY } = this.getTouchPosition(event)
            this.touches.push(new THREE.Vector2(ndcX, ndcY))
        }

        this.trigger('onMove')
    }

    onEnd(event) {
        this.isTouched = false

        this.trigger('onEnd')
    }
}