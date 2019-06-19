let userModel = require("../../model/index.js").userModel.resisModel


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
        msg:"登录成功"
      })
    }
  })
}
module.exports = login
