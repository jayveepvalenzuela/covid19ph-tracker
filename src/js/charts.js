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
        const chartActive = data.map(prop => prop.Active);
        const chartConfirmed = data.map(prop => prop.Confirmed);

        const deathRecoveredCtx = document.querySelector('#deathRecoveredChart').getContext('2d');
        const activeCtx = document.querySelector('#activeChart').getContext('2d');
        const totalCtx = document.querySelector('#totalChart').getContext('2d');

        const deathRecoveredChart = new Chart(deathRecoveredCtx, {
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

        const activeChart = new Chart(activeCtx, {
            type: 'line',
            data: {
                labels: chartDates,
                datasets: [
                    {
                        label: 'Active Cases',
                        data: chartActive,
                        pointBackgroundColor: '#2196F3',
                        backgroundColor: 'rgba(33,150,243,.5)',
                        borderColor: '#2196F3',
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

        const totalChart = new Chart(totalCtx, {
            type: 'line',
            data: {
                labels: chartDates,
                datasets: [
                    {
                        label: 'Total Cases',
                        data: chartConfirmed,
                        pointBackgroundColor: '#777777',
                        backgroundColor: 'rgba(119,119,119,.5)',
                        borderColor: '#777777',
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
