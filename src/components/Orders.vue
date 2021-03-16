<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul>
            <li v-for='(order,index) in orders' :key='index'>
                <div style="width: 50%; float:left">
                    <ul id='orderList'>
                        <li v-for='item in order.data.items' :key='item.name'> 
                            <p id='itemDesc'>{{ item.name }}: {{ item.quantity }}</p>
                        </li>
                    </ul>
                </div>
                
                <div style="width: 50%; float:right">
                    <button class='orderBtn' v-bind:id='order.id' v-on:click="deleteItem($event)">Delete</button>
                    <button class='orderBtn' v-bind:id='order.id' v-on:click="route($event)">Modify</button>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import database from "../firebase.js"
export default{
    data(){
        return{
            orders:[]
        }
    },
    methods:{
        fetchItems:function(){
            database.collection('orders').get().then(snapshot =>{
                snapshot.docs.forEach(doc => {
                    var order ={id: doc.id, data: doc.data()};
                    this.orders.push(order);
                });
            });
        },
        deleteItem:function(event){
            let doc_id = event.target.getAttribute("id")
            return database.collection('orders').doc(doc_id).delete()
                                        .then(() =>{location.reload()})
            
        },
        route:function(event){
            let doc_id = event.target.getAttribute("id")
            this.$router.push({ name:'modify', params: {docID: doc_id}})
        }
    },
    created:function(){
        this.fetchItems();
    }
}

</script>


<style>
    #orderList{
        all:revert;
        list-style-type:none;

    }

    #orderList li{
        all:revert;
        text-align:center;
    }

    #itemDesc{
        all:revert;
    }

    .orderBtn{
        font-size:revert;
        min-width: 70px;
        min-height: 35px;
        height:35px;
        width:70px;

    }
</style>