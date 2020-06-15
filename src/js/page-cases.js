import { Case } from './case.js';

const caseAPI = new Case();
const casesTableBody = document.querySelector('.cases');
const casesTotal = document.querySelector('.cases-total');
const btnLoadMore = document.querySelector('.btn-load-more');
let page = 1;

const getList = function() {
    btnLoadMore.innerText = 'Loading..';
    btnLoadMore.setAttribute('disabled', true);

    caseAPI.getCaseList(page).then(function(data) {
        const { data: list, total } = data.data;

        casesTableBody.insertAdjacentHTML('beforeend', generateTableRow(list));
        casesTotal.innerText = `${casesTableBody.childElementCount.toLocaleString()} of ${total.toLocaleString()}`;

        btnLoadMore.innerText = 'Load more';
        btnLoadMore.removeAttribute('disabled');

        page++;
    });
}

const generateTableRow = function(data) {
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
    getList();
});

getList();
