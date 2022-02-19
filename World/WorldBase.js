export default class WorldBase {
    constructor(experience) {
        this.experience = experience
        this.scene = this.experience.scene
        this.resources = this.experience.resources
    }

    update() {
    }
}