import * as $ from 'jquery';

const SCROLL_OFFSET = 60;

(() => {

  $(() => {
    revealPage();

    const anchorlinks: NodeListOf<Element> = document.querySelectorAll('a[href^="#"]');
    for (const item of anchorlinks) {
      item.addEventListener('click', (event) => {
        const hashval = item.getAttribute('href');
        const target = document.querySelector(hashval);
        $('html, body').animate({
          scrollTop: $(target).offset().top - SCROLL_OFFSET
        }, 1000);
        history.pushState(null, null, '');
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