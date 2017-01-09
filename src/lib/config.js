'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    base: 'https://ADMINUI_DOMAIN/adminui',
    username: 'AD_USERNAME',
    password: 'AD_PASSWORD',
    defaultBox: 'KMS_MICROSITE_TERMINUS_BOX_URL', // env-##.terminus...

    debug: true,

    set: function set(cfg) {
        for (var key in cfg) {
            config[key] = cfg[key];
        }

        return config;
    }
};

exports.default = config;