let userModel = require("../../model/index.js").userModel

function regist(req, res) {
  let name = req.body.name;
  let pwd = req.body.pwd;
  if(!name || !pwd){
    res.send({
      code:0
    });
    return;
  }
  let doc1 = new userModel.resisModel({
    username: name,
    password: pwd,
    createTime: new Date()
  });
  doc1.save(err => {
    if (err) {
      res.send({
        code:0
      });
      return;
    }
    res.send({
      code: 1
    })
  }); //这一步骤是必须的！save函数中可以使用cb
}

module.exports = regist
