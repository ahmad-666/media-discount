import FontFaceObserver from 'fontfaceobserver' ;
import Collapse from '../../utilities/scripts/collapse.js' ;
import ProductSlider from '../../utilities/scripts/productSlider.js' ;
new ProductSlider(document.querySelector('.productSlider'),null) ;
let bookmark = document.querySelector('.bookmark') ;
let toast = bookmark.querySelector('.toast') ;
bookmark.addEventListener('click',e=>{
    bookmark.classList.toggle('trigger') ;
    if(bookmark.classList.contains('trigger')){
        toast.textContent = 'به لیست مورد علاقه ها اظافه شد'
        toast.classList.add('show') ;
        setTimeout(()=>toast.classList.remove('show'),1500)
    }
    else{
        toast.textContent = 'از لیست مورد علاقه ها حذف شد'
        toast.classList.add('show') ;
        setTimeout(()=>toast.classList.remove('show'),1500)
    }
}) 
// let shareTitle = document.querySelector('#medicInfo .right .share .title') ;
// let shareSocials =  document.querySelector('#medicInfo .right .share .socials') ;
// shareTitle.addEventListener('click',e=>{
//     shareSocials.classList.toggle('show') ;
// })

document.querySelector('#medicInfo').querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new Collapse(withCollapse,others));
})