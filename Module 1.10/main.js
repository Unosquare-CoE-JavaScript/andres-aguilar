const https = require('https');

function getData(episode) {
    let info = [];
    https.get(`https://swapi.dev/api/planets/${episode}/`, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = JSON.parse(chunk);
        info = Object.keys(data).map((key) => [data[key]]);
    });

    response.on('end', () => {
        console.log(info);
    });
 })
    .on('error', (error) => {
        console.log(error);
    })
};

getData(1);
