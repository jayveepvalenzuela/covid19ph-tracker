import { getElement } from './app.js';
import { Case } from './case.js';

const caseAPI = new Case();
const casesTableBody = getElement('.cases');
const casesTotal = getElement('.cases-total');
const btnLoadMore = getElement('.btn-load-more');
const selectShowRows = getElement('.select-show-rows');
let page = 1;
let items = selectShowRows.value;

const generateRows = data => {
    const template = getElement('#row-template');

    data.forEach(e => {
        const tr = document.importNode(template.content, true);

        tr.querySelector('.case-code').textContent = e.case_code;
        tr.querySelector('.badge').textContent = e.health_status;
        tr.querySelector('.badge').classList.add(`badge--${e.health_status}`);
        tr.querySelector('.age').textContent = e.age;
        tr.querySelector('.sex').textContent = e.sex;
        tr.querySelector('.prov').textContent = e.prov_res;
        tr.querySelector('.region').textContent = e.region_res;
        tr.querySelector('.date').textContent = e.date_rep_conf;
        casesTableBody.appendChild(tr);
    });
};

const getCaseList = () => {
    btnLoadMore.innerText = 'Loading..';
    btnLoadMore.setAttribute('disabled', true);

    caseAPI.getList(page, items).then(data => {
        const { data: list, pagination } = data;

        generateRows(list);
        casesTotal.innerText = `Page ${page} of ${pagination.max_page}`;

        btnLoadMore.innerText = 'Load more';
        btnLoadMore.removeAttribute('disabled');

        page++;
    });
};

btnLoadMore.addEventListener('click', getCaseList);

selectShowRows.addEventListener('change', (ev) => {
    casesTableBody.innerHTML = '';
    page = 1;
    items = ev.target.value;

    getCaseList();
});

getCaseList();
