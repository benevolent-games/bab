
import {Vec3Array} from "@benev/math"
import {PostProcessRenderPipeline} from "@babylonjs/core/PostProcesses/RenderPipeline/postProcessRenderPipeline.js"

export type EffectRig = {
	effects: Partial<Effects> | null
	pipelines: PostProcessRenderPipeline[]
	dispose: () => void
}

export type ImageProcessingEffects = {
	image: {
		exposure: number
		contrast: number
	}

	tonemapping: {
		operator: "Hable" | "HejiDawson" | "Reinhard" | "Photographic"
	}

	vignette: {
		color: Vec3Array
		stretch: number
		weight: number
		multiply: boolean
	}
}

export type DefaultPipelineEffects = {
	antialiasing: {
		samples: number
		fxaa: boolean
	}

	bloom: {
		weight: number
		scale: number
		kernel: number
		threshold: number
	}

	chromaticAberration: {
		aberrationAmount: number
		radialIntensity: number
	}

	glow: {
		blurKernelSize: number
		intensity: number
	}

	sharpen: {
		edgeAmount: number
		colorAmount: number
	}
} & ImageProcessingEffects

export type Effects = {
	scene: {
		clearColor: Vec3Array
		ambientColor: Vec3Array
		environmentIntensity: number
		shadowsEnabled: boolean
		forceWireframe: boolean
		forceShowBoundingBoxes: boolean
		useOrderIndependentTransparency: boolean
	}

	prePassRenderer: {
		disableGammaTransform: boolean
	}

	depthRenderer: {}

	fog: {
		mode: "none" | "exp" | "exp2" | "linear"
		color: Vec3Array
		start: number
		end: number
		density: number
	}

	ssao: {
		ssaoRatio: number
		blurRatio: number
		base: number
		bilateralSamples: number
		bilateralSoften: number
		bilateralTolerance: number
		maxZ: number
		minZAspect: number
		radius: number
		totalStrength: number
		bypassBlur: boolean
		epsilon: number
		expensiveBlur: boolean
		samples: number
	}

	ssr: {
		debug: boolean
		maxDistance: number
		maxSteps: number
		reflectionSpecularFalloffExponent: number
		roughnessFactor: number
		selfCollisionNumSkip: number
		step: number
		strength: number
		thickness: number
		attenuateBackfaceReflection: boolean
		attenuateFacingCamera: boolean
		attenuateIntersectionDistance: boolean
		attenuateIntersectionIterations: boolean
		attenuateScreenBorders: boolean
		backfaceDepthTextureDownsample: number
		backfaceForceDepthWriteTransparentMeshes: boolean
		blurDispersionStrength: number
		blurDownsample: number
		clipToFrustum: boolean
		enableAutomaticThicknessComputation: boolean
		enableSmoothReflections: boolean
		reflectivityThreshold: number
		samples: number
		ssrDownsample: number
		useFresnel: boolean
	}

	lens: {
		ratio: number
		chromatic_aberration: number
		edge_blur: number
		distortion: number
		grain_amount: number
		dof_focus_distance: number
		dof_aperture: number
		dof_darken: number
		dof_pentagon: boolean
		dof_gain: number
		dof_threshold: number
		blur_noise: boolean
	}
} & DefaultPipelineEffects

