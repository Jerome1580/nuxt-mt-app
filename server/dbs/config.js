export default {
    dbs:'mongodb://127.0.0.1:27017/student',
    redis:{
        get host(){
            return '127.0.0.1'
        },
        get port(){
            return 6379
        }
    },
    smtp:{
        get host(){
            // qq 邮箱服务器地址
            return 'smtp.qq.com'
        },
        get user(){
            // 账户
            return 'raoju1580@qq.com'
        },
        get pass(){
            // 授权码
            return 'xtrytxmzgxifbeic'
        },
        get code(){
            // 生成验证码
            return ()=> {
                return Math.random().toString(16).slice(2,6).toUpperCase()
            }
        },
        get expire(){
            // 生成过期时间
            return ()=>{
                return new Date().getTime()+60*60*1000
            }
        }
    }
    
}