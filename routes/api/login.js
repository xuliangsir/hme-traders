/** * Created by liangxu on 2017/11/16. */const LoginService = require('../../controller/service/login');const APIError = require('../../util/rest').APIError;const QiniuSDK = require("../../controller/sdk/qiniuCloud");var qcloud_cos = require('qcloud_cos');let appid = '10061631';let secret_id = 'AKIDyOodfIcmxmSMhgS7CeoZmD5kNXap9ylw';let secret_key = '2AxtftpiiyY2hLJjghJjhi243wFZcNme';let EXPIRED_SECONDS = 100; //过期时间module.exports = function(router){    router            .get('/api/getsign', async(ctx) => {                const loginService = new LoginService();                try{                    let bucket = 'tiger';                    qcloud_cos.conf.setAppInfo(appid, secret_id, secret_key);                    var expired = parseInt(Date.now() / 1000) + EXPIRED_SECONDS;                    var sign = qcloud_cos.auth.signMore(bucket, expired);                    console.log("getSignMore sign==",sign);                    ctx.rest({sign:sign});                }catch(e){                    console.log("getVerifyCode====eee==",e);                    throw new APIError(e);                }            })            .get('/api/getVerifyCode', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.getVerifyCode(ctx);                    console.log("result000==========",result);                    if(!result){                        throw new APIError(1005)                    }                    ctx.rest(result);                }catch(e){                    console.log("getVerifyCode====eee==",e);                    throw new APIError(e);                }            })            .post('/api/regist', async(ctx) => {                console.log("------regist---======");                const loginService = new LoginService();               try{                   const result = await loginService.regist(ctx);                   console.log("result===regist=======",result);                   ctx.rest({result: result});               }catch(e){                   throw (e)               }            })            .post('/api/login', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.login(ctx);                    console.log("=======result===login=======",result);                    if(!result){                        throw new APIError(1004)                    }                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .post('/api/setuppwd', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.setupPwd(ctx);                    console.log("result===setuppwd=======",result);                    ctx.rest({result: result});                }catch(e){                    throw (e)                }            })            .post('/api/resetuppwd', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.reSetupPwd(ctx);                    console.log("/api/resetuppwd22222=======",result);                    ctx.rest({result: result});                }catch(e){                    throw (e)                }            })            .post('/api/addshopsetupinfo', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.addShopsetupService(ctx);                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .get('/api/getshopsetupinfo', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.getShopSetupInfoService(ctx);                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .post('/api/updateshopsetup', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.addShopsetupService(ctx);                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .post('/api/addshopcertifyInfo', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.addShopcertifyService(ctx);                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .get('/api/getshopcertifyInfo', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.getShopCertifyInfoService(ctx);                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .post('/api/updateshopcertifyInfo', async(ctx) => {                const loginService = new LoginService();                try{                    const result = await loginService.addShopsetupService(ctx);                    ctx.rest(result);                }catch(e){                    throw (e)                }            })            .get('/api/getqiniutoken', async(ctx) => {                const qiniuSDK = new QiniuSDK();                try{                    const result = await qiniuSDK.getToken(ctx);                    ctx.rest({token: result});                }catch(e){                    throw (e)                }            })};