const serverConfig= {
    DEBUG: process.env.DEBUG,
    PORT: process.env.PORT || 4000,
    DABASE_URL: process.env.DABASE_URL,
    ACCESS_TOKEN: {
        SECRET: process.env.ACCESS_TOKEN_JWT_SECRET,
        EXPIRY: 3600 // 1 Hour
    },
    REFRESH_TOKEN: {
        SECRET: process.env.REFRESH_TOKEN_JWT_SECRET,
        EXPIRY: 86400 // 1 Day
    }
}

export default serverConfig
