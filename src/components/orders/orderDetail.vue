<template>
  <div>
    <h1>订单详情</h1>
    <div class="order-item">
      <h3>订单商品：</h3>
      <el-row type="flex" class="row-bg item-row" v-for="item in orderItems" :key="item.id">
        <el-col :span="6">
          <div class="grid-content bg-purple">{{item.product.title}}</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><img :src="item.product.coverPicture.url" alt="" width="200"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div>Quantity:{{item.quantity}}</div></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"><div>价格： {{item.nowPrice}}</div></div>
        </el-col>
      </el-row>
    </div>
    <div class="order-customer">
      <h3>顾客信息：</h3>
      <el-row type="flex">
        <el-col :span="4">email: {{customer.nickName}}</el-col>
        <el-col :span="4">phone: {{customer.phone}}</el-col>
      </el-row>
    </div>
    <div class="order-address">
      <h3>收货信息</h3>
      <el-row type="flex" >
        <el-col :span="24">
          {{address.consigneeName}}, {{address.phone}}, 
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="24">
          {{address.country}} {{address.province}} {{address.city}} {{address.addressDetails}} {{address.zipCode}}
        </el-col>
      </el-row>
    </div>
    <div class="order-payment">
      <h3>支付信息</h3>
      <el-row type="flex">
        <el-col :span="6">支付方式: {{payment.payType}}</el-col>
        <el-col :span="6">支付状态: {{payment.payStatus}}</el-col>
        <el-col :span="12">支付流水号: {{payment.paymentNo}}</el-col>
      </el-row>
    </div>
    <div class="order-status">
      <h3>订单状态</h3>
      <el-row type="flex">
        <el-select v-model="orderStatus" placeholder="请选择">
          <el-option
            v-for="item in this.status.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
    </div>
    <div class="button-action">
      <el-button type="primary" @click="upadteOrderById()">更新订单</el-button>
      <el-button type="info" @click="cancel()">取消</el-button>
    </div>
  </div>
</template>
<script>
import { getOrder,updateOrder } from '@/api/order/orderService'
export default {
  data () {
    return {
      orderData: {},
      address: {},
      customer: {},
      orderItems: [],
      payment: {},
      status: {
        options: [
          {
            label: '已下单',
            value: 'PlaceOrder'
          },
          {
            label: '未支付',
            value: 'NoPayment'
          },
          {
            label: '支付完成',
            value: 'FinishPayment'
          },
          {
            label: '已发货',
            value: 'Shipping'
          },
          {
            label: '确认收货',
            value: 'FinishShipping'
          },
          {
            label: '申请退货',
            value: 'ApplyReturn'
          },
          {
            label: '退货中',
            value: 'Returning'
          },
          {
            label: '退货完成',
            value: 'FinishReturn'
          },
          {
            label: '订单取消',
            value: 'CancelOrder'
          },
          {
            label: '订单关闭',
            value: 'FinishOrder'
          }
        ]
      },
      orderStatus: ''
    }
  },
  mounted () {
    this.getOrderById()
  },
  methods: {
    getOrderById() {
      let _this = this
      let orderId = this.$route.params.id
      if(orderId) {
        getOrder(orderId).then( res => {
          this.orderData = res.SUCCESS
          this.orderData.addressInfo = this.orderData.addressInfo.replace('{', '').replace('}', '')
          this.customer = this.orderData.buyer
          this.orderItems = this.orderData.orderItems
          this.payment = this.orderData.payments.length > 0 ? this.orderData.payments[0] : {payType: '', payment: '', paymentNo: ''}
          this.orderStatus = this.orderData.orderStatus
          let addressArray = this.orderData.addressInfo.split(',')
          addressArray.forEach(function(item) {
            let itemArray = item.split('=')
            if(itemArray.length === 2) {
              _this.address[itemArray[0].trim()] = itemArray[1]
            }
          })
        }, error => {
          console.log(error)
        })
      }
    },
    upadteOrderById () {
      let orderId = this.$route.params.id
      if(orderId) {
        updateOrder(orderId, this.orderStatus.toUpperCase()).then(res => {
          if(res.SUCCESS) {
            this.$message({
              message: '更新订单成功',
              type: 'success'
            });
          }
        }, res => {
          this.$message({
            message: '更新订单失败',
            type: 'error'
          });
        })
      }
    },
    cancel () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.order-item h3 {
  text-align: left;
}
.order-customer {
  text-align: left;
}
.order-address {
  text-align: left;
}
.order-payment {
  text-align: left;
}
.order-status {
  text-align: left;
}
.button-action {
  margin: 40px 0;
}
.item-row {
  margin: 20px 0;
}
</style>

