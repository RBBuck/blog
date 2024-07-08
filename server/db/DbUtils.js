const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const GenId = require('../utils/SmokeFlake')

var db = new sqlite3.Database(path.join(__dirname,"blog.sqlite3"))
const genid = new GenId({WorkerId:1})

db.async = {}//给db添加一个async属性

db.async.all = (sql,params) => {
    return new Promise((resolve,reject) => {//promise封装
        db.all(sql,params,(err,rows)=>{//传给sql和params然后回调函数
            resolve({err,rows})//回调处理
        })
    })
}

db.async.run = (sql,params) => {
    return new Promise((resolve,reject) => {
        db.run(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}



module.exports={
    db,
    genid
}
