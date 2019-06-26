let userModel = require("../../model/index.js").userModel.user;
let until = require("../../until/index.js")

function regist(req, res) {
  let name = req.body.name;
  let pwd = req.body.pwd;
  if (!name || !pwd) {
    res.send({
      code: 0
    });
    return;
  }
  userModel.findOneAndUpdate({
    username: name,
    password: pwd,
    userToken:until.cryptoFunc(name,pwd),
    createTime: new Date()
  }, {
    $inc: {
      userId: 1
    }
  }, {
    upsert: true,
    new: true,
    // setDefaultsOnInsert: true
  }, function(err, data) {
    if (err) {
      res.send({
        code: 0,
        msg:'用户注册失败'
      })
      return;
    }
    res.send({
      code: 1,
      msg:"注册成功"
    })
  })


  // let doc1 = new userModel({
  //   username: name,
  //   password: pwd,
  //   userToken:until.cryptoFunc(name,pwd),
  //   createTime: new Date()
  // });
  // doc1.save(err => {//这一步骤是必须的！save函数中可以使用cb
  //   if (err) {
  //     res.send({
  //       code:0
  //     });
  //     return;
  //   }
  //   res.send({
  //     code: 1
  //   })
  // });
  //
  //


}

module.exports = {
  regist: regist
}
