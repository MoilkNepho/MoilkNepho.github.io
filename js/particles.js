/**
 * Particleground demo
 * @author Jonathan Nicol - @mrjnicol
 */

 document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: 'black',
    lineColor: 'black'
  });
  var intro = document.getElementById('intro');
  var par = document.getElementById('particles');
  intro.style.marginTop = - (par.offsetHeight + intro.offsetHeight) / 2 + 'px';
}, false);


/*
// jQuery plugin example:
$(document).ready(function() {
  $('#particles').particleground({
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  $('.intro').css({
    'margin-top': -($('.intro').height() / 2)
  });
});
*/