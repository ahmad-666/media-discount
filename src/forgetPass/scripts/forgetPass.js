import Form from '../../utilities/scripts/form.js' ;
let forgetPasswordForm = document.querySelector('form#forgetPassword') ;
let forgetPassword = {
    elm: forgetPasswordForm,
    submit: forgetPasswordForm.querySelector('button[type="submit"]'), 
    inputs: forgetPasswordForm.querySelectorAll('.validate'),
    send: true ,
    modal: null 
}
new Form.FormValidate(forgetPassword.elm,forgetPassword.submit,
    forgetPassword.inputs,forgetPassword.send,forgetPassword.modal) ;
forgetPasswordForm.querySelectorAll('.labelHandler').forEach(label=>new Form.LabelHandler(label)) ;
