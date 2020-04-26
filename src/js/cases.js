const cases = document.querySelector('.cases');
const casesTotal = document.querySelector('.cases-total');
const btnLoadMore = document.querySelector('.load-more');
let page = 1;
let items = 20;

function getCases() {
    fetch(`https://coronavirus-ph-api.herokuapp.com/doh-data-drop?page=${page}&itemsPerPage=${items}`, {
        method: 'GET',
        redirect: 'follow'
    }).then(function(response) {
        response.json().then(function(data) {
            cases.insertAdjacentHTML('beforeend', makeListTemplate(data.data));
            casesTotal.innerText = `${cases.childElementCount} of ${data.total}`;

            btnLoadMore.innerText = 'Load more';

            page++;
        });
    }).catch(error => console.log('error', error));
}

function makeListTemplate(data) {
    let html = '';

    data.forEach(e => {
        html += `<tr>
                    <td>${e.case_code}</td>
                    <td>${setStatus(e.date_died, e.recovered_on)}</td>
                    <td>${e.age}</td>
                    <td>${e.sex}</td>
                    <td>${e.location}</td>
                    <td>${e.date_reported}</td>
                 </tr>`;
    });

    return html;
}

function setStatus(isDeceased, isRecovered) {
    if (isDeceased) return '<span class="badge badge--danger">Deceased</span>';

    if (isRecovered) return '<span class="badge badge--success">Recovered</span>';

    return '<span class="badge">Pending</span>';
}

btnLoadMore.addEventListener('click', function() {
    btnLoadMore.innerText = 'Loading..';
    getCases();
});

getCases();
