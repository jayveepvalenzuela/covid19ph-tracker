import { Case } from './case.js';

const caseAPI = new Case();
const casesTableBody = getElement('.cases');
const casesTotal = getElement('.cases-total');
const btnLoadMore = getElement('.btn-load-more');
const selectShowRows = getElement('.select-show-rows');
let page = 1;
let items = selectShowRows.value;

const getCaseList = function() {
    btnLoadMore.innerText = 'Loading..';
    btnLoadMore.setAttribute('disabled', true);

    caseAPI.getList(page, items).then(function(data) {
        const { data: list, pagination } = data;

        casesTableBody.insertAdjacentHTML('beforeend', generateRows(list));
        casesTotal.innerText = `Page ${page} of ${pagination.max_page}`;

        btnLoadMore.innerText = 'Load more';
        btnLoadMore.removeAttribute('disabled');

        page++;
    });
};

const generateRows = function(data) {
    let rows = '';

    data.forEach(e => {
        rows += `<tr>
                    <td>${e.case_code}</td>
                    <td><span class="badge badge--${e.health_status.toLowerCase()} text-uppercase">${e.health_status}</span></td>
                    <td>${e.age}</td>
                    <td class="text-capitalize">${e.sex}</td>
                    <td class="text-capitalize">${e.prov_res}</td>
                    <td class="text-uppercase">${e.region_res}</td>
                    <td>${e.date_rep_conf}</td>
                 </tr>`;
    });

    return rows;
};

btnLoadMore.addEventListener('click', function() {
    getCaseList();
});

selectShowRows.addEventListener('change', function(ev) {
    casesTableBody.innerHTML = '';
    page = 1;
    items = ev.target.value;

    getCaseList();
});

getCaseList();
