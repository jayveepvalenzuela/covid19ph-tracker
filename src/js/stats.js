const lastUpdate = document.querySelector('.last-update');
const confirmed = document.querySelector('.confirmed');
const active = document.querySelector('.active');
const deaths = document.querySelector('.deaths');
const recovered = document.querySelector('.recovered');

fetch('https://corona.lmao.ninja/v2/countries/philippines', {
    method: 'GET',
    redirect: 'follow'
}).then(function(response) {
    response.json().then(function(data) {
        lastUpdate.innerText = new Date(data.updated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        confirmed.innerText = data.cases.toLocaleString();
        active.innerText = data.active.toLocaleString();
        deaths.innerText = data.deaths.toLocaleString();
        recovered.innerText = data.recovered.toLocaleString();
    });
}).catch(error => console.log('error', error));
