import * as THREE from 'three'
import Debug from '../Utils/Debug'
import Sizes from '../Utils/Sizes'
import Time from '../Utils/Time'
import Resources from '../Utils/Resource'

/**
 * Base class for experience instance
 * You need to set up World, Camera, Render in child class
 */
export default class Experience {
    constructor(canvas, sources) {
        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        
        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {
                    const value = child.material[key]

                    if (value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })
        
        if (this.debug.active) {
            this.debug.ui.destroy()
        }
    }
}