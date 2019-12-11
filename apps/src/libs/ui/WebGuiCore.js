"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class UIUtils{constructor(){}static opts(opt,def){return void 0!==opt&&null!==opt?opt:def}static getCssColor(color){if("string"==typeof color)return color[0],color;if("number"==typeof color)return"rgb("+(color>>16)%256+","+(color>>8)%256+","+(color>>0)%256+")";throw'The provided color "'+color+'" is not supported.'}static applyStyle(div,style){for(var key in div=UIUtils.getWrapper(div),style){var val=style[key];this.setStyle(div,key,val)}}static setStyle(div,key,val){switch(key){case"display":div.style.display=val;break;case"border":div.style.border=val;break;case"border-width":div.style.borderWidth=val;break;case"border-color":div.style.borderColor=val;break;case"border-radius":div.style.borderRadius=val;break;case"color":div.style.color=val;break;case"background-color":div.style.backgroundColor=val;break;case"padding":div.style.padding=val;break;case"padding-top":div.style.paddingTop=val;break;case"padding-right":div.style.paddingRight=val;break;case"padding-bottom":div.style.paddingBottom=val;break;case"padding-left":div.style.paddingLeft=val;break;case"margin":div.style.margin=val;break;case"margin-top":div.style.marginTop=val;break;case"margin-right":div.style.marginRight=val;break;case"margin-bottom":div.style.marginBottom=val;break;case"margin-left":div.style.marginLeft=val;break;case"width":div.style.width=val;break;case"height":div.style.height=val;break;case"min-width":div.style.minWidth=val;break;case"min-height":div.style.minHeight=val;break;case"text-align":div.style.textAlign=val;break;case"font-size":div.style.fontSize=val;break;case"font-family":div.style.fontFamily=val;break;case"font-style":div.style.fontStyle=val;break;case"font-weight":div.style.fontWeight=val;break;default:throw'The key "'+key+'" is not defined yet. Please check in UIUtils.setStyle()'}}static generateId(prefix){return(prefix?prefix+"_":"")+Math.floor(1e7*performance.now())}static createWrapper(className,id){var div=document.createElement("div");return div.className=className,div.id=void 0!=id?id:UIUtils.generateId("div"),div}static setPosition(div,x,y){return div.style.left=x+"px",div.style.top=y+"px",this}static getWrapper(div){return div.nodeName?div:div.wrapper}static getLeft(div){return UIUtils.getWrapper(div).getBoundingClientRect().left}static getTop(div){return UIUtils.getWrapper(div).getBoundingClientRect().top}static getWidth(div){return UIUtils.getWrapper(div).getBoundingClientRect().width}static getHeight(div){return UIUtils.getWrapper(div).getBoundingClientRect().height}static setLeft(div,left){div.style.left="number"==typeof left?left+"px":left}static setTop(div,top){div.style.top="number"==typeof top?top+"px":top}static setWidth(div,width){div.style.width="number"==typeof width?width+"px":width}static setHeight(div,height){div.style.height="number"==typeof height?height+"px":height}static moveLeft(div,px){this.setLeft(div,this.getLeft(div)-px)}static moveTop(div,px){this.setTop(div,this.getTop(div)-px)}static setPositionDeltas(div,dx,dy){var x=this.getLeft(div)+dx,y=this.getTop(div)+dy;x=x<0?0:x,y=y<0?0:y;var w=this.getWidth(div),h=this.getHeight(div);return x=x>window.innerWidth-w?window.innerWidth-w:x,y=y>window.innerHeight-h?window.innerHeight-h:y,this.setPosition(div,x,y),this}static dispose(div){if(div=this.getWrapper(div)){for(;div.firstChild;)div.firstChild.innerHTML="",div.removeChild(div.firstChild);div.parentNode&&(div.innerHTML="",div.parentNode.removeChild(div)),div=null}}static clearClassList(div){for(var classList=(div=this.getWrapper(div)).classList;classList.length>0;)classList.remove(classList.item(0));return this}static addClassList(div,className){return(div=this.getWrapper(div)).classList.add(className),this}static removeClassList(div,className){return(div=this.getWrapper(div)).classList.remove(className),this}}class UIContainer{constructor(name,options,callback){if(!name||"string"!=typeof name)throw'UIContainer: "name" parameter is required and must be a string';(options=UIUtils.opts(options,{})).type=UIUtils.opts(options.type,""),options.position=UIUtils.opts(options.position,{}),options.wrapper=UIUtils.opts(options.wrapper,{}),options.header=UIUtils.opts(options.header,{}),options.body=UIUtils.opts(options.body,{}),options.footer=UIUtils.opts(options.footer,{}),this.callback=callback,this.wrapper=UIUtils.createWrapper("ui_container"),this.header=UIUtils.createWrapper("ui_container_header"),this.body=UIUtils.createWrapper("ui_container_body"),this.footer=UIUtils.createWrapper("ui_container_footer"),options.type=""!==options.type?"__"+options.type:"",UIUtils.addClassList(this.wrapper,"ui_container"+options.type),UIUtils.addClassList(this.header,"ui_header"+options.type),UIUtils.addClassList(this.body,"ui_body"+options.type),UIUtils.addClassList(this.footer,"ui_footer"+options.type),UIUtils.applyStyle(this.wrapper,options.wrapper),UIUtils.applyStyle(this.header,options.header),UIUtils.applyStyle(this.body,options.body),UIUtils.applyStyle(this.footer,options.footer),this.header.innerHTML=UIUtils.opts(name,""),this.footer.innerHTML=UIUtils.opts(options.footer,""),this.useXYFooter=UIUtils.opts(options.footer.showxy,!0),this.wrapper.appendChild(this.header),this.wrapper.appendChild(this.body),this.wrapper.appendChild(this.footer),document.body.appendChild(this.wrapper);let px=UIUtils.opts(options.position.x,100*Math.random()),py=UIUtils.opts(options.position.y,100*Math.random());this.setPosition(px,py),this.updateFooter(),this.mouse={down:!1,x:0,y:0,refs:{refMouseDown:this.onMouseDown.bind(this),refMouseUp:this.onMouseUp.bind(this),refMouseMove:this.onMouseMove.bind(this)},cbks:{cbkMouseDown:null,cbkMouseUp:null,cbkMouseMove:null}},this.header.addEventListener("mousedown",this.mouse.refs.refMouseDown)}onMouseDown(event){event.preventDefault(),event.stopPropagation(),this.mouse.down=!0,this.mouse.x=event.clientX,this.mouse.y=event.clientY,document.addEventListener("mousemove",this.mouse.refs.refMouseMove),document.addEventListener("mouseup",this.mouse.refs.refMouseUp)}onMouseUp(event){event.preventDefault(),event.stopPropagation(),this.mouse.down=!1,document.removeEventListener("mousemove",this.mouse.refs.refMouseMove),document.removeEventListener("mouseup",this.mouse.refs.refMouseUp)}onMouseMove(event){if(event.preventDefault(),event.stopPropagation(),!this.mouse.down)return;let dx=event.clientX-this.mouse.x,dy=event.clientY-this.mouse.y;this.mouse.x=event.clientX,this.mouse.y=event.clientY,this.setPositionDeltas(dx,dy),this.updateFooter()}updateFooter(){return this.useXYFooter?(this.footer.innerHTML="x: "+UIUtils.getLeft(this.wrapper).toFixed(2)+", y: "+UIUtils.getTop(this.wrapper).toFixed(2),this):this}setPositionDeltas(dx,dy){return UIUtils.setPositionDeltas(this.wrapper,dx,dy),this}setPosition(x,y){return UIUtils.setPosition(this.wrapper,x,y),this}setSize(w,h){return UIUtils.setWidth(this.wrapper,w),UIUtils.setHeight(this.wrapper,h),this}setFooter(text){return this.footer.innerHTML=text,this.useXYFooter=!1,this}setHeader(text){return this.header.innerHTML=text,this}setTitle(text){return this.header.innerHTML=text,this}appendChild(child){return this.body.appendChild(UIUtils.getWrapper(child)),this}addItem(item){return this.body.appendChild(UIUtils.getWrapper(item)),this}hide(){return UIUtils.addClassList(this.wrapper,"ui_container__hide"),this}show(){return UIUtils.removeClassList(this.wrapper,"ui_container__hide"),this}hideFooter(){return UIUtils.addClassList(this.footer,"ui_container__hide"),this}showFooter(){return UIUtils.removeClassList(this.footer,"ui_container__hide"),this}moveToBottom(){let ch=UIUtils.getHeight(this.wrapper),yp=window.innerHeight-ch;return UIUtils.setTop(this.wrapper,yp-1),this}moveToRight(){let cw=UIUtils.getWidth(this.wrapper),xp=window.innerWidth-cw;return UIUtils.setLeft(this.wrapper,xp-1),this}moveToTop(){return UIUtils.setTop(this.wrapper,1),this}moveToLeft(){return UIUtils.setLeft(this.wrapper,1),this}dispose(){this.header.removeEventListener("mousedown",this.mouse.refs.refMouseDown),UIUtils.dispose(this.header),UIUtils.dispose(this.footer),UIUtils.dispose(this.body),UIUtils.dispose(this.wrapper)}close(){this.dispose()}}class UIMouse{constructor(target){this.terget=target||window,this.mouse={down:!1,x:0,y:0,refs:{refMouseDown:this.onMouseDown.bind(this),refMouseUp:this.onMouseUp.bind(this),refMouseMove:this.onMouseMove.bind(this),refMouseEnter:this.onMouseEnter.bind(this),refMouseLeave:this.onMouseLeave.bind(this)},cbks:{cbkMouseDown:null,cbkMouseUp:null,cbkMouseMove:null,cbkMouseEnter:null,cbkMouseLeave:null,cbkMouseDrag:null}},this.terget.addEventListener("mousedown",this.mouse.refs.refMouseDown),this.terget.addEventListener("mouseenter",this.mouse.refs.refMouseEnter),this.terget.addEventListener("mouseleave",this.mouse.refs.refMouseLeave)}setMouseDownCallback(callback){this.mouse.cbks.cbkMouseDown=callback}setMouseUpCallback(callback){this.mouse.cbks.cbkMouseUp=callback}setMouseMoveCallback(callback){this.mouse.cbks.cbkMouseMove=callback}setMouseDragCallback(callback){this.mouse.cbks.cbkMouseDrag=callback}setMouseEnterCallback(callback){this.mouse.cbks.cbkMouseEnter=callback}setMouseLeaveCallback(callback){this.mouse.cbks.cbkMouseLeave=callback}onMouseDown(event){event.preventDefault(),event.stopPropagation(),this.mouse.down=!0,this.mouse.x=event.clientX,this.mouse.y=event.clientY,document.addEventListener("mousemove",this.mouse.refs.refMouseMove),document.addEventListener("mouseup",this.mouse.refs.refMouseUp),this.mouse.cbks.cbkMouseDown&&this.mouse.cbks.cbkMouseDown(event)}onMouseUp(event){event.preventDefault(),event.stopPropagation(),this.mouse.down=!1,document.removeEventListener("mousemove",this.mouse.refs.refMouseMove),document.removeEventListener("mouseup",this.mouse.refs.refMouseUp),this.mouse.cbks.cbkMouseUp&&this.mouse.cbks.cbkMouseUp(event)}onMouseMove(event){event.preventDefault(),event.stopPropagation(),this.mouse.x=event.clientX,this.mouse.y=event.clientY,this.mouse.cbks.cbkMouseMove&&this.mouse.cbks.cbkMouseMove(event),this.mouse.down&&this.mouse.cbks.cbkMouseDrag&&this.mouse.cbks.cbkMouseDrag(event)}onMouseEnter(event){event.preventDefault(),event.stopPropagation(),this.mouse.cbks.cbkMouseEnter&&this.mouse.cbks.cbkMouseEnter(event)}onMouseLeave(event){event.preventDefault(),event.stopPropagation(),this.mouse.cbks.cbkMouseLeave&&this.mouse.cbks.cbkMouseLeave(event)}dispose(){this.target.removeEventListener("mousedown",this.mouse.refs.refMouseDown),this.terget.removeEventListener("mouseenter",this.mouse.refs.refMouseEnter),this.terget.removeEventListener("mouseleave",this.mouse.refs.refMouseLeave)}}class UINum{constructor(name,options,callback){(options=UIUtils.opts(options,{})).wrapper=UIUtils.opts(options.wrapper,{}),options.label=UIUtils.opts(options.label,{}),options.value=UIUtils.opts(options.value,{}),this.callback=callback,this.min=UIUtils.opts(options.min,-1),this.max=UIUtils.opts(options.max,1),this.val=UIUtils.opts(options.val,0),this.res=UIUtils.opts(options.res,3),this.readonly=UIUtils.opts(options.readonly,!1),this.previousValue=this.val,this.recomputeParams(),this.wrapper=UIUtils.createWrapper("ui_num_wrapper"),this.label=UIUtils.createWrapper("ui_num_label"),this.value=UIUtils.createWrapper("ui_num_value"),UIUtils.addClassList(this.wrapper,"ui_num_wrapper"+(options.type?"__"+options.type:"")),UIUtils.addClassList(this.label,"ui_num_label"+(options.type?"__"+options.type:"")),UIUtils.addClassList(this.value,"ui_num_value"+(options.type?"__"+options.type:"")),!0===options.inline&&UIUtils.addClassList(this.wrapper,"ui_num_wrapper__row"),null===name||void 0===name||""===name?UIUtils.addClassList(this.label,"ui_num_wrapper__hide"):this.label.innerHTML=name+":",UIUtils.applyStyle(this.wrapper,UIUtils.opts(options.wrapper,{})),UIUtils.applyStyle(this.label,UIUtils.opts(options.label,{})),UIUtils.applyStyle(this.value,UIUtils.opts(options.value,{})),this.wrapper.appendChild(this.label),this.wrapper.appendChild(this.value),!0!==this.readonly?(this.mouse={x:0,y:0},this.uiMouse=new UIMouse(this.value),this.uiMouse.setMouseDownCallback(this.onMouseDown.bind(this)),this.uiMouse.setMouseDragCallback(this.onMouseDrag.bind(this)),UIUtils.addClassList(this.value,"ui_num_value__canchange")):UIUtils.addClassList(this.value,"ui_num_value__readonly"),this.value.innerHTML=(this.val>=0?"+":"")+this.val.toFixed(this.res)}recomputeParams(){return this.stx=(this.max-this.min)/500,this.sty=(this.max-this.min)/5e3,this}setWidth(width){return this.wrapper.style.width=width+"px",this.wrapper.style.display="inline-block",this}onMouseDown(event){this.mouse.x=event.clientX,this.mouse.y=event.clientY}onMouseDrag(event){var dx=event.clientX-this.mouse.x,dy=event.clientY-this.mouse.y;this.mouse.x=event.clientX,this.mouse.y=event.clientY;var val=this.val+dx*this.stx-dy*this.sty;this.update(val,!0)}update(val,needsCallback){if(Math.floor(1e3*val)!==Math.floor(1e3*this.previousValue))return needsCallback=void 0!==needsCallback&&needsCallback,val=(val=val>this.max?this.max:val)<this.min?this.min:val,this.val=val,this.value.innerHTML=(val>=0?"+":"")+val.toFixed(this.res),this.val=this.val+0,this.callback&&this.val!==this.previousValue&&needsCallback&&this.callback(this.val),this.previousValue=this.val,this}setValue(val){return this.update(val),this}getValue(){return this.val}setMin(min){return this.min=min,this.recomputeParams(),this.update(this.val),this}setMax(max){return this.max=max,this.recomputeParams(),this.update(this.val),this}setRange(min,max){return this.min=min,this.max=max,this.recomputeParams(),this.update(this.val),this}setCallback(callback){return this.callback=callback,this}appendTo(parent){return parent instanceof UIContainer&&parent.appendChild(this.wrapper),this}addTo(parent){return this.appendTo(parent),this}dispose(){this.uiMouse.dispose(),UIUtils.dispose(this.label),UIUtils.dispose(this.value),UIUtils.dispose(this.wrapper)}}class UIPlot{constructor(name,options){name=UIUtils.opts(name,"Plotter"),(options=UIUtils.opts(options,{})).container=UIUtils.opts(options.container,{}),options.wrapper=UIUtils.opts(options.wrapper,{}),options.container.position=UIUtils.opts(options.container.position,{}),options.legend=UIUtils.opts(options.legend,{}),options.plot=UIUtils.opts(options.plot,{}),options.plot.wrapper=UIUtils.opts(options.plot.wrapper,{}),options.plot=UIUtils.opts(options.plot,{}),options.plot.x=UIUtils.opts(options.plot.x,{}),options.plot.y=UIUtils.opts(options.plot.y,{}),options.plot.z=UIUtils.opts(options.plot.z,{}),options.plot.w=UIUtils.opts(options.plot.w,{}),this.uic=new UIContainer(name,options.container),this.wrapper=UIUtils.createWrapper("ui_plot_wrapper"),UIUtils.applyStyle(this.wrapper,options.wrapper),this.plotWrapper=UIUtils.createWrapper("ui_plot_plot_wrapper"),UIUtils.applyStyle(this.plotWrapper,options.plot.wrapper),this.legendWrapper=UIUtils.createWrapper("ui_plot_legend_wrapper"),UIUtils.applyStyle(this.legendWrapper,options.legend.wrapper),this.canvas=document.createElement("canvas"),this.canvas.width=UIUtils.opts(options.width,160),this.canvas.height=UIUtils.opts(options.height,50),this.plotWrapper.appendChild(this.canvas),UIUtils.applyStyle(this.canvas,UIUtils.opts(options.canvas,{})),this.createLegends(options),this.wrapper.appendChild(this.plotWrapper),this.wrapper.appendChild(this.legendWrapper),this.uic.body.appendChild(this.wrapper),this.width=this.canvas.width,this.height=this.canvas.height,this.context=this.canvas.getContext("2d"),this.dataset=[{data:[],npts:UIUtils.opts(options.plot.x.npts,this.width),val:0,min:UIUtils.opts(options.plot.x.min,-10),max:UIUtils.opts(options.plot.x.max,10),offset:UIUtils.opts(options.plot.x.offset,0),color:UIUtils.opts(options.plot.x.color,"rgba(255, 25, 25, 0.6)"),lineWidth:UIUtils.opts(options.plot.x.lineWidth,1.5),legend:this.legendX,scale:UIUtils.opts(options.plot.x.scale,1),enabled:UIUtils.opts(options.plot.x.enabled,!0),buffer:[]},{data:[],npts:UIUtils.opts(options.plot.y.npts,this.width),val:0,min:UIUtils.opts(options.plot.y.min,-10),max:UIUtils.opts(options.plot.y.max,10),offset:UIUtils.opts(options.plot.y.offset,0),color:UIUtils.opts(options.plot.y.color,"rgba(25, 255, 25, 0.6)"),lineWidth:UIUtils.opts(options.plot.y.lineWidth,1.5),legend:this.legendY,scale:UIUtils.opts(options.plot.y.scale,1),enabled:UIUtils.opts(options.plot.y.enabled,!0),buffer:[]},{data:[],npts:UIUtils.opts(options.plot.z.npts,this.width),val:0,min:UIUtils.opts(options.plot.z.min,-10),max:UIUtils.opts(options.plot.z.max,10),offset:UIUtils.opts(options.plot.z.offset,0),color:UIUtils.opts(options.plot.z.color,"rgba(25, 125, 255, 0.6)"),lineWidth:UIUtils.opts(options.plot.z.lineWidth,1.5),legend:this.legendZ,scale:UIUtils.opts(options.plot.z.scale,1),enabled:UIUtils.opts(options.plot.z.enabled,!0),buffer:[]},{data:[],npts:UIUtils.opts(options.plot.w.npts,this.width),val:0,min:UIUtils.opts(options.plot.w.min,-10),max:UIUtils.opts(options.plot.w.max,10),offset:UIUtils.opts(options.plot.w.offset,0),color:UIUtils.opts(options.plot.w.color,"rgba(255, 25, 255, 0.6)"),lineWidth:UIUtils.opts(options.plot.w.lineWidth,1.5),legend:this.legendW,scale:UIUtils.opts(options.plot.w.scale,1),enabled:UIUtils.opts(options.plot.w.enabled,!0),buffer:[]}],options.plot.x.enabled||(this.legendWrapperX.style.display="none"),options.plot.y.enabled||(this.legendWrapperY.style.display="none"),options.plot.z.enabled||(this.legendWrapperZ.style.display="none"),options.plot.w.enabled||(this.legendWrapperW.style.display="none"),this.xs=1,this.ys=this.height/2,this.globalMax=0,this.globalMin=0}createLegends(options){options.legend=UIUtils.opts(options.legend,{}),options.legend.wrapper=UIUtils.opts(options.legend.wrapper,{}),options.legend.x=UIUtils.opts(options.legend.x,{}),options.legend.y=UIUtils.opts(options.legend.y,{}),options.legend.z=UIUtils.opts(options.legend.z,{}),options.legend.w=UIUtils.opts(options.legend.w,{}),this.legendWrapperX=UIUtils.createWrapper("ui_plot_legend_wrapper"),this.legendX=[],this.legendX.push(this.legendMinX=UIUtils.createWrapper("ui_plot_legend")),this.legendX.push(this.legendMaxX=UIUtils.createWrapper("ui_plot_legend")),this.legendX.push(this.legendValX=UIUtils.createWrapper("ui_plot_legend")),this.legendX.push(this.legendSclX=UIUtils.createWrapper("ui_plot_legend")),UIUtils.addClassList(this.legendMinX,"ui_plot_legend__x"),UIUtils.addClassList(this.legendMaxX,"ui_plot_legend__x"),UIUtils.addClassList(this.legendValX,"ui_plot_legend__x"),UIUtils.addClassList(this.legendSclX,"ui_plot_legend__x"),this.legendWrapperX.appendChild(this.legendMinX),this.legendWrapperX.appendChild(this.legendMaxX),this.legendWrapperX.appendChild(this.legendSclX),this.legendWrapperX.appendChild(this.legendValX),UIUtils.applyStyle(this.legendWrapperX,options.legend.x.wrapper),UIUtils.applyStyle(this.legendMinX,options.legend.x.min),UIUtils.applyStyle(this.legendMaxX,options.legend.x.max),UIUtils.applyStyle(this.legendValX,options.legend.x.val),UIUtils.applyStyle(this.legendSclX,options.legend.x.scl),this.legendWrapperY=UIUtils.createWrapper("ui_plot_legend_wrapper"),this.legendY=[],this.legendY.push(this.legendMinY=UIUtils.createWrapper("ui_plot_legend")),this.legendY.push(this.legendMaxY=UIUtils.createWrapper("ui_plot_legend")),this.legendY.push(this.legendValY=UIUtils.createWrapper("ui_plot_legend")),this.legendY.push(this.legendSclY=UIUtils.createWrapper("ui_plot_legend")),UIUtils.addClassList(this.legendMinY,"ui_plot_legend__y"),UIUtils.addClassList(this.legendMaxY,"ui_plot_legend__y"),UIUtils.addClassList(this.legendValY,"ui_plot_legend__y"),UIUtils.addClassList(this.legendSclY,"ui_plot_legend__y"),this.legendWrapperY.appendChild(this.legendMinY),this.legendWrapperY.appendChild(this.legendMaxY),this.legendWrapperY.appendChild(this.legendSclY),this.legendWrapperY.appendChild(this.legendValY),UIUtils.applyStyle(this.legendWrapperY,options.legend.y.wrapper),UIUtils.applyStyle(this.legendMinY,options.legend.y.min),UIUtils.applyStyle(this.legendMaxY,options.legend.y.max),UIUtils.applyStyle(this.legendValY,options.legend.y.val),UIUtils.applyStyle(this.legendSclY,options.legend.y.scl),this.legendWrapperZ=UIUtils.createWrapper("ui_plot_legend_wrapper"),this.legendZ=[],this.legendZ.push(this.legendMinZ=UIUtils.createWrapper("ui_plot_legend")),this.legendZ.push(this.legendMaxZ=UIUtils.createWrapper("ui_plot_legend")),this.legendZ.push(this.legendValZ=UIUtils.createWrapper("ui_plot_legend")),this.legendZ.push(this.legendSclZ=UIUtils.createWrapper("ui_plot_legend")),UIUtils.addClassList(this.legendMinZ,"ui_plot_legend__z"),UIUtils.addClassList(this.legendMaxZ,"ui_plot_legend__z"),UIUtils.addClassList(this.legendValZ,"ui_plot_legend__z"),UIUtils.addClassList(this.legendSclZ,"ui_plot_legend__z"),this.legendWrapperZ.appendChild(this.legendMinZ),this.legendWrapperZ.appendChild(this.legendMaxZ),this.legendWrapperZ.appendChild(this.legendSclZ),this.legendWrapperZ.appendChild(this.legendValZ),UIUtils.applyStyle(this.legendWrapperZ,options.legend.z.wrapper),UIUtils.applyStyle(this.legendMinZ,options.legend.z.min),UIUtils.applyStyle(this.legendMaxZ,options.legend.z.max),UIUtils.applyStyle(this.legendValZ,options.legend.z.val),UIUtils.applyStyle(this.legendSclZ,options.legend.z.scl),this.legendWrapperW=UIUtils.createWrapper("ui_plot_legend_wrapper"),this.legendW=[],this.legendW.push(this.legendMinW=UIUtils.createWrapper("ui_plot_legend")),this.legendW.push(this.legendMaxW=UIUtils.createWrapper("ui_plot_legend")),this.legendW.push(this.legendValW=UIUtils.createWrapper("ui_plot_legend")),this.legendW.push(this.legendSclW=UIUtils.createWrapper("ui_plot_legend")),UIUtils.addClassList(this.legendMinW,"ui_plot_legend__w"),UIUtils.addClassList(this.legendMaxW,"ui_plot_legend__w"),UIUtils.addClassList(this.legendValW,"ui_plot_legend__w"),UIUtils.addClassList(this.legendSclW,"ui_plot_legend__w"),this.legendWrapperW.appendChild(this.legendMinW),this.legendWrapperW.appendChild(this.legendMaxW),this.legendWrapperW.appendChild(this.legendSclW),this.legendWrapperW.appendChild(this.legendValW),UIUtils.applyStyle(this.legendWrapperW,options.legend.w.wrapper),UIUtils.applyStyle(this.legendMinW,options.legend.w.min),UIUtils.applyStyle(this.legendMaxW,options.legend.w.max),UIUtils.applyStyle(this.legendValW,options.legend.w.val),UIUtils.applyStyle(this.legendSclW,options.legend.w.scl),this.legendWrapper.appendChild(this.legendWrapperX),this.legendWrapper.appendChild(this.legendWrapperY),this.legendWrapper.appendChild(this.legendWrapperZ),this.legendWrapper.appendChild(this.legendWrapperW)}scale_data(val,ds){return val/=ds.max-ds.min,val+=ds.offset/(ds.max-ds.min),val*=this.height,val=this.height/2-val}process(ds){ds.data.length>=ds.npts&&ds.data.shift();for(var plot_data=[],q=0;q<ds.data.length;q++)plot_data.push(this.scale_data(ds.data[q],ds));return plot_data}make_legend(val){return val>=0?"+"+val.toFixed(2):val.toFixed(2)}redraw(){this.canvas.width=this.canvas.width+0;for(var k=0;k<this.dataset.length;k++){var ds=this.dataset[k];if(ds.enabled){var arr=this.process(ds),ctx=this.context;ctx.beginPath(),ctx.strokeStyle=ds.color,ctx.lineWidth=ds.lineWidth;var xstep=this.width/ds.npts;ctx.moveTo(0,arr[0]);for(var i=1;i<arr.length;i++)ctx.lineTo(i*xstep,arr[i]);ctx.stroke();var new_d=ds.data[ds.data.length-1];Math.floor(100*new_d)!==Math.floor(100*ds.val)&&(ds.val=new_d,ds.legend[0].innerHTML=this.make_legend(ds.min),ds.legend[1].innerHTML=this.make_legend(ds.max),ds.legend[2].innerHTML=this.make_legend(ds.val),ds.legend[3].innerHTML=this.make_legend(ds.scale))}}}addPoint(id,d){if(void 0===id||id<0||id>3)throw"id is required and must be in range of [0, 2]";this.dataset[id].data.push(d)}addData(data4){if("object"!=typeof data4||4!==data4.length)throw"data4 must be an array containing 4 number";for(var i=0;i<data4.length;i++){var ds=this.dataset[i],dd=data4[i];ds.data.push(dd)}this.redraw()}}class UIText{constructor(text,color,time,callback){this.wrapper=UIUtils.createWrapper("ui_text_wrapper"),this.text=UIUtils.createWrapper("ui_text_item"),this.separator=UIUtils.createWrapper("ui_text_newline"),this.wrapper.id=UIUtils.generateId("uitext"),this.text.innerHTML=text,this.text.style.color=UIUtils.getCssColor(color),this.wrapper.appendChild(this.text),this.wrapper.appendChild(this.separator),this.time=time,this.callback=callback,this.time&&(this.timeStart=performance.now(),this.state=0,this.timer=setInterval(()=>{0===this.state?performance.now()-this.timeStart>=this.time&&(this.wrapper.classList.add("ui_text_fadeout"),this.state++):1===this.state&&performance.now()-this.timeStart>=this.time+800&&(this.callback&&this.callback(this),UIUtils.dispose(this.wrapper),clearInterval(this.timer),this.state=0)},time/50))}setText(text){return this.text.innerHTML=text,this}dispose(){clearInterval(this.timer),UIUtils.dispose(this.wrapper)}}class UIPrint{constructor(options){this.wrapper=UIUtils.createWrapper("ui_print_wrapper"),options=UIUtils.opts(options,{}),this.maxNumLines=UIUtils.opts(options.limit,20),this.autowidth=UIUtils.opts(options.autowidth,!0),this.autoheight=UIUtils.opts(options.autoheight,!0),this.maxWidth=0,this.maxHeight=0,this.uitextItems=[]}updateSize(){if(!this.autowidth){var cw=UIUtils.getWidth(this.wrapper),nw=this.maxWidth<cw?cw:this.maxWidth;nw!=this.maxWidth&&(this.maxWidth=nw,UIUtils.setWidth(this.wrapper.parentNode,nw+10))}if(!this.autoheight){var ch=UIUtils.getHeight(this.wrapper),nh=this.maxHeight<ch?ch:this.maxHeight;nh!=this.maxHeight&&(this.maxHeight=nh,UIUtils.setHeight(this.wrapper.parentNode,nh+20))}}print(text,color,time){const line=new UIText(text,color||3394696,time,function(uitext){});this.wrapper.appendChild(line.wrapper),this.uitextItems.push(line);const n_remove=this.uitextItems.length-this.maxNumLines;for(var i=0;i<n_remove;i++){var wrapper=this.uitextItems.shift().wrapper;wrapper&&wrapper.parentNode&&wrapper.parentNode.removeChild(wrapper)}return this.updateSize(),line}getLine(id){if(!(id<0||id>=this.uitextItems.telength))return this.uitextItems[id]}updateLine(id,text){return this.getLine(id).setText(text),this}printInfo(text,time){return this.print(text,"#1a6df2",time),this}printSuccess(text,time){return this.print(text,"#0cb740",time),this}printWarning(text,time){return this.print(text,"#edbb09",time),this}printDanger(text,time){return this.print(text,"#ed2e08",time),this}printHighlight(text,time){return this.print(text,"#e9ed08",time),this}addTo(parent){return parent instanceof UIContainer?parent.addItem(this):parent.appendChild(this.wrapper),this}AppendTo(parent){return this.addTo(parent),this}dispose(){this.timer&&(clearInterval(this.timer),this.timer=null),UIUtils.dispose(this.wrapper),this.wrapper.innerHTML="",this.wrapper=null}}class UIVector{constructor(name,options){if(!name)throw"Name of UIVector is not provided.";(options=UIUtils.opts(options,{})).container=UIUtils.opts(options.container,{}),options.vector||(options.vector=UIUtils.opts(options.vector,{}),options.vector.vx=UIUtils.opts(options.vector.vx,{}),options.vector.vy=UIUtils.opts(options.vector.vy,{}),options.vector.vz=UIUtils.opts(options.vector.vz,{}),options.vector.vw=UIUtils.opts(options.vector.vw,{})),this.uic=new UIContainer(name,options.container),options.vector.vx&&(options.vector.vx.type="vx",this.vx=new UINum("X",options.vector.vx,options.vector.vx.callback||void 0)),options.vector.vy&&(options.vector.vy.type="vy",this.vy=new UINum("Y",options.vector.vy,options.vector.vy.callback||void 0)),options.vector.vz&&(options.vector.vz.type="vz",this.vz=new UINum("Z",options.vector.vz,options.vector.vz.callback||void 0)),options.vector.vw&&(options.vector.vw.type="vw",this.vw=new UINum("W",options.vector.vw,options.vector.vw.callback||void 0)),this.vx&&this.uic.addItem(this.vx),this.vy&&this.uic.addItem(this.vy),this.vz&&this.uic.addItem(this.vz),this.vw&&this.uic.addItem(this.vw)}getContainer(){return this.uic}setPosition(x,y){this.uic.setPosition(x,y)}setVectorX(value){return this.vx.setValue(value),this}setVectorY(value){return this.vy.setValue(value),this}setVectorZ(value){return this.vz.setValue(value),this}setVectorW(value){return this.vw.setValue(value),this}setVector(name,value){return"x"===name?this.vx.setValue(value):"y"===name?this.vy.setValue(value):"z"===name?this.vz.setValue(value):"w"===name&&this.vw.setValue(value),this}getVectorX(){return this.vx}getVectorY(){return this.vy}getVectorZ(){return this.vz}getVectorW(){return this.vw}getVectorXValue(){return this.vx.data}getVectorYValue(){return this.vy.data}getVectorZValue(){return this.vz.data}getVectorWValue(){return this.vw.data}getVectorValue(name){return"x"===name?this.getVectorXValue():"y"===name?this.getVectorYValue():"z"===name?this.getVectorZValue():"w"===name?this.getVectorWValue():void 0}getValue(name){return this.getVectorValue(name)}getVector(name){return"x"===name?this.getVectorX():"y"===name?this.getVectorY():"z"===name?this.getVectorZ():"w"===name?this.getVectorW():void 0}setVectorXCallback(callback){return this.vx.setCallback(callback),this}setVectorYCallback(callback){return this.vy.setCallback(callback),this}setVectorZCallback(callback){return this.vz.setCallback(callback),this}setVectorWCallback(callback){return this.vw.setCallback(callback),this}setVectorCallback(name,callback){return"x"===name?this.setVectorXCallback(callback):"y"===name?this.setVectorYCallback(callback):"z"===name?this.setVectorZCallback(callback):"w"===name?this.setVectorWCallback(callback):this}}class UIButton{constructor(text,type,callback,options){options=UIUtils.opts(options,{}),this.callback=callback,this.id=UIUtils.opts(options.id,UIUtils.generateId(text)),this.wrapper=UIUtils.createWrapper("ui_button_wrapper"),this.body=UIUtils.createWrapper("ui_button_body"),this.body.id=this.id,this.wrapper.appendChild(this.body),this.body.innerHTML=text,UIUtils.applyStyle(this.wrapper,options.wrapper),UIUtils.applyStyle(this.body,options.body),UIUtils.addClassList(this.body,"ui_button"+(type?"__"+type:"")),options.inline=UIUtils.opts(options.inline,!1),options.inline&&UIUtils.addClassList(this.wrapper,"ui_button__row"),this.uiMouse=new UIMouse(this.body),this.mouse={down:!1,time:performance.now(),count:0},this.uiMouse.setMouseDownCallback(this.onMouseDown.bind(this)),this.uiMouse.setMouseUpCallback(this.onMouseUp.bind(this))}onMouseDown(event){this.mouse.down=!0,this.mouse.time=performance.now(),this.mouse.count=0}onMouseUp(event){!0===this.mouse.down&&this.callback&&this.callback({id:this.id,text:this.body.innerHTML,button:this}),this.mouse.down=!1,this.mouse.count=0}getButtonDown(period){if(period&&this.mouse.down){if(0===this.mouse.count)return this.mouse.count++,!0;let now=performance.now();return now-this.mouse.time>=period&&(this.mouse.time=now,this.mouse.count++,!0)}return this.mouse.down}getButtonText(){return this.body.innerHTML}setButtonText(text){return this.body.innerHTML=text,this}getButtonId(){return this.Id}setButtonId(id){return this.Id=id}}function OscControls(dataset,options,callback){(options=options||{}).controls=options.controls||{},options.controls.wrapper=options.controls.wrapper||{},options.controls.lable=options.controls.lable||{},options.controls.value=options.controls.value||{},this.controls=[],this.callback=callback,this.wrapper=UIUtils.createWrapper("ui_osc_ctrls_wrapper"),this.plot=dataset.plot;const NAMES=["min","max","ofs","val"],PARAMS=[this.plot.min,this.plot.max,this.plot.ofs,this.plot.val],$=this.plot;for(let i=0;i<PARAMS.length;i++){const name=!1===options.controls.showLabel?"":NAMES[i],ctrl=new UINum(name,{min:$.min,max:$.max,val:PARAMS[i],type:this.plot.type,res:2,readonly:"val"===NAMES[i],wrapper:options.controls.wrapper,label:options.controls.label,value:options.controls.value},function(v){PARAMS[i]=v,callback&&callback(v,NAMES[i])}.bind(this));this.wrapper.appendChild(ctrl.wrapper),this.controls.push(ctrl)}}function Dataset(id,type,color,options,callback){this.plot={id:id,type:type,enabled:!0,val:0,min:-1,max:1,ofs:0,color:color,lineWidth:1.5},this.data={val:0,min:999999999,max:-999999999,buffer:[],points:options.points||200},this.plot.controls=new OscControls(this,options,function(v,s){"min"===s?this.plot.min=v:"max"===s?this.plot.max=v:"ofs"===s&&(this.plot.ofs=v),callback&&callback(v,s)}.bind(this)),this.prvTime=performance.now()}function UIOscilloscope(width,height,options){this.options=options||{},this.width=width,this.height=height,this.wrapper=document.createElement("div"),this.wrapper.className="osc_wrapper",this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.context=this.canvas.getContext("2d"),this.wrapper.appendChild(this.canvas),this.channels=4,this.datasets=[];const TYPES=["vx","vy","vz","vw"],COLORS=["#ff0909","#00ff77","#00aeff","#ff0ade"];for(let i=0;i<this.channels;i++){const ds=new Dataset(i,TYPES[i],COLORS[i],this.options,function(){this.plot()}.bind(this));this.datasets.push(ds),this.wrapper.appendChild(ds.plot.controls.wrapper)}this.plot()}OscControls.prototype.updateControls=function(){this.controls[0].setMin(this.plot.min),this.controls[0].setMax(this.plot.max),this.controls[0].setValue(this.plot.min),this.controls[1].setMin(this.plot.min),this.controls[1].setMax(this.plot.max),this.controls[1].setValue(this.plot.max);let high=this.plot.max>this.plot.min?this.plot.max:this.plot.min;this.controls[2].setMin(-high),this.controls[2].setMax(+high),this.controls[2].setValue(this.plot.ofs),this.controls[3].setMin(this.plot.min),this.controls[3].setMax(this.plot.max),this.controls[3].setValue(this.plot.val)},OscControls.prototype.updateValue=function(){this.controls[3].setValue(this.plot.val)},OscControls.prototype.setEnable=function(enabled){return!0===enabled?UIUtils.removeClassList(this.wrapper,"ui_num_wrapper__hide"):UIUtils.addClassList(this.wrapper,"ui_num_wrapper__hide"),this},Dataset.prototype.setEnable=function(enabled){this.plot.enabled=enabled,this.plot.controls.setEnable(enabled)},Dataset.prototype.setMin=function(min){this.plot.min=min,this.plot.controls.updateControls()},Dataset.prototype.setMax=function(max){this.plot.max=max,this.plot.controls.updateControls()},Dataset.prototype.setOffset=function(ofs){this.plot.ofs=ofs,this.plot.controls.updateControls()},Dataset.prototype.setRange=function(min,max){this.plot.min=min,this.plot.max=max,this.plot.controls.updateControls()},Dataset.prototype.setColor=function(color){this.plot.color=color},Dataset.prototype.addData=function(data){let arr=[];Array.isArray(data)?arr=data:arr[0]=data;for(let i=0;i<arr.length;i++){let d=arr[i];this.data.buffer.push(d),this.data.buffer.length>this.data.points&&this.data.buffer.shift(),d>this.data.max&&(this.data.max=d),d<this.data.min&&(this.data.min=d)}this.data.val=arr[arr.length-1],this.plot.val=this.data.val,performance.now()-this.prvTime>80&&(this.prvTime=performance.now(),this.plot.controls.updateValue())},UIOscilloscope.prototype.plot=function(){this.canvas.width=this.width,this.drawGrids();for(let i=0;i<this.datasets.length;i++)this.draw(this.datasets[i])},UIOscilloscope.prototype.draw=function(dataset){if(!0!==dataset.plot.enabled)return;let buffer=dataset.data.buffer.slice(0),min=dataset.plot.min,max=dataset.plot.max,ofs=dataset.plot.ofs,color=dataset.plot.color,lineWidth=dataset.plot.lineWidth;const length=dataset.data.points;let ctx=this.context,width=this.width,height=this.height;ctx.beginPath(),ctx.strokeStyle=color,ctx.lineWidth=lineWidth,ctx.setLineDash([]);const HEIGHT=height-2,GAIN=HEIGHT/(max-min),OFFSET=HEIGHT/2+1-ofs*GAIN;for(let i=0;i<length;i++)buffer[i]=OFFSET-buffer[i]*GAIN;const xsteps=width/(length-1);ctx.moveTo(0,buffer[0]);for(let i=1;i<length;i++)ctx.lineTo(i*xsteps,buffer[i]);ctx.stroke()},UIOscilloscope.prototype.drawGrids=function(){const ctx=this.context,width=this.width,height=this.height,hH=height/2,hW=width/2;ctx.beginPath(),ctx.strokeStyle="rgba(255, 255, 255, 0.1)",ctx.lineWidth=1;const ys=height/10,right=width;for(let i=0;i<11;i++)ctx.moveTo(0,i*ys),ctx.lineTo(right,i*ys);const xs=width/20,bottom=height;for(let i=1;i<20;i++)ctx.moveTo(i*xs,0),ctx.lineTo(i*xs,bottom);ctx.stroke(),!0===this.options.mainGrids&&(ctx.beginPath(),ctx.strokeStyle="rgba(0, 255, 255, 0.5)",ctx.lineWidth=1.1,ctx.setLineDash([]),ctx.moveTo(0,hH),ctx.lineTo(width,hH),ctx.moveTo(hW,0),ctx.lineTo(hW,height),ctx.stroke())},UIOscilloscope.prototype.addData=function(data){let arr=[];Array.isArray(data)?arr=data:arr[0]=data;for(let i=0;i<arr.length;i++)this.datasets[i].addData(arr[i]);this.plot()},UIOscilloscope.prototype.getDataset=function(id){return null!==id?this.datasets[id]:this.datasets},UIOscilloscope.prototype.getMin=function(id){return null!==id?this.datasets[id].getMin():[this.datasets[0].min,this.datasets[1].min,this.datasets[2].min,this.datasets[3].min]},UIOscilloscope.prototype.getMax=function(id){return null!==id?this.datasets[id].getMax():[this.datasets[0].max,this.datasets[1].max,this.datasets[2].max,this.datasets[3].max]},UIOscilloscope.prototype.getOffset=function(id){return null!==id?this.datasets[id].getOffset():[this.datasets[0].ofs,this.datasets[1].ofs,this.datasets[2].ofs,this.datasets[3].ofs]},UIOscilloscope.prototype.setMin=function(id,min){if(null!==id)this.datasets[id].setMin(min);else for(let i=0;i<this.datasets.length;i++)this.datasets[i].setMin(min);return this},UIOscilloscope.prototype.setMax=function(id,max){if(null!==id)this.datasets[id].setMax(max);else for(let i=0;i<this.datasets.length;i++)this.datasets[i].setMax(max);return this},UIOscilloscope.prototype.setRange=function(id,min,max){if(null!==id)this.datasets[id].setRange(min,max);else for(let i=0;i<this.datasets.length;i++)this.datasets[i].setMin(min),this.datasets[i].setMax(max);return this},UIOscilloscope.prototype.setOffset=function(id,ofs){if(null!==id)this.datasets[id].setOffset(ofs);else for(let i=0;i<this.datasets.length;i++)this.datasets[i].setOffset(ofs);return this},UIOscilloscope.prototype.setColor=function(color){if(null!==id)this.datasets[id].setColor(color);else for(let i=0;i<this.datasets.length;i++)this.datasets[i].setColor(color);return this},UIOscilloscope.prototype.setEnable=function(id,enabled){if(null!==id)this.datasets[id].setEnable(enabled);else for(let i=0;i<this.datasets.length;i++)this.datasets[i].setEnable(enabled);return this};class WebGuiCore{constructor(){}}exports.UIContainer=UIContainer,exports.UINum=UINum,exports.UIVector=UIVector,exports.UIPlot=UIPlot,exports.UIPrint=UIPrint,exports.UIText=UIText,exports.UIButton=UIButton,exports.Oscilloscope=UIOscilloscope,exports.UIUtils=UIUtils,exports.default=WebGuiCore;