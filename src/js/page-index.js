import { Case } from './case.js';

const caseAPI = new Case();

caseAPI.getTotalCases().then(function(data) {
    const { last_update, cases, admitted, deaths, deaths_today, recoveries, recoveries_today, fatality_rate, recovery_rate } = data.data;

    document.querySelector('.confirmed-cases').innerText = cases.toLocaleString();
    document.querySelector('.active-cases').innerText = admitted.toLocaleString();
    document.querySelector('.deaths').innerText = deaths.toLocaleString();
    document.querySelector('.deaths-today').innerText = deaths_today.toLocaleString();
    document.querySelector('.recovered').innerText = recoveries.toLocaleString();
    document.querySelector('.recovered-today').innerText = recoveries_today.toLocaleString();
    document.querySelector('.fatality-rate').innerText = fatality_rate;
    document.querySelector('.recovery-rate').innerText = recovery_rate;
    document.querySelector('.last-update').innerText = new Date(last_update).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
});

caseAPI.getCasesTimeline().then(function(data) {
    const confirmedData = data.map(e => e.Confirmed);
    const activeData = data.map(e => e.Active);
    const deathData = data.map(e => e.Deaths);
    const recoveredData = data.map(e => e.Recovered);
    const dateData = data.map(e => new Date(e.Date).toLocaleDateString('en-US', {
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
                    label: 'Active',
                    data: activeData,
                    pointBackgroundColor: '#2196F3',
                    borderColor: '#2196F3'
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
