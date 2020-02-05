document.querySelectorAll('#bookmarks .medic .content .remove').forEach(remove=> remove.addEventListener('click',removeBookmark)) ;
function removeBookmark(e){
    let medic = this.parentElement.parentElement ;
    medic.style.display = "none" ;
}