/** * Created by liangxu on 2017/11/30. */let _ = require('lodash');let errorCode = require('../../config/errorCode');let pg = require('../../util/DB_Base');let knex = require('../../util/knex');let util = require('../../util/util');class ShopDao{    async addServiceDao(params){        try{            return await knex("shop_service").insert(params)        }catch(e){            console.log("======addServiceDao===e==", e);            throw e;        }    }    async getShopServiceDao(shopid){        console.log("====getShopServiceDao====shopid=====",shopid);        try{            return await knex("shop_service").column(                    "shop_service.id as serviceid",                    "shop_service.uuid as uuid",                    "shop_service.shopid ",                    "shop_service.serviceimgurl",                    "shop_service.name",                    "shop_service.description",                    "shop_service.price",                    "shop_service.unit",                    "shop_service.originalprice",                    "shop_service.minbuycount",                    "shop_service.servicetimes",                    "shop_service.platform_servicetype",                    "shop_service.subservice_subtype",                    "shop_service.shopkind",                    "shop_service.city",                    "shop_service.sortno as sortNo",                    "shop_service.isonline",                    "platform_servicekind.name as platfrom_serviceName",                    "sub_servicekind.name as sub_serviceKindName"            ).select()                    .leftJoin("platform_servicekind", "shop_service.platform_servicetype", "platform_servicekind.type")                    .leftJoin("sub_servicekind", "shop_service.subservice_subtype", "sub_servicekind.subtype")                    .where({shopid:shopid})        }catch(e){            console.log("======addServiceDao===e==", e);            throw e;        }    }    async getShopServiceListDao(shopid){        try{            return await knex("shop_service").column(                    "shop_service.id as serviceid",                    "shop_service.shopid ",                    "shop_service.serviceimgurl",                    "shop_service.name",                    "shop_service.description",                    "shop_service.price",                    "shop_service.unit",                    "shop_service.originalprice",                    "shop_service.shopkind",                    "shop_service.city"            ).select().where({"shop_service.shopid":shopid})        }catch(e){            console.log("======getShopServiceListDao===e==", e);            throw e;        }    }    async updateShopServiceDao(params){        try{            return await knex("shop_service").update({                serviceimgurl: params.serviceimgurl,                name: params.name,                description: params.description,                price: params.price,                unit: params.unit,                originalprice: params.originalprice,                minbuycount: params.minbuycount,                servicetimes: params.servicetimes,                platform_servicetype: params.platform_servicetype,                subservice_subtype: params.subservice_subtype,                shopkind: params.shopkind,                city: params.city,                sortno: params.sortno,                isonline: params.isonline        }).where({id:params.serviceid, shopid:params.shopid}).select();        }catch(e){            console.log("======updateShopServiceDao===e==", e);            throw e;        }    }    async addShopServiceKindDao(params){        try{            return await knex("shop_servicekind").insert(params)        }catch(e){            console.log("======addShopServiceKindDao===e==", e);            throw e;        }    }    async addPlatformKindDaoCopy(params){        try{            return await knex("platform_kind").insert(params)        }catch(e){            console.log("======addPlatformKindDaoCopy===e==", e);            throw e;        }    }    async getShopServicekindDao(shopid){        try{            return await knex("shop_servicekind").column(                    "shop_servicekind.id as kindid",                    "shop_servicekind.uuid ",                    "shop_servicekind.shopid",                    "shop_servicekind.sortno",                    "shop_servicekind.servicekind"            ).select().where({shopid:shopid})        }catch(e){            console.log("======getShopServicekindDao===e==", e);            throw e;        }    }    async updateShopServicekindDao(params){        try{            return await knex("shop_servicekind").update({                sortno :params.sortno,                servicekind:params.servicekind            }).select().where({shopid:shopid, servicekind: params.kindid})        }catch(e){            console.log("======updateShopServicekindDao===e==", e);            throw e;        }    }    async getShopServicekindDaoCOPY(shopid){        try{            return await knex("shop_service").column(                    "shop_service.id as serviceid",                    "shop_service.shopid ",                    "shop_service.name",                    "shop_service.description",                    "shop_service.price",                    "shop_service.originalprice",                    "shop_service.minbuycount",                    "shop_service.servicetimes",                    "shop_service.platformkind",                    "shop_service.shopkind",                    "shop_service.city",                    "shop_service.sortNo",                    "shop_service.isonline"            ).select().where({id:serviceid})        }catch(e){            console.log("======addServiceDao===e==", e);            throw e;        }    }    async getPlatformServiceKindDao(){        console.log("====getPlatformServiceKindDao====shopid=====");        try{            return await knex("platform_servicekind").column(                    "platform_servicekind.id as kindid",                    "platform_servicekind.name as kindname",                    "platform_servicekind.imgurl",                    "platform_servicekind.type as maintype",                    "platform_servicekind.isonline"            ).select()        }catch(e){            console.log("======getPlatformServiceKindDao===e==", e);            throw e;        }    }    async getPlatformSubServiceKindDao(maintype){        console.log("====getPlatformSubServiceKindDao====shopid=====",maintype);        try{            return await knex("sub_servicekind").column(                    "sub_servicekind.id as kindid",                    "sub_servicekind.name as kindname",                    "sub_servicekind.imgurl",                    "sub_servicekind.subtype",                    "sub_servicekind.maintype"            ).where({maintype: maintype}).select()        }catch(e){            console.log("======getPlatformSubServiceKindDao===e==", e);            throw e;        }    }    async addSchoolDao(params){        try{            return await knex("school").insert(params)        }catch(e){            console.log("======addSchoolDao===e==", e);            throw e;        }    }    async getSchoolInfoById(schoolid){        console.log("====getSchoolInfoById====schoolid=====",schoolid);        try{            return await knex("school").column(                    "school.id as schoolid",                    "school.uuid as uuid",                    "school.address",                    "school.mobile",                    "school.lat",                    "school.lon",                    "school.poiID",                    "school.mark",                    "school.judge",                    "school.areacode",                    "school.cityname",                    "school.regionname",                    "school.regioncode",                    "school.imgurl"            ).where({id: schoolid}).select()        }catch(e){            console.log("======getSchoolInfoById===e==", e);            throw e;        }    }    async updateSchoolServiceDao(params){        try{            return await knex("school").update({                "schoolname": params.schoolname,                "address": params.address,                "mobile": params.mobile,                "lat": params.lat,                "lon": params.lon,                "poiID": params.poiID,                "mark": params.mark,                "judge": params.judge,                "areacode": params.areacode,                "cityname": params.cityname,                "regionname": params.regionname,                "regioncode": params.regioncode,                "imgurl": params.imgurl            }).select().where({schoolid: params.schoolid})        }catch(e){            console.log("======updateShopServicekindDao===e==", e);            throw e;        }    }    async addSchoolComment(params){        try{            return await knex("comments").insert(params)        }catch(e){            console.log("======addSchoolDao===e==", e);            throw e;        }    }    async delSchoolComment(commentid){        try{            return await knex("comments").del().where({id: commentid})        }catch(e){            console.log("======delSchoolComment===e==", e);            throw e;        }    }    async getSchoolCommentList(commentid){        try{            return await knex("comments")                    .column(                            "comment.content",                            "comment.userid",                            "user.avatar",                            "user.id",                            "comment.datetime"                    )                    .where({id: commentid})        }catch(e){            console.log("======delSchoolComment===e==", e);            throw e;        }    }    async getShopServiceByIdDao(shopid, serviceid){        try{            return await knex("shop_service").column(                    "shop_service.id as serviceid",                    "shop_service.uuid as uuid",                    "shop_service.shopid ",                    "shop_service.serviceimgurl",                    "shop_service.name",                    "shop_service.description",                    "shop_service.price",                    "shop_service.unit",                    "shop_service.originalprice",                    "shop_service.platform_servicetype",                    "shop_service.subservice_subtype",                    "shop_service.isonline",                    "platform_servicekind.name as platfrom_serviceName",                    "sub_servicekind.name as sub_serviceKindName"            ).select()                    .leftJoin("platform_servicekind", "shop_service.platform_servicetype", "platform_servicekind.type")                    .leftJoin("sub_servicekind", "shop_service.subservice_subtype", "sub_servicekind.subtype")                    .where({"shop_service.shopid": shopid, "shop_service.id": serviceid})        }catch(e){            console.log("======getShopServiceByIdDao===e==", e);            throw e;        }    }    async updateShopServiceByIdDao(params){        try{            return await knex("shop_service").update({                serviceimgurl: params.serviceimgurl,                name: params.name,                description: params.name,                price: params.price,                unit: params.unit,                originalprice: params.originalprice,                minbuycount: params.minbuycount,                servicetimes: params.servicetimes,                platform_servicetype: params.platform_servicetype,                subservice_subtype: params.subservice_subtype,                shopkind: params.shopkind,                city: params.city,                sortno: params.sortno,                isonline: params.isonline            }).where({id:params.serviceid, shopid:params.shopid}).select();        }catch(e){            throw e;        }    }    async delShopServiceByidDao(params){            return await knex("shop_service").del().where({shopid: params.shopid, id: params.serviceid})    }}module.exports= ShopDao;