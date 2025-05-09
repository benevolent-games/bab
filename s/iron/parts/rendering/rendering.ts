
import {sub} from "@e280/stz"
import {Degrees} from "@benev/math"

import {Scene} from "@babylonjs/core/scene.js"
import {Camera} from "@babylonjs/core/Cameras/camera.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

import {setup_effects} from "./effects/setup.js"
import {EffectRig, Effects} from "./effects/types.js"
import {standard_effects} from "./effects/standard.js"

export class Rendering {
	static make = (scene: Scene) => new this(scene)

	static effects = standard_effects
	readonly fallbackCamera: ArcRotateCamera
	readonly onEffectsChange = sub<[Partial<Effects> | null]>()

	#scene: Scene
	#camera!: Camera
	#rig: EffectRig = {
		effects: null,
		pipelines: [],
		dispose: () => {},
	}
	get #pipelines() {
		return this.#rig
			? this.#rig.pipelines
			: []
	}

	constructor(scene: Scene) {
		this.#scene = scene

		this.fallbackCamera = (() => {
			const alpha = 0
			const beta = Degrees.toRadians(60)
			const radius = 2
			const target = new Vector3(0, 1.5, 0)
			return new ArcRotateCamera(
				"fallbackCamera",
				alpha, beta, radius, target,
				scene,
			)
		})()

		this.setCamera(this.fallbackCamera)
	}

	get camera() {
		return this.#camera
	}

	setCamera(camera: Camera | null) {
		camera ??= this.fallbackCamera
		const previous = this.#camera

		this.#detachCamera(previous)
		this.#camera = camera
		this.#scene.activeCamera = camera
		this.setEffects(this.effects)

		return camera
	}

	get effects() {
		return this.#rig.effects
	}

	setEffects(effects: Partial<Effects> | null) {
		const camera = this.#camera
		this.#detachCamera(camera)

		this.#rig.dispose()
		this.#rig = effects
			? setup_effects(this.#scene, effects, camera)
			: {effects: null, pipelines: [], dispose: () => {}}

		this.#attachCamera(camera)
		this.onEffectsChange.pub(this.#rig.effects)
	}

	#detachCamera(camera: Camera) {
		const pipelines = this.#pipelines
		const manager = this.#scene.postProcessRenderPipelineManager
		for (const pipe of pipelines)
			manager.detachCamerasFromRenderPipeline(pipe.name, camera)
	}

	#attachCamera(camera: Camera) {
		const pipelines = this.#pipelines
		const manager = this.#scene.postProcessRenderPipelineManager
		for (const pipe of pipelines)
			if (!pipe.cameras.includes(camera))
				manager.attachCamerasToRenderPipeline(pipe.name, camera)
	}
}

