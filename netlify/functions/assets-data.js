const fs = require('fs');
const path = require('path');

const data = require("./assets-data.json");

exports.handler = async function () {
    const filePath = path.join(__dirname, 'assets-data.json'); 
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
