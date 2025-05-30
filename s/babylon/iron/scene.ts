
import {Vec4} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {setOpenGLOrientationForUV} from "@babylonjs/core/Compat/compatibilityOptions.js"

import {AnyEngine} from "./types.js"

export type SimpleSceneOptions = {
	engine: AnyEngine
	background: Vec4
	virtual?: boolean
}

export function make_scene({
		engine,
		background,
		virtual = false,
	}: SimpleSceneOptions) {

	const scene = new Scene(engine, {
		virtual,
		useClonedMeshMap: true,
		useMaterialMeshMap: true,
		useGeometryUniqueIdsMap: true,
	})

	setOpenGLOrientationForUV(true)
	scene.clearColor = new Color4(...background.array())
	scene.detachControl()
	scene.useRightHandedSystem = true

	return scene
}

