//import FontFaceObserver from 'fontfaceobserver' ;
//import Collapse from '../../utilities/scripts/collapse.js' ;
document.querySelector('#faq').querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new Collapse(withCollapse,others));
})