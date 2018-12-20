import Router from 'koa-router'; 
import axios from './utils/axios';
import Poi from '../dbs/models/poi';

let router = new Router({prefix: '/search'})

const sign = 'abcd';

router.get('/top', async ctx => {
    
    try {
    let top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
//   let {status, data: {
//         top
//     }} = await axios.get(`http://cp-tools.cn/search/top`, {
//     params: {
//         input: ctx.query.input,
//         city: ctx.query.city,
//         sign
//     }
//     })
//     ctx.body = {
//     top: status === 200
//         ? top
//         : []
//     }

})

router.get('/hotPlace', async (ctx) => {
    let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
    
    try {
      let result = await Poi.find({
        city,
        type: ctx.query.type || '景点'
      }).limit(10)
    
      ctx.body = {
        code: 0,
        result: result.map(item => {
          return {
            name: item.name,
            type: item.type
          }
        })
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        result: []
      }
    }
    // let city = ctx.store
    //   ? ctx.store.geo.position.city
    //   : ctx.query.city
    // let {status, data: {
    //     result
    //   }} = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    //   params: {
    //     sign,
    //     city
    //   }
    // })
    // ctx.body = {
    //   result: status === 200
    //     ? result
    //     : []
    // }
})

router.get('/resultsByKeywords', async (ctx) => {
    const {city, keyword} = ctx.query;
    let {
      status,
      data: {
        count,
        pois
      }
    } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
      params: {
        city,
        keyword,
        sign
      }
    })
    // ctx.body = {
    //   count: status === 200 ? count : 0,
    //   pois: status === 200
    //     ? pois
    //     : []
    // }

    // 接口未实现完全,需返回坐标,评价,图片,评分...等数据
    pois = []
    let i = 10;
    while(i){
      pois.push({
        type:'美食;食物',
        photos:[{url:'//p1.meituan.net/merchantpic/0c33305bef133d460805004248fabbdc5283840.jpg@240w_180h_1e_1c_1l|watermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20|368w_208h_1e_1c'}],
        name:'金真子纸上烤肉（双桥店）',
        biz_ext:{
          rating:'3.5',
          cost:'162'
        },
        tag:'美食 人气店家',
        tel:'136573143565',
        location:'116.397428, 39.90923'
      })
      i--;
    }
    ctx.body = {
      count: 5,
      pois
    }
  })
  
  router.get('/products', async (ctx) => {
    let keyword = ctx.query.keyword || '旅游'
    let city = ctx.query.city || '北京'
    let {
      status,
      data: {
        product,
        more
      }
    } = await axios.get('http://cp-tools.cn/search/products', {
      params: {
        keyword,
        city,
        sign
      }
    })
    if (status === 200) {
      ctx.body = {
        product,
        more: ctx.isAuthenticated() ? more: [],
        login: ctx.isAuthenticated()
      }
    }else{
      ctx.body = {
        product: {},
        more: ctx.isAuthenticated() ? more: [],
        login: ctx.isAuthenticated()
      }
    }
  })



export default router