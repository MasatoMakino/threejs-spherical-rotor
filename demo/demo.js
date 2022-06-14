(()=>{"use strict";var t,i={885:(t,i,e)=>{var o=e(75),n=e(12);class a{static initScene(){return new o.xsS}static initLight(t){const i=new o.Mig(16777215,1);return t.add(i),i}static initCamera(t,i,e,n=1,a=400){const r=new o.cPb(45,i/e,n,a);return r.position.set(0,0,100),r.updateMatrixWorld(!1),t.add(r),r}static initControl(t,i){let e;i&&(e=i.domElement);const o=new n.z(t,e);return o.update(),o}static initRenderer(t,i,e){e=Object.assign({color:0,antialias:!0},e);const n=new o.CP7({antialias:e.antialias});return document.body.appendChild(n.domElement),n.setClearColor(new o.Ilk(e.color)),n.setSize(t,i),n.setPixelRatio(window.devicePixelRatio),n}static initHelper(t){const i=new o.y8_(30);return t.add(i),i}}var r=e(163),s=e(15),h=e(237);class l{constructor(t){this.isRotation=!1,this.startRotation=()=>{this.stopRotation(),this.isRotation||(null!=this._config.speed&&(this.rotateTimerID=setInterval(this.rotateTheta,l.ROTATE_INTERVAL)),null!=this._config.maxPhi&&null!=this._config.minPhi&&this.cameraController.loop(s.xP.PHI,this._config.minPhi,this._config.maxPhi,{duration:this._config.loopPhiDuration}),null!=this._config.maxTheta&&null!=this._config.minTheta&&this.cameraController.loop(s.xP.THETA,this._config.minTheta,this._config.maxTheta,{duration:this._config.loopThetaDuration}),null!=this._config.maxR&&null!=this._config.minR&&this.cameraController.loop(s.xP.R,this._config.minR,this._config.maxR,{duration:this._config.loopRDuration}),this.isRotation=!0)},this.rotateTheta=()=>{null!=this._config.speed&&this.cameraController.addPosition(s.xP.THETA,this._config.speed,!1,!0)},this.stopRotation=()=>{this.stop()},this.cameraController=t}set config(t){var i,e,o;null!=t||(t={}),null!==(i=t.loopPhiDuration)&&void 0!==i||(t.loopPhiDuration=c.DEFAULT_LOOP_LAT_DURATION),null!==(e=t.loopThetaDuration)&&void 0!==e||(t.loopThetaDuration=c.DEFAULT_LOOP_LAT_DURATION),null!==(o=t.loopRDuration)&&void 0!==o||(t.loopRDuration=c.DEFAULT_LOOP_R_DURATION),this._config=t}stop(t){this.isRotation&&(this.isRotation=!1,this.rotateTimerID&&(clearInterval(this.rotateTimerID),this.rotateTimerID=null),this.cameraController.tweens.stop(),t=l.getDefaultStopParam(t),this._config&&null!=this._config.defaultR&&t&&!0===t.returnR&&this.cameraController.movePosition(s.xP.R,this._config.defaultR,{duration:333}))}static getDefaultStopParam(t){return null==t&&(t={}),null==t.returnR&&(t.returnR=!0),t}}l.ROTATE_INTERVAL=38;class c extends l{constructor(t,i){super(i),this.isStart=!1,this.sleepWatcher=t}pause(t){this.isStart&&(this.isStart=!1,t=l.getDefaultStopParam(t),this.stopWatcher(),this.stop(t))}stopWatcher(){this.sleepWatcher.removeEventListener(h.On.SLEEP,this.startRotation),this.sleepWatcher.removeEventListener(h.On.WAKEUP,this.stopRotation),this.sleepWatcher.stop()}resume(){this.isStart||(this.isStart=!0,this.startWatcher())}start(t){this.config=t,this.isStart=!0,this.startWatcher()}startWatcher(){this.stopWatcher(),this.sleepWatcher.addEventListener(h.On.SLEEP,this.startRotation),this.sleepWatcher.addEventListener(h.On.WAKEUP,this.stopRotation),this.sleepWatcher.start()}}let u;c.DEFAULT_LOOP_LAT_DURATION=3e4,c.DEFAULT_LOOP_R_DURATION=3e4;class p{constructor(){u=a.initScene(),u.fog=new o.ybr(0,80,160),a.initLight(u);const t=a.initCamera(u,640,480),i=a.initRenderer(640,480,{antialias:!1});a.initHelper(u);const e=s.r$.generateCameraTarget();u.add(e);const n=new s.R_(t,e);n.initCameraPosition(new o.$V(100,Math.PI/2,0));const l=new h.q8(i.domElement),p=new h.EH(l,{timeOut_ms:1e3});new c(p,n).start({minTheta:-Math.PI/4,maxTheta:Math.PI/4,minPhi:0,maxPhi:Math.PI/2,minR:100/3,maxR:100,defaultR:100}),r.Fz.on(r.M9.tick,(()=>{i.render(u,t)}))}}window.onload=()=>{new p}}},e={};function o(t){var n=e[t];if(void 0!==n)return n.exports;var a=e[t]={exports:{}};return i[t](a,a.exports,o),a.exports}o.m=i,t=[],o.O=(i,e,n,a)=>{if(!e){var r=1/0;for(c=0;c<t.length;c++){for(var[e,n,a]=t[c],s=!0,h=0;h<e.length;h++)(!1&a||r>=a)&&Object.keys(o.O).every((t=>o.O[t](e[h])))?e.splice(h--,1):(s=!1,a<r&&(r=a));if(s){t.splice(c--,1);var l=n();void 0!==l&&(i=l)}}return i}a=a||0;for(var c=t.length;c>0&&t[c-1][2]>a;c--)t[c]=t[c-1];t[c]=[e,n,a]},o.n=t=>{var i=t&&t.__esModule?()=>t.default:()=>t;return o.d(i,{a:i}),i},o.d=(t,i)=>{for(var e in i)o.o(i,e)&&!o.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:i[e]})},o.o=(t,i)=>Object.prototype.hasOwnProperty.call(t,i),(()=>{var t={577:0};o.O.j=i=>0===t[i];var i=(i,e)=>{var n,a,[r,s,h]=e,l=0;if(r.some((i=>0!==t[i]))){for(n in s)o.o(s,n)&&(o.m[n]=s[n]);if(h)var c=h(o)}for(i&&i(e);l<r.length;l++)a=r[l],o.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return o.O(c)},e=self.webpackChunk_masatomakino_threejs_spherical_rotor=self.webpackChunk_masatomakino_threejs_spherical_rotor||[];e.forEach(i.bind(null,0)),e.push=i.bind(null,e.push.bind(e))})();var n=o.O(void 0,[736],(()=>o(885)));n=o.O(n)})();