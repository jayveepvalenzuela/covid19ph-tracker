import { Case } from './case.js';

const caseAPI = new Case();
const casesTableBody = document.querySelector('.cases');
const casesTotal = document.querySelector('.cases-total');
const btnLoadMore = document.querySelector('.btn-load-more');
const selectShowRows = document.querySelector('.select-show-rows');
let page = 1;
let items = selectShowRows.value;

const getCaseList = function() {
    btnLoadMore.innerText = 'Loading..';
    btnLoadMore.setAttribute('disabled', true);

    caseAPI.getList(page, items).then(function(data) {
        const { data: list, pagination } = data;

        casesTableBody.insertAdjacentHTML('beforeend', generateTableRow(list));
        casesTotal.innerText = `Page ${page} of ${pagination.max_page}`;

        btnLoadMore.innerText = 'Load more';
        btnLoadMore.removeAttribute('disabled');

        page++;
    });
}

const generateTableRow = function(data) {
    let html = '';

    data.forEach(e => {
        html += `<tr>
                    <td>${e.case_code}</td>
                    <td><span class="badge badge--${e.health_status.toLowerCase()} text-uppercase">${e.health_status}</span></td>
                    <td>${e.age}</td>
                    <td class="text-capitalize">${e.sex}</td>
                    <td class="text-capitalize">${e.prov_res}</td>
                    <td>${e.region_res}</td>
                    <td>${e.date_rep_conf}</td>
                 </tr>`;
    });

    return html;
}

btnLoadMore.addEventListener('click', function() {
    getCaseList();
});

selectShowRows.addEventListener('change', function(e) {
    casesTableBody.innerHTML = '';
    page = 1;
    items = e.target.value;

    getCaseList();
});

getCaseList();
