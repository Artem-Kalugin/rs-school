(()=>{"use strict";const e={elements:{wrapperElement:0,closeButtonElement:0,containerElement:0,addElement:0},init(){this.elements.wrapperElement=document.createElement("div"),this.elements.containerElement=document.createElement("div"),this.elements.closeButtonElement=document.createElement("button"),this.elements.wrapperElement.classList.add("form-wrapper"),this.elements.containerElement.classList.add("container"),this.elements.closeButtonElement.classList.add("close-form-button"),this.elements.closeButtonElement.innerText="OK",this.elements.closeButtonElement.addEventListener("click",(()=>{this.closeForm()})),this.elements.wrapperElement.appendChild(this.elements.containerElement),this.elements.wrapperElement.appendChild(this.elements.closeButtonElement)},addRecordsToForm(){if(this.elements.addElement=document.createElement("div"),null!=localStorage.getItem("records")){this.elements.addElement.classList.add("records-grid");const e=document.createElement("span");e.innerText="Место",this.elements.addElement.appendChild(e.cloneNode(!0)),e.innerText="Время",this.elements.addElement.appendChild(e.cloneNode(!0)),e.innerText="Ходы",this.elements.addElement.appendChild(e.cloneNode(!0)),e.innerText="Размер",this.elements.addElement.appendChild(e.cloneNode(!0)),JSON.parse(localStorage.getItem("records")).forEach(((t,s)=>{e.innerText=s+1,this.elements.addElement.appendChild(e.cloneNode(!0)),e.innerText=t.time,this.elements.addElement.appendChild(e.cloneNode(!0)),e.innerText=t.steps,this.elements.addElement.appendChild(e.cloneNode(!0)),e.innerText=t.size,this.elements.addElement.appendChild(e.cloneNode(!0))})),this.elements.containerElement.appendChild(this.elements.addElement),this.showForm()}else this.elements.containerElement.appendChild(document.createElement("span").innerText="Нет рекордов!"),this.showForm()},showMessage(e){const t=document.createElement("span");t.innerText=e,this.elements.containerElement.appendChild(t),this.showForm()},showForm(){document.querySelector(".wrapper").appendChild(this.elements.wrapperElement)},closeForm(){this.elements.wrapperElement.remove(),this.elements.wrapperElement=0,this.elements.containerElement=0,this.elements.addElement=0}},t={elements:{wrapper:0,timeElement:0,stepsElement:0,saveButton:0,retryButton:0,loseButton:0,soundButton:0,imageCheck:0},properties:{time:0,steps:0,timeId:0},init(){this.elements.wrapper=document.createElement("div"),this.elements.saveButton=document.createElement("span"),this.elements.retryButton=document.createElement("span"),this.elements.soundButton=document.createElement("span"),this.elements.timeElement=document.createElement("span"),this.elements.stepsElement=document.createElement("span"),this.elements.stepsElement.innerText=this.properties.steps,this.elements.saveButton.innerHTML='<i class="fas fa-save">',this.elements.retryButton.innerHTML='<i class="fas fa-undo">',this.elements.soundButton.innerHTML='<i class="fas fa-volume-up"></i>',this.elements.retryButton.addEventListener("click",(()=>{this.generateNewInstance()})),this.elements.saveButton.addEventListener("click",(()=>{this.saveInstance()})),this.elements.soundButton.addEventListener("click",(()=>{this.toggleSound()})),this.elements.wrapper.appendChild(this.elements.timeElement),this.elements.wrapper.appendChild(this.elements.retryButton),this.elements.wrapper.appendChild(this.elements.saveButton),this.elements.wrapper.appendChild(this.elements.soundButton),this.elements.wrapper.classList.add("flex"),4===s.properties.size&&(this.elements.loseButton=document.createElement("span"),this.elements.loseButton.innerHTML='<i class="far fa-flag"></i>',this.elements.wrapper.appendChild(this.elements.loseButton)),this.elements.wrapper.appendChild(this.elements.stepsElement),document.body.appendChild(this.elements.wrapper),this.countTime()},toggleSound(){s.properties.sounds=!s.properties.sounds},saveInstance(){const e={time:t.properties.time,steps:t.properties.steps,size:s.properties.size,gameField:s.instanceProperties.gameField,image:s.instanceProperties.image,containImage:s.instanceProperties.containImage};localStorage.setItem("savedGame",JSON.stringify(e))},generateNewInstance(){s.clearInstance(),s.initInstance()},countTime(){this.elements.timeElement.innerText=`${t.addZero(Math.floor(this.properties.time/60))}:${t.addZero(this.properties.time%60)}`,this.properties.time+=1,this.properties.timeId=setTimeout((()=>{t.countTime()}),1e3)},increaseSteps(){this.properties.steps+=1,this.elements.stepsElement.innerText=this.properties.steps},deletePanel(){clearTimeout(this.properties.timeId),this.elements.wrapper.remove()},addZero:e=>e<10?"0"+e:e},s={properties:{sounds:!0,size:4,SoundFile:new Audio("assets/BlockSound.mp3")},elements:{gameBoard:0},instanceProperties:{isActive:!1,isNewGame:!0,counts:!0,gameField:[],nullX:0,nullY:0,animate:!0,animateEvent:0,containImage:!1,image:0},shuffle(){const e=[];for(let t=0;t<this.properties.size*this.properties.size;t+=1)e.push(t);const t=e.map((e=>({sort:Math.random(),value:e}))).sort(((e,t)=>e.sort-t.sort)).map((e=>e.value));if(this.checkShuffle(t))for(let e=0;e<this.properties.size;e+=1){this.instanceProperties.gameField.push(new Array(this.properties.size));for(let s=0;s<this.properties.size;s+=1)this.instanceProperties.gameField[e][s]=t[e*this.properties.size+s]}else this.shuffle()},checkShuffle(e){let t=0;for(let s=0;s<this.properties.size*this.properties.size;s+=1){if(0!==e[s])for(let n=0;n<s;n+=1)e[n]>e[s]&&(t+=1);0!==e[s]||this.properties.size%2||(t+=(this.properties.size+1-Math.ceil((s+1)/this.properties.size))%2)}return(t+this.properties.size%2)%2},changeGameBoardSize(){this.elements.gameBoard.style.height=this.elements.gameBoard.offsetWidth+"px"},initInstance(){this.elements.gameBoard=document.createElement("div"),this.elements.gameBoard.classList.add("game-board"),this.elements.gameBoard.style.setProperty("grid-template-rows",`repeat(${this.properties.size}, 1fr)`),this.elements.gameBoard.style.setProperty("grid-template-columns",`repeat(${this.properties.size}, 1fr)`),n.elements.wrapperElement.appendChild(this.elements.gameBoard),this.elements.gameBoard.style.height=this.elements.gameBoard.offsetWidth+"px",window.addEventListener("resize",(()=>{s.changeGameBoardSize()})),this.instanceProperties.isNewGame&&(this.shuffle(),t.properties.time=0,t.properties.steps=-1,t.increaseSteps(),this.instanceProperties.containImage&&(this.instanceProperties.image=`url(assets/${Math.floor(150*Math.random())+1}.jpg)`));for(let e=0;e<this.properties.size;e+=1)for(let t=0;t<this.properties.size;t+=1){const s=document.createElement("div");s.classList.add("block"),s.innerText=this.instanceProperties.gameField[e][t],s.style.backgroundSize=this.elements.gameBoard.offsetWidth+"px",s.style.backgroundImage=this.instanceProperties.image,s.style.backgroundPosition=`${100/this.properties.size*((s.innerText-1)%this.properties.size)}% ${100/this.properties.size*Math.floor((s.innerText-1)/this.properties.size)}%`,this.instanceProperties.containImage&&(s.style.color="rgba(0, 0, 0, 0.0)"),"0"===s.innerText&&(s.classList.toggle("hide"),this.instanceProperties.nullX=t,this.instanceProperties.nullY=e),this.elements.gameBoard.appendChild(s.cloneNode(!0))}this.updateInstance()},deleteEventListeners(){document.querySelectorAll(".block").forEach((e=>{e.classList.remove("block_active");const t=e.cloneNode(!0);e.parentNode.replaceChild(t,e)}))},updateInstance(){this.deleteEventListeners();const{nullX:e}=this.instanceProperties,{nullY:t}=this.instanceProperties,s=document.querySelectorAll(".block"),n=[];e>0&&n.push(this.instanceProperties.gameField[t][e-1]),e<this.properties.size-1&&n.push(this.instanceProperties.gameField[t][e+1]),t>0&&n.push(this.instanceProperties.gameField[t-1][e]),t<this.properties.size-1&&n.push(this.instanceProperties.gameField[t+1][e]),s.forEach(((s,i)=>{n.includes(parseInt(s.innerText,10))&&(s.classList.add("block_active"),s.addEventListener("mousedown",(()=>{s.classList.contains("block_active")&&this.moveElement(s,e-i%this.properties.size,t-Math.floor(i/this.properties.size))})))})),this.checkWin()},moveElement(e,t,s){const n=document.querySelector(".hide");e.style.width=e.offsetWidth+"px",e.style.height=e.offsetHeight+"px";const i=e.cloneNode(!0);e.classList.toggle("hide"),i.style.position="absolute",i.style.zIndex=1e3,i.style.transitionProperty="transform",this.elements.gameBoard.appendChild(i),i.style.top=e.offsetTop-10+"px",i.style.left=e.offsetLeft-10+"px",this.properties.animate=!1,i.addEventListener("mouseup",(()=>{const r=n.offsetLeft+n.offsetWidth/2+5,l=n.offsetTop-n.offsetWidth/2+5,o=e.offsetLeft+e.offsetWidth/2+10,a=e.offsetTop-e.offsetHeight/2+10,m=i.offsetLeft+i.offsetWidth/2+10,p=i.offsetTop-i.offsetHeight/2+10,d=n.offsetWidth/2*1.2;m<o+15&&m>o-15&&p<a+15&&p>a-15?(e.classList.toggle("hide"),this.animate(e,t,s,!0),i.remove()):m<r+d&&m>r-d&&p<l+d&&p>l-d?(this.animate(e,t,s,!1),e.classList.toggle("hide"),i.remove()):(e.classList.toggle("hide"),i.remove())})),document.onmousemove=e=>{!function(e){i.style.left=e.pageX-i.offsetWidth/2+"px",i.style.top=e.pageY-i.offsetHeight/2+"px"}(e)}},deleteElement(e){e.remove()},async animate(e,t,s,n){e.style.transitionProperty="transform,left,top",n&&(e.style.position="relative",e.style.top=(e.offsetHeight+20)*s+"px",e.style.left=(e.offsetWidth+20)*t+"px"),setTimeout((()=>{e.style.position="static",e.style.top=0,e.style.left=0,this.swap(e)}),this.instanceProperties.animate?125:0)},checkWin(){const s=[].concat.apply([],this.instanceProperties.gameField);s.splice(-1,1);const i=s.join("");s.sort(((e,t)=>e-t)).join("")===i&&(e.init(),this.addRecords(),e.showMessage(`Ура!Вы решили головоломку за ${t.addZero(Math.floor(t.properties.time/60))}:${t.addZero(t.properties.time%60)} и ${t.properties.steps} ходов`),this.clearInstance(),this.instanceProperties.isNewGame=!0,n.toggleHide(),t.deletePanel())},addRecords(){let e=0;const n={time:t.properties.time,steps:t.properties.steps,size:s.properties.size};e=null===localStorage.getItem("records")?[]:JSON.parse(localStorage.getItem("records")),e.push(n),this.saveRecords(e)},saveRecords(e){for(e.sort(((e,t)=>e.time>t.time?1:-1));e.length>10;)e.pop();localStorage.setItem("records",JSON.stringify(e))},swap(e){let s,n;for(let t=0;t<this.properties.size;t+=1){const i=this.instanceProperties.gameField[t].indexOf(parseInt(e.innerText,10));if(-1!==i){s=i,n=t;break}}this.properties.sounds&&this.properties.SoundFile.play();const i=this.instanceProperties.gameField[n][s],r=document.querySelector(".hide"),l=r.style.backgroundPosition;r.style.backgroundPosition=e.style.backgroundPosition,e.style.backgroundPosition=l,r.classList.remove("hide"),e.classList.add("hide"),r.innerText=i,e.innerText=0,this.instanceProperties.gameField[this.instanceProperties.nullY][this.instanceProperties.nullX]=i,this.instanceProperties.gameField[n][s]=0,this.instanceProperties.nullX=s,this.instanceProperties.nullY=n,this.properties.animate=!0,this.updateInstance(),t.increaseSteps()},clearInstance(){document.querySelector(".game-board").remove(),this.instanceProperties.isNewGame=!0,t.elements.stepsElement.innerText=0,t.elements.timeElement.innerText="00:00",this.instanceProperties.gameField=[]}},n={elements:{wrapperElement:0,menuElement:0,newGameButton:0,savedGameButton:0,recordsButton:0,fieldSizeSelector:0,inputElement:0},init(){this.elements.wrapperElement=document.createElement("div"),this.elements.menuElement=document.createElement("div"),this.elements.newGameButton=document.createElement("span"),this.elements.savedGameButton=document.createElement("span"),this.elements.recordsButton=document.createElement("span"),this.elements.fieldSizeSelector=document.createElement("select");const e=document.createElement("label");this.elements.inputElement=document.createElement("input"),this.elements.inputElement.type="checkbox",e.innerText="IMAGE",e.appendChild(this.elements.inputElement),this.elements.wrapperElement.classList.add("wrapper"),this.elements.newGameButton.innerText="New Game",this.elements.newGameButton.addEventListener("click",(()=>{this.startNewGame()})),this.elements.savedGameButton.addEventListener("click",(()=>{this.loadSaved()})),this.elements.recordsButton.addEventListener("click",(()=>{this.showRecords()})),this.elements.savedGameButton.innerText="Saved Game",this.elements.recordsButton.innerText="Records",this.elements.menuElement.classList.add("menu"),this.elements.fieldSizeSelector.setAttribute("size","1");const t=document.createElement("option");t.innerText="3x3",t.setAttribute("value","3"),this.elements.fieldSizeSelector.appendChild(t.cloneNode(!0)),t.innerText="4x4",t.setAttribute("value","4"),this.elements.fieldSizeSelector.appendChild(t.cloneNode(!0)),t.innerText="5x5",t.setAttribute("value","5"),this.elements.fieldSizeSelector.appendChild(t.cloneNode(!0)),t.innerText="6x6",t.setAttribute("value","6"),this.elements.fieldSizeSelector.appendChild(t.cloneNode(!0)),t.innerText="7x7",t.setAttribute("value","7"),this.elements.fieldSizeSelector.appendChild(t.cloneNode(!0)),t.innerText="8x8",t.setAttribute("value","8"),this.elements.fieldSizeSelector.appendChild(t.cloneNode(!0)),this.elements.fieldSizeSelector.value="4",this.elements.menuElement.appendChild(this.elements.newGameButton),this.elements.menuElement.appendChild(this.elements.savedGameButton),this.elements.menuElement.appendChild(this.elements.recordsButton),this.elements.menuElement.appendChild(this.elements.fieldSizeSelector),this.elements.menuElement.appendChild(e),this.elements.wrapperElement.appendChild(this.elements.menuElement),document.body.appendChild(this.elements.wrapperElement)},showRecords(){e.init(),e.addRecordsToForm(),e.showForm()},loadSaved(){if(null===localStorage.getItem("savedGame"))e.init(),e.showMessage("Нет сохраненной игры!");else{const e=JSON.parse(localStorage.getItem("savedGame"));t.properties.time=e.time,t.properties.steps=e.steps,s.instanceProperties.gameField=e.gameField,s.properties.size=e.size,s.instanceProperties.isNewGame=!1,s.instanceProperties.image=e.image,s.instanceProperties.containImage=e.containImage,this.startNewGame()}},startNewGame(){s.instanceProperties.isNewGame&&(s.properties.size=this.elements.fieldSizeSelector.value),s.instanceProperties.containImage=this.elements.inputElement.checked,n.toggleHide(),t.init(),s.initInstance()},toggleHide(){this.elements.menuElement.classList.toggle("hide_menu")}};n.init(),e.init(),null===localStorage.getItem("firstTime")&&(e.showMessage("Привет, в этом проекте я сделал все кроме нахождения решения. Появление цифр на блоках после загрузки игры с картинками не баг, а фича :),\n Функция, проверяющая решаемость - checkShuffle(),\n Если у вас в консоли ошибка Uncheked runtime.lastError в месте index.html:1, то проблема скорей всего в ваших расширениях. Попробуйте отключить их и загрузить приложение заново.\nJS код разбит на отдельные модули, забандлен и минифицирован Webpack'ом.\n Если захотите просмотреть данное сообщение еще раз - очистите переменную firstTime в localStorage."),localStorage.setItem("firstTime",!0))})();