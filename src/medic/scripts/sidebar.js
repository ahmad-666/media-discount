class Sidebar{
    constructor(sidebar){
        this.sidebar = sidebar ;
        this.discount = parseFloat(this.sidebar.getAttribute('data-discount')) ;
        this.price = parseFloat(this.sidebar.getAttribute('data-price')) ;
        this.beforePrice = this.sidebar.querySelector('#beforePrice') ;
        this.afterPrice = this.sidebar.querySelector('#afterPrice') ;
        this.select = this.sidebar.querySelector('select') ;
        this.quantity = 1 ;
        this.leader = this.sidebar.querySelector('input[type="checkbox"]') ;
        this.leaderPlus = parseFloat(this.sidebar.getAttribute('data-leader-plus'));
        this.init() ;
    }
    init(){
        //this.quantity.querySelectorAll('option').forEach(opt=>opt.addEventLister('click',this.optHandler.bind(this))) ;
        this.select.addEventListener('change',this.selectHandler.bind(this)) ;
        this.leader.addEventListener('change',this.leaderHandler.bind(this)) ;
        this.updatePrice(this.price,0) ;
    }
    updatePrice(price,leader){
        this.beforePrice.textContent = `${(price*this.quantity)+leader}‌تومان` ;
        this.afterPrice.textContent = `${(price*this.quantity+leader)*(this.discount/100)}‌تومان` ;
    }
    selectHandler(e){
        this.quantity = parseInt(this.select.value) ;
        (this.leader.checked)?this.updatePrice(this.price,this.leaderPlus):this.updatePrice(this.price,0);   
    }
    leaderHandler(e){
        (this.leader.checked)?this.updatePrice(this.price,this.leaderPlus):this.updatePrice(this.price,0);
    }
}
new Sidebar(document.querySelector('#sidebar')) ;