const fromDate = '2020-01-30';
const presentDate = new Date().toISOString().slice(0, 10);

fetch(`https://api.covid19api.com/country/philippines?from=${fromDate}&to=${presentDate}`, {
    method: 'GET',
    redirect: 'follow'
}).then(function(response) {
    response.json().then(function(data) {
        const chartDates = data.map(prop => new Date(prop.Date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        }));
        const chartDeaths = data.map(prop => prop.Deaths);
        const chartRecovered = data.map(prop => prop.Recovered);
        const ctx = document.querySelector('#deathRecoveredChart').getContext('2d');

        const deathRecoveredChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartDates,
                datasets: [
                    {
                        label: 'Deaths',
                        data: chartDeaths,
                        pointBackgroundColor: '#F44336',
                        backgroundColor: 'transparent',
                        borderColor: '#F44336',
                        borderCapStyle: 'round',
                        borderWidth: 1
                    },
                    {
                        label: 'Recovered',
                        data: chartRecovered,
                        pointBackgroundColor: '#4CAF50',
                        backgroundColor: 'transparent',
                        borderColor: '#4CAF50',
                        borderCapStyle: 'round',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            callback: function(tick, index, array) {
                                return (index % 3) ? '' : tick;
                            }
                        }
                    }]
                }
            }
        });
    });
}).catch(error => console.log('error', error));
