import FontFaceObserver from 'fontfaceobserver' ;
import Collapse from '../../utilities/scripts/collapse.js' ;
import util from '../../utilities/utilities.js' ;
let MenuToggle = util.MenuToggle ;
let menu = document.querySelector('#menu') ;
menu.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new Collapse(withCollapse,others));
})
new MenuToggle(
    document.querySelector('#menuTrigger'),
    menu,
    document.querySelector('#blackFilter')
) ;