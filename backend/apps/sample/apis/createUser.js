/* 
 * (C) 2020 TekMonks. All rights reserved.
 */

// Custom modules
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);
const mysql = require(`${CONSTANTS.APPROOTDIR}/sample/3p/node_modules/mysql`);
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'sample',
    user: 'root',
    password: ''
});

connection.connect();

exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;
    try {
        const userCreated = await createUser(jsonReq);
        console.log(`User Created ==> ${userCreated}`);
        if (!userCreated) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { userCreated } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const createUser = async (jsonReq) => {
    try {
        const results = await connectionQuery(jsonReq);
        if (results) return results;
        else return false;
    } catch (error) {
        return false;
    }
}

const connectionQuery = (jsonReq) => {
    return new Promise((resolve, reject) => {
        const conquery = connection.query('INSERT INTO users SET ?', { name: jsonReq.name, age: jsonReq.age }, (error, results) => {
            if (error) return reject(error);
            if (!results || !results.insertId) return resolve(false);
            resolve(results.insertId);
        });
    });
}

const validateRequest = jsonReq => (jsonReq && jsonReq.name && jsonReq.age);