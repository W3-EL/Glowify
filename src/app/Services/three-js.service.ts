import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { BoxGeometry,Mesh,MeshNormalMaterial,Object3DEventMap,PerspectiveCamera,WebGLRenderer,Scene } from 'three';
@Injectable({
  providedIn: 'root'
})
export class ThreeJSService {
  width =0;
  height=0;
  camera:PerspectiveCamera = new THREE.PerspectiveCamera();
  meshes:Mesh<BoxGeometry,MeshNormalMaterial,Object3DEventMap>[]=[];
  renderer:WebGLRenderer=new THREE.WebGLRenderer({antialias:true});
  scene:Scene = new THREE.Scene();


  constructor() { }
  
  setDims(vizDiv:HTMLDivElement):void {
        this.width = vizDiv.clientWidth;
        this.height = vizDiv.clientHeight;

  }
  setupCamera():void {
    this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
    this.camera.position.z = 1;

  }


  addMesh():void {
    // const cup$ = this.gltfLoaderService.load('assets/parfum.glb');
    const geometry:BoxGeometry = new THREE.BoxGeometry( 0.3, 0.3, 0.3 );
    const material:MeshNormalMaterial = new THREE.MeshNormalMaterial();

    const mesh : Mesh<BoxGeometry, MeshNormalMaterial,Object3DEventMap> = new THREE.Mesh(geometry,material);
    this.meshes.push(mesh);
    this.scene.add(this.meshes[0]);

  }

  setupRender():void {
    this.renderer.setSize( this.width, this.height );
    this.renderer.setAnimationLoop(this.animationCallback());

  }

  animationCallback():XRFrameRequestCallback {
    const animation :XRFrameRequestCallback=( time:number )=> {
      this.meshes.forEach(
        (mesh)=>{
          mesh.rotation.x = time / 20000;
          mesh.rotation.y = time / 3000;
        }
      );
      this.renderer.render(this.scene,this.camera);
    }
    return animation;

  }  
  
  attachDom(vizDiv:HTMLDivElement):void {
    vizDiv.appendChild( this.renderer.domElement );
  }
  }



