import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.trigger('resize')
        })

        window.addEventListener('dblclick', () => {
            this.trigger('dblclick')
        })
    }

    fullScreen(canvas) {
        const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement

        if (!fullscreenElement) {
            if (canvas.requestFullscreen) {
                canvas.requestFullscreen()
            } else if (canvas.webkitRequestFullscreen) {
                canvas.webkitRequestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            }
        }
    }
}