processes={currentlySelectedProcess:null,pidPositionsIndex:{x:[],y:[]},pid:{},getPidObject:function(){let e={};return Object.values(this.pid).forEach((t=>{"object"==typeof e&&(e[t.id]=t)})),!isObjectEmpty(e)&&Object.values(e)},getNewPid:function(){return isObjectEmpty(this.pid)?0:Object.keys(this.pid).map((e=>Number(e))).sort(((e,t)=>e-t)).slice(-1)[0]+1},getNumberPid:function(e){return Number(e.split("pid")[1])},getFirstPidFromAppName:function(e){let t=this.getPidObject();for(let i=0;i<t.length;i++)if(t[i].appName==e)return t[i]},getRunningInstanceList:function(e){let t=this.getPidObject();if(isObjectEmpty(t))return!1;let i=[];for(process of t)process.appName==e&&i.push(process);return 0!=i.length&&i},getRunningInstanceAmount:function(e){return this.getRunningInstanceList(e).length},bringToTop:function(e,t=null){if(null!=t&&t.target.tagName.endsWith("ICON"))return!1;const i=this.getNumberPid(e.id);if(isFunction(this.pid[i].onFocus)&&setTimeout((()=>{this.pid[i].onFocus(t)}),1),this.currentlySelectedProcess==this.pid[i])return!1;1==this.pid[i].minimized&&(e.style.transform="",e.style.opacity="",e.style.display="",this.pid[i].minimized=!1),appsContainer.insertAdjacentElement("beforeend",e),this.makeProcessResizable("#"+e.id),null!=this.currentlySelectedProcess&&this.currentlySelectedProcess.getProcessBarElement().classList.remove("selected"),this.pid[i].getProcessBarElement().classList.add("selected"),this.currentlySelectedProcess=this.pid[i]},createWindowSizeProjection:function(e,t="full"){let i=e.getProcessElement(),o=topBar.offsetHeight,s=0,n=document.body.offsetWidth,r=window.innerHeight-(appList.offsetHeight+topBar.offsetHeight);switch(t){case"full":default:break;case"left-half":n=document.body.offsetWidth/2;break;case"right-half":n=document.body.offsetWidth/2,s=document.body.offsetWidth/2}let l=`\n            top:${o}px;\n            left:${s}px;\n            width:${n}px;\n            height:${r}px;`;if(e.fillType=t,e.projectedFill={top:o,left:s,width:n,height:r},isDefined(document.querySelector("#windowSizeProjection"))){let e=document.querySelector("#windowSizeProjection");e.style.cssText=l,e.setAttribute("data-fill-type",`${t}-wsp`),i.insertAdjacentElement("beforebegin",document.querySelector("#windowSizeProjection"))}else{this.hideWindowFillProjection(e);let o=`<div id='windowSizeProjection' data-fill-type='${t}-wsp' style='${l}'></div>`;i.insertAdjacentHTML("beforebegin",o)}},scaleToProjectedFill:function(e){isObjectEmpty(e.projectedFill)||("full"==e.fillType?this.maximize(e.elementId):this.scaleToFillArea(e.elementId,e.projectedFill)),this.hideWindowFillProjection(e)},hideWindowFillProjection:function(e,t=!1){const i=document.querySelector("#windowSizeProjection");if(isDefined(i)){if(t)return e.projectedFill={},i.style.opacity=0,setTimeout((()=>{i.style="opacity:0"}),100),!0;if("opacity:0;"==i.style.cssText)return!1;e.projectedFill={},i.style.opacity=0}},scaleToFillArea:function(e,t={}){let i=this.getNumberPid(e),o=document.querySelector(`#${e}`),s=this.pid[i];if(this.bringToTop(o),s.scaledToArea&&isObjectEmpty(t)){let e=s.positionBeforeMaximize.y,t=s.positionBeforeMaximize.x,i=s.sizeBeforeMaximize.height,n=s.sizeBeforeMaximize.width,r=window.innerHeight-appList.offsetHeight,l=window.innerWidth;e+i>r&&(e-=e+i-r),t+n>l&&(t-=t+n-l),e<topBar.offsetHeight&&(e=topBar.offsetHeight),t<0&&(t=0),o.style.top=e+"px",o.style.left=t+"px",o.style.height=s.sizeBeforeMaximize.height+"px",o.style.width=s.sizeBeforeMaximize.width+"px",o.querySelector("app_resize").style.display="",s.maximized=!1,s.scaledToArea=!1}else isObjectEmpty(t)||(s.scaledToArea||(s.positionBeforeMaximize={x:Number(o.style.left.replace("px","")),y:Number(o.style.top.replace("px",""))},s.sizeBeforeMaximize={width:o.clientWidth,height:o.clientHeight}),s.scaledToArea=!0,o.style.transition="all 0.2s ease-in-out",o.style.top=t.top+"px",o.style.left=t.left+"px",o.style.height=t.height+"px",o.style.width=t.width+"px");setTimeout((()=>{o.style.transition=""}),300)},maximize:function(e){let t=this.getNumberPid(e),i=document.querySelector(`#${e}`),o=this.pid[t];if(this.bringToTop(i),1==o.maximized)i.style.transition="all 0.2s ease-in-out",o.scaledToArea=!0,this.scaleToFillArea(e,{});else{const t={top:topBar.offsetHeight,left:0,height:window.innerHeight-(appList.offsetHeight+topBar.offsetHeight),width:window.innerWidth};o.maximized=!0,this.scaleToFillArea(e,t)}},minimize:function(e){let t=this.getNumberPid(e),i=document.querySelector(`#${e}`);this.bringToTop(i),i.style.transform="scale(0.5)",i.style.opacity="0",this.pid[t].minimized=!0,this.currentlySelectedProcess=null,this.pid[t].getProcessBarElement().classList.remove("selected"),setTimeout((()=>{i.style.display="none"}),500)},remove:function(e){let t=this.getNumberPid(e);const i=this.pid[t],o=document.querySelector(`#${e}`);i.getProcessBarElement().remove(),delete this.pid[t],this.currentlySelectedProcess=null,o.style.transition="all 0.2s linear",o.style.transform="scale(0.8)",o.style.opacity="0",setTimeout((()=>{o.remove()}),200)},processSchema:{title:"Untitled App",titleColor:"",bodyColor:"",textColor:"",headerColor:"",headerBorderBottomColor:"",bodyBorderSize:"",padding:"",additionalBodyCss:"",opacity:1,HTML:String(),height:300,width:500,minHeight:150,minWidth:150,bodyBorder:Boolean(),fullHeight:!1,fullWidth:!1},create:function(e,t={x:"default",y:"default"}){if(null==apps[e])return console.error(`Not Found: App '${e}' does not exist`),!1;if(apps[e].createData.onlyOneInstanceAllowed&&this.getRunningInstanceAmount(e)>0){return this.bringToTop(this.getFirstPidFromAppName(e).getProcessElement()),!1}let i=processes.getNewPid(),o="pid"+i,s={};Object.assign(s,this.processSchema),Object.assign(s,apps[e].createData),s.height<s.minHeight&&(s.height=s.minHeight),s.width<s.minWidth&&(s.width=s.minWidth),t.y="default"==t.y?topBar.offsetHeight+30:y,t.x="default"==t.x?40:x,this.pidPositionsIndex.x=[],this.pidPositionsIndex.y=[];for(const e of Object.values(this.getPidObject()))this.pidPositionsIndex.x.push(e.positionBeforeMaximize.x),this.pidPositionsIndex.y.push(e.positionBeforeMaximize.y);this.pidPositionsIndex.x=this.pidPositionsIndex.x.sort(((e,t)=>e-t)),this.pidPositionsIndex.y=this.pidPositionsIndex.y.sort(((e,t)=>e-t));for(let e=0;e<this.pidPositionsIndex.x.length;e++)(t.x+20>this.pidPositionsIndex.x[e]&&t.x-10<this.pidPositionsIndex.x[e]||t.y+20>this.pidPositionsIndex.y[e]&&t.y-10<this.pidPositionsIndex.y[e])&&(t.x+=25,t.y+=25,t.y>window.innerHeight-(appList.offsetHeight+430)&&(t.y=topBar.offsetHeight+30),t.x>window.innerWidth-630&&(t.x=40));const n=`\n\t\t\tmin-height:${s.minHeight}px;\n\t\t\tmin-width:${s.minWidth}px;\n            opacity: 0;\n            transform: scale(0.8);\n            transition: all 0.1s linear;\n            top: ${t.y}px;\n            left: ${t.x}px;\n\t\t`,r=`\n\t\t\tbackground-color:${s.bodyColor};\n\t\t\tcolor:${s.textColor};\n\t\t\tmargin:${s.bodyBorder&&s.bodyBorderSize||"0px"};\n\t\t\theight:${s.fullHeight?"100%":"auto"};\n\t\t\twidth:${s.fullWidth?"100%":"auto"};\n\t\t\topacity: ${s.opacity};\n\t\t\tpadding: ${s.padding};\n\t\t\t${s.additionalBodyCss}\n\t\t`,l=`\n\t\t\tcolor: ${s.titleColor};\n\t\t\tbackground-color:${s.headerColor};\n\t\t\tborder-bottom-style: solid;\n            border-bottom-width: 1px;\n            border-bottom-color: ${s.headerBorderBottomColor};\n\t\t`,d=`\n\t\t\t<app_container onmousedown="processes.bringToTop(this,event);" id='${o}' style = '${n}' >\n\t\t\t\t<app_header style="${l}opacity:1;" onmousedown="processes.processMouseDownHandler(event, '${o}')" >\n\t\t\t\t\t<app_title>${s.title}</app_title>\n\t\t\t\t\t<app_minimize onclick="processes.minimize('${o}')"><minus_icon></minus_icon></app_minimize>\n\t\t\t\t\t<app_maximize onclick="processes.maximize('${o}')"><square_icon></square_icon></app_maximize>\n\t\t\t\t\t<app_exit onclick="processes.remove('${o}')"><x_icon></x_icon></app_exit>\n\t\t\t\t</app_header>\n\t\t\t\t<div class='app_body' style="${r}">\n\t\t\t\t\t${s.getHTML()}\n\t\t\t\t</div>\n\t\t\t\t<app_resize>\n\t\t\t\t\t<resize_point class='bottom-right'></resize_point>\n\t\t\t\t\t<resize_point class='bottom-left'></resize_point>\n\t\t\t\t\t<resize_point class='top-right'></resize_point>\n\t\t\t\t\t<resize_point class='top-left'></resize_point>\n\n\t\t\t\t\t<resize_point class='top'></resize_point>\n\t\t\t\t\t<resize_point class='left'></resize_point>\n\t\t\t\t\t<resize_point class='right'></resize_point>\n\t\t\t\t\t<resize_point class='bottom'></resize_point>\n\t\t\t\t\t</app_resize>\n\n\t\t\t\t</app_container>\n\t\t\t\n\t\t`;appsContainer.insertAdjacentHTML("beforeend",d),appList.insertAdjacentHTML("beforeend",`<process onclick="processes.bringToTop(document.querySelector('#${o}'))" id='appListPID${i}'>${isDefined(apps[e].icon)&&`<img src="${apps[e].icon}">`||""}<span>${s.title}</span></process>`),X.contextMenu.add(mainContent.querySelector("#appList > *:last-child"),[["Maximize",`processes.maximize('${o}')`],["Minimize",`processes.minimize('${o}')`],[""],["Close",`processes.remove('${o}')`]]),processes.pid[i]={},Object.assign(processes.pid[i],s.methods),Object.assign(processes.pid[i],{id:i,elementId:o,appName:e,minimized:!1,maximized:!1,scaledToArea:!1,projectedFill:projectedFill={},positionBeforeMaximize:{x:t.x,y:t.y},sizeBeforeMaximize:{width:s.width,height:s.height},originalOffsetY:0,originalOffsetX:0,title:s.title,getProcessElement:function(){return document.querySelector(`#${this.elementId} `)},getProcessElementBody:function(){return document.querySelector(`#${this.elementId}>.app_body`)},getProcessElementHeader:function(){return document.querySelector(`#${this.elementId} app_header`)},getProcessBarElement:function(){return document.querySelector(`#appListPID${this.id} `)},setProcessTitle:function(e){this.getProcessBarElement().querySelector("span").innerText=e,this.getProcessElementHeader().querySelector("app_title").innerText=e,this.title=e}}),setTimeout((()=>{const e=processes.pid[i].getProcessElement();e.style.opacity="",e.style.transform="",e.style.transition=""}),1),this.makeProcessResizable("#"+processes.pid[i].elementId),this.bringToTop(processes.pid[i].getProcessElement()),addDoubleClickListener(processes.pid[i].getProcessElementHeader(),(e=>{processes.maximize(o),document.body.onmousemove=null})),isFunction(apps[e].onStart)&&apps[e].onStart(processes.pid[i]),s={}},processMouseDownHandler:function(e,t,i=!1){const o=this.getNumberPid(t),s=this.pid[o];if("APP_HEADER"!=e.target.tagName&&"APP_TITLE"!=e.target.tagName&&!i)return!1;if(s.scaledToArea){let i=e.clientY,o=e.clientX;return document.body.onmousemove=e=>{if(Math.abs(i-e.clientY)+Math.abs(o-e.clientX)>40){const i=s.getProcessElement();i.style.top=e.layerY,document.body.setAttribute("onmousemove",null);let o=e.layerX/i.offsetWidth*s.sizeBeforeMaximize.width,n=e.clientY,r=e.clientX-o;s.positionBeforeMaximize.x=r,s.positionBeforeMaximize.y=n,i.style.transition="200ms width ease-in-out,200ms height ease-in-out",s.scaledToArea=!0,processes.scaleToFillArea(t,{}),processes.initiateProcessMouseMoveHandler(s,e.layerY,o)}},this.initiateProcessMouseUpHandler(s),!1}this.initiateProcessMouseMoveHandler(s,e.layerY,e.layerX),this.initiateProcessMouseUpHandler(s)},initiateProcessMouseMoveHandler:function(e,t,i){e.originalOffsetY=t,e.originalOffsetX=i,document.body.setAttribute("onmousemove",`processes.processMouseMoveHandler(event, processes.pid['${e.id}'])`)},initiateProcessMouseUpHandler:function(e){document.body.onmouseup=t=>{isDefined(e.getProcessElementHeader())&&(document.body.removeAttribute("onmousemove"),document.body.removeAttribute("onmouseup"),e.getProcessElementHeader().removeAttribute("onmouseup"),this.scaleToProjectedFill(e),this.hideWindowFillProjection(e,!0)),document.body.onmouseup=null}},processMouseMoveHandler:function(e,t){let i=e.clientY,o=e.clientX,s=i-t.originalOffsetY,n=o-t.originalOffsetX,r=t.getProcessElement();i<topBar.offsetHeight?this.createWindowSizeProjection(t,"full"):o<30?this.createWindowSizeProjection(t,"left-half"):o>document.body.offsetWidth-30?this.createWindowSizeProjection(t,"right-half"):this.hideWindowFillProjection(t),s=s<topBar.offsetHeight?topBar.offsetHeight:s;let l=window.innerHeight-2*appList.offsetHeight;s=s>l?l:s,r.style.top=s+"px",r.style.left=n+"px"},makeProcessResizable:function(e){const t=document.querySelector(e),i=document.querySelectorAll(e+" resize_point"),o=t.style.minWidth.replace("px","")||150,s=t.style.minHeight.replace("px","")||150;let n=0,r=0,l=0,d=0,c=0,p=0;i.forEach((e=>{function i(i){const a=e.classList.toString();let h=0,m=0;a.includes("top")?(h=r-(i.pageY-p),h>s&&h<=window.innerHeight&&(t.style.height=h+"px",t.style.top=d+(i.pageY-p)+"px")):a.includes("bottom")&&(h=r+(i.pageY-p),h>s&&h<=window.innerHeight&&(t.style.height=h+"px")),a.includes("left")?(m=n-(i.pageX-c),m>o&&m<=window.innerWidth&&(t.style.width=m+"px",t.style.left=l+(i.pageX-c)+"px")):a.includes("right")&&(m=n+(i.pageX-c),m>o&&m<=window.innerWidth&&(t.style.width=m+"px")),h>=window.innerHeight&&(t.style.height=window.innerHeight),m>=window.innerWidth&&(t.style.width=window.innerWidth)}function a(){document.body.setAttribute("onmousemove",null),window.removeEventListener("mousemove",i)}e.addEventListener("mousedown",(function(e){e.preventDefault(),n=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),r=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),l=t.getBoundingClientRect().left,d=t.getBoundingClientRect().top,c=e.pageX,p=e.pageY,window.addEventListener("mousemove",i),window.addEventListener("mouseup",a)}))}))}};