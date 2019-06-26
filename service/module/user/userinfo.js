
let userModel = require("../../model/index.js").userModel.user

let userinfo = function(req,res){
  let token  = req.body.token
  if(!token){
    res.send({
      code:0,
      msg:"缺少必要参数"
    });
    return
  }
    userModel.findOne({
      userToken:token
    },function(err,data){
      if(err){
        res.send({
          code:0,
          msg:"查询错误"
        });
        return
      }
      if(data){
        res.send({
          code:1,
          msg:"查询成功",
          data:data
        })
      }
    })
};

let userList = function(req,res){
  userModel.find({
    state:1
  },null,{
    sort:{
      createTime:-1
    }
  },function(err,data){
    res.send({
      code:1,
      data:data
    })
  })
}
module.exports ={
   userinfo:userinfo, //用户信息可能后期会涉及到用户权限等
   userList:userList
}
