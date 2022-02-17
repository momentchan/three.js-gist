import Floor from './Floor';
import Fox from './Fox';
import World from "../World/World";
import EnvironmentSample from './EnvironmentSample';

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