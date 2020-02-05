//import util from '../../utilities/utilities.js' ;
//let docHandler = util.docHandler ;
// document.querySelector('#topMenu .right .city .title').addEventListener('click',e=>{
//     e.stopPropagation() ;
//     let target = e.currentTarget.parentElement.querySelector('ul') ;
//     target.classList.toggle('show') ;
//     docHandler(target,[]) ;
// })
let topMenu = document.querySelector('#topMenu') ;
document.querySelector('#topMenu .left #lang .title').addEventListener('click',e=>{
    e.stopPropagation() ;
    let target = e.currentTarget.parentElement.querySelector('ul') ;
    target.classList.toggle('show') ;
    docHandler(target,[]) ;
})
// window.addEventListener('scroll',e=>{
//     if(window.scrollY>topMenu.offsetHeight) topMenu.classList.add('fix') ;
//     else topMenu.classList.remove('fix') ;
// })
// document.querySelector('#topMenu .left #more .title').addEventListener('click',e=>{
//     e.stopPropagation() ;
//     let target = e.currentTarget.parentElement.querySelector('ul') ;
//     target.classList.toggle('show') ;
//     docHandler(target,[]) ;
// })