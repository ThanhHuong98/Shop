module.exports = function Cart(oldCart){
    this.items = oldCart.items || {},
    this.totalQty = oldCart.totalQty || 0,
    this.totalPrice = oldCart.totalPrice || 0,

    this.add = function(item, id, quantity){
        quantity = parseInt(quantity);
        var storedItem = this.items[id];
        if(!storedItem){
            //console.log("id add: "+id);
            storedItem = this.items[id] = {item: item, qty: quantity, price: 0}
        }else{
            storedItem.qty += quantity;            
        }
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty += quantity;
        this.totalPrice += storedItem.item.price * quantity;
    }
    this.increase = function(id){
        //console.log("id increase: "+id);
        if((this.items[id].qty + 1) <= this.items[id].item.quantity){
            this.items[id].qty++;
            this.items[id].price += this.items[id].item.price;
            this.totalQty++;
            this.totalPrice += this.items[id].item.price;
        }
    }
    this.reduce = function(id){
        //console.log("id reduce: "+id);
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    }
    this.remove = function(){
        this.totalQty=0;
        this.totalPrice=0;
        delete this.items;
    }
    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id])
        }
        return arr;
    }

}