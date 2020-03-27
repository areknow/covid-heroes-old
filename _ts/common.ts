import * as $ from 'jquery';

(() => {

  $(() => {
    revealPage();

    const anchorlinks: NodeListOf<Element> = document.querySelectorAll('a[href^="#"]');
    for (const item of anchorlinks) {
      item.addEventListener('click', (event) => {
        const hashval = item.getAttribute('href');
        const target = document.querySelector(hashval);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        history.pushState(null, null, hashval);
        event.preventDefault();
      });
    }
  });

})();

function revealPage() {
  setTimeout(() => {
    $('.page-loader-cover').fadeOut(500, () => {
      $('.page-loader-cover').remove();
    });
  }, 2000);
}