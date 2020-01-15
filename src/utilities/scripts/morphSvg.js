import anime from 'animejs' ;
class ElasticMenu{
    constructor(wrapper,trigger,viewport,elasticStages,animeProps){
        this.wrapper = wrapper ;
        this.trigger = trigger ;
        this.viewport = viewport ;
        this.elasticStages = elasticStages ;
        this.animeProps = animeProps ;   
        this.morphed = false ;
        this.appendTo = this.wrapper.querySelector('.menu') ;
        this.ul = this.wrapper.querySelector('ul') ;
        this.lis = this.ul.querySelectorAll('li') ;
        this.init() ;
    }
    init(){
        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.setAttribute('xmlns',"http://www.w3.org/2000/svg") ;
        this.svg.setAttribute('xmlns:xlink',"http://www.w3.org/1999/xlink") ;
        this.svg.setAttribute('preserveAspectRatio',"none") ;
        this.svg.setAttribute('viewport',this.viewport) ;
        this.path = document.createElementNS("http://www.w3.org/2000/svg","path");
        this.path.setAttribute('d',this.elasticStages[0]) ;
        this.svg.appendChild(this.path) ;
        //this.wrapper.appendChild(this.svg) ;
        this.appendTo.appendChild(this.svg) ;
        if(this.trigger) this.trigger.addEventListener('click',this.morph.bind(this)) ;
    }
    morph(){
        this.morphed = !this.morphed ;
        let tl = anime.timeline({
            duration : this.animeProps.duration,
            delay: this.animeProps.delay,
            direction : this.animeProps.direction,
            loop : this.animeProps.loop
        }) ;
        if(this.morphed){
            if(this.elasticStages[1]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeInQuint' ,
                    begin: anime=>{
                        this.trigger.classList.add('move');
                        this.trigger.classList.remove('fa-bars') ;
                        this.trigger.classList.add('fa-times') ;
                    } ,
                    d: this.elasticStages[1],
                },0);
            }
            if(this.elasticStages[2]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeOutElastic(3,.6)' ,
                    d: this.elasticStages[2],
                    complete: anim=>{
                        this.ul.classList.add('show') ;
                    }
                },'+=0') ;
                tl.add({
                    targets: this.lis ,
                    easing: 'easeInOutQuint' ,
                    delay: anime.stagger(75),
                    duration: 3050,
                    translateX : 0
                },'+=0')
            }
        }
        else {
            if(this.elasticStages[3]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeInQuint' ,
                    complete: anime=>{
                        this.trigger.classList.remove('move');
                        this.trigger.classList.remove('fa-times') ;
                        this.trigger.classList.add('fa-bars') ;
                    } ,
                    d: this.elasticStages[3],
                },0);
            }
            if(this.elasticStages[0]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeOutElastic(4,.8)' ,
                    d: this.elasticStages[0],
                },'+=0')
            }
        } 
    }
}

// let elastic = document.querySelector('#elastic') ;
// let elasticTrigger = elastic.querySelector('#elasticTrigger') ;
// let elasticStages1 = { //init state
//     start:{x: elastic.offsetWidth-8,y: 0},
//     curve:{cx: 0,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
// };
// let elasticStages2 = { //curve state
//     start:{x: elastic.offsetWidth-8,y: 0},
//     curve:{cx:-300,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
// };
// let elasticStages3 = { //final state
//     start:{x: 30,y: 0},
//     curve:{cx:0,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
// };
// let elasticStages4 = { //reverse curve
//     start:{x: 30,y: 0},
//     curve:{cx:250,cy:elastic.offsetHeight/2,endX:0,endY:elastic.offsetHeight}
// };
// new ElasticMenu(
//     elastic,elasticTrigger,'0 0 1200 800',
//     [
//     `M${elasticStages1.start.x},${elasticStages1.start.y} q${elasticStages1.curve.cx},${elasticStages1.curve.cy} ${elasticStages1.curve.endX},${elasticStages1.curve.endY}`,
//     `M${elasticStages2.start.x},${elasticStages2.start.y} q${elasticStages2.curve.cx},${elasticStages2.curve.cy} ${elasticStages2.curve.endX},${elasticStages2.curve.endY}`,
//     `M${elasticStages3.start.x},${elasticStages3.start.y} q${elasticStages3.curve.cx},${elasticStages3.curve.cy} ${elasticStages3.curve.endX},${elasticStages3.curve.endY}`,
//     `M${elasticStages4.start.x},${elasticStages4.start.y} q${elasticStages4.curve.cx},${elasticStages4.curve.cy} ${elasticStages4.curve.endX},${elasticStages4.curve.endY}`
//     ],
//     {
//         duration:700,
//         delay:0,
//         loop:1,
//         direction:'normal'
//     }
// )

export default ElasticMenu ;