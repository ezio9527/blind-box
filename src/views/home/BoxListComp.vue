<template>
 <div class="box-list-comp">
   <div class="box-list_item"
        @click="$router.push({name: 'box', params: {id: box.box.id}})"
        v-for="(box, index) in boxList" :key="index">
     <div>
       <van-image lazy-load :src="box.box.imageUrl">
         <template v-slot:error><img src="@img/home/box.png"/></template>
       </van-image>
     </div>
     <span>{{ box.box.boxName }}</span>
     <span>{{ box.box.price }} {{ box.box.symbol }}</span>
     <div><span>{{ $t('homeView.lastNumber') }}:</span><span>{{ box.box.totalNum - box.box.sellNum }}</span></div>
   </div>
 </div>
</template>

<script>
import { findBoxAll } from '@/server/http/api'
import { mapGetters } from 'vuex'
export default {
  name: 'BoxListComp',
  props: {
    boxName: {
      type: String,
      default: ''
    },
    time: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      boxAllList: []
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    }),
    boxList () {
      return this.boxAllList.map(item => {
        item.box.imageUrl = this.baseUrl + item.box.imageUrl
        return item
      })
    }
  },
  watch: {
    time: {
      immediate: true,
      handler (val) {
        this.findBox()
      }
    }
  },
  methods: {
    findBox () {
      const toast = this.$toast.loading({})
      findBoxAll({ name: this.boxName }).then(data => {
        this.boxAllList = data || []
      }).finally(() => {
        toast.clear()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-list-comp {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .box-list_item {
    width: 167px;
    height: 210px;
    background: linear-gradient(137deg, rgba(132, 92, 207, .4) 0%, rgba(194, 82, 150, .4) 59%, rgba(238, 75, 110, .4) 100%);
    border-radius: 8px;
    border: 2px solid;
    border-image: linear-gradient(132deg, rgba(134, 56, 204, 1), rgba(230, 80, 120, 1)) 2 2;
    clip-path: inset(0 0 round 4px);
    margin-bottom: 10px;
    padding: var(--base-padding-medium);
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: var(--base-font-size-mini);
    div:nth-child(1) {
      align-self: center;
      flex: 1;
      display: flex;
      align-items: center;
      img, .van-image {
        width: 106px;
      }
    }
    >span:nth-child(2) {
      color: var(--base-text-color-pink);
      margin-bottom: 8px;
    }
    >span:nth-child(3) {
      color: var(--base-text-color-default);
      margin-bottom: 8px;
    }
    >div:nth-child(4) span:first-child {
      color: var(--base-text-color-default);
      margin-bottom: 8px;
    }
    >div:nth-child(4) {
      margin-bottom: 16px;
      span:last-child {
        color: var(--base-text-color-pink);
      }
    }
  }
}
</style>
