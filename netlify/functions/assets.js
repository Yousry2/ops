const fs = require('fs');
const path = require('path');

exports.handler = async function () {
    const dataPath = path.resolve(__dirname, '../../assets.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    return {
        statusCode: 200,
        body: JSON.stringify(jsonData.assets),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
