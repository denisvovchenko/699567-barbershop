var page = document.querySelector('body');

if (page.classList.contains('page-shop')) {
  page.querySelector('.main-nav__list--site .main-nav__item:nth-child(4) a') 
    .classList.add('main-nav__link--current');
}

var pagination = document.querySelectorAll('.pagination__link');

pagination.forEach(function(pageNumber) {
  pageNumber.addEventListener('click', function(e) {
    e.preventDefault();

    pagination.forEach(function(pageNumber) {
      pageNumber.classList.remove('pagination__link--current');
    });

    this.classList.add('pagination__link--current');
    var pageNumberHref = this.getAttribute('href');
    this.setAttribute('data-href', pageNumberHref);
    this.removeAttribute('href');    
  });
});

var svg = new Image();
svg.src = '../img/svg/login.svg';
