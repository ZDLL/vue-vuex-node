let userModel = require("../../model/index.js").userModel.user
function S4() {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  function guid() {
      return (S4()+S4()+S4());//+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4()
  }

let login  = function(req,res){
  let name =  req.body.name;
  let pwd =  req.body.pwd;
  if(!name || !pwd){
    res.send({
      code:0,
      msg:"缺少必要参数"
    });
    return
  }
  userModel.findOne({
    username:name,
    password:pwd
  },function(err,data){
    if(err){
      res.send({
        code:0,
        msg:"查询错误",
        data:err
      })
      return
    }
    if(data){
      res.send({
        code:1,
        msg:"登录成功",
        data:data.userToken
      })
    }
  })
    // var myID = "userId" + guid();
    // console.log("生成token")
    // console.log(myID)
}
module.exports = {
  login:login
}
