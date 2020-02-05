//import Tabs from '../../utilities/scripts/tabs.js' ;
//import Form from '../../utilities/scripts/form.js' ;
let tabsWrapper = document.querySelector('#loginWrapper .tabs_wrapper') ;
new Tabs(tabsWrapper) ;
let userLoginFormElm = document.querySelector('form#loginUser') ;
let adminLoginFormElm = document.querySelector('form#loginAdmin') ;
let userLoginForm = {
    elm: userLoginFormElm,
    submit: userLoginFormElm.querySelector('button[type="submit"]'), 
    inputs: userLoginFormElm.querySelectorAll('.validate'),
    send: true ,
    modal: null 
}
let adminLoginForm = {
    elm: adminLoginFormElm,
    submit: adminLoginFormElm.querySelector('button[type="submit"]'), 
    inputs: adminLoginFormElm.querySelectorAll('.validate'),
    send: true ,
    modal: null 
}
new FormValidate(userLoginForm.elm,userLoginForm.submit,
    userLoginForm.inputs,userLoginForm.send,userLoginForm.modal) ;
new FormValidate(adminLoginForm.elm,adminLoginForm.submit,
    adminLoginForm.inputs,adminLoginForm.send,adminLoginForm.modal) ;
userLoginFormElm.querySelectorAll('.labelHandler').forEach(label=>new LabelHandler(label)) ;
adminLoginFormElm.querySelectorAll('.labelHandler').forEach(label=>new LabelHandler(label)) ;