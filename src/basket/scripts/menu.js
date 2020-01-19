import Menu from '../../utilities/scripts/menu.js' ;
let blackFilter = document.querySelector('#blackFilter') ;
new Menu(
    document.querySelector('#menu'),
    document.querySelector('#menuTrigger'),
    ()=>{
        blackFilter.classList.add('show') ;
    },
    ()=>{
        blackFilter.classList.remove('show') ;
    }
) ;