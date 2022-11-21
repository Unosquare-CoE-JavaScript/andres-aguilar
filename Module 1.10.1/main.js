//`https://jsonmock.hackerrank.com/api/transactions/search?txnType=${transactionType}&page=${page}`

async function totalTransactions(locationId, transactionType) {
    const axios = require('axios')
    let totalPages = 0;
    let results = [];
    const requestPage = async (number) => {
        currentPage = number;
        await axios.get(`https://jsonmock.hackerrank.com/api/transactions/search?txnType=${transactionType}&page=${number}`).then((res) => {
            totalPages = res.data.total_pages;
            for(element of res.data.data) {
                let removeSign = element.amount.replace('$','');
                let parsedAmount = parseInt(removeSign.replace(/,/g, ''));
                results.push([element.id, parsedAmount]);
            }
        });
    };
    await requestPage(1);
    if(totalPages > 1) {
        for(let i = 2; i < totalPages; i++) {
            results.concat(await requestPage(i));
        }
    }

    return results;
}

async function test() {
    let array1 = await totalTransactions(1, "debit")
    console.log(array1)
}

test()

