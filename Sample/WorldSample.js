import Floor from './Floor.js';
import Fox from './Fox.js';
import World from "../World/World.js";
import EnvironmentSample from './EnvironmentSample.js';

export default class WorldSample extends World {
    constructor(experience) {
        super(experience)
        
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor(this.experience)
            this.fox = new Fox(this.experience)
            this.environment = new EnvironmentSample(this.experience)
        })
    }

    update() {
        if (this.fox)
            this.fox.update()
    }
}