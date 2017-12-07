/** * Created by liangxu on 2017/11/21. */let sendVerifyCode = require('../sdk/sendVerifyCode').send_sms;let https = require('https');let qs = require('querystring');let _ = require('lodash');let LoginDao = require('../dao/LoginDao');let VerifyCode = require('../../controller/sdk/verifyCode');const APIError = require('../../util/rest').APIError;const ErrorCoe = require('../../config/errorCode');const util = require("../../util/util");const qiniu = require("qiniu");const moment = require("moment");class LoginService{    async getVerifyCode(ctx){        const {phone} = ctx.query;        if(!phone){            throw new APIError(1)        }       const userInfo = await new LoginDao().getUserInfoByPhone({phone:phone});        let newuser = false;        if(!!userInfo.length){             newuser = true;            console.log("======phone==========",new Date().getTime() - new Date(userInfo[0].verifytime).getTime(), new Date(userInfo[0].verifytime).getTime());            if((new Date().getTime() - userInfo[0].verifytime) <= 60*1000*5  ){                return false;            }        }            return new Promise((resolve, reject)=>{                //const {phone} = ctx.request.body;                const code = _.random(10001, 100000);                console.log("===getVerifyCode===code===",code);                //verifyCode.sendMsg(mobile, code)                var post_data = {                    'apikey': '9cc160bdb7a4c412734f4798504ce2f1',                    'mobile': phone,                    'text': '【家政圈】您的验证码是' + code                };//这是需要提交的数据                var content = qs.stringify(post_data);                console.log("content========",content);                var options = {                    hostname: 'sms.yunpian.com',                    port: 443,                    path: '/v2/sms/single_send.json',                    method: 'POST',                    headers: {                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'                    }                };                var req = https.request(options, function (res) {                    // console.log('STATUS: ' + res.statusCode);                    // console.log('HEADERS: ' + JSON.stringify(res.headers));                    res.setEncoding('utf8');                    res.on('data', function (chunk) {                        console.log('BODY: ' + chunk, JSON.parse(chunk).code);                        if(JSON.parse(chunk).http_status_code >0 ){                            console.error("yunpian request error chunk: ",JSON.parse(chunk).http_status_code);                            return reject(JSON.parse(chunk).http_status_code)                        }                        if(JSON.parse(chunk).code == 0){                            if(!newuser){                                const params = {                                    uuid: util.getUserUUID(),                                    nickname: "",                                    phone: phone,                                    password: "123456",                                    verifyCode: code                                };                                try{                                    new LoginDao().addRestifyCode(params);                                } catch(e){                                    reject(false) ;                                }                            }else{                                try{                                    new LoginDao().updateRestifyCodeByPhone({phone: phone, verifyCode: code});                                } catch(e){                                    reject(false) ;                                }                            }                        }                    });                });                req.on('error', (e) => {                    console.error("yunpian request error==",e);                    req.end();                    return reject(false) ;                });                req.write(content);                req.end();                resolve({result:"OK"})            })    }    async regist(ctx) {        const {phone, verifyCode} = ctx.request.body;        console.log("=====regist=====",phone, verifyCode);        const result = await new LoginDao().getUserInfoByPhoneAndVerifyCode({phone: phone, verifyCode: verifyCode});        const updateResult = await new LoginDao().updateRegtime({phone: phone});        console.log("===regist==updateResult=====", updateResult);        if(!result.length){            return false;        }        return true;     }     async setupPwd(ctx){        const {phone, password} = ctx.request.body;        if(!phone || !password){            throw new APIError(1);        }         console.log("==setupPwd==phonephone=======",phone);        const userInfo = await new LoginDao().getUserInfoByPhone({phone: phone});         console.log("==setupPwd==userInfo=======",userInfo);        if(!userInfo.length){            return 1002;        }         const result = await new LoginDao().setupPassword({phone: phone, password: password});         console.log("==setupPwd==result=======",result);         if(result == 0){             return false;         }         return true;     }    async reSetupPwd(ctx){        const {phone, oldpassword, password} = ctx.request.body;        console.log("==resetupPwd==userInfo000=======",phone, oldpassword, password);        const userInfo = await new LoginDao().getUserInfoByPhone({phone: phone});        console.log("==resetupPwd==userInfo000=======",userInfo[0]);        if(!userInfo.length){            throw new APIError(1002);        }        if(userInfo[0].password != oldpassword){            throw new APIError(1003);        }        const result = await new LoginDao().setupPassword({phone: phone,  password: password});        console.log("======resetupPwd==result11111=======",result);        return result;    }    async login(ctx){        const {phone, password} = ctx.request.body;        console.log("=====login===password==",phone, password);        if(!phone || !password){            throw new APIError(1);        }        const userinfo = await new LoginDao().getUserInfoByPhoneAndPassword({phone: phone, password: password});        console.log("=====login===userinfo==",userinfo, userinfo[0].userid);        if(!userinfo.length){            return false;        }        if(!!userinfo.length){            const shopInfo = await new LoginDao().getShopSetupInfoDao({userid: userinfo[0].userid});            console.log("===shopInfo==shopInfo=====",shopInfo);            if(!!shopInfo.length){                userinfo[0].shopid = shopInfo[0].shopid;            }            let isSetupPassword = false;            if(!!userinfo[0].password){                isSetupPassword = true;            }            return {userInfo: userinfo[0], isSetupPassword: isSetupPassword};        }    }    async addShopsetupService(ctx){        const {userid, phone,name,album,orderattention,shopintro,servicemobile,servicetimebegin,servicetimeend,week,servicerange,minorderlimit,attachcost,exemptattachcost,appointmenttime} = ctx.request.body;        // if(!name || !shopintro || !servicemobile || !servicetimebegin || !servicetimeend ){        //     throw new APIError(1)        // }        console.log("===addShopsetupService==week=====",week);        const params = {            userid: userid,            phone: phone,            name: name,            album: album.toString(),            orderattention: orderattention || 0,            shopintro :shopintro,            servicemobile: servicemobile,            servicetimebegin: servicetimebegin || util.getCurrentDate(),            servicetimeend: servicetimeend || util.getCurrentDate(),            week: week.toString(),            servicerange: servicerange.toString(),            minorderlimit: minorderlimit|| 0,            attachcost: attachcost || 0,            exemptattachcost: exemptattachcost|| 0,            appointmenttime: appointmenttime        };        console.log("===addShopsetupService==params=====",params);        const isadd = await new LoginDao().getShopSetupInfoDao(params);        let result=0;        if(!!isadd.length){              result = await new LoginDao().updateShopsetupDao(params);        }else{              result = await new LoginDao().addShopsetupDao(params);        }        console.log("===addShopsetupService==result=====",result);        if(result > 0){            return false;        }        return true;    }    async getShopSetupInfoService(ctx){        const {userid} = ctx.query;        const result = await new LoginDao().getShopSetupInfoDao({userid:userid});        _.each(result, function(item){            console.log("===getShopSetupInfo==result=====",result);            if(!!item.album){                item.album = item.album.split(",");            }            if(!!item.week){                item.week = item.week.split(",");            }            if(!!item.servicerange){                item.servicerange = item.servicerange.split(",");            }        });        console.log("===getShopSetupInfo==result=====",result);        if(!result.length){            return false;        }        return result[0];    }    async updateShopsetupService(ctx){        const {userid, phone, name, album, orderattention, shopintro, servicemobile, servicetimebegin, servicetimeend, week, servicerange, minorderlimit,attachcost,exemptattachcost,appointmenttime} = ctx.request.body;        if(!name || !shopintro || !servicemobile || !servicetimebegin || !servicetimeend ){            throw new APIError(1)        }        const params = {            userid: userid,            phone: phone,            name: name,            album: album,            orderattention: orderattention,            shopintro :shopintro,            servicemobile: servicemobile,            servicetimebegin: servicetimebegin,            servicetimeend: servicetimeend,            week: week,            servicerange: servicerange,            minorderlimit: minorderlimit,            attachcost: attachcost,            exemptattachcost: exemptattachcost,            appointmenttime: appointmenttime        };        const result = await new LoginDao().addShopsetupDao(params);        console.log("===shopsetup==result=====",result);        if(!result){            return false;        }        return true;    }    async addShopcertifyService(ctx){        const {userid, phone,licencename,type,licenceurl,creditcode,licenceregnum,registaddress,licencelocation,legalentity,limittimebegin,limittimeend,identitycardphoto,name,identitycardnum} = ctx.request.body;        // if(!name || !shopintro || !servicemobile || !servicetimebegin || !servicetimeend ){        //     throw new APIError(1)        // }        const params = {            userid: userid,            phone: phone,            licencename: licencename,            type: type,            licenceurl: licenceurl.toString(),            creditcode :creditcode,            licenceregnum: licenceregnum,            registaddress: registaddress,            licencelocation: licencelocation,            legalentity: legalentity,            limittimebegin: limittimebegin || util.getCurrentDate(),            limittimeend: limittimeend || util.getCurrentDate(),            identitycardphoto: identitycardphoto.toString(),            name: name,            identitycardnum: identitycardnum        };        const certResult = await new LoginDao().getShopCertifyInfoDao({userid:userid});        let isAdd = 0;        if(!!certResult.length){            isAdd = await new LoginDao().updateShopCertifyInfoDao(params);        }else{            isAdd = await new LoginDao().addShopCertifyDao(params);        }        console.log("===addShopcertifyService==isAdd=====",isAdd);        if(isAdd > 0){            return true;        }        return true;    }    async getShopCertifyInfoService(ctx){        const {userid} = ctx.query;        if(!userid){            throw new APIError()        }        const result = await new LoginDao().getShopCertifyInfoDao({userid:userid});        _.each(result, function(item){            if(item.licenceurl){                item.licenceurl = item.licenceurl.split(",");            }            if(item.identitycardphoto){                item.identitycardphoto = item.identitycardphoto.split(",");            }        });        console.log("===getShopCertifyInfoService==result=====",result);        if(!result.length){            return false;        }        return result[0];    }    async getqiniutoken(ctx){        qiniu.conf.ACCESS_KEY = '3EaWN0DRyn_4gZxB2wFFH7W0vdxluf0ZZO6TZLvr';        qiniu.conf.SECRET_KEY = 'PQVBDF-TUGelOwHZrOMOiPUeH3WR0ESaL0yQchkl';        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);        var myUptoken = new qiniu.rs.PutPolicy("home");        var token = myUptoken.token();                console.log("=====tokentoken======",token);        moment.locale('en');        var currentKey = moment(new Date()).format('YYYY-MM-DD--HH-mm-ss');           }}module.exports = LoginService;