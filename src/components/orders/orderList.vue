<template>
  <h1>orders</h1>
</template>
<script>
import { loadOrders } from '@/api/order/orderService'
export default {
  data () {
    return {}
  },
  mounted () {
    this.loadOrders();
  },
  methods: {
    loadOrders () {
      loadOrders().then( data => {
        
      }, data => {
        console.log(data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
