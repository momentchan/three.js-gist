import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    constructor() {
        super()

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.aspect = this.width / this.height
        this.pixelRatio = this.isMobile() ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio

        // Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.aspect = this.width / this.height
            this.pixelRatio = this.isMobile() ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio

            this.trigger('resize')
        })

        window.addEventListener('dblclick', () => {
            this.trigger('dblclick')
        })
    }

    isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
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