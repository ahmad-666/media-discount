//import $ from 'jquery' ;
//import select2 from 'select2' ;
//import Form from '../../utilities/scripts/form.js' ;
//let FormValidate = Form.FormValidate ;
//let LabelHandler = Form.LabelHandler ;
//let Toggle = Form.Toggle ;
$('.select2#city').select2({
    placeholder: 'انتخاب شهر'
});

let editInfoElm = document.querySelector('form#editInfo') ;
let editInfoFormData = {
    elm: editInfoElm,
    submit: editInfoElm.querySelector('button[type="submit"]'),
    inputs: editInfoElm.querySelectorAll('.validate'),
    send: true,
    modal:null
}
// new FormValidate(editInfoFormData.elm,editInfoFormData.submit,
//     editInfoFormData.inputs,editInfoFormData.send,editInfoFormData.modal) ;
editInfoElm.querySelectorAll('.labelHandler').forEach(label=> new LabelHandler(label)) ;
editInfoElm.querySelectorAll('.inputWrapper.toggle').forEach(toggle=>new Toggle(toggle))
