import * as THREE from '../../../lib/three.module.js'
import PARAM from './planet.blue.param.js'
import {PLANET} from '../planet.class.js'

export default class extends PLANET{
    constructor({group}){
        super(PARAM)
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){
    }


    // add
    add(group){
        group.add(this.mesh)
        group.rotation.x = 15 * RADIAN
    }


    // create
    create(){
        this.createMesh()
    }

    
    // animate
    animate({camera}){
        super.animate(camera)
    }
}