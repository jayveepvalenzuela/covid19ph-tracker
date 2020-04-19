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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgbGFzdFVwZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXN0LXVwZGF0ZScpO1xyXG5jb25zdCBjb25maXJtZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29uZmlybWVkJyk7XHJcbmNvbnN0IGFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKTtcclxuY29uc3QgZGVhdGhzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlYXRocycpO1xyXG5jb25zdCByZWNvdmVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVjb3ZlcmVkJyk7XHJcblxyXG5mZXRjaCgnaHR0cHM6Ly9jb3JvbmEubG1hby5uaW5qYS92Mi9jb3VudHJpZXMvcGhpbGlwcGluZXMnLCB7XHJcbiAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgcmVkaXJlY3Q6ICdmb2xsb3cnXHJcbn0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBsYXN0VXBkYXRlLmlubmVyVGV4dCA9IG5ldyBEYXRlKGRhdGEudXBkYXRlZCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1VUycsIHtcclxuICAgICAgICAgICAgeWVhcjogJ251bWVyaWMnLFxyXG4gICAgICAgICAgICBtb250aDogJ2xvbmcnLFxyXG4gICAgICAgICAgICBkYXk6ICdudW1lcmljJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbmZpcm1lZC5pbm5lclRleHQgPSBkYXRhLmNhc2VzLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgYWN0aXZlLmlubmVyVGV4dCA9IGRhdGEuYWN0aXZlLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgZGVhdGhzLmlubmVyVGV4dCA9IGRhdGEuZGVhdGhzLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgcmVjb3ZlcmVkLmlubmVyVGV4dCA9IGRhdGEucmVjb3ZlcmVkLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICB9KTtcclxufSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpKTtcclxuIl19
