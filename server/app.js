const express = require("express")//引入
const multer = require("multer")
const path =require("path")
const app = express()
const { db,genid } = require("./db/DbUtils")
const port =3000//端口给到main.js


//开放跨与请求
app.use( function (req, res, next) {
    //设置跨域允许访问的类型
    res.header('Access-Control-Allow-Origin', '*');
    //设置前端带过来的访问请求头类型
    res.header('Access-Control-Allow-Headers', '*');
    //跨域允许的请求方法
    res.header('Access-Control-Allow-Methods', '*');
    //if (req.method  == "OPTIONS")res.sendStaus(200);//让options快速结束
     next();
});
app.use(express.json())//中间件尽量往上面写不然容易报错
const updata = multer({
    dest:"./public/upload/temp"
})
app.use(updata.any())
//制定静态资源的路径
app.use(express.static(path.join(__dirname,"public")))

//token中间件如果没有代码冗余
const ADMIN_TOKEN_PATH = "/_token"
app.all("*", async (req, res, next) => {
    console.log('查找接口是否是权限接口中。。')
    // console.log(req.path.indexOf(ADMIN_TOKEN_PATH))
    if (req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
        //权限验证测试，是否有token
        let { token } = req.headers;

        let admin_token_sql = "SELECT * FROM `admin` WHERE `token` = ?"
        let adminResult = await db.async.all(admin_token_sql, [token])
        //数据库中查找不到对应的token,先进行登录。如何查找到token的话
        if (adminResult.err != null || adminResult.rows.length == 0) {
            res.send({
                code: 403,
                msg: '请先登录'
            })
            return
        }else{
            console.log('token正确进行下一步。')
            next()
        }
    } else {
        console.log('没有token进行下一步。')
        next()
    }
})


//注册组件
app.use('/test', require("./router/TestRouter"))
app.use('/admin', require("./router/AdminRouter"))
app.use('/category', require("./router/CategoryRouter"))
app.use('/blog', require("./router/BlogRouter"))
app.use('/upload', require("./router/UploadRouter"))

app.get("/",(req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`启动成功 : http://localhost:${port}/`);
})

