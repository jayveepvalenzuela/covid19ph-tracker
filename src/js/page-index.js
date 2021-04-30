import { getElement, formatNumber, formatDate } from './app.js';
import { Case } from './case.js';

const caseAPI = new Case();

const generateRows = data => {
    const template = getElement('#row-template');
    const tbody = getElement('.cases-per-region');

    data.forEach(e => {
        const tr = document.importNode(template.content, true);

        tr.querySelector('.region').textContent = e.region;
        tr.querySelector('.region-total').textContent = e.cases;
        tbody.appendChild(tr);
    });
};

caseAPI.getStats().then(data => {
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

    getElement('.confirmed-cases').innerText = formatNumber(totalConfirmedCases);
    getElement('.confirmed-today').innerText = formatNumber(newlyConfirmedCases);
    getElement('.deaths').innerText = formatNumber(totalDeaths);
    getElement('.deaths-today').innerText = formatNumber(newDeaths);
    getElement('.recovered').innerText = formatNumber(totalRecoveredCases);
    getElement('.recovered-today').innerText = formatNumber(newlyRecoveredCases);
    getElement('.last-update').innerText = formatDate(data.updatedDateTime);

    // case progression
    const confirmedData = history.map(e => e.confirmed);
    const deathData = history.map(e => e.deaths);
    const recoveredData = history.map(e => e.recovered);
    const dateData = history.map(e => formatDate(e.date));

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

caseAPI.getCasesPerRegion().then(data => {
    generateRows(data.data);
});
