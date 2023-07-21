import * as THREE from 'three'
import EventEmitter from './EventEmitter'

export default class Touch extends EventEmitter {
    constructor(canvas) {
        super()

        this.canvas = canvas

        this.touchX = 0
        this.touchY = 0
        this.isTouched = false
        this.deviceType = this.isTouchDevice() ? "touch" : "mouse"

        this.events = {
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

        this.startHandle = this.onStart.bind(this)
        this.moveHandle = this.onMove.bind(this)
        this.endHandle = this.onEnd.bind(this)
        this.clickHandle = this.onClick.bind(this)

        this.canvas.addEventListener(this.events[this.deviceType].start, this.startHandle)
        this.canvas.addEventListener(this.events[this.deviceType].move, this.moveHandle)
        this.canvas.addEventListener(this.events[this.deviceType].end, this.endHandle)
        this.canvas.addEventListener('click', this.clickHandle)
        this.touches = []

        this.startT = 0

        this.click = null
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
        if (new Date() - this.startT < 150) {
            // click
            const { ndcX, ndcY } = this.getTouchPosition(event)
            this.click = new THREE.Vector2(ndcX, ndcY)

            this.trigger('click')
        }
    }

    getTouchPosition(event) {
        const rect = this.canvas.getBoundingClientRect()

        const screenX = event.clientX - rect.left
        const screenY = event.clientY - rect.top

        const ndcX = (screenX / rect.width) * 2 - 1
        const ndcY = -(screenY / rect.height) * 2 + 1

        return { ndcX, ndcY } // (-1, 1)
        // console.log(`${ndcX} ${ndcY}`);
    }

    /**
     *  Touch
     */
    onStart(event) {
        this.startT = new Date()

        this.isTouched = true
        this.touches.length = 0

        const { ndcX, ndcY } = this.getTouchPosition(this.isTouchDevice() ? event.touches[0] : event)
        this.touchX = ndcX
        this.touchY = ndcY

        this.trigger('onStart')
    }

    onMove(event) {
        event.preventDefault()

        if (this.isTouched) {
            const { ndcX, ndcY } = this.getTouchPosition(this.isTouchDevice() ? event.touches[0] : event)
            this.touches.push(new THREE.Vector2(ndcX, ndcY))
        }

        this.trigger('onMove')
    }

    onEnd(event) {
        this.isTouched = false

        this.trigger('onEnd')
    }

    dispose() {
        this.canvas.removeEventListener(this.events[this.deviceType].start, this.startHandle);
        this.canvas.removeEventListener(this.events[this.deviceType].move, this.moveHandle);
        this.canvas.removeEventListener(this.events[this.deviceType].end, this.endHandle);
        this.canvas.removeEventListener('click', this.clickHandle);

        this.startHandle = null
        this.moveHandle = null
        this.endHandle = null
        this.clickHandle = null
        this.events = null
        this.deviceType = null
        this.canvas = null
        this.touches = null
        this.touchX = null
        this.touchY = null
        this.isTouched = null
        this.startT = null
        this.click = null
    }
}