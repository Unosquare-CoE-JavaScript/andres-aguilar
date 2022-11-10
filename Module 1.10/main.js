const https = require('https');

async function getPlanet(id) {
    return new Promise((resolve, reject) => {
        let data = '';
        https.get(`https://swapi.dev/api/planets/${id}/`, (response) => {
        response.on('data', (chunk) => {
            data = JSON.parse(chunk);
            // info = Object.keys(data).map((key) => [data[key]]);
        });
        response.on('end', () => {
            resolve(data.residents[1])
        });
     })
        .on('error', (error) => {
            console.log(error);
        })
    })
};

async function getChar(url) {
    return new Promise((resolve, reject) => {
        let character = [];
        https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data = JSON.parse(chunk);
            // info = Object.keys(data).map((key) => [data[key]]);
            character = [data.name, data.height]
        });
        response.on('end', () => {
            console.log(character)
        });
        })
        .on('error', (error) => {
            console.log(error);
        })
        resolve(character)
    })
};

async function getData() {
    await getPlanet(1).then((res) => getChar(res))
}

getData();
