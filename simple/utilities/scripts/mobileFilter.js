let mobileFilterSort = document.querySelector('#mobileFilterSort');
let filters = document.querySelector('#filters') ;
let sort = document.querySelector('#sort') ;
let blackFilter = document.querySelector('#blackFilter') ;
mobileFilterSort.querySelector('#mobileFilter').addEventListener('click',toggleMobileFilter) ;
mobileFilterSort.querySelector('#mobileSort').addEventListener('click',toggleMobileSort) ;
function toggleMobileFilter(e){
    e.stopPropagation(e) ; 
    if(!sort.classList.contains('show')){
        blackFilter.classList.toggle('show') ;
        document.body.classList.toggle('disableScroll') ;
        filters.classList.toggle('show') ;
        document.addEventListener('click',filterDoc) ; 
    }
    else{
        sort.classList.remove('show') ;
        document.removeEventListener('click',sortDoc) ;
        filters.classList.toggle('show') ;
        document.addEventListener('click',filterDoc) ;
    }
}
function filterDoc(e){
    e.stopPropagation(e) ;
    let clickedElm = e.target; 
    if(!filters.contains(clickedElm)){
        blackFilter.classList.remove('show') ;
        document.body.classList.remove('disableScroll') ;
        filters.classList.remove('show') ;
        document.removeEventListener('click',filterDoc) ;
    }
}
function toggleMobileSort(e){
    e.stopPropagation(e) ;
    if(!filters.classList.contains('show')){
        blackFilter.classList.toggle('show') ;
        document.body.classList.toggle('disableScroll') ;
        sort.classList.toggle('show') ;
        document.addEventListener('click',sortDoc) ;
    }
    else{
        filters.classList.remove('show') ;
        document.removeEventListener('click',filterDoc) ;
        sort.classList.toggle('show') ;
        document.addEventListener('click',sortDoc) ;
    }
}
function sortDoc(e){
    e.stopPropagation(e) ;
    let clickedElm = e.target; 
    if(!sort.contains(clickedElm)){
        blackFilter.classList.remove('show') ;
        document.body.classList.remove('disableScroll') ;
        sort.classList.remove('show') ;
        document.removeEventListener('click',sortDoc) ;
    }
}