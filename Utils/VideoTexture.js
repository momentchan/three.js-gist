import * as THREE from 'three'

export default class VideoTexture {
	constructor(url) {
		this.video = document.createElement('video');
		this.video.width = 512;
		this.video.height = 1024;
		this.video.autoplay = true;
		this.video.loop = false;
		this.video.src = url;
		// this.video.crossOrigin = 'anonymous';
		this.video.playsInline = true
		this.video.setAttribute('playsinline', true)

		this.texture = new THREE.VideoTexture(this.video);

		// console.log(this.video)
	}

	setSpeed(speed) {
		this.video.playbackRate = speed
	}

	play() {
		this.video.play()
	}

	update() {
		if (this.video.readyState !== this.video.HAVE_ENOUGH_DATA) return;
		this.texture.needsUpdate = true;
	}

	destroy() {
		this.video.pause()
		this.video.remove()
		this.video = null
	}
}