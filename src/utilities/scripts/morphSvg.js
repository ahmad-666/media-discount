import anime from 'animejs' ;
class Morph{
    constructor(wrapper,trigger,viewport,morphStages,animeProps){
        this.wrapper = wrapper ;
        this.trigger = trigger ;
        this.viewport = viewport ;
        this.morphStages = morphStages ;
        this.animeProps = animeProps ;   
        this.morphed = false ;
        this.init() ;
    }
    init(){
        this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        this.svg.setAttribute('xmlns',"http://www.w3.org/2000/svg") ;
        this.svg.setAttribute('xmlns:xlink',"http://www.w3.org/1999/xlink") ;
        this.svg.setAttribute('preserveAspectRatio',"none") ;
        this.svg.setAttribute('viewport',this.viewport) ;
        this.path = document.createElementNS("http://www.w3.org/2000/svg","path");
        this.path.setAttribute('d',this.morphStages[0]) ;
        this.svg.appendChild(this.path) ;
        //this.wrapper.appendChild(this.svg) ;
        this.wrapper.insertBefore(this.svg,this.trigger) ;
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
            if(this.morphStages[1]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeInQuint' ,
                    begin: anime=>this.trigger.classList.add('move') ,
                    d: this.morphStages[1],
                },0);
            }
            if(this.morphStages[2]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeOutElastic(3,.6)' ,
                    d: this.morphStages[2],
                },'+=0')
            }
        }
        else {
            if(this.morphStages[3]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeInQuint' ,
                    complete: anime=>this.trigger.classList.remove('move') ,
                    d: this.morphStages[3],
                },0);
            }
            if(this.morphStages[0]){
                tl.add({
                    targets: this.path ,
                    easing: 'easeOutElastic(4,.8)' ,
                    d: this.morphStages[0],
                },'+=0')
            }
        } 
    }
}
export default Morph ;