
const db_config = {
    connectionLimit: 200,
    queueLimit: 50,
    waitForConnections : true,
    host: '193.219.91.103',
    port: 5100,
    user: 'kaziolas',
    password: 'kazis',
    database: 'client',
    multipleStatements: true
}

const simIP = "193.219.91.103";
const simPORT = 3264;


    module.exports = {
        db_config : db_config,
        simIP : simIP,
        simPORT : simPORT,
    };
