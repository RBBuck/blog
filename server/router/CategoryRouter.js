const express = require('express')
const router = express.Router()
const { db,genid } = require("../db/DbUtils")

//列表接口
//添加接口
//修改接口
//删除接口



//列表接口
router.get("/list",async(req,res)=>{

    const search_sql = "SELECT * FROM `category`"//全部返还
    let { err,rows } = await db.async.all(search_sql,[])
   
    if(err === null){
        res.send({
            code:200,
            msg:'查询成功',
            rows
        })
    }else{
        res.send({
            code:500,
            msg:'查询失败'
        })
    }
})




//添加接口 验证成功
router.post("/_token/add",async(req,res)=>{
    // console.log(JSON.parse(req.body))
    // let {token} = req.headers;//如果没有token的验证那么别人可以随便更改你的代码结构

    // let admin_token_sql = "SELECT * FROM 'admin' WHERE 'token' = ? "//去数据库能查的出来说明已经登录
    // let adminResult = await db.async.run(admin_token_sql,[token])
    // if(adminResult.err || adminResult.rows.length == 0){//错误或者长度为0说明没有登录
    //     res.send({
    //         code:403,
    //         msg: "请先登录哦"
    //     })
    //     return
    // }
//token 验证结束
    let {name} = req.body
    const insert_sql = "INSERT INTO `category` (`id`,`name`) VALUES (?,?)"
    let {err,rows} = await db.async.run(insert_sql,[genid.NextId(),name])

    if(err === null){
        res.send({
            code:200,//自定义的接口类型
            msg:"添加成功"
        })
    }else{
        res.send({
            
            code:500,
            msg:"添加失败"
        })
    }
})


//修改接口
router.put("/_token/update",async(req,res)=>{

    let {id,name} = req.body
    const update_sql = "UPDATE `category` SET `name` = ? WHERE `id` = ?"
    let {err,rows} = await db.async.run(update_sql,[name,id])
    if(err === null){
        res.send({
            code:200,
            msg:"修改成功"
        })
    }else{
        res.send({
            err,
            code:500,
            msg:"修改失败"
        })
    }
})




//删除接口/category/delete?id=xxx  加/_token调用token验证的中间件
router.delete("/_token/delete",async(req,res)=>{
    let id = req.query.id//id的唯一性
    console.log(id)
    const delete_sql = "DELETE FROM `category` WHERE `id` = ?"
    let { err,rows } = await db.async.run(delete_sql,[id])
    if(err === null){
        res.send({
            code:200,
            msg:'删除成功'
        })
    }else{
        res.send({
            code:500,
            msg:'删除失败'
        })
    }
})
module.exports = router