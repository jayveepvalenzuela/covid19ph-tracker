const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

async function getTotalCases() {
    try {
        const response = await fetch('https://coronavirus-ph-api.herokuapp.com/total', requestOptions);

        return await response.json();
    } catch(error) {
        console.error(error);
    }
}

async function getTotalCasesAbroad() {
    try {
        const response = await fetch('https://coronavirus-ph-api.herokuapp.com/cases-outside-ph', requestOptions);

        return await response.json();
    } catch(error) {
        console.error(error);
    }
}

async function getCasesTimeline() {
    const fromDate = '2020-01-30';
    const presentDate = new Date().toISOString().slice(0, 10);

    try {
        const response = await fetch(`https://api.covid19api.com/country/philippines?from=${fromDate}&to=${presentDate}`, requestOptions);

        return await response.json();
    } catch(error) {
        console.error(error);
    }
}

async function getCaseList(page) {
    try {
        const response = await fetch(`https://coronavirus-ph-api.herokuapp.com/cases?page=${page}&itemsPerPage=50`, requestOptions);

        return await response.json();
    } catch(error) {
        console.error(error);
    }
}
