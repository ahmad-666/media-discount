import ProductSlider from '../../utilities/scripts/productSlider.js' ;
new ProductSlider(document.querySelector('.productSlider'),null) ;
let bookmark = document.querySelector('.bookmark') ;
let toast = bookmark.querySelector('.toast') ;
bookmark.addEventListener('click',e=>{
    toast.classList.add('show') ;
    setTimeout(()=>toast.classList.remove('show'),3000)
}) 