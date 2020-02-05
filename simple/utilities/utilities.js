//getStyle------------------------------------------------------------------------
let getStyle = (elm,prop) => window.getComputedStyle(elm,null).getPropertyValue(prop) ;
//convert em to px and revers inside js
//get px,em as string(10px,10em) and also return string
function pxToEm(px,elm){
    px = parseFloat(px) ;
    let fontSize = parseFloat(getStyle(elm,'font-size')) ;
    return `${px/fontSize}em` ;
}
function emtoPx(em,elm){
    em = parseFloat(em) ;
    let fontSize = parseFloat(getStyle(elm,'font-size')) ;
    return `${em*fontSize}px` ;
}
//getChildIndex------------------------------------------------------------------------
let getChildIndex = (parent,targetChild) => {
    let index = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child == targetChild) {
            index = i ;
            break ;
        }
    }
    return index ;
}
//getActiveIndex------------------------------------------------------------------------
let getActiveIndex = parent => {
    let activeIndex = null ;
    let children = parent.children ;
    children = [...children] ;
    for(let i=0 ; i<children.length ; i++){
        let child = children[i] ;
        if(child.classList.contains('active')){
            activeIndex= i ;
            break ;
        }
    }
    return activeIndex ;
}
//docHandler------------------------------------------------------------------------
//we must call docHandler inside cb function of event so we have access to e.stopPropagation()  
//and we must call it
//sometimes we must create another docHandler for our special needs
function docHandler(container,others){
    //others are elements like BlackFilter,BarsMenu,... that we want to change
    //their css classes if we click outside of container
	//we should use  e.stopPropagation() on other eventListener too
    document.container = container ;
    document.others = [] ;
    others.forEach(other => {
        document.others.push(other) ;
    });
    document.addEventListener('click',docClick);
}
function docClick(e){
    e.stopPropagation();  
    let container = document.container ;
    let clickedElm = e.target ;
    if(!container.contains(clickedElm)){
        container.classList.remove('show') ;
        document.others.forEach(other => {
            other.classList.remove('show') ;
        })
        document.body.classList.remove('disableScroll') ;
        document.removeEventListener('click',docClick);
    }
}
//docHandler v2------------------------------------------------------------------------
//in bellow version there is no need for using e.stopPropagation() so we can call it anywhere 
function docHandler2(container,others){
    //others are elements like BlackFilter,BarsMenu,... that we want to change
    //their css classes if we click outside of container
    document.container = container ;
    document.others = [] ;
    others.forEach(other => document.others.push(other));
    setTimeout(()=>document.addEventListener('click',docClick2),100)
}
function docClick2(e){
    let container = document.container ;
    let clickedElm = e.target ;
    if(!container.contains(clickedElm)){
        container.classList.remove('show') ;
        document.others.forEach(other => other.classList.remove('show')) ;
        document.body.classList.remove('disableScroll') ;
        document.removeEventListener('click',docClick);
    }
}

//checkEllipse------------------------------------------------------------------------
function Ellipse(ellipse){
    this.ellipse = ellipse ;
    this.parent = this.ellipse.parentElement ;
    this.textAlign = this.ellipse.getAttribute('data-align') ;
    this.checkThreshold() ;
}
Ellipse.prototype.checkThreshold = function(){
    let threshold = parseFloat(window.getComputedStyle(this.parent,null).getPropertyValue('max-height')) ;
    if(this.parent.scrollHeight > threshold) {
        this.ellipse.style.display = 'block' ;
        this.parent.style.textAlign = 'justify' ;
        this.parent.style.paddingLeft = '2em' ;
    }
    else{
        this.parent.style.textAlign = this.textAlign ;
    }
}
// <h6>
//    <span class="ellipse" data-align="right">...</span>
//    عنوان مقاله
// </h6>
// h6{@include multiEllipse(3,$dist2,$textDark) ;}
// aside.querySelectorAll('.ellipse').forEach(ellipse=>new util.Ellipse(ellipse))    
//fixMenu------------------------------------------------------------------------
function fixMenu(menu,imgChange,img,beforeFixImg,afterFixImg){
    //we should set imgChange to true if we want to change imgAddress when we have fix Menu
    window.addEventListener('scroll',checkFixMenu) ;
    function checkFixMenu(){
        if(window.scrollY>menu.offsetHeight) {
            menu.classList.add('fix') ;
            if(imgChange) img.setAttribute('src',beforeFixImg) ;
        }
        else{
            menu.classList.remove('fix') ;
            if(imgChange) img.setAttribute('src',afterFixImg) ;
        }
    }
}
//AnimateCounter------------------------------------------------------------------------
function AnimateCounter(elm){
    this.elm = elm ;
    this.min = parseInt(this.elm.getAttribute('data-min')); 
    this.max = parseInt(this.elm.getAttribute('data-max')); 
    this.interval = parseInt(this.elm.getAttribute('data-interval')) ;
    this.time = parseInt(this.elm.getAttribute('data-time')); 
    this.stepsNum = Math.ceil(this.time/this.interval);
    this.step = Math.floor((this.max-this.min)/this.stepsNum) ;
    this.animate() ;
}
AnimateCounter.prototype.animate = function(){
    let currentVal = this.min ;
    let currStep = 0 ;
    let clear = setInterval(()=>{
        currStep++ ;
        if(currStep<this.stepsNum){
            if(currStep == this.stepsNum-1){
                currentVal=this.max;
            }
            else{
                currentVal+=this.step;
            }
            this.elm.textContent = currentVal ;
        }
        else clearInterval(clear) ;      
    },this.interval) ;
}
//Rand------------------------------------------------------------------------
let getRandInt = (min,max) => Math.floor(Math.random()*(max-min+1)+min) ;
let getRandFloat = (min,max) => Math.random()*(max-min)+min ;
//get Number/alphanumeric------------------------------------------------------------------------
function getNumArray(min,max){//return array of number between [min,max]
    let res = [] ;
    for(let i=0 ; i<=max-min ;i++){
        res.push(min+i) ;
    }
    return res ;
}
function getAlphaNumArray(){
    let num = '0123456789' ;
    let alphaLow = 'abcdefghijklmnopqrstuvwxyz' ;
    let alphaUp = alphaLow.toUpperCase() ;
    let special = `!@#$%^&*?`
    let allStr = num+alphaLow+alphaUp+special ;
    return allStr.split('') ;
}
//shuffleArray------------------------------------------------------------------------
function shuffleArray(arr){//randomize arr
    let res = [] ;
    for(let i=0 ; i<arr.length ; i++){
        let random = arr[getRandInt(0,arr.length-1)] ;
        let unique = res.every(elm=>elm!=random) ;
        if(unique) res.push(random) ;
        else i-- ;    
    }
    return res ;
}
//Timer------------------------------------------------------------------------
function Timer(min,sec,timerElm){
    this.initMin = min ;
    this.initSec = sec ;
    this.min = min ;
    this.sec = sec ;
    this.timerElm = timerElm ;
    if(this.timerElm) {
        this.minElm = this.timerElm.querySelector('.min') ;
        this.secElm = this.timerElm.querySelector('.sec') ;
        this.validateTime() ;
    }
    this.clearTimer = setInterval(this.start.bind(this),1000) ;
}
Timer.prototype.start = function(){
    this.min = parseInt(this.min) ;
    this.sec = parseInt(this.sec) ;
    if(this.sec-1>=0) this.sec-- ;   
    else{
        this.sec = 59 ;
        if(this.min-1>=0) this.min-- ;      
        else{
            this.sec = '00' ;
            this.min = '00' ;
            //timer ends here and we can call cb function 
            //to alert ending of timer
            clearInterval(this.clearTimer) ;
            return ;
        }
    }
    this.validateTime() ;
    //for add '0' if min/sec gets bellow 10
    //for set timerElm
}
Timer.prototype.validateTime = function(){
    if(this.min<10) this.min = `0${this.min}` ;
    if(this.sec<10) this.sec = `0${this.sec}` ;
    if(this.timerElm){
        this.minElm.textContent = this.min ;
        this.secElm.textContent = this.sec ;
    }
}
Timer.prototype.resetTimer = function(){
    this.min = this.initMin ;
    this.sec = this.initSec ;
    this.validateTime() ;
    clearInterval(this.clearTimer) ;
    this.clearTimer = setInterval(this.start.bind(this),1000) ;
}
//findMinMax------------------------------------------------------------------------
function heightMinMax(minmax,elms){
    //minmax can be 'min','max'
    //elms are array of elements(DOM elements) we need to check them 
    //lookFor can be name css property like 'height'
    elms = [...elms] ;
    let res = null ;
    let compareArray = [] ;
    elms.forEach(elm => compareArray.push(elm.scrollHeight));    
    if(minmax == 'min'){
        compareArray.sort((a,b)=>{
            if(a>b) return 1;
            else return -1;
        })
    }
    else if(minmax == 'max'){
        compareArray.sort((a,b)=>{
            if(a<b) return 1 ;
            else return -1 ;
        });
    }
    res = compareArray[0] ;
    return res ;
}
//find which <option> is clicked inside <select>
function findOption(select,cb){
    let options = select.querySelectorAll('option') ;
    let selectedOption = null ;
    select.addEventListener('change',e=>{
        for(let i=0 ; i<options.length ; i++){
            let option = options[i];
            if(select.value == option.value){
                selectedOption = option ;
                cb(selectedOption) ;
                break ;
            }
        }
    })
    return selectedOption ;
}
//find distance from viewport
function viewportDist(elm,dir,unit){
    let res = null ;
    switch(dir){
        case 'top': //top of element from top of viewport
            if(unit == 'px') res = elm.getBoundingClientRect().top;
            else if(unit =='em') res = parseFloat(pxToEm(elm.getBoundingClientRect().top,elm));
            break ;
        case 'left': //left of element from left of viewport
                if(unit == 'px') res = elm.getBoundingClientRect().left;
                else if(unit =='em') res = parseFloat(pxToEm(elm.getBoundingClientRect().left,elm));
                break; 
        case 'bottom': //bottom of element from bottom of viewport
            if(unit == 'px') res = window.innerHeight - elm.getBoundingClientRect().bottom;
            else if(unit =='em') res = parseFloat(pxToEm(window.innerHeight,document.body)) - parseFloat(pxToEm(elm.getBoundingClientRect().bottom,elm));
            break ;
        case 'right': //right of element from right of viewport
            if(unit == 'px') res = window.innerWidth - elm.getBoundingClientRect().right;
            else if(unit =='em') res = parseFloat(pxToEm(window.innerWidth,document.body)) - parseFloat(pxToEm(elm.getBoundingClientRect().right,elm));
            break ;
        default:
            console.error('dir is wrong inside viewportDist') ;
    }
    return res
}
// let font = new FontFaceObserver('iranSans') ;
// font.load().then(()=>{
//     console.log(util.viewportDist(document.querySelector('.elm'),'top','px')) ;
// });
function parentDist(elm,dir,unit,parent){
    //unit can be 'px'/'em'
    //dir can be 'top','bottom','left','right'
    let res = null ;
    switch(dir){
        case 'top': //top of element from top of parent
            if(unit == 'px') res = elm.offsetTop;
            else if(unit =='em') res = parseFloat(pxToEm(elm.offsetTop,elm));
            break ;
        case 'left': //left of element from left of parent
                if(unit == 'px') res = elm.offsetLeft;
                else if(unit =='em') res = parseFloat(pxToEm(elm.offsetLeft,elm));
                break; 
        case 'bottom': //bottom of element from bottom of parent
            if(unit == 'px') res = parent.offsetHeight - (elm.offsetTop+elm.offsetHeight);
            else if(unit =='em') res = parseFloat(pxToEm(parent.offsetHeight,parent)) - (parseFloat(pxToEm(elm.offsetTop,elm))+parseFloat(pxToEm(elm.offsetHeight,elm)));
            break ;
        case 'right': //right of element from right of parent
            if(unit == 'px') res = parent.offsetWidth - (elm.offsetLeft+elm.offsetWidth);
            else if(unit =='em') res = parseFloat(pxToEm(parent.offsetWidth,parent)) - (parseFloat(pxToEm(elm.offsetLeft,elm))+parseFloat(pxToEm(elm.offsetWidth,elm)));
            break ;
        default:
            console.error('dir is wrong inside viewportDist') ;
    }
    return res ;
}
// let font = new FontFaceObserver('iranSans') ;
// font.load().then(()=>{
//     console.log(util.parentDist(document.querySelector('.child'),'top','px',document.querySelector('.parent'))) ;
//     console.log(util.parentDist(document.querySelector('child'),'top','em',document.querySelector('.parent'))) ;
//     .parent must be nearest positioned parent
// });
//check if something is inside viewport or not 
function isInsideViewport(elm,mode){
    //mode can be 'partOf' or 'full;
    let top = null ;
    let left = null ;
    switch(mode){
        case 'partOf':
            top = (window.innerHeight>elm.getBoundingClientRect().top&&elm.getBoundingClientRect().top+elm.offsetHeight>0)?true:false;
            left = (window.innerWidth>elm.getBoundingClientRect().left&&elm.getBoundingClientRect().left+elm.offsetWidth>0)?true:false;
            return (top&&left)
            break ;
         case 'full':
            top = (elm.getBoundingClientRect().bottom<window.innerHeight&&elm.getBoundingClientRect().top>0)?true:false;
            left = (elm.getBoundingClientRect().right<window.innerWidth&&elm.getBoundingClientRect().right>0)?true:false;
            return (top&&left)
            break;
        default:
            console.error('mode is out of bound inside isInsideViewport');
    }
}
// let elms = document.querySelectorAll('.elm') ;
// window.addEventListener('scroll',e=>{
//     elms.forEach(elm=>console.log(elm,util.isInsideViewport(elm,'partOf'))) ;
// })
//lazy loading
class Lazy{
    //we can add .gif loader or default img or blur of target img
    constructor(elm,viewportMode,imgType){
        //viewportMode can be 'full','partOf'
        //imgType can be 'img' or 'bgImg'
        this.elm = elm ;
        this.viewportMode = viewportMode ;
        this.imgType = imgType ;
        this.src = this.elm.getAttribute('data-src') ;
        this.init() ;
    }
    init(){
        this.handleEvent(null) ;
        window.addEventListener('scroll',this) ;
    }
    handleEvent(e){
        switch(this.imgType){
            case 'img':
                if(isInsideViewport(this.elm,this.viewportMode)) {
                    this.elm.setAttribute('src',this.src) ;
                    window.removeEventListener('scroll',this) ;
                }
                break ;
            case 'bgImg':
                if(isInsideViewport(this.elm,this.viewportMode)) {
                    this.elm.style.backgroundImage = `url(${this.src})` ;
                    window.removeEventListener('scroll',this) ;
                }
                break;
            default:
                console.error('imgType inside Lazy is wrong')
        }
    }
}
//<img class="lazy" src="../assets/imgs/gifs/loader.gif" data-src="../assets/imgs/slide1.jpg" alt="loaderAlt">
//<img class="lazy" src="../assets/imgs/gifs/loader.gif" data-src="../assets/imgs/slide2.jpg" alt="loaderAlt">
//document.querySelectorAll('.lazy').forEach(lazy=>new util.Lazy(lazy,'partOf','bgImg'))
//OR
//<div class="lazy" data-src="../assets/imgs/slide1.jpg"></div>
//<div class="lazy" data-src="../assets/imgs/slide2.jpg"></div>
//background-image:url('../../assets/imgs/gifs/loader.gif') for .lazy
//document.querySelectorAll('.lazy').forEach(lazy=>new util.Lazy(lazy,'partOf','img'))
class ScrollAnimation{
    constructor(elm,viewportMode,dir,animeMode,time,easing,offset){
        //viewportMode can be 'partOf','full'
        //dir can be top,right,bottom,right
        //animeMode can be 'fade' or 'fadeMove'
        //time need to be something like .5s 
        //easing need to be something like linear,cubic-bezier(a,b,c,d)
        //offset need to be something like -6em
        this.elm = elm ;
        this.viewportMode = viewportMode ;
        this.dir = dir ;
        this.animeMode = animeMode ;
        this.time = time ;
        this.easing = easing ;
        this.offset = offset ;
        this.init() ;
    }
    init(){
        switch(this.dir){
            case 'top':
                this.elm.style.transform = `translate(0,-${this.offset})` ;
                break;
            case 'right':
                this.elm.style.transform = `translate(${this.offset},0)` ;
                break ;
            case 'bottom':
                this.elm.style.transform = `translate(0,${this.offset})` ;
                break ;
            case 'left':
                this.elm.style.transform = `translate(-${this.offset},0)` ;
                break ;
            case '':
                break;
            default:
                console.error('dir is wrong inside ScrollAnimation')
        }
        this.elm.style.transition = `all ${this.time} ${this.easing}`;
        this.handleEvent(null) ;
        window.addEventListener('scroll',this) ;
    }
    handleEvent(e){
        switch(this.animeMode){
            case 'fade':
                if(isInsideViewport(this.elm,this.viewportMode)){
                    this.elm.classList.add('fade') ;
                    window.removeEventListener('scroll',this) ;
                }
                break;
            case 'fadeMove':
                if(isInsideViewport(this.elm,this.viewportMode)){
                    this.elm.classList.add('fade') ;           
                    this.elm.style.transform = 'translate(0,0)' ;    
                    window.removeEventListener('scroll',this) ;
                }          
                break;
            default:
                console.error('animeMode inside ScrollAnimation is wrong')
        }
    }
}
// <div class="scrollFade"></div>
// <div class="scrollFade"></div>
// document.querySelectorAll('.scrollFade').forEach(scrollFade=>new util.ScrollAnimation(scrollFade,'partOf','','fade','1s','ease-in-out','0'))
//OR
// <div class="scrollFadeMove"></div>
// <div class="scrollFadeMove"></div>
// document.querySelectorAll('.scrollFadeMove').forEach((scrollFadeMove,i)=>new util.ScrollAnimation(scrollFadeMove,'partOf','left','fadeMove','1s','ease-in-out','6em'));
//converts----------------------------------------------------
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
//detect touch devices----------------------------------------------------
function isTouchDevice() {//return true/false ... false on desktop dev-tool and true on mobile dev-tool
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    var mq = query=> window.matchMedia(query).matches  
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) return true;
    var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}
//move elm on mousemove event----------------------------------------------------
class MoveElm{ //touch,non-touch compatible
    constructor(container,elm){
        this.container = container ;
        this.elm = elm ;
        this.inInside = null ;
        this.init() ;
    }
    init(){
        if(!isTouchDevice()) this.container.addEventListener('mousemove',this.moveElm.bind(this)) ;    
        else this.container.addEventListener('touchmove',this.moveElmTouch.bind(this)) ;     
    }
    moveElm(e){ //for non-touch devices
        let topInside = null ;
        let rightInside = null ;
        topInside = (e.y-this.elm.offsetWidth/2>this.container.getBoundingClientRect().top&&e.y+this.elm.offsetHeight/2<this.container.getBoundingClientRect().bottom)?true:false ;
        rightInside = (e.x-this.elm.offsetWidth/2>this.container.getBoundingClientRect().left&&e.x+this.elm.offsetWidth/2<this.container.getBoundingClientRect().right)?true:false ;
        this.inInside = (topInside&&rightInside)?true:false ;
        if(this.inInside){
            let topPos = (e.y-this.container.getBoundingClientRect().top)-(this.elm.offsetHeight/2) ;
            let rightPos = ((window.innerWidth-e.x)-(window.innerWidth-this.container.getBoundingClientRect().right)) - (this.elm.offsetWidth/2) ; 
            this.elm.style.top = `${topPos}px` ;
            this.elm.style.right = `${rightPos}px` ;
        }
    }
    moveElmTouch(e){ //for touch devices
        let x = e.targetTouches[0].clientX;
        let y = e.targetTouches[0].clientY;
        let topInside = null ;
        let rightInside = null ;
        topInside = (y-this.elm.offsetWidth/2>this.container.getBoundingClientRect().top&&y+this.elm.offsetHeight/2<this.container.getBoundingClientRect().bottom)?true:false ;
        rightInside = (x-this.elm.offsetWidth/2>this.container.getBoundingClientRect().left&&x+this.elm.offsetWidth/2<this.container.getBoundingClientRect().right)?true:false ;
        this.inInside = (topInside&&rightInside)?true:false ;
        if(this.inInside){
            let topPos = (y-this.container.getBoundingClientRect().top)-(this.elm.offsetHeight/2) ;
            let rightPos = ((window.innerWidth-x)-(window.innerWidth-this.container.getBoundingClientRect().right)) - (this.elm.offsetWidth/2) ; 
            this.elm.style.top = `${topPos}px` ;
            this.elm.style.right = `${rightPos}px` ;
        }
    }
}
//new MoveElm(document.querySelector('.container'),document.querySelector('.elm'))
//move elm on draging----------------------------------------------------
class DragElm{
    constructor(container,elm){
        this.container = container ;
        this.elm = elm ;
        this.drag = null ;
        this.device = isTouchDevice()?'touch':'non-touch' ;
        this.init() ;
    }
    init(){
        if(this.device!='touch') {
            this.elm.addEventListener('mousedown',e=>{
                this.drag = true ;
                this.elm.addEventListener('mousemove',this) ;
            }) ;
            this.elm.addEventListener('mouseup',e=>{
                this.drag=false;
                this.elm.removeEventListener('mousemove',this) ;
            }) ;
        }
        else {
            this.elm.addEventListener('touchstart',e=>{
                this.drag = true ;
                this.elm.addEventListener('touchmove',this) ;
            }) ;
            this.elm.addEventListener('touchend',e=>{
                this.drag=false;
                this.elm.removeEventListener('touchmove',this) ;
            }) ;
        }
    }
    handleEvent(e){//drag element
        let topPos = null ;
        let rightPos = null ;
        let topInside = null ;
        let rightInside = null ;
        if(this.device!='touch'){
            topInside=(e.y-this.elm.offsetHeight/2>this.container.getBoundingClientRect().top&&e.y+this.elm.offsetHeight/2<this.container.getBoundingClientRect().bottom)?true:false ;
            rightInside=(e.x-this.elm.offsetWidth/2>this.container.getBoundingClientRect().left&&e.x+this.elm.offsetWidth/2<this.container.getBoundingClientRect().right)?true:false ;
            if(topInside&&rightInside){
                topPos = (e.y-this.container.getBoundingClientRect().top)-this.elm.offsetHeight/2;
                rightPos = (window.innerWidth-e.x)-(window.innerWidth-this.container.getBoundingClientRect().right)-(this.elm.offsetWidth/2);
                this.elm.style.top = `${topPos}px` ;
                this.elm.style.right = `${rightPos}px` ;
            }
        }
        else{
            let x = e.targetTouches[0].clientX ;
            let y = e.targetTouches[0].clientY ;
            topInside=(y-this.elm.offsetHeight/2>this.container.getBoundingClientRect().top&&y+this.elm.offsetHeight/2<this.container.getBoundingClientRect().bottom)?true:false ;
            rightInside=(x-this.elm.offsetWidth/2>this.container.getBoundingClientRect().left&&x+this.elm.offsetWidth/2<this.container.getBoundingClientRect().right)?true:false ;
            if(topInside&&rightInside){
                topPos = (y-this.container.getBoundingClientRect().top)-this.elm.offsetHeight/2;
                rightPos = (window.innerWidth-x)-(window.innerWidth-this.container.getBoundingClientRect().right)-(this.elm.offsetWidth/2);
                this.elm.style.top = `${topPos}px` ;
                this.elm.style.right = `${rightPos}px` ;
            }
        }
    }
}
//new DragElm(document.querySelector('.container'),document.querySelector('.elm')) ;
//clear parent(remove children)------------------------------------------------------------------------
function clearParent(parent){ //totally clear parent(any node like elm node,text node,...)
    while(parent.hasChildNodes()) parent.removeChild(parent.lastChild) ;
}
//clearParent(document.querySelector('.container')) ;
function removeChildren(children){//just remove specific childrens
    children.forEach(child=>child.parentElement.removeChild(child)) ;
}
//removeChildren(document.querySelectorAll('.elm2')) ;
//reveal effect
class Reveal{
    constructor(reveal,revealMode,time){
        this.reveal = reveal ;
        this.revealMode = revealMode ;
        this.time = time ; //like 1 , 1.2 , 2 ,...
        this.block = this.reveal.querySelector('.block') ;
        this.init() ;
    }
    init(){
        this.block.style.transitionDuration = `${this.time}s` ;
        if(this.block.getAttribute('data-color')) this.block.style.backgroundColor = this.block.getAttribute('data-color') ;
        if(this.block.getAttribute('data-gradient')) this.block.style.backgroundImage = this.block.getAttribute('data-gradient') ;
        window.addEventListener('scroll',this) ;
    }
    handleEvent(e){
        if(isInsideViewport(this.reveal,this.revealMode)){
            this.reveal.classList.add('show') ;
            this.block.classList.add('hide') ;
            window.removeEventListener('scroll',this) ;
        }
    }
}
//document.querySelectorAll('.blockReveal').forEach(reveal=>new util.Reveal(reveal,'partOf',1))
//-------------------------------------------------
class Reveal2{
    constructor(reveal,revealMode,time){
        this.reveal = reveal ;
        this.revealMode = revealMode ;
        this.time = time ; //like 1 , 1.2 , 2 ,...
        this.block = this.reveal.querySelector('.block') ;
        this.contents = this.reveal.querySelectorAll('.content') ;
        this.init() ;
    }
    init(){
        this.contents.forEach(content=>content.style.transitionDelay=`${this.time/2}s`)
        this.block.style.animationDuration = `${this.time}s` ;
        if(this.block.getAttribute('data-color')) this.block.style.backgroundColor = this.block.getAttribute('data-color') ;
        if(this.block.getAttribute('data-gradient')) this.block.style.backgroundImage = this.block.getAttribute('data-gradient') ;
        window.addEventListener('scroll',this) ;
    }
    handleEvent(e){
        if(isInsideViewport(this.reveal,this.revealMode)){
            this.contents.forEach(content=>content.classList.add('show'));
            this.block.classList.add('hide') ;
            window.removeEventListener('scroll',this) ;
        }
    }
}
// document.querySelectorAll('.blockReveal2').forEach(reveal=>new util.Reveal2(reveal,'partOf',1))
//scroll------------------------------------------------------------------------
function hasScroll(elm){
    let condition1 = elm.offsetHeight<elm.scrollHeight?true:false ;
    //when content height is more than max-height or real height of element
    let condition2 = (getStyle(elm,'overflow')!='hidden')?true:false;
    //if some element has height but overflow:hidden we don't see scrollbar 
    //but still has scroll 
    return (condition1&&condition2) ;
}
class SmoothScroll{
    constructor(trigger){
        this.trigger = trigger ;
        this.target = document.querySelector(`#${this.trigger.getAttribute('data-target')}`) ;
        this.init() ;
    }
    init(){
        this.trigger.addEventListener('click',e=>{
            window.scrollTo({
                top: this.target.getBoundingClientRect().top,
                left: 0 ,
                behavior: 'smooth'
            })
        })
    }
}
//document.querySelectorAll('.smoothScroll').forEach(smooth=> new util.SmoothScroll(smooth)) ;
// <button class="smoothScroll" data-target="smoothTarget">smooth</button>
// <div id="smoothTarget"></div>
//force full height on child
//when height of parent is set to auto then 100% for height of child will not work
let forceFullHeight = elm=>elm.style.height = pxToEm(elm.parentElement.offsetHeight,elm.parentElement)
//we should add class="forceFull" on each child that we want to make then 100% height
// document.querySelectorAll('.forceFull').forEach(force=>{
//     let font = new FontFaceObserver('iranSans');
//     font.load().then(()=>forceFullHeight(force));
// }) ;
//prevent touch screens scroll conflict
function preventBodyScroll(elm){
    elm.addEventListener('touchmove',startTouch) ;
    elm.addEventListener('touchend',stopTouch) ;
    function startTouch(e){
        if(!hasScroll(elm)){
            e.preventDefault() ;
            document.body.classList.add('disableScroll') ;
        }
    }
    function stopTouch(e){
        document.body.classList.remove('disableScroll') ;
    }
}
//we should add .preventBodyScroll class only on elements that we dont want scroll on them
//check menu mobile of 'sambad-tour'
//mobileMenu.querySelectorAll('.preventBodyScroll').forEach(elm=>preventBodyScroll(elm)) ;
//fadeEffect ----------------------------------
//fadeEffect ----------------------------------
//fadeEffect ----------------------------------
class FadeEffect{
    constructor(elm,size,color){ //size should be something line '15em','50%'
        this.elm = elm ;
        this.size = size ;
        this.color = color ;
        this.fade = this.elm.querySelector('.fade') ;
        this.init() ;
    }
    init(){
        if(this.fade.classList.contains('top')) {
            this.fade.style.height = this.size ; 
            this.fade.style.backgroundImage = `linear-gradient(to bottom,${this.color} 0%,transparent 100%)` ; 
        }
        else if(this.fade.classList.contains('topRev')) {
            this.fade.style.height = this.size ; 
            this.fade.style.backgroundImage = `linear-gradient(to bottom,transparent 0%,${this.color} 100%)` ; 
        }
        else if(this.fade.classList.contains('bottom')) {
            this.fade.style.height = this.size ; 
            this.fade.style.backgroundImage = `linear-gradient(to top,${this.color} 0%,transparent 100%)` ; 
        }
        else if(this.fade.classList.contains('right')){
            this.fade.style.width = this.size ; 
            this.fade.style.backgroundImage = `linear-gradient(to left,${this.color} 0%,transparent 100%)` ; 
        } 
        else if(this.fade.classList.contains('left')) {
            this.fade.style.width = this.size ; 
            this.fade.style.backgroundImage = `linear-gradient(to right,${this.color} 0%,transparent 100%)` ; 
        }
    }
}
// <div class="fadeEffect">
//     ...
//     <div class="fade bottom"></div>
// </div>
//document.querySelectorAll('.fadeEffect').forEach(fadeEffect=>new FadeEffect(fadeEffect,'100%','white'));
//SwapIconText ----------------------------------
//SwapIconText ----------------------------------
//SwapIconText ----------------------------------
class SwapIconText{
    constructor(elm,initText,changeText,initIcons,changeIcons,fadeElm){
        //initIcon,changeIcon is array of css class lists --> ['fas','fa-plus']
        this.elm = elm ;
        this.initText = initText ;
        this.changeText = changeText ;
        this.initIcons = initIcons ;
        this.changeIcons = changeIcons ;
        this.fadeElm = fadeElm ;
        this.icon = this.elm.querySelector('.icon') ;
        this.text = this.elm.querySelector('.text') ;
        this.isInit = true ;
        this.init() ;
    }
    init(){
        if(this.icon){
            this.icon.getAttribute('class','');
            this.icon.classList.add('icon') ;
            this.initIcons.forEach(iconClass=>this.icon.classList.add(iconClass)) ;
        }
        if(this.text) this.text.textContent = this.initText ;
        this.elm.addEventListener('click',this.toggleContent.bind(this)) ;
    }
    toggleContent(e){
        this.isInit = !this.isInit ;
        if(this.icon){
            this.initIcons.forEach(initIcon=>this.icon.classList.toggle(initIcon)) ;
            this.changeIcons.forEach(changeIcon=>this.icon.classList.toggle(changeIcon)) ;
        }
        if(this.text){
            if(this.isInit) this.text.textContent = this.initText ;
            else this.text.textContent = this.changeText ;
        }
        if(this.fadeElm) this.fadeElm.classList.toggle('hide') ;
        this.others.forEach(other=>{
            if(other.icon){
                other.changeIcons.forEach(changeIcon=>other.icon.classList.remove(changeIcon)) ;
                other.initIcons.forEach(initIcon=>other.icon.classList.add(initIcon)) ;
            }
            if(other.text) other.text.textContent = other.initText ; 
            if(other.fadeElm&&!other.isInit) other.fadeElm.classList.remove('hide') ;
            other.isInit = true ;
        })
    }
}
// <div class="swapIconText">
//    <i class="icon"></i>
//    <p class="text"></p>
// </div>
// let swapInstances = [] ;
// moreInfo.querySelectorAll('.swapIconText').forEach(swap=>swapInstances.push(new SwapIconText(swap,'نمایش بیشتر','نمایش کمتر',['fas','fa-plus'],['fas','fa-minus'],swap.parentElement.querySelector('.fade'))));
// swapInstances.forEach((swapInstance,i,all)=>{
//    all = [...all] ;
//    let others = all.filter(instance=>instance!=swapInstance)
//    swapInstance.others = others ;
// })
//fix dom element with thresholds---------------------
//fix dom element with thresholds---------------------
//fix dom element with thresholds---------------------
class FixElm{
    constructor(elm,stopElm,threshold,afterCb,beforeCb){
        //stop is that element that we want to remove fix class if we reach that element
        //threshold is size of screen and bellow that width we dont fix anything
        this.elm = elm ;
        this.stopElm = stopElm ;
        this.threshold = threshold ;
        this.afterCb = afterCb ;
        this.beforeCb = beforeCb ;
        this.init() ;
    }
    init(){
        if(window.innerWidth>this.threshold) window.addEventListener('scroll',this) ;
    }
    handleEvent(e){
        if(window.scrollY>this.elm.getBoundingClientRect().top){
            this.elm.classList.add('fix') ;
            this.afterCb() ;
        }
        else{
            this.elm.classList.remove('fix') ;
            this.beforeCb() ;
        }
        if(this.stopElm.getBoundingClientRect().top<window.innerHeight) {
            this.elm.classList.remove('fix') ; 
            this.beforeCb() ;
        }
    }
}
//new FixElm(document.querySelector('.leftSection'),document.querySelector('footer'),850)
class AppendDOM{
    constructor(container,clone,trigger,cb){
        this.container = container ;
        this.clone = clone ;
        this.trigger = trigger ;
        this.cb = cb ;
        this.init() ;
    }
    init(){
        this.trigger.addEventListener('click',this.append.bind(this)) ;
    }
    append(){
        let newElm = null ;
        this.container.insertBefore(
            newElm = this.clone.cloneNode(true),
            this.trigger
        ) ;
        if(this.cb) this.cb(newElm) ;    
    }
}
// <div class="appendDOM">
//     <div class="cloneMe"></div>
//     <div class="appendTrigger"></div>
// </div>
// new AppendDOM(
//     <Elm>.querySelector('.appendDOM'),
//     <Elm>.querySelector('.cloneMe'),
//     <Elm>.querySelector('.appendTrigger'),
//     function(newElm){//executed after we append to DOM}
// )

class MenuToggle{
    constructor(menuTrigger,menu,blackFilter){
        this.menuTrigger = menuTrigger ;
        this.menu = menu ;
        this.blackFilter = blackFilter ;
        this.init() ;
    }
    init(){
        this.menuTrigger.addEventListener('click',this.toggleMenu.bind(this)) ;
    }
    toggleMenu(e){
        e.stopPropagation() ;
        this.menuTrigger.classList.toggle('show') ;
        this.menu.classList.toggle('show') ;
        if(this.blackFilter) this.blackFilter.classList.toggle('show') ;
        if(this.menu.classList.contains('show')) docHandler(this.menu,[this.blackFilter,this.menuTrigger]);
        document.body.classList.toggle('disableScroll') ;
    }
}
//exports------------------------------------------------------------------------
// export default{
//     getStyle,
//     getChildIndex,
//     getActiveIndex,
//     docHandler,
//     docHandler2,
//     Ellipse,
//     fixMenu,
//     AnimateCounter,
// 	getRandInt,
// 	getRandFloat,
// 	getNumArray,
// 	getAlphaNumArray,
//     shuffleArray,
//     Timer,
//     pxToEm,
//     emtoPx,
//     heightMinMax,
//     findOption,
//     viewportDist,
//     parentDist,
//     isInsideViewport,
//     Lazy,
//     ScrollAnimation,
// 	urlBase64ToUint8Array,
// 	isTouchDevice,
// 	MoveElm,
// 	DragElm,
// 	clearParent,
//     removeChildren,
//     Reveal ,
//     Reveal2 ,
//     hasScroll ,
//     SmoothScroll ,
//     forceFullHeight,
//     preventBodyScroll,
//     FadeEffect,
//     SwapIconText,
//     FixElm,
//     AppendDOM,
//     MenuToggle
// }