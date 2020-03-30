import * as $ from 'jquery';

const SCROLL_OFFSET = 60;

(() => {

  $(() => {
    revealPage();
  });

})();

function revealPage() {
  setTimeout(() => {
    $('.page-loader-cover').fadeOut(500, () => {
      $('.page-loader-cover').remove();
    });
  }, 2000);
}