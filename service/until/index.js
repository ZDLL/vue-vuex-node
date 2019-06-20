let crypto = require("crypto")

let cryptoPassFunc = function(name,pwd) {//根据用户名密码时间戳生成一个唯一值
  const md5 = crypto.createHash('md5');
  let timestamp = (new Date()).getTime()
  let md5Title = name + pwd +"_"+ timestamp
  return md5.update(md5Title).digest('hex');
};

module.exports = {
  cryptoFunc: cryptoPassFunc
}
