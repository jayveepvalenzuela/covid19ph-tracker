const currentPathName = window.location.pathname;
const navLink = document.querySelector(`[data-pathname="${currentPathName}"]`);

navLink.classList.add('active');
