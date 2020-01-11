import util from '../utilities.js' ;
function Modal(triggers,others,needCheck,blackFilter,afterOpen,afterEnd){
    //this.triggers is array and we use array because sometimes multiple things will trigger same
    //modal like comment section(multiple submit button trigger adminApprove modal)
    //others is for others in docHandler
    //this.needCheck is false if we want when we click on trigger always modal will be shown 
    //and this.needCheck is true if we want to check something first and then decide 
    //to show modal or not
    //if this.needCheck is true then we need to call <modal-instance>.openModal(null) after we check
    //some condition  
    this.triggers = triggers ;
    this.others = others ;
    this.needCheck = needCheck ;
    this.modal = document.querySelector(`#${this.triggers[0].getAttribute('data-modal')}`) ;
    this.close = this.modal.querySelector('.close') ;
    this.blackFilter = blackFilter ;
    this.afterOpen = afterOpen ;
    this.afterEnd = afterEnd ;
    if(!this.needCheck) this.triggers.forEach(trigger =>trigger.addEventListener('click',this.openModal.bind(this)));   
}
Modal.prototype.openModal = function(e){
    this.modal.classList.add('show') ;
    if(this.blackFilter) this.blackFilter.classList.add('show') ;
    if(this.close) this.close.addEventListener('click',this) ;
    setTimeout(()=>document.addEventListener('click',this),10)
    this.afterOpen() ;
}
Modal.prototype.handleEvent = function(e){
    if(e.currentTarget == document){
        let clickedElm = e.target ;
        if(!this.modal.contains(clickedElm)) this.closeModal() ;     
    }
    else if(e.currentTarget  == this.close) this.closeModal() ;    
}
Modal.prototype.closeModal = function(){
    this.modal.classList.remove('show') ;
    if(this.blackFilter) this.blackFilter.classList.remove('show') ;
    if(this.close) this.close.removeEventListener('click',this) ;
    document.removeEventListener('click',this) ;
    this.afterEnd() ;
}
// <button class="modalTrigger" data-modal="answer1Modal">show modal</button>
// <div class="modal" id="answer1Modal">...</div>
// ticketTable.querySelectorAll('.modalTrigger').forEach((trigger,i,all)=>{
//     all = [...all] ;
//     let others = all.filter(a=>a!=trigger);
//     new Modal([trigger],others,false,blackFilter1,
//         ()=>{menuTrigger1.classList.add('behind') ;},
//         ()=>{menuTrigger1.classList.remove('behind') ;}
//     ) ;
// })
//---------------------------
//---------------------------
//---------------------------
// let adminApproveTriggers = document.querySelectorAll('.modalTrigger[data-modal="adminApprove"]') ;
// let adminApproveModal = new modal.Modal([...adminApproveTriggers],[],false) ;
//OR
// let adminApproveTriggers = document.querySelectorAll('.modalTrigger[data-modal="adminApprove"]') ;
// let adminApproveModal = new modal.Modal([...adminApproveTriggers],[],true) ;
// document.querySelectorAll('form.validate').forEach(myForm => {
//     let submit = myForm.querySelector('button[type="submit"]') ;
//     let inputs = myForm.querySelectorAll('input.validate,textarea.validate') ;
//     new form.FormValidate(myForm,submit,inputs,false,adminApproveModal) ;
// })
export default{
    Modal
}