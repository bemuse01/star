import * as THREE from '../../lib/three.module.js'
import {EffectComposer} from '../../postprocess/EffectComposer.js'
import {RenderPass} from '../../postprocess/RenderPass.js'
import {BloomPass} from '../../postprocess/BloomPass.js'
import {FilmPass} from '../../postprocess/FilmPass.js'
import {ClearPass} from '../../postprocess/ClearPass.js'
import CHILD from './child/star.child.build.js'
// import METEOR from './meteor/star.meteor.build.js'
import LIGHT from './light/star.light.build.js'
import BLOOM from './bloom/star.bloom.build.js'

export default class{
    constructor(app){
        this.init(app)
        this.create(app)
        this.add()
    }


    // init
    init(app){
        this.param = {
            fov: 60,
            near: 0.1,
            far: 10000,
            pos: 1000,
            bloom: 3.0
        }

        this.modules = {
            bloom: BLOOM,
            child: CHILD,
            // meteor: METEOR,
            light: LIGHT
        }

        this.initGroup()
        this.initRenderObject()
        this.initComposer(app)
    }
    initGroup(){
        this.group = {}
        this.comp = {}

        for(const module in this.modules){
            this.group[module] = new THREE.Group()
            this.comp[module] = null
        }

        this.build = new THREE.Group()
    }
    initRenderObject(){
        this.element = document.querySelector('.star-object')

        const {width, height} = this.element.getBoundingClientRect()

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(this.param.fov, width / height, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        
        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: METHOD.getVisibleWidth(this.camera, 0),
                h: METHOD.getVisibleHeight(this.camera, 0)
            }
        }
    }
    initComposer(app){
        const {width, height, renderer} = app

        this.composer = new EffectComposer(renderer)
        this.composer.setSize(width, height)

        const renderScene = new RenderPass(this.scene, this.camera)

        const filmPass = new FilmPass(0, 0, 0, false)

        const bloomPass = new BloomPass(this.param.bloom)

        const clearPass = new ClearPass(0x000000, 0.0)

        // this.composer.addPass(clearPass)
        this.composer.addPass(renderScene)
        // this.composer.addPass(bloomPass)
        // this.composer.addPass(filmPass)
    }


    // add
    add(){
        for(let i in this.group) this.build.add(this.group[i])
        
        this.scene.add(this.build)
    }


    // create
    create({renderer}){
        for(const module in this.modules){
            const instance = this.modules[module]
            const group = this.group[module]

            this.comp[module] = new instance({group, renderer, size: this.size.obj})
        }
    }


    // animate
    animate({app}){
        this.render(app)
        this.animateObject()
    }
    render(app){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = app.renderer.domElement.clientHeight - rect.bottom

        app.renderer.setScissor(left, bottom, width, height)
        app.renderer.setViewport(left, bottom, width, height)

        this.camera.lookAt(this.scene.position)
        app.renderer.render(this.scene, this.camera)

        // app.renderer.autoClear = false
        
        // app.renderer.clear()
        // this.camera.layers.set(PROCESS)
        // this.composer.render()

        // app.renderer.clearDepth()
        // this.camera.layers.set(NORMAL)
        // app.renderer.render(this.scene, this.camera)
    }
    animateObject(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].animate) continue
            this.comp[i].animate({angle: this.angle})
        }
    }


    // resize
    resize(){
        const rect = this.element.getBoundingClientRect()
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top

        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()

        this.size = {
            el: {
                w: width,
                h: height
            },
            obj: {
                w: METHOD.getVisibleWidth(this.camera, 0),
                h: METHOD.getVisibleHeight(this.camera, 0)
            }
        }

        this.resizeObject()
    }
    resizeObject(){
        for(let i in this.comp){
            if(!this.comp[i] || !this.comp[i].resize) continue
            this.comp[i].resize(this.size)
        }
    }
}