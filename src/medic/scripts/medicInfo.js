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