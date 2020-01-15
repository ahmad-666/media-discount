import Form from '../../utilities/scripts/form.js' ;
import FontFaceObserver from 'fontfaceobserver' ;
import Collapse from '../../utilities/scripts/collapse.js' ;
import Filter from '../../utilities/scripts/filters.js' ;
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
    new Form.Select(select,otherSelects) ;
})
//Label handler------------------------------------
filtersForm.querySelectorAll('.labelHandler').forEach(label=>new Form.LabelHandler(label)) ;
//Tooltip ---------------------------------------------
//ranger-----------------------------------
filtersForm.querySelectorAll('.inputWrapper.range').forEach(ranger=>new Form.Ranger(ranger));
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
let filterHandlerInstance = mainCategories.forEach(mainCategory=>new Filter.FilterHandler(currFiltersWrapper,mainCategory)) ;
new Filter.CurrFilterClearAll(currFiltersWrapper,filtersForm,clearAllBtn,filterHandlerInstance) ;