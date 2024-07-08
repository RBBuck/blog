const express = require('express')
const router = express.Router()
const {v4:uuidv4} = require('uuid')
const { db,genid } = require("../db/DbUtils")

router.post("/login",async ( req,res)=>{

   let {account,password } = req.body ;//获取前端的数据
   let {err,rows         }= await db.async.all("select * from `admin` where `account` = ? AND `password` = ?",[account,password])//顺序不能打乱
   
   if(err === null && rows.length > 0){//5.22只有用户登录的功能  但是没法验证用户在其它页面是否登录
                                       //用token 原因是因为 ID容易创车而token不容易重复
    let login_token = uuidv4();
    let update_token_sql = "UPDATE `admin` SET `token` = ? WHERE `id` = ?"   
   
    await db.async.run(update_token_sql,[login_token,rows[0].id])

    let admin_info = rows[0]
    admin_info.token = login_token
    admin_info.password = ""

    res.send({
        code:200,
        msg:'登录成功',
        data:admin_info
    })
   }else{
    res.send({
        code:500,
        msg:'登录失败'
    })
   }
})


module.exports = router