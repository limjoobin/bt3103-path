<template>
    <div>
        <ul id='modifyList'>
            <li v-for='(item,index) in dataPacket' :key='index'> 
                {{item.name}}: {{item.quantity}} <br>
                <input id='index' v-model='updatedOrder[item.name]' placeholder=0 type='number' min='0' required> 
            </li>
            
        </ul>
        <div>  
            <button id='updateBtn' v-on:click='updateOrder()'>Update Order</button>
        </div>
    </div>
</template>

<script>
import database from "../firebase.js"
export default {
    props:['docID'],
    data(){
        return{
            dataPacket:[],
            updatedOrder:{}
        }
    },
    methods:{
        fetchItems:function(){
            database.collection('orders')
                .doc(this.docID).get().then(snapshot =>{
                                            this.dataPacket = snapshot.data().items
                                        })
        },
        updateOrder:function(){
            for(var item of this.dataPacket){
                for(var food in this.updatedOrder){
                    if(food == item.name){
                        item.quantity = this.updatedOrder[food]
                    }
                }
            }


            database.collection('orders')
                    .doc(this.docID)    
                    .update({items:this.dataPacket})
                    .then(() => {
                        this.$router.push({ path:'/orders'})
                    })

            
            
        }
    },
    created:function(){
        this.fetchItems();
    }
    
}
</script>


<style>
    #updateBtn{
        font-size:25px;
        min-width: 70px;
        min-height: 35px;
        height:60px;
        width:180px;
    }

    #modifyList{
        all:revert;
        list-style-type:none;
        padding-left:0pt;
    }

    #modifyList li{
        all:revert;
        text-align:left;
        font-size: 20px;
        padding: 10px 0px 10px 0px;
    }

</style>