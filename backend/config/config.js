const config = {
    local: {
        DB: {
            HOST: "localhost",
            PORT: "27017",
            DATABASE: "College",
        },
        PORTS: {
            API_PORT: 3278,
        },
    },
    staging: {}
     
}

module.exports.get = function get(env) {
    return config[env];
};