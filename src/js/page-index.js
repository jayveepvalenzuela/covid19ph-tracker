import { Case } from './case.js';

const caseAPI = new Case();

caseAPI.getStats().then(function(data) {
    // total stats
    const {
        totalConfirmedCases,
        newlyConfirmedCases,
        totalDeaths,
        newDeaths,
        totalRecoveredCases,
        newlyRecoveredCases,
        history
    } = data.stats;

    document.querySelector('.confirmed-cases').innerText = totalConfirmedCases.toLocaleString();
    document.querySelector('.confirmed-today').innerText = newlyConfirmedCases.toLocaleString();
    document.querySelector('.deaths').innerText = totalDeaths.toLocaleString();
    document.querySelector('.deaths-today').innerText = newDeaths.toLocaleString();
    document.querySelector('.recovered').innerText = totalRecoveredCases.toLocaleString();
    document.querySelector('.recovered-today').innerText = newlyRecoveredCases.toLocaleString();
    document.querySelector('.last-update').innerText = new Date(data.updatedDateTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // case progression
    const confirmedData = history.map(e => e.confirmed);
    const deathData = history.map(e => e.deaths);
    const recoveredData = history.map(e => e.recovered);
    const dateData = history.map(e => new Date(e.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }));

    const progressionChart = new Chart(document.querySelector('#progressionChart').getContext('2d'), {
        type: 'line',
        data: {
            labels: dateData,
            datasets: [
                {
                    label: 'Confirmed',
                    data: confirmedData,
                    pointBackgroundColor: '#777777',
                    borderColor: '#777777'
                },
                {
                    label: 'Deaths',
                    data: deathData,
                    pointBackgroundColor: '#F44336',
                    borderColor: '#F44336'
                },
                {
                    label: 'Recovered',
                    data: recoveredData,
                    pointBackgroundColor: '#4CAF50',
                    borderColor: '#4CAF50'
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        callback: (tick, index, array) => (index % 5) ? '' : tick
                    }
                }]
            },
            tooltips: {
                mode: 'index',
                position: 'nearest'
            },
            legend: {
                labels: {
                    usePointStyle : true
                }
            },
            elements: {
                line: {
                    borderWidth: 2,
                    borderCapStyle: 'round',
                    fill: false
                },
                point: {
                    radius: 0,
                    hitRadius: 3,
                    hoverRadius: 5
                }
            }
        }
    });
});
