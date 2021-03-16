import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default{
    extends: Bar,
    data: function () {
        return {
            datacollection:{
                labels:[],
                datasets:[{
                    //label: "Total number of each dish",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#c8dece"],
                    data: []
                }]
            },
            options:{
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total number of each dish',
                  },
                scales:{
                    yAxes: [{
                        ticks: {
                          min: 0
                        }
                      }]
                },
                responsive: true,
                maintainAspectRatio: false,
            }            
        }
      },
    methods: {
        fetchItems: function () {
            var orderInfo = {}   
            database.collection('menu').get().then(querySnapShot => {
                querySnapShot.forEach(doc => { 
                   let itemName = doc.data().name
                   orderInfo[itemName] = 0
                   
                })
            })

            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => { 
                   for(var item of doc.data().items){
                       orderInfo[item.name] += Number(item.quantity)
                   }
                })

                Object.keys(orderInfo).forEach(key =>{
                    this.datacollection.labels.push(key)
                    this.datacollection.datasets[0].data.push(orderInfo[key])
                })
                
                this.renderChart(this.datacollection, this.options)
            })
        }
            
    },
    mounted () {
        this.fetchItems()
    }
}