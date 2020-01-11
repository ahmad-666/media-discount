//npm i jquery select2
//import $ from 'jquery' ;
//import select2 from 'select2' ;
//we should import css file related to select2 too
//if we want to add styles for select2 those styles should be totally 
//outside of any other styles
//if we see select2 opens from top then we need to tweak select2.js itself
//find :
//enoughRoomBelow = dropTop + dropHeight <= viewportBottom,
//enoughRoomAbove = (offset.top - dropHeight) >= this.body().scrollTop(),
//and replace them with 
//enoughRoomAbove = false;
//enoughRoomBelow = true;
$('.select2#state').select2({
    placeholder: 'استان خود را  انتخاب کنید'
});
$('.select2#city').select2({
    placeholder: 'شهر خود را  انتخاب کنید'
});
let wrapper = document.querySelector('.wrapper') ;

$('.select2').on('select2:open', function (e) {
    let inputs = document.querySelectorAll('input[type="search"].select2-search__field') ;
    inputs.forEach(input => {
        input.addEventListener('input',changeAlertMsg) ;
    })
});
function changeAlertMsg(e){
    let alerts = document.querySelectorAll('li[role="alert"]') ;
    alerts.forEach(alert => {
        alert.classList.add('alert') ;
        alert.textContent = "موردی یافت نشد" ;
        
    })
}