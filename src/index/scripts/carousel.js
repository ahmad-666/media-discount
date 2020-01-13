import Tabs from '../../utilities/scripts/tabs.js' ;
import SliderCarousel from '../../utilities/scripts/sliderCarousel.js' ;
let slidersWrapper = document.querySelector('#sliders') ;
document.querySelectorAll('.tabs_wrapper').forEach(tabWrapper=>new Tabs(tabWrapper));
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',sliderHandler)) ;
let currInstance = null ;
sliderHandler(null) ;
function sliderHandler(e){
    let target = null ;
    if(!e) currInstance = new SliderCarousel(document.querySelector('#newSlider')) ; 
    else{
        target = this.getAttribute('data-target') ;
        if(currInstance) currInstance.destroy() ;
        currInstance = new SliderCarousel(document.querySelector(`#${target}`)) ;
    }
}