const cases = document.querySelector('.cases');
const casesTotal = document.querySelector('.cases-total');
const btnLoadMore = document.querySelector('.btn-load-more');
let page = 1;

btnLoadMore.addEventListener('click', function() {
    getCases();
});

getCases();

function getCases() {
    btnLoadMore.innerText = 'Loading..';
    btnLoadMore.setAttribute('disabled', true);

    getCaseList(page).then(function(data) {
        cases.insertAdjacentHTML('beforeend', generateTableRows(data.data.data));
        casesTotal.innerText = `${cases.childElementCount.toLocaleString()} of ${data.data.total.toLocaleString()}`;

        btnLoadMore.innerText = 'Load more';
        btnLoadMore.removeAttribute('disabled');

        page++;
    });
}

function generateTableRows(data) {
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
