import * as THREE from 'https://cdn.skypack.dev/three@0.132.2/build/three.module.js'
import ThreeMeshUI from 'https://cdn.skypack.dev/three-mesh-ui'

const fontFamily = 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.json'
const fontTexture = 'https://unpkg.com/three-mesh-ui/examples/assets/Roboto-msdf.png'

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000)
camera.position.z = 100

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const meshes = []
const listString = (() => Array.from(Array(10))
	.map((_, n) => String.fromCodePoint(n + 97)))()

const randomFloor = (n) => Math.floor(Math.random() * n)

const randomString = () => listString[randomFloor(listString.length)]

setInterval(() => meshes.push(makeTextPanel(randomString(), randomFloor(10))), 1000)

function makeTextPanel(content = '', fontSize = 0.1) {
	const backgroundColor = new THREE.Color('black')
	const fontColor = new THREE.Color('blue')

	const container = new ThreeMeshUI.Block({
		height: fontSize,
		width: fontSize,
		backgroundColor,
		fontTexture,
		fontFamily,
		fontColor,
	})

	container.position.set(
		randomFloor(200) - (200 / 2),
		100,
		0
	)
	scene.add(container)

	container.add(new ThreeMeshUI.Text({ content, fontSize, fontColor }))

	return container
}

function render() {
	meshes.forEach((mesh) => mesh.position.y -= 0.1)
	ThreeMeshUI.update()
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

requestAnimationFrame(render)
