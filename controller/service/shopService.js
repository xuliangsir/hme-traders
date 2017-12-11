/** * Created by liangxu on 2017/11/30. */let sendVerifyCode = require('../sdk/sendVerifyCode').send_sms;let https = require('https');let qs = require('querystring');let _ = require('lodash');let LoginDao = require('../dao/LoginDao');let ShopDao = require('../dao/ShopDao');let VerifyCode = require('../../controller/sdk/verifyCode');const APIError = require('../../util/rest').APIError;const ErrorCoe = require('../../config/errorCode');const util = require("../../util/util");const qiniu = require("qiniu");const moment = require("moment");class LoginService{    async addService(ctx) {        const {shopid, serviceimgurl, name,description,price, unit, originalprice, minbuycount, servicetimes, platformkind, subplatformkind, shopkind, city, sortNo, isonline} = ctx.request.body;        const params = {            uuid: util.getUserUUID(),            shopid:shopid ||0,            serviceimgurl: serviceimgurl,            name:name,            description:description,            price:price,            unit: unit,            originalprice:originalprice,            minbuycount:minbuycount,            servicetimes:servicetimes,            platformkind:platformkind,            subplatformkind:subplatformkind,            shopkind:shopkind,            city:city,            sortno:sortNo,            isonline:isonline        };        console.log("=====addService====params===",params);        const addresult = await new ShopDao().addServiceDao(params);        if(!addresult){            return false;        }        return true;    }    async getService(ctx) {        const {shopid, serviceid} = ctx.query;        console.log("=====getService===shopid=======",shopid,serviceid);        if(!shopid){            throw new APIError(1);        }        const serviceResult = await new ShopDao().getShopServiceDao(shopid);        console.log("========serviceResult=======",serviceResult);        if(!serviceResult.length){            return false;        }        return serviceResult;    }    async updateService(ctx) {        const {shopid, serviceid,serviceimgurl, name,description,price, unit, originalprice, minbuycount, servicetimes, platformkind, subplatformkind, shopkind, city, sortNo, isonline} = ctx.request.body;        const params = {            uuid: util.getUserUUID(),            serviceid:serviceid,            shopid:shopid,            serviceimgurl: serviceimgurl,            name:name,            description:description,            price:price,            unit: unit,            originalprice:originalprice,            minbuycount:minbuycount,            servicetimes:servicetimes,            platformkind:platformkind,            subplatformkind:subplatformkind,            shopkind:shopkind,            city:city,            sortno:sortNo,            isonline:isonline        };        const updateResult = await new ShopDao().updateShopServiceDao(params);        if(!updateResult){            return false;        }        return updateResult;    }    async addShopServiceKindService(ctx) {        const {shopid, sortNo, servicekind} = ctx.request.body;        const params = {            uuid: util.getUUID(),            sortno: sortNo,            servicekind: servicekind,            shopid: shopid        };        console.log("===addShopServiceKindService====params==",params);        const addresult = await new ShopDao().addShopServiceKindDao(params);        console.log("=====addShopServiceKindService====addresult===", addresult);        if(!addresult){            return false;        }        return true;    }    async getShopServiceKindService(ctx) {        const {shopid} = ctx.query;        console.log("===getShopServiceKindService====shopid==",shopid);        const kindlist = await new ShopDao().getShopServicekindDao();        console.log("=====getShopServiceKindService====getShopServiceKindService===", kindlist);        if(!kindlist.length){            return false;        }        return kindlist;    }    async updateShopServiceKindService(ctx) {        const {shopid, sortNo, servicekind, kindid} = ctx.request.body;        const params = {            uuid: util.getUUID(),            sortno: sortNo,            servicekind: servicekind,            shopid: shopid,            kindid:kindid        };        console.log("===updateShopServiceKindService====params==",params);        const updateresult = await new ShopDao().updateShopServicekindDao(params);        console.log("=====updateShopServiceKindService====updateresult===", updateresult);        if(!updateresult){            return false;        }        return true;    }    async addPlatformKind(ctx) {        const {shopid, sortNo, servicekind} = ctx.request.body;        const params = {            uuid: util.getUUID(),            sortno: sortNo,            servicekind: servicekind,            shopid: shopid        };        console.log("=====addPlatformKind====params===",params);        const addresult = await new ShopDao().addPlatformKindDao(params);        console.log("=====addPlatformKind====addresult===",addresult);        if(!addresult){            return false;        }        return true;    }    async getServicekind(ctx) {        const {shopid} = ctx.query;        const srviceResult = await new ShopDao().getShopServiceDao(shopid);        if(!srviceResult.length){            return false;        }        return srviceResult;    }    async getPlatformServiceKindService(ctx) {        const serviceList = await new ShopDao().getPlatformServiceKindDao();        if(!serviceList.length){            return false;        }        return serviceList;    }    async getPlatformServiceSubKindService(ctx) {        const maintype = ctx.query.maintype;        const serviceList = await new ShopDao().getPlatformSubServiceKindDao(maintype);        if(!serviceList.length){            return false;        }        return serviceList;    }    async addSchoolService(ctx) {        const {schoolname, address, mobile,lat, lon, poiID, mark, judge, areacode, cityname, regionname, regioncode, imgurl } = ctx.request.body;        const params = {            uuid: util.getUUID(),            schoolname:schoolname,            address: address,            mobile: mobile,            lat: lat,            lon:lon,            poiID:poiID,            mark:mark,            judge:judge,            areacode:areacode,            cityname:cityname,            regionname:regionname,            regioncode:regioncode,            imgurl:imgurl        };        console.log("=====addschoolService====params===",params);        const addresult = await new ShopDao().addSchoolDao(params);        console.log("=====addschoolService====addresult===",addresult);        if(!addresult){            return false;        }        return true;    }    async getSchoolService(ctx) {        const {schoolid} = ctx.request.body;        console.log("=====getSchoolService====params===",schoolid);        const schoolResult = await new ShopDao().getSchoolInfoById(params);        console.log("=====addschoolService====addresult===",addresult);        if(!schoolResult.length){            return false;        }        return schoolResult;    }    async updateSchoolService(ctx) {        const {schoolid, schoolname, address, mobile,lat, lon, poiID, mark, judge, areacode, cityname, regionname, regioncode, imgurl } = ctx.request.body;        const params = {            schoolid: schoolid,            schoolname:schoolname,            address: address,            mobile: mobile,            lat: lat,            lon:lon,            poiID:poiID,            mark:mark,            judge:judge,            areacode:areacode,            cityname:cityname,            regionname:regionname,            regioncode:regioncode,            imgurl:imgurl        };        console.log("=====addschoolService====params===",params);        const addresult = await new ShopDao().updateSchoolServiceDao(params);        console.log("=====addschoolService====addresult===",addresult);        if(!addresult){            return false;        }        return true;    }    async addSchoolComment(ctx) {        const {schoolid, content } = ctx.request.body;        const params = {            uuid: util.getUUID(),            schoolid:schoolid,            content: content,            datetime: util.getCurrentDate()        };        console.log("=====addSchoolComment====params===",params);        const addresult = await new ShopDao().addSchoolComment(params);        console.log("=====addSchoolComment====addresult===",addresult);        if(!addresult){            return false;        }        return true;    }    async delSchoolComment(ctx) {        const {commentid } = ctx.request.body;        const addresult = await new ShopDao().delSchoolComment(commentid);        console.log("=====delSchoolComment====addresult===",addresult);        if(!addresult){            return false;        }        return true;    }    async getSchoolCommentList(ctx) {        const {schoolid } = ctx.request.body;        console.log("=====getSchoolCommentList====params===",schoolid);        const addresult = await new ShopDao().delSchoolComment(schoolid);        console.log("=====delSchoolComment====addresult===",addresult);        if(!addresult){            return false;        }        return true;    }}module.exports = LoginService;