import * as THREE from '../../../lib/three.module.js'
import PARAM from './star.child.param.js'

export default class{
    constructor({group}){
        this.init()
        this.create(group)
    }


    // init
    init(){
    }


    // add
    add(group){
        group.add(this.mesh)
        group.rotation.z = 30 * RADIAN
    }


    // create
    create(group){
        this.createMesh(group)
    }
    createMesh(group){
        const loader = new THREE.TextureLoader()

        loader.load(PARAM.src, texture => {
            const geometry = this.createGeometry()
            const material = this.createMaterial(texture)
            this.mesh = new THREE.Mesh(geometry, material)

            this.add(group)
        })
    }
    createGeometry(){
        const geometry = new THREE.SphereGeometry(PARAM.radius, PARAM.seg, PARAM.seg)
        return geometry
    }
    createMaterial(texture){
        return new THREE.MeshPhongMaterial({
            color: PARAM.color,
            transparent: true,
            map: texture
        })
    }


    // animate
    animate(){
        if(!this.mesh) return

        this.mesh.rotation.y += 0.004
    }
}