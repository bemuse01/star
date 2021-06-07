import * as THREE from '../../../lib/three.module.js'

export default class{
    constructor({group}){
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){

    }


    // add
    add(group){
        // group.add(this.mesh)
    }


    // create
    create(){
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(10), new THREE.MeshBasicMaterial())
        this.mesh.position.z = 300
    }
}