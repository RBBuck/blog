const express = require('express')
const router = express.Router()
const fs =  require("fs")
//const path = require('path')
const { db,genid } = require("../db/DbUtils")


// 实现文件上传的路由
router.post("/rich_editor_upload", async (req, res) => {
	// // console.log(req)
	// // 创建formidable表单解析对象
	// const form = new formidable.IncomingForm({
	// 	//配置上传文件的存放位置
	// 	uploadDir: path.join(__dirname, '../', 'public', 'uploads'),
	// 	//保留上传文件后缀
	// 	keepExtensions: true,
	// })
	//form.parse(req, (err, fields, files) => {
		// 将客户端传递过来的文件地址响应到客户端
		if(!req.files){
			res.send({
				
					"errno":1,
					"message":"出现异常"
			})
            return;
		}
		
        let files = req.files;
        let ret_files = [];
        
        // for (let file of files) {
        //     //获取文件名字的后缀
        //     let files_ext  =   file.originalname.substring(file.originalname.lastIndexof(".") +1)
        //     //随机文件的名字
        //     let files_name  =  genid.NextId() + "." +file_ext
        
        // fs.renameSync(
        //     process.cwd() + "/public/upload/temp" + file.fielname,
        //     process.cwd() + "/public/upload" + fiel_name,
        // )
        // ret_files.push("/upload" + fiel_name)
        
        // }
        // console.log(files['wangeditor-uploaded-image'].filepath.split('public')[1])
		res.send({
			"errno":0,
			"data":{
				"url":ret_files[0],
				
			}
		})
	})

module.exports = router
//  const fs =  require("fs")
// const express = require('express')
// const router = express.Router()
// const path = require('path')

// const { db,genid } = require("../db/DbUtils")


// // 实现文件上传的路由
// router.post("/file", async (req, res) => {
// 	// console.log(req)
// 	// 创建formidable表单解析对象
// 	const form = new formidable.IncomingForm({
// 		//配置上传文件的存放位置
// 		uploadDir: path.join(__dirname, '../', 'public', 'uploads'),
// 		//保留上传文件后缀
// 		keepExtensions: true,
// 	})
// 	form.parse(req, (err, fields, files) => {
// 		// 将客户端传递过来的文件地址响应到客户端
// 		if(err){
// 			return res.send(
// 				{
// 					errno:1,
// 					message:"出现异常",
// 					err
// 				}
// 			)
// 		}
// 		// console.log(files['wangeditor-uploaded-image'].filepath.split('public')[1])
// 		return res.send({
// 			errno:0,
// 			data:{
// 				url:files['wangeditor-uploaded-image'].filepath.split('public')[1],
// 				alt:'无'
// 			}
// 		});
// 	});
// })
// module.exports = router