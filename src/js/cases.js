const cases = document.querySelector('.cases');
const casesTotal = document.querySelector('.cases-total');
const btnLoadMore = document.querySelector('.load-more');
let page = 1;
let items = 20;

function getCases() {
    btnLoadMore.innerText = 'Loading..';

    fetch(`https://coronavirus-ph-api.herokuapp.com/cases?page=${page}&itemsPerPage=${items}`, {
        method: 'GET',
        redirect: 'follow'
    }).then(function(response) {
        response.json().then(function(obj) {
            cases.insertAdjacentHTML('beforeend', makeListTemplate(obj.data.data));
            casesTotal.innerText = `${cases.childElementCount.toLocaleString()} of ${obj.data.total.toLocaleString()}`;

            btnLoadMore.innerText = 'Load more';

            page++;
        });
    }).catch(error => console.log('error', error));
}

function makeListTemplate(data) {
    let html = '';

    data.forEach(e => {
        html += `<tr>
                    <td>${e.case_no}</td>
                    <td><span class="badge badge--${e.health_status.toLowerCase()}">${e.health_status}</span></td>
                    <td>${e.age}</td>
                    <td>${e.sex}</td>
                    <td>${e.location}</td>
                    <td>${e.travel_history}</td>
                    <td>${e.hospital_admitted_to}</td>
                    <td>${e.date_of_announcement_to_public}</td>
                 </tr>`;
    });

    return html;
}

btnLoadMore.addEventListener('click', function() {
    getCases();
});

getCases();
