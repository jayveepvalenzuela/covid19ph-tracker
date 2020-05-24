const currentPathname = window.location.pathname.replace(/\.[^/.]+$/, '');
const navLink = document.querySelector(`[data-pathname="${currentPathname}"]`);

navLink.classList.add('active');
