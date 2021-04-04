export const getElement = el => document.querySelector(el);

const navLink = getElement(`[data-pathname="${window.location.pathname}"]`);
navLink.classList.add('active');
