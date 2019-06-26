let userModel = require("../../model/index.js").userModel.user
let until = require("../../until/index.js")
/*
 添加管理员
*/
let addManger=function(req,res){
    let name = req.body.name;
    let pwd = req.body.pwd;
    let phone =  req.body.phone
    let right = req.body.right;
    let state = req.body.state;
    let findQuery= {};
    findQuery.userToken= req.body.userToken
    if(!name || !pwd || !right){
      res.send({
        code:0,
        mag:"缺少必要参数"
      });
      return
    };
    userModel.findOneAndUpdate(findQuery,{
      $set:{
        username:name,
        password:pwd,
        right:right,
        phone:phone,
        createTime:new Date(),
        userToken:until.cryptoFunc(name,pwd),
        state:state || 1
      }
    },{
      upsert: true,
      new: true,
    },function(err,data){
      if(err){
        console.log(`错误=========${err}`);
        return ;
      }
      res.send({
        code:1,
        msg:"添加成功"
      })
    })
};
/*
 删除管理员
*/
let deleteManger = function(req,res){
  let userToken = req.body.userToken;
  if(!userToken){
    res.send({
      code:0,
      msg:"缺少必要参数"
    })
    return
  }
  userModel.updateOne({
    userToken:userToken
  },{$set:{
    state:0
  }},(err,data)=>{
    if(err){
      console.log(`删除管理员错误：${err}`)
      res.send({
        code:0,
        msg:`删除编号为${userToken}管理员错误`
      })
      return
    }
    console.log(data)
    res.send({
      code:1,
      msg:"删除成功"
    })
  })

}
module.exports={
  addManger:addManger,
  deleteManger:deleteManger
}
