//import $ from 'jquery' ;
//import select2 from 'select2' ;
//import Tabs from '../../utilities/scripts/tabs.js' ;
//import Form from '../../utilities/scripts/form.js' ;
$('.select2#citySelect').select2({
    placeholder: 'انتخاب شهر'
});
let tabsWrapper = document.querySelector('#signupWrapper .tabs_wrapper') ;
new Tabs(tabsWrapper) ;
let userSignupFormElm = document.querySelector('form#signupUser') ;
let adminSignupFormElm = document.querySelector('form#signupAdmin') ;
let userSignupForm = {
    elm: userSignupFormElm,
    submit: userSignupFormElm.querySelector('button[type="submit"]'), 
    inputs: userSignupFormElm.querySelectorAll('.validate'),
    send: true ,
    modal: null 
}
let adminSignupForm = {
    elm: adminSignupFormElm,
    submit: adminSignupFormElm.querySelector('button[type="submit"]'), 
    inputs: adminSignupFormElm.querySelectorAll('.validate'),
    send: true ,
    modal: null 
}
new FormValidate(userSignupForm.elm,userSignupForm.submit,
    userSignupForm.inputs,userSignupForm.send,userSignupForm.modal) ;
new FormValidate(adminSignupForm.elm,adminSignupForm.submit,
    adminSignupForm.inputs,adminSignupForm.send,adminSignupForm.modal) ;
userSignupFormElm.querySelectorAll('.labelHandler').forEach(label=>new LabelHandler(label)) ;
adminSignupFormElm.querySelectorAll('.labelHandler').forEach(label=>new LabelHandler(label)) ;
tabsWrapper.querySelectorAll('.inputWrapper.file').forEach(file=>new FileHandler(file)) ;
tabsWrapper.querySelectorAll('.inputWrapper.toggle').forEach(toggle=>new Toggle(toggle)) ;