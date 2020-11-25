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

    getElement('.confirmed-cases').innerText = totalConfirmedCases.toLocaleString();
    getElement('.confirmed-today').innerText = newlyConfirmedCases.toLocaleString();
    getElement('.deaths').innerText = totalDeaths.toLocaleString();
    getElement('.deaths-today').innerText = newDeaths.toLocaleString();
    getElement('.recovered').innerText = totalRecoveredCases.toLocaleString();
    getElement('.recovered-today').innerText = newlyRecoveredCases.toLocaleString();
    getElement('.last-update').innerText = new Date(data.updatedDateTime).toLocaleDateString('en-US', {
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

    const progressionChart = new Chart(getElement('#progressionChart').getContext('2d'), {
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

caseAPI.getCasesPerRegion().then(function(data) {
    getElement('.cases-per-region').insertAdjacentHTML('beforeend', generateRows(data.data));
});

const generateRows = function(data) {
    let rows = '';

    data.forEach(e => {
        rows += `<tr>
                    <td class="text-uppercase">${e.region}</td>
                    <td>${e.cases.toLocaleString()}</td>
                 </tr>`;
    });

    return rows;
};
