import * as THREE from 'three'
import EventEmitter from './EventEmitter'

export default class Touch extends EventEmitter {
    constructor(canvas) {
        super()

        this.canvas = canvas

        this.touchX = 0
        this.touchY = 0

        this.isTouched = false

        this.canvas.addEventListener('touchstart', e => this.onTouchStart(e))
        this.canvas.addEventListener('touchmove', e => this.onTouchMove(e))
        this.canvas.addEventListener('touchend', e => this.onTouchEnd(e))
        this.canvas.addEventListener('touchcancel', e => this.onTouchEnd(e))

        this.touches = []
    }


    onTouchStart(event) {
        this.isTouched = true
        this.touches.length = 0
        this.getTouchPosition(event.touches[0])

        this.trigger('touchstart')
    }

    onTouchMove(event) {
        event.preventDefault()

        if (this.isTouched) {
            this.getTouchPosition(event.touches[0])
            this.touches.push(new THREE.Vector2(this.touchX, this.touchY))
        }

        this.trigger('touchmove')
    }

    onTouchEnd(event) {
        this.isTouched = false

        this.trigger('touchend')
    }

    getTouchPosition(touch) {
        const rect = this.canvas.getBoundingClientRect()

        const screenX = touch.clientX - rect.left
        const screenY = touch.clientY - rect.top

        const ndcX = (screenX / rect.width) * 2 - 1
        const ndcY = -(screenY / rect.height) * 2 + 1

        this.touchX = ndcX
        this.touchY = ndcY

        // (-1, 1)
        // console.log(`${this.touchX} ${this.touchY}`);
    }
}