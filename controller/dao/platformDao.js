/** * Created by liangxu on 2017/11/30. */let _ = require('lodash');let errorCode = require('../../config/errorCode');let pg = require('../../util/DB_Base');let knex = require('../../util/knex');let util = require('../../util/util');class platformDao{    async getPlatformServiceKindDao(shopid){        console.log("====getPlatformServiceKindDao====shopid=====",shopid);        try{            return await knex("platform_servicekind").column(                    "platform_servicekind.id as kindid",                    "platform_servicekind.name as kindname",                    "platform_servicekind.imgurl",                    "platform_servicekind.type",                    "platform_servicekind.isonline"            ).select()        }catch(e){            console.log("======getPlatformServiceKindDao===e==", e);            throw e;        }    }    async getPlatformSubServiceKindDao(shopid){        console.log("====getPlatformSubServiceKindDao====shopid=====",shopid);        try{            return await knex("sub_servicekind").column(                    "sub_servicekind.id as kindid",                    "sub_servicekind.name as kindname",                    "sub_servicekind.imgurl",                    "sub_servicekind.subtype",                    "sub_servicekind.maintype"            ).select()        }catch(e){            console.log("======getPlatformSubServiceKindDao===e==", e);            throw e;        }    }}module.exports= platformDao;