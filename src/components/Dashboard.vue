<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <bar-chart></bar-chart>
        <call-api></call-api>
    </div>
    
</template>

<script>
import BarChart from './BarChart.vue'
import CallAPI from './CallAPI.vue'
export default{
    components: {
        'bar-chart': BarChart,
        'call-api': CallAPI
    }

}
</script>

<style>

</style>
