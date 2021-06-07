import * as THREE from '../../../lib/three.module.js'
import CHILD_PARAM from '../child/star.child.param.js'

export default class{
    constructor({group}){
        this.init()
        this.create()
        this.add(group)
    }


    // init
    init(){
        this.param = {
            count: 20,
            color: 0x1f9eff,
            intensity: 2.75,
            dist: CHILD_PARAM.radius + 240,
            radius: CHILD_PARAM.radius + 270,
            step: 21
        }
    }


    // add
    add(group){
        group.add(this.local)
    }


    // create
    create(){
        this.local = new THREE.Group()

        const degree = 360 / this.param.count
        const dist = this.createDistance()

        for(let i = 0; i < this.param.count; i++){
            const light = new THREE.PointLight(this.param.color, this.param.intensity, dist[i])

            const deg = degree * i * RADIAN
            const x = Math.cos(deg) * this.param.radius
            const y = Math.sin(deg) * this.param.radius

            light.position.set(x, y, 0)

            this.local.add(light)
        }
        
        this.local.rotation.z = 120 * RADIAN 
    }
    createDistance(){
        const dist = []

        for(let i = 0; i < this.param.count / 2; i++){
            const distance = this.param.dist - i * this.param.step
            dist[i] = distance < 0 ? 0 : distance
        }

        const reverse = [...dist].reverse()

        return [...dist, ...reverse]
    }
}