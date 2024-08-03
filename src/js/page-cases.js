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

    caseAPI.getList(page, items).then(response => {
        if (response) {
            const { data: list, pagination } = response;

            generateRows(list);
            casesTotal.innerText = `Page ${page} of ${pagination.max_page}`;

            btnLoadMore.innerText = 'Load more';
            btnLoadMore.removeAttribute('disabled');
            btnLoadMore.style.display = 'block';

            page++;
        } else {
            getElement('.cases').innerHTML = `
                <tr><td colspan="7">Unable to retrieve data</td></tr>
            `;
            btnLoadMore.style.display = 'none';
        }
    }).catch(err => console.log(err));
};

btnLoadMore.addEventListener('click', getCaseList);

selectShowRows.addEventListener('change', ev => {console.log(ev)
    casesTableBody.innerHTML = '';
    page = 1;
    items = ev.target.value;

    getCaseList();
});

getCaseList();