const config = {
    base: 'https://ADMINUI-DOMAIN/adminui',
    username: 'AD-USERNAME',
    password: 'AD-PASSWORD',
    apiEnv: 'API-ENV',
    apiBox: 'API-BOX',
    siteEnv: 'SITE-ENV',
    siteBox: 'SITE-BOX',

    debug: true,

    set: (cfg) => {
        for (let key in cfg) {
            config[key] = cfg[key];
        }

        return config;
    }
};

export default config;
