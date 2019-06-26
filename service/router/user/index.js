let express = require("express");
let app = express();
let router = express.Router();
let userModule = require("../../module/user/index.js")
// let moduleFunc = require("../module/index.js")]

// let userRouter = require("./user/login.js")
/*
 导出路由
*/

router.post("/login",userModule.login);
router.post("/regist",userModule.resist);
router.post("/userinfo",userModule.userinfo);
router.post("/userList",userModule.userList);
router.post("/addManger",userModule.addManger);
router.post('/deleteManger',userModule.deleteManger);

module.exports = router
