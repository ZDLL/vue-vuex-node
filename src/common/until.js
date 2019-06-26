import CryptoJS from 'crypto-js';
import Moment from 'moment';

function getAesString(data, key, iv) {
  let CryptoKey = CryptoJS.enc.Utf8.parse(key);
  let CryptoIv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, CryptoKey, {
    iv: CryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString(); //返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) {
  let CryptKey = CryptoJS.enc.Utf8.parse(key);
  let CryptoIv = CryptoJS.enc.Utf8.parse(iv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, CryptKey, {
    iv: CryptoIv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * CryptoJS加密
 */
let getAES = function(data) { //加密
  let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
  let iv = '1234567812345678';
  let encrypted = getAesString(data, key, iv); //密文
  let encrypted1 = CryptoJS.enc.Utf8.parse(encrypted);
  return encrypted;
}

/**
 * CryptoJS解密
 */
let getDAes = function(data) { //解密
  let key = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; //密钥
  let iv = '1234567812345678';
  let decryptedStr = getDAesString(data, key, iv);
  return decryptedStr;
}

/**
 * 存储localStorage
 */
let setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
let getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
let removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

/*
  获取url上参数
*/

let getUrlParams = function(name) {
  let reg = new RegExp(name + "=([^&]*)");
  let r = window.location.href.match(reg);
  if (r != null) return unescape(r[1]);
  return null;
}

/*
  参数为fromdata型的axios封装
*/
let axiosFromData = function (obj){
    return new Promise((resolve,reject)=>{ //promise重新封装一个fromData格式的请求
        axios({
            url:obj.url,
            method:obj.method || "get",
            data:obj.data,
            transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then((res)=>{
            resolve(res)
        }).catch((err)=>{
            reject(err)
        })
    })
}

/**
 *格林时间转换成年月日时分秒
 */

let greenTimeChange=function (time){
  Moment.suppressDeprecationWarnings = true;//关闭moment插件的警告
  return Moment(time).format('YYYY-MM-DD HH:mm:ss')
}

export default {
  getAES,
  getDAes,
  setStore,
  getStore,
  removeStore,
  getUrlParams,
  axiosFromData,
  greenTimeChange
}
