import * as THREE from '../../../lib/three.module.js'
import STAR_METHOD from  './meteor.method.js'

export default class{
    constructor({group, renderer}){
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){
        this.param = {
            count: 36,
            distance: 500,
            gap: 250,
            size: 2.0,
            color: 0xffffff,
            rotation: 102,
            depth: 50
        }
    }


    // add
    add(group){
        group.add(this.mesh)
    }
    

    // create
    create(){
        this.createMesh()
    }
    createMesh(){
        const geometry = this.createGeometry()
        const material = this.createMaterial()
        this.mesh = new THREE.Points(geometry, material)
        this.mesh.position.y = 75
        this.mesh.rotation.x = this.param.rotation * RADIAN
    }
    createGeometry(){
        const geometry = new THREE.BufferGeometry()

        const {position, velocity, radius, degree} = STAR_METHOD.createAttribute(this.param)

        geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
        
        this.velocity = velocity
        this.radius = radius
        this.degree = degree

        return geometry
    }
    createMaterial(){
        return new THREE.PointsMaterial({
            color: this.param.color,
            transparent: true,
            size: this.param.size,
            // depthTest: false
        })
    }


    // animate
    animate(){
        const geometry = this.mesh.geometry
        const position = geometry.attributes.position
        const {array, count} = position

        for(let i = 0; i < count; i++){
            const index = i * 3

            const velocity = this.velocity[i]
            const radius = this.radius[i]
            const degree = this.degree[i] = (this.degree[i] + velocity) % 360

            const x = Math.cos(degree * RADIAN) * radius
            const y = Math.sin(degree * RADIAN) * radius

            array[index] = x
            array[index + 1] = y
        }

        position.needsUpdate = true
        // this.mesh.rotation.z += 0.002
    }
}