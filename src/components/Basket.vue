<template> 
    <div>
        <p> Menu: </p>
        <ul class = 'basketList' v-if="selection.length != 0">
            <li class='basketList' v-for='(item,index) in selection' :key='index'>
                {{ item[0] }} x {{ item[1] }}
                <br>
            </li>
            
        </ul>
        <button id= "total" v-on:click="showTotal=true" v-if="selection.length != 0">Calculate Total</button>
        <button id='sendOrder' v-on:click='sendOrder()'>Send Order</button>
        <p v-if="showTotal">
            Subtotal: ${{ subTotal }} <br><br>
            Grand Total: ${{ grandTotal }}
        </p>
        
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    props:['selection', 'menu'],
    data(){
        return {
            showTotal : false,
            subTotal : 0,

        }
    },
    computed:{
        grandTotal: function(){
            return (this.subTotal * 1.07).toFixed(2);
        }

    },
    watch:{
        selection:function(){
            let total = 0;
            for(const item of this.selection){
                total += item[1] * item[2]
            }
            this.subTotal = total;
        }
    },
    methods:{
        sendOrder:function(){
            var menuItems = []
            for(const item of this.menu){
                menuItems.push(item.name)
            }

            var order = []
            
            for (const item of this.selection){
                menuItems = menuItems.filter(x => x !== item[0])

                order.push({
                    name: item[0],
                    quantity: item[1],
                })
            }

            for(const item of menuItems){
                order.push({
                    name:item,
                    quantity:0
                })
            }
            
            database.collection('orders').add({
                items : order
            }).then(() => {location.reload()});
        }
    }
}
</script>

<style>
    #total, #sendOrder{
        text-align: center;
        background-color: pink;
        border-radius: 8px;
        font-size: 20px;
        width: 150px;
        min-width:150px;
        height: 30px;
        vertical-align: middle;
        margin: 5px;
    }

    p{
        font-size:30px;
    }

    .basketList{
        all:revert;
        margin-bottom: 20px;
        font-size: 30px;
    }
</style>