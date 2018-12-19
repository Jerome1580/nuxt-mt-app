<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
// mock 数据,服务器需要线上接口
import mockData from '@/assets/data/index_prod.js';
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [{
          title:'青春光影电影院',
          pos:'自费购买儿童票',
          price:'26.9',
          img:'//p0.meituan.net/deal/201108/05/3_0805163047.jpg@368w_208h_1e_1c',
          url:'//abc.com'
        }],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  async mounted(){
    let self=this;
    let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword:'景点',
        city:self.$store.state.geo.position.city
      }
    })
    if(status===200&&count>0){
      let r= pois.filter(item=>item.photos.length).map(item=>{
        return {
          title:item.name,
          pos:item.type.split(';')[0],
          price:item.biz_ext.cost||'暂无',
          img:item.photos[0].url,
          url:'//abc.com'
        }
      })
      //  服务器没有,自己 mock
      r = mockData
      self.list[self.kind]=r.slice(0,9)
    }else{
      self.list[self.kind]=[]
    }
  },
  methods: {
    over: async function (e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        let {status,data:{count,pois}}=await self.$axios.get('/search/resultsByKeywords',{
          params:{
            keyword,
            city:self.$store.state.geo.position.city
          }
        })
        if(status===200&&count>0){
          let r= pois.filter(item=>item.photos.length).map(item=>{
            return {
              title:item.name,
              pos:item.type.split(';')[0],
              price:item.biz_ext.cost||'暂无',
              img:item.photos[0].url,
              url:'//abc.com'
            }
          })
          //  服务器没有,自己 mock
          r = mockData
          self.list[self.kind]=r.slice(0,9)
        }else{
          self.list[self.kind]=[]
        }
      }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
