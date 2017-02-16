'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    base: 'https://ADMINUI-DOMAIN/adminui',
    username: 'AD-USERNAME',
    password: 'AD-PASSWORD',
    apiEnv: 'API-ENV',
    apiBox: 'API-BOX',
    siteEnv: 'SITE-ENV',
    siteBox: 'SITE-BOX',

    debug: true,

    set: function set(cfg) {
        for (var key in cfg) {
            config[key] = cfg[key];
        }

        return config;
    }
};

exports.default = config;