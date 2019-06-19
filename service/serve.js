let express = require("express")
let path = require("path")
let bodyParser = require('body-parser')//接收post请求
let FileStreamRotator = require('file-stream-rotator') //日志切割
let session = require('express-session');//导入可能需要用到的session
let cookieParser = require('cookie-parser')//导入可能需要用到的cookie
let fs = require('fs')//文件管理
let morgan = require('morgan') //日志管理
let app = express();
let logDirectory = path.join(__dirname, 'log')//文件路径
let mongoose = require('mongoose'); //链接mongoose
// let router=express.Router();
/*
  日志文件
*/
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
let accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',//日志格式
  filename: path.join(logDirectory, 'access-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})

/*
  添加express 中间键
*/
app.use(morgan('short', {stream: accessLogStream}))//日志按时间倒序
app.use(express.static('./dist'));//静态文件解析
app.use(bodyParser.json())//接收post请求转成json对象 bodyParser.json（）
app.use(bodyParser.urlencoded({ extended: true }))//支持post方法
app.use(cookieParser());
app.use(session({
    secret: '12345',// 对session id 相关的cookie 进行签名
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true//是否保存未初始化的会话
   }));



/*
  链接数据库
*/
mongoose.connect('mongodb://127.0.0.1/perfectworld');  // 若是带账号密码的：'mongodb://root:123456@127.0.0.1:27017/perfectworld'
// 连接成功操作
mongoose.connection.on("connected",function(){
	console.log("MongoDB connected success.")
  require('./model/index.js');
})

// 连接失败操作
mongoose.connection.on("error",function(err){
	console.log("MongoDB connected fail.")
  console.log(err)
})

let routerModule = require("./router/initRouter.js")
function initRouter() {
  let i=0;
  for(i=0;i<routerModule.length ;i++){
    app.use('/',routerModule[i].module);
  }
}
initRouter();

// 连接断开操作
// mongoose.connection.on("disconnected",function(){
// 	console.log("MongoDB connected disconnected.")
// })


let server = app.listen(8088, function () {
    console.log("监听8088端口")
})
