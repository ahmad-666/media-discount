class Menu{
    constructor(menu,trigger,afterMenuOpen,afterMenuClose){
        this.menu = menu ;
        this.trigger = trigger ;
        this.afterMenuOpen = afterMenuOpen ;
        this.afterMenuClose = afterMenuClose ;
        this.init() ;
    }
    init(){
        this.trigger.addEventListener('click',this.toggleMenu.bind(this)) ;
    }
    toggleTrigger(){
        this.trigger.classList.toggle('fa-bars') ;
        this.trigger.classList.toggle('fa-times') ;
        this.trigger.classList.toggle('move') ;
        if(!this.trigger.classList.contains('move')) document.removeEventListener('click',this) ;
    }
    toggleMenu(e){
        e.stopPropagation();
        this.toggleTrigger() ;
        this.menu.classList.toggle('show') ;
        if(this.menu.classList.contains('show')) {
            document.addEventListener('click',this) ;
            this.afterMenuOpen()
        }
        else{
            document.removeEventListener('click',this) ;
            this.afterMenuClose()
        }
    }
    handleEvent(e){
        e.stopPropagation();
        let clickedElm = e.target ;
        if(!this.menu.contains(clickedElm)){
            this.trigger.classList.remove('fa-times') ;
            this.trigger.classList.add('fa-bars') ;
            this.trigger.classList.remove('move') ;
            this.menu.classList.remove('show') ;
            this.afterMenuClose() ;
            document.removeEventListener('click',this) ;
        }
    }
}
// let blackFilter = document.querySelector('#blackFilter') ;
// new Menu(
//     document.querySelector('#menu'),
//     document.querySelector('#menuTrigger'),
//     ()=>blackFilter.classList.add('show'),
//     ()=>blackFilter.classList.remove('show')    
// ) ;
export default Menu ;