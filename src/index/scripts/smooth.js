document.querySelector('#smooth').addEventListener('click',smooth) ;
function smooth(e){
    window.scrollTo({
        behavior: 'smooth',
        left: 0 ,
        top: 0
    })
}