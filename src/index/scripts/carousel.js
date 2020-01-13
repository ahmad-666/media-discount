import Tabs from '../../utilities/scripts/tabs.js' ;
import SliderCarousel from '../../utilities/scripts/sliderCarousel.js' ;
let slidersWrapper = document.querySelector('#sliders') ;
document.querySelectorAll('.tabs_wrapper').forEach(tabWrapper=>new Tabs(tabWrapper));
slidersWrapper.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',initSlider)) ;
let newSlider = null ;
let discountSlider = null ;
let popularSlider = null ;
initSlider(null) ;
function initSlider(e){
    let targetSlider = null ;
    if(!e) targetSlider = 'newSlider' ;
    else targetSlider = this.getAttribute('data-target') ;
    switch(targetSlider){
        case 'newSlider':
            newSlider = new SliderCarousel(slidersWrapper.querySelector('#newSlider')) ;
            discountSlider = null ;
            popularSlider = null ;
            break ; 
        case 'discountSlider':
            newSlider = null ;
            discountSlider = new SliderCarousel(slidersWrapper.querySelector('#discountSlider')) ;
            popularSlider = null ; 
            break ;
        case 'popularSlider':
            newSlider = null ;
            discountSlider = null ;
            popularSlider = new SliderCarousel(slidersWrapper.querySelector('#popularSlider')) ;
            break ;
    }
}
