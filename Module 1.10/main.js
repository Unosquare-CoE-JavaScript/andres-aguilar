const https = require('https');

function getData(episode) {
    https.get('https://swapi.dev/api/films/1/', (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = JSON.parse(chunk);
    });

    response.on('end', () => {
        console.log(info.title);
    });
 })
    .on('error', (error) => {
        console.log(error);
    })
};

