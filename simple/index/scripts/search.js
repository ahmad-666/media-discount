//import $ from 'jquery' ;
//import select2 from 'select2' ;
//import Form from '../../utilities/scripts/form.js' ;
//let FormValidate = Form.FormValidate ;
//let LabelHandler = Form.LabelHandler ;
$('.select2#categorySelect').select2({
    placeholder: 'انتخاب دسته بندی'
});
$('.select2#citySelect').select2({
    placeholder: 'انتخاب شهر'
});
let searchFormElm = document.querySelector('form#searchForm') ;
let searchFormData = {
    elm: searchFormElm,
    submit: searchFormElm.querySelector('button[type="submit"]'),
    inputs: searchFormElm.querySelectorAll('.validate'),
    send: true,
    modal:null
}
new FormValidate(searchFormData.elm,searchFormData.submit,
    searchFormData.inputs,searchFormData.send,searchFormData.modal) ;
searchFormElm.querySelectorAll('.labelHandler').forEach(label=> new LabelHandler(label)) ;
