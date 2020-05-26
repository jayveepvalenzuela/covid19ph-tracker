getTotalCases().then(function(data) {
    const { last_update, cases, admitted, deaths, deaths_today, recoveries, recoveries_today } = data.data;

    document.querySelector('.confirmed').innerText = cases.toLocaleString();
    document.querySelector('.active-cases').innerText = admitted.toLocaleString();
    document.querySelector('.deaths').innerText = deaths.toLocaleString();
    document.querySelector('.deaths-today').innerText = deaths_today.toLocaleString();
    document.querySelector('.recovered').innerText = recoveries.toLocaleString();
    document.querySelector('.recovered-today').innerText = recoveries_today.toLocaleString();
    document.querySelector('.last-update').innerText = new Date(last_update).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

getTotalCasesAbroad().then(function(data) {
    document.querySelector('.stats-abroad').insertAdjacentHTML('beforeend', generateTableRows(data.data));
});

getCasesTimeline().then(function(data) {
    const chartDeaths = data.map(e => e.Deaths);
    const chartRecovered = data.map(e => e.Recovered);
    const chartActive = data.map(e => e.Active);
    const chartDates = data.map(e => new Date(e.Date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    }));

    const deathRecoveredChart = new Chart(document.querySelector('#deathRecoveredChart').getContext('2d'), {
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
                            return (index % 5) ? '' : tick;
                        }
                    }
                }]
            },
            tooltips: {
                mode: 'index',
                position: 'nearest'
            }
        }
    });

    const activeChart = new Chart(document.querySelector('#activeChart').getContext('2d'), {
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
                            return (index % 5) ? '' : tick;
                        }
                    }
                }]
            }
        }
    });
});

function generateTableRows(data) {
    let html = '';

    data.forEach(function(e) {
        html += `<tr>
                    <th scope="row">${e.country_territory_place}</th>
                    <td>${e.confirmed}</td>
                    <td>${e.died}</td>
                    <td>${e.recovered}</td>
                </tr>`;
    });

    return html;
}
