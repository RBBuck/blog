const express = require('express')
const router = express.Router()
const { db,genid } = require("../db/DbUtils")


router.get("/test",async (req,res)=>{//防止回调地狱在db里面进行封装
//    db.all("select * from `admin`",[],(err,rows)=>{
//     console.log(rows)
//    })

//    db.async.all("select * from `admin`",[]).then((res) => {
//     console.log(res)
//    })
   
let out = await db.async.all("select * from `admin`",[])//使用promise

    res.send({
        id:genid.NextId(),
        out//等同于out：out
    })
})

module.exports = router