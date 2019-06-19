/*
  用户数据模型导出
*/


/*
Schema 数据类型有这些
name:    String,
binary:  Buffer,
living:  Boolean,
updated: { type: Date, default: Date.now },
age:     { type: Number, min: 18, max: 65 },
mixed:   Schema.Types.Mixed,
_someId: Schema.Types.ObjectId,
array:      [],
ofString:   [String],
ofNumber:   [Number],
ofDates:    [Date],
ofBuffer:   [Buffer],
ofBoolean:  [Boolean],
ofMixed:    [Schema.Types.Mixed],
ofObjectId: [Schema.Types.ObjectId],
nested: {
  stuff: { type: String, lowercase: true, trim: true }
}
*/
let mongoose = require('mongoose');
let schema = new mongoose.Schema({//以json对象形式定义 Schema（数据模型）
        username:String,//数据类型
        password: "number",
        createTime:String
    });
let resisModel = mongoose.model('user', schema);//创建一个user的数据模型导出

module.exports ={
  resisModel
}
