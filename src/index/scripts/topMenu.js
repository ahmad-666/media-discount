import util from '../../utilities/utilities.js' ;
let docHandler = util.docHandler ;
document.querySelector('#topMenu .right .city .title').addEventListener('click',e=>{
    e.stopPropagation() ;
    let target = e.currentTarget.parentElement.querySelector('ul') ;
    target.classList.toggle('show') ;
    docHandler(target,[]) ;
})
document.querySelector('#topMenu .left #more .title').addEventListener('click',e=>{
    e.stopPropagation() ;
    let target = e.currentTarget.parentElement.querySelector('ul') ;
    target.classList.toggle('show') ;
    docHandler(target,[]) ;
})