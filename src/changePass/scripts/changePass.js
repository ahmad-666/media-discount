import Form from '../../utilities/scripts/form.js' ;
let FormValidate = Form.FormValidate ;
let LabelHandler = Form.LabelHandler ;
let changePassElm = document.querySelector('form#changePass') ;
let changePassFormData = {
    elm: changePassElm,
    submit: changePassElm.querySelector('button[type="submit"]'),
    inputs: changePassElm.querySelectorAll('.validate'),
    send: true,
    modal:null
}
new FormValidate(changePassFormData.elm,changePassFormData.submit,
    changePassFormData.inputs,changePassFormData.send,changePassFormData.modal) ;
changePassElm.querySelectorAll('.labelHandler').forEach(label=> new LabelHandler(label)) ;
