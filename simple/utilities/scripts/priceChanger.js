class PriceMonitor{
    constructor(monitor,append,finalBasketPrice){
        this.monitor = monitor ;
        this.price = parseFloat(this.monitor.getAttribute('data-price')) ;
        this.discount = parseFloat(this.monitor.getAttribute('data-discount')) ;
        this.leaderPlus = parseFloat(this.monitor.getAttribute('data-leader-plus')) ;
        this.quantityInput = this.monitor.querySelector('.quantityInput') ;
        this.quantity = parseFloat(this.quantityInput.value) ;
        this.min = parseFloat(this.quantityInput.getAttribute('data-min')) ; 
        this.max = parseFloat(this.quantityInput.getAttribute('data-max')) ; 
        this.step = parseFloat(this.quantityInput.getAttribute('data-step')) ; 
        this.finalPriceElm = this.monitor.querySelector('.finalItemPrice') ;
        this.finalPrice = parseFloat(this.finalPriceElm.textContent) ;
        this.leaderCheckbox = this.monitor.querySelector('.leaderCheckbox') ;
        this.remove = this.monitor.querySelector('.remove') ;
        this.append = append ;
        this.finalBasketPrice = finalBasketPrice ;
        this.others = null ;
        this.init() ;
    }
    init(){
        this.remove.addEventListener('click',this.removeItem.bind(this)) ;
        this.quantityHandler() ;
        this.leaderHandler() ;
        this.leaderCheckbox.addEventListener('change',this.leaderHandler.bind(this)) ;
    }
    updatePrice(price){
        this.finalPrice = price ;
        this.finalPriceElm.textContent = `${this.finalPrice}${this.append}` ;
        let final = 0 ;
        if(this.others) this.others.forEach(other=>final+=parseFloat(other.finalPrice)) ;
        final+=parseFloat(this.finalPrice) ;
        this.finalBasketPrice.textContent = `${final}${this.append}` ;

    }
    removeItem(e){
        this.monitor.classList.add('remove') ;
        this.updatePrice(0) ;
    }
    quantityHandler(){
        let increase = this.quantityInput.parentElement.querySelector('.increase') ;
        let decrease =  this.quantityInput.parentElement.querySelector('.decrease') ;
        increase.addEventListener('click',this.increaseQuantity.bind((this))) ;
        decrease.addEventListener('click',this.decreaseQuantity.bind((this))) ;
    }
    increaseQuantity(e){
        this.quantityInput.value = this.quantity+1<=this.max?this.quantity+1:this.max ;
        this.quantity = parseFloat(this.quantityInput.value) ;
        let priceOffset = null ;
        priceOffset = !this.leaderCheckbox.checked?this.quantity*this.price*(this.discount/100):(this.quantity*this.price*(this.discount/100))+this.leaderPlus ;
        this.updatePrice(priceOffset) ;
    }
    decreaseQuantity(e){
        this.quantityInput.value = this.quantity-1>=this.min?this.quantity-1:this.min;
        this.quantity = parseFloat(this.quantityInput.value) ;
        !this.leaderCheckbox.checked?this.updatePrice(this.quantity*this.price*(this.discount/100)):this.updatePrice((this.quantity*this.price*(this.discount/100))+this.leaderPlus) ;
    }
    leaderHandler(){
        !this.leaderCheckbox.checked?this.updatePrice(this.quantity*this.price*(this.discount/100)):this.updatePrice((this.quantity*this.price*(this.discount/100))+this.leaderPlus) ;
    }
}
class PriceChanger{
    constructor(priceChanger){
        this.priceChanger = priceChanger ;
        this.append = this.priceChanger.getAttribute('data-append') ;
        this.finalPrice = this.priceChanger.querySelector('.finalPrice') ;
        this.monitors = [] ;
        this.init() ;
    }
    init(){
        this.priceChanger.querySelectorAll('.monitor').forEach((mon,i,all)=>this.monitors.push(new PriceMonitor(mon,this.append,this.finalPrice)))
        this.monitors.forEach((mon,i,all)=>{
            all = [...all] ;
            let others = all.filter(mon1=>mon1!=mon) ;
            mon.others = others ;
        })
    }
}
export default PriceChanger ;