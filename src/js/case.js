export class Case {
    async getTotalCases() {
        try {
            const response = await fetch('https://coronavirus-ph-api.herokuapp.com/total', {
                method: 'GET',
                redirect: 'follow'
            });

            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }

    async getCasesTimeline() {
        const fromDate = '2020-01-30';
        const presentDate = new Date().toISOString().slice(0, 10);

        try {
            const response = await fetch(`https://api.covid19api.com/country/philippines?from=${fromDate}&to=${presentDate}`, {
                method: 'GET',
                redirect: 'follow'
            });

            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }

    async getCaseList(page, items = 50) {
        try {
            const response = await fetch(`https://coronavirus-ph-api.herokuapp.com/cases?page=${page}&itemsPerPage=${items}`, {
                method: 'GET',
                redirect: 'follow'
            });

            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }
}
