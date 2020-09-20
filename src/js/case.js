export class Case {
    async getStats() {
        // HEADERS FOR DEMO PURPOSES ONLY
        const apiHeaders = new Headers();

        apiHeaders.append('x-rapidapi-host', 'coronavirus-smartable.p.rapidapi.com');
        apiHeaders.append('x-rapidapi-key', 'ade6bbdc40msh4b986c729890fd1p1ef7f1jsn758dde8d72fc');

        try {
            const response = await fetch('https://coronavirus-smartable.p.rapidapi.com/stats/v1/PH/', {
                method: 'GET',
                headers: apiHeaders,
                redirect: 'follow'
            });

            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }

    async getList(page, items) {
        try {
            const response = await fetch(`https://covid19-api-philippines.herokuapp.com/api/get?page=${page}&limit=${items}`, {
                method: 'GET',
                redirect: 'follow'
            });

            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }

    async getCasesPerRegion() {
        try {
            const response = await fetch('https://covid19-api-philippines.herokuapp.com/api/top-regions', {
                method: 'GET',
                redirect: 'follow'
            });

            return await response.json();
        } catch(error) {
            console.error(error);
        }
    }
}
