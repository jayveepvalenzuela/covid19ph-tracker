export class Case {
    async getStats() {
        const apiHeaders = new Headers();

        apiHeaders.append('Subscription-Key', 'aae4537d392b4b3b92098464b4ef766d');

        try {
            const response = await fetch('https://api.smartable.ai/coronavirus/stats/PH', {
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
}
