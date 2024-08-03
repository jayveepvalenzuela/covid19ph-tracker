const getElement = el => document.querySelector(el);
const formatNumber = num => num.toLocaleString();
const formatDate = date => new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

const navLink = getElement(`[data-pathname="${window.location.pathname}"]`);

if (navLink) {
    navLink.classList.add('active');
}

export { getElement, formatNumber, formatDate };
