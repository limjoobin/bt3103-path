<template>
    <div>
        <ul id= 'routing'> 
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>

        <ul id='itemsList'>
            <li v-for='item in items' :key='item.name'>
                <p id="itemName">{{ item.name }}</p>
                <img v-bind:src="item.imageURL">
                <p id="price">${{ item.price }}</p>
                <qtyCtr v-bind:item='item' v-on:counter="onCounter"></qtyCtr>
            </li>
        </ul>

        <basket id="shoppingBasket" v-bind:selection='itemsSelected' v-bind:menu='items'></basket>
    </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"
export default {
    name: 'PageContent',
    components: { 
        'qtyCtr' : QuantityCounter,
        'basket': Basket
    },
    data(){
        return{
            itemsSelected:[],
            items:[],
        }
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            
            } else {
                // Loop through everything to check what is not in the basket
                var within = false;
                
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    
                    if (item_name === item.name){
                        within = true;
                        if(count > 0){
                            // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                            this.itemsSelected.splice(i,1,[item.name,  count, item.price]);
                        } else{
                            // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                            this.itemsSelected.splice(i,1);
                        }
                    }
                }
                if (!within){
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }   
        }, 
        fetchItems: function(){
            database.collection('menu').get().then(snapshot =>{
                snapshot.docs.forEach(doc => {
                    var dish = doc.data();
                    this.items.push({name:dish.name,
                                    imageURL: dish.imageURL,
                                    price: dish.price
                                    });
                });
            });
        }
    },
    created:function() {
        this.fetchItems();
        
    }
}
</script>

<style>
    #itemsList {
        width: 100%;
        max-width: 70%;
        margin: 0px;
        padding: 0 5px;
        box-sizing: border-box;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        border: 1px solid #222;
        margin: 10px;
    }

    img {
        width: 135px;
        height: 135px;
    }

    #price {
        font-size: 30px;
    }

    #itemName {
        font-weight:bold;
        font-size: 30px;
        margin:0;
    }

    #shoppingBasket {
        position: absolute;
        top: 23%;
        left: 78%;
    }

    #routing {
        width: 100%;
        max-width: 70%;
        margin: 0px;
        padding: 0 5px;
        box-sizing: border-box;
    }
    
</style>