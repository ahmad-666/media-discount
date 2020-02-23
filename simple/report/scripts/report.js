//import Form from '../../utilities/scripts/form.js' ;
let reportFormElm = document.querySelector('form#report') ;
let reportForm = {
    elm: reportFormElm,
    submit: reportFormElm.querySelector('button[type="submit"]') ,
    inputs: reportFormElm.querySelectorAll('.validate'),
    send: true,
    modal: null 
}
// new FormValidate(reportForm.elm,reportForm.submit,
//     reportForm.inputs,reportForm.send,reportForm.modal) ;
reportFormElm.querySelectorAll('.labelHandler').forEach(label=>new LabelHandler(label)) ;