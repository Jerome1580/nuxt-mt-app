<template>
    <div class="m-menu">
    <dl class="nav" 
        @mouseleave="mouseleave"
    >
        <dt>全部分类</dt>
        <dd v-for="(item ,idx) in $store.state.home.menu" 
            :key="idx"
            @mouseenter="enter"
        >
            <i :class="item.type"/>{{item.name}} <span class="arrow"></span>
        </dd>
    </dl>
    <div    class="detail" 
            v-if="kind"
            @mouseenter="sover"
            @mouseleave="sout"
    >
        <template v-for="(item, idx) in curdetail.child">
            <h4 :key="idx">{{ item.title}}</h4>
            <span v-for="v in item.child" :key="v">{{v}}</span>
            
        </template>
    </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                kind:'',
                menu:[
                    {
                        type:'food',
                        name:'美食',
                        child:[{
                            title:'美食',
                            child:['代金券','可乐','雪碧','代金券3','代金券4','代金券5']
                        }]
                    },
                    {
                        type:'takeout',
                        name:'外卖',
                        child:[{
                            title:'外卖',
                            child:['中餐','西餐','中西餐','代金券3','代金券4','代金券5']
                        }]
                    },
                    {
                        type:'hotel',
                        name:'酒店',
                        child:[{
                            title:'酒店',
                            child:['酒家','如家','如意','代金券3','代金券4','代金券5']
                        }]
                    },
                    
                ]
            }
        },
        computed:{
            curdetail(){
                
                return this.$store.state.home.menu.filter(item => item.type === this.kind)[0];
            }
        },
        methods:{
            mouseleave(){
                let self = this;
                self._timer = setTimeout(function(){
                    self.kind = ''
                },150)
            },
            enter(e){
                this.kind =  e.target.querySelector('i').className
            },
            sover(){
                clearTimeout(this._timer)
            },
            sout(){
                this.kind = ''
            }
        }
    }
</script>

<style scoped>

</style>