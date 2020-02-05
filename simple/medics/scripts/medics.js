//import Form from '../../utilities/scripts/form.js' ;
//import FontFaceObserver from 'fontfaceobserver' ;
//import Collapse from '../../utilities/scripts/collapse.js' ;
//import Filter from '../../utilities/scripts/filters.js' ;
//variables-----------------------------------
let filtersWrapper = document.querySelector('main') ;
let currFiltersWrapper = filtersWrapper.querySelector('#currFilters .bottom') ;
let filtersForm = filtersWrapper.querySelector('form#filters') ;
let mainCategories = filtersForm.querySelectorAll('.mainCategory') ;
let clearAllBtn = currFiltersWrapper.parentElement.querySelector('#clearFilters') ;
//Select handler------------------------------------
let selects = filtersForm.querySelectorAll('.inputWrapper.select') ;
selects = [...selects] ;
selects.forEach(select => {
    let otherSelects = selects.filter(other=>select!=other) ; 
    new Select(select,otherSelects) ;
})
//Label handler------------------------------------
filtersForm.querySelectorAll('.labelHandler').forEach(label=>new LabelHandler(label)) ;
//Tooltip ---------------------------------------------
//ranger-----------------------------------
filtersForm.querySelectorAll('.inputWrapper.range').forEach(ranger=>new Ranger(ranger));
//collapse-----------------------------------
filtersForm.querySelectorAll('.withCollapse').forEach((withCollapse,i,all) => {
   all = [...all] ;
   let others = all.filter(elm =>elm!=withCollapse);
   let font = new FontFaceObserver('iranSans');
   font.load().then(()=>new Collapse(withCollapse,others));
});
//for solve conflicts of click event on label and click event on .collapseTrigger
filtersForm.querySelectorAll('label').forEach(label=>label.addEventListener('click',(e)=>e.stopPropagation()))
//filter handler------------------------------------
let filterHandlerInstance = mainCategories.forEach(mainCategory=>new FilterHandler(currFiltersWrapper,mainCategory)) ;
new CurrFilterClearAll(currFiltersWrapper,filtersForm,clearAllBtn,filterHandlerInstance) ;


let mobileFilterSort = document.querySelector('#mobileFilterSort');
let filters = document.querySelector('#filterWrapper') ;
let sort = document.querySelector('#sortWrapper') ;
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
