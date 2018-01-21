<template>
  <h1>orders</h1>
</template>
<script>
import { loadOrders, getOrder } from '@/api/order/orderService'
export default {
  data () {
    return {}
  },
  mounted () {
    this.loadOrderList();
    this.getOrderById(59);
  },
  methods: {
    loadOrderList () {
      loadOrders().then( data => {
        
      }, data => {
        console.log(data)
      })
    },
    getOrderById (id) {
      getOrder(id).then( data => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
