export default class KeyInput {
    constructor() {
        this.keyDownCallbacks = {}
        this.keyUpCallbacks = {}
        
        this.setupEventListeners()
    }

    setupEventListeners() {
        window.addEventListener('keydown', this.onKeyDown.bind(this))
        window.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    onKeyDown(event) {
        if (this.keyDownCallbacks[event.key]) {
            this.keyDownCallbacks[event.key].forEach(callback => callback())
        }
    }

    onKeyUp(event) {
        if (this.keyUpCallbacks[event.key]) {
            this.keyUpCallbacks[event.key].forEach(callback => callback())
        }
    }

    onKeyDownEvent(key, callback) {
        if (!this.keyDownCallbacks[key]) {
            this.keyDownCallbacks[key] = [];
        }
        this.keyDownCallbacks[key].push(callback);
    }

    onKeyUpEvent(key, callback) {
        if (!this.keyUpCallbacks[key]) {
            this.keyUpCallbacks[key] = [];
        }
        this.keyUpCallbacks[key].push(callback);
    }
}