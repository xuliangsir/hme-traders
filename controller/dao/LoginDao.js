/** * Created by liangxu on 2017/11/21. */let _ = require('lodash');let errorCode = require('../../config/errorCode');let pg = require('../../util/DB_Base');let knex = require('../../util/knex');let util = require('../../util/util');class LoginDao{    async addRestifyCode(params){        try{            console.log("======addRestifyCode=====params=====",params);           return await knex("enterprise_login").insert({                uuid: util.getUserUUID(),                nickname: params.nickname,                phone: params.phone,                password: params.password,                verifyCode: params.verifyCode,                verifytime: util.getCurrentDate(),                regtime: util.getCurrentDate()            })        }catch(e){            console.log("======addRestifyCode===e==", e);            throw e;        }    }    async updateRestifyCodeByPhone(params){        try{            console.log("======updateRestifyCodeByPhone=====params=====", params);            return await knex("enterprise_login")                    .update({                        verifyCode: params.verifyCode,                        verifytime: util.getCurrentDate()                    }).where({                        phone: params.phone                    })        }catch(e){            throw e;        }    }    async getUserInfoByPhone(params){        return await knex("enterprise_login")                .column(                        "enterprise_login.id as userid",                        "enterprise_login.nickname",                        "enterprise_login.password",                        "enterprise_login.avatar",                        "enterprise_login.phone",                        "enterprise_login.regtime",                        "enterprise_login.verifytime"                ).where({phone: params.phone})                .select();    }    async getUserInfoByPhoneAndVerifyCode(params){        return await knex("enterprise_login")                .column(                        "enterprise_login.id as userid",                        "enterprise_login.nickname",                        "enterprise_login.password",                        "enterprise_login.avatar",                        "enterprise_login.phone"                ).where({phone: params.phone, verifyCode: params.verifyCode})                .select();    }    async updateRegtime(params){        return await knex("enterprise_login")                .update({regtime: util.currentDate()})                .where({phone: params.phone})                .select();    }    async getUserInfoByPhoneAndPassword(params){        return await knex("enterprise_login")                .column(                        "enterprise_login.id as userid",                        "enterprise_login.nickname",                        "enterprise_login.password",                        "enterprise_login.avatar",                        "enterprise_login.phone"                ).where({phone: params.phone, password: params.password})                .select();    }    async setupPassword(params){        //  await knex.transaction(async(trx) => {        //     try{        //         await trx.update({password: params.password})        //                 .from("enterprise_login")        //                 .where({"enterprise_login.phone": params.phone});        //         trx.commit;        //     }catch(e){        //         trx.rollback;        //     }        // });        return await knex("enterprise_login")                .update({                    password: params.password                })                .where({"enterprise_login.phone": params.phone});    }    async addShopsetupDao(params){        try{            console.log("======shop_setup=====params=====",params);            return await knex("shop_setup").insert({                userid: params.userid,                phone: params.phone,                name: params.name,                album: params.album.toString(),                orderattention:params.orderattention,                shopintro:params.shopintro,                servicemobile:params.servicemobile,                servicetimebegin:params.servicetimebegin,                servicetimeend:params.servicetimeend,                week:params.week.toString(),                servicerange:params.servicerange.toString(),                minorderlimit:params.minorderlimit,                attachcost:params.attachcost,                exemptattachcost:params.exemptattachcost,                appointmenttime:params.appointmenttime            })        }catch(e){            throw e;        }    }    async addShopCertifyDao(params){        try{            console.log("===addShopCertifyDao===shop_Certify=====params=====",params);            return await knex("shop_certify").insert({                userid: params.userid,                phone: params.phone,                licencename: params.licencename,                type: params.type,                licenceurl: params.licenceurl,                creditcode : params.creditcode,                licenceregnum: params.licenceregnum,                licencelocation: params.licencelocation,                legalentity: params.legalentity,                limittimebegin: params.limittimebegin,                limittimeend: params.limittimeend,                identitycardphoto: params.identitycardphoto,                name: params.name,                identitycardnum: params.identitycardnum,                registaddress: params.registaddress            })        }catch(e){            throw e;        }    }    async getShopSetupInfoDao(params){        return await knex("shop_setup")                .column(                        "shop_setup.id as shopid",                        "shop_setup.userid",                        "shop_setup.phone",                        "shop_setup.name",                        "shop_setup.album",                        "shop_setup.week",                        "shop_setup.orderattention",                        "shop_setup.shopintro",                        "shop_setup.servicemobile",                        "shop_setup.servicetimebegin",                        "shop_setup.servicetimeend",                        "shop_setup.servicerange",                        "shop_setup.minorderlimit",                        "shop_setup.attachcost",                        "shop_setup.exemptattachcost",                        "shop_setup.appointmenttime"                ).where({userid: params.userid})                .select();    }    async updateShopsetupDao(params){        try{            console.log("======updateShopsetupDao=====params=====",params);            return await knex("shop_setup").update({                name: params.name,                album: params.album.toString(),                orderattention:params.orderattention,                shopintro:params.shopintro,                servicemobile:params.servicemobile,                servicetimebegin:params.servicetimebegin,                servicetimeend:params.servicetimeend,                week:params.week.toString(),                servicerange:params.servicerange.toString(),                minorderlimit:params.minorderlimit,                attachcost:params.attachcost,                exemptattachcost:params.exemptattachcost,                appointmenttime:params.appointmenttime,                registaddress: params.registaddress            }).where({userid:params.userid})        }catch(e){            throw e;        }    }    async getShopCertifyInfoDao(params){        return await knex("shop_certify")                .column(                        "shop_certify.id",                        "shop_certify.userid",                        "shop_certify.phone",                        "shop_certify.licencename",                        "shop_certify.type",                        "shop_certify.licenceurl",                        "shop_certify.creditcode",                        "shop_certify.licenceregnum",                        "shop_certify.licencelocation",                        "shop_certify.legalentity",                        "shop_certify.limittimebegin",                        "shop_certify.limittimeend",                        "shop_certify.identitycardphoto",                        "shop_certify.name",                        "shop_certify.identitycardnum",                        "shop_certify.registaddress"                ).where({userid: params.userid})                .select();    }    async updateShopCertifyInfoDao(params){        try{            console.log("======updateShopCertifyInfoDao=====params=====",params);            return await knex("shop_certify").update({                "licencename": params.licencename,                "type": params.type,                "licenceurl": params.licenceurl,                "creditcode": params.creditcode,                "licenceregnum": params.licenceregnum,                "licencelocation": params.licencelocation,                "legalentity": params.legalentity,                "limittimebegin": params.limittimebegin,                "limittimeend": params.limittimeend,                "identitycardphoto": params.identitycardphoto,                "name": params.name,                "identitycardnum": params.identitycardnum,                "registaddress": params.registaddress            }).where({userid:params.userid})        }catch(e){            throw e;        }    }}module.exports = LoginDao;