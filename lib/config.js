const config = {
    base: 'https://ADMINUI_DOMAIN/adminui',
    username: 'AD_USERNAME',
    password: 'AD_PASSWORD',
    defaultBox: 'KMS_MICROSITE_TERMINUS_BOX_URL', // env-##.terminus...

    debug: true,

    set: (cfg) => {
        for (let key in cfg) {
            config[key] = cfg[key];
        }

        return config;
    }
};

export default config;
