<template>
  <div>
      <button v-on:click="decrement()">-</button> <label id='counterLabel'>{{ counter }}</label><button v-on:click="increment()">+</button>
  </div>
</template>

<script>
    export default {
        name: 'QuantityCounter',
        props:['item'],
        data(){
            return {counter:0}
        },
        methods:{
            increment:function(){
                this.counter++;
                if(this.counter > 10){
                    alert("You cannot buy more than 10 items.");
                    this.counter = 10;
                }
                this.$emit('counter', this.item, this.counter)
                return this.counter;
            },
            decrement:function(){
                this.counter--;
                if (this.counter <= 0){
                    this.counter = 0;
                }
                this.$emit('counter', this.item, this.counter)
                return this.counter;
            }
            
        }
    }
</script>

<style>
    button{
        text-align: center;
        background-color: pink;
        border-radius: 8px;
        font-size: 30px;
        min-width: 50px;
        width:50px;
        min-height: 50px;
        height:50px;
        vertical-align: middle;
    }

    #counterLabel{
        font-size: 30px;
        text-align:center;
        vertical-align: middle;
        padding: 10px;
    }


</style>
