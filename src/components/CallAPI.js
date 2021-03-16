import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function () {
      return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "west",
                borderColor: "#3e95cd",
                fill: false
            }, { 
                data: [],
                label: "national",
                borderColor: "#8e5ea2",
                fill: false
            }, { 
                data: [],
                label: "east",
                borderColor: "#3cba9f",
                fill: false
            }, { 
                data: [],
                label: "central",
                borderColor: "#e8c3b9",
                fill: false
            }, { 
                data: [],
                label: "south",
                borderColor: "#c45850",
                fill: false
            }, { 
                data: [],
                label: "north",
                borderColor: "#76db91",
                fill: false
            }
          ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
      }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          var regionData = response.data.items
          var apiData = {}

          for (var weatherData of regionData){
            var time = weatherData.timestamp
            var psi = weatherData.readings.psi_twenty_four_hourly

            apiData[time] = psi
          }

          Object.keys(apiData).forEach(key =>{
            this.datacollection.labels.push(key)

            let west = apiData[key].west
            let national = apiData[key].national
            let central = apiData[key].central
            let east = apiData[key].east
            let south = apiData[key].south
            let north = apiData[key].north

            this.datacollection.datasets[0].data.push(west)
            this.datacollection.datasets[1].data.push(national)
            this.datacollection.datasets[2].data.push(east)
            this.datacollection.datasets[3].data.push(central)
            this.datacollection.datasets[4].data.push(south)
            this.datacollection.datasets[5].data.push(north)
          })
          console.log(this.datacollection)
          this.renderChart(this.datacollection, this.options)
        })
        
    }
  },
  mounted () {
    this.fetchItems()
  }
}