/** * Created by liangxu on 2017/11/16. */const errorList = require("../config/errorCode");//使用restapimodule.exports = {    //返回错误码    APIError: function (message) {        this.success = false;        this.message = errorList.errorList(message).errorCode;    },    //返回数据    restify: (pathPrefix) => {        console.log("========pathPrefix========",pathPrefix);        pathPrefix = (pathPrefix || '/home/')||(pathPrefix || '/wechat/');        return async(ctx, next) => {            if (ctx.request.path.startsWith(pathPrefix)) {                ctx.rest = (data) => {                    ctx.response.type = 'application/json';                    ctx.response.body = {                        success: true,                        data: data?data:{}                    };                };                try {                    await next();                } catch (e) {                    //出错返回错误                    console.log('Process API error...', ctx.request.path, e);                    ctx.response.status = 200;                    ctx.response.type = 'application/json';                    ctx.response.body = {                        success: false,                        message: errorList.errorList(e.message).errorCode                    };                }            } else {                await next();            }        };    }};