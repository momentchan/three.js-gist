import Floor from './Floor.js';
import Fox from './Fox.js';
import WorldBase from "../World/WorldBase";
import EnvironmentSample from './EnvironmentSample.js';

export default class WorldSample extends WorldBase {
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