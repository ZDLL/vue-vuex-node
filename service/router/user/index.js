let express = require("express");
let app = express();
let router = express.Router();
let userModule = require("../../module/user/index.js")
// let moduleFunc = require("../module/index.js")]

// let userRouter = require("./user/login.js")
/*
  导出路由
*/

router.post("/login",userModule.login)
router.post("/regist",userModule.resist)

// function(req,res,next){
//   console.log(req)
//   let name = req.body.name;
//   let pwd  =  req.body.name;
//   console.log(name+"====="+pwd)
//   res.send({
//     code:1,
//     msg:"注册成功"
//   })
// }

//)

module.exports = router
