import * as THREE from '../../lib/three.module.js'
import SHADER from './planet.shader.js'

const PLANET = class{
    constructor(param){
        this.param = param
    }


    // create
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Mesh(geometry, material)
        this.degree = Math.random() * 360
    }
    createGeometry(){
        return new THREE.CircleGeometry(this.param.radius, this.param.seg)
    }
    createMaterial(){
        return new THREE.ShaderMaterial({
            vertexShader: SHADER.vertex,
            fragmentShader: SHADER.fragment,
            transparent: true,
            uniforms: {
                uColor: {value: new THREE.Color(this.param.color)},
                uSize: {value: this.param.size},
                uStrength: {value: this.param.strength},
                uBrightness: {value: this.param.brightness}
            }
        }) 
    }


    // animate
    animate(camera){
        this.degree = (this.degree + this.param.velocity * this.param.direction) % 360 

        const x = Math.cos(this.degree * RADIAN) * this.param.dist  
        const z = Math.sin(this.degree * RADIAN) * this.param.dist

        this.mesh.position.set(x, 0, z)
        this.mesh.lookAt(camera.position)
    }
}

export {PLANET}