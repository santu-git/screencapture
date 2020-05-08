$(document).ready(function(){
  $('.rotate-text').each(function () {
    let _parent = this;
    let length = $(this).find('span').length;
    let active = 0;
    setInterval(function () {
      $(_parent).find('span.rolled').toggleClass('unrolled rolled');
      let activeElement = $(_parent).find('span')
      $(activeElement[active]).toggleClass('unrolled rolled');
      // })
      //})
      if (active == length - 1) {
        active = 0;
      } else {
        active++;
      }
    }, 1500)
  })
})
