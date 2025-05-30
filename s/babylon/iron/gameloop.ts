
import {sub} from "@e280/stz"
import {Scene} from "@babylonjs/core/scene.js"

import {AnyEngine} from "./types.js"
import {DeltaTimer} from "./delta-timer.js"

export class Gameloop {
	static make = (engine: AnyEngine, scenes: Scene[]) => (
		new this(engine, scenes)
	)

	readonly on = sub<[number]>()
	delta = new DeltaTimer({min_hertz: 10, max_hertz: 300})

	#starters: (() => () => void)[] = []
	#stoppers: (() => void)[] = []

	get running() {
		return this.#stoppers.length > 0
	}

	constructor(public engine: AnyEngine, public scenes: Scene[]) {
		this.register(() => {
			const fn = () => {
				const ms = this.delta.measure()
				this.on.pub(ms)
				for (const scene of this.scenes)
					scene.render()
			}
			engine.runRenderLoop(fn)
			return () => engine.stopRenderLoop(fn)
		})
	}

	register(fn: () => () => void) {
		this.#starters.push(fn)
	}

	toggle() {
		if (this.running) this.stop()
		else this.start()
		return this.running
	}

	start() {
		if (!this.running) {
			this.delta.measure()
			for (const start of this.#starters)
				this.#stoppers.push(start())
		}
	}

	stop() {
		this.#stoppers.forEach(stop => stop())
		this.#stoppers = []
	}
}

