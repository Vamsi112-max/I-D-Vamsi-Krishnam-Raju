(function(){
var R=document.documentElement,B=document.querySelectorAll('.vs button');
function setV(v){R.setAttribute('data-v',v);B.forEach(function(b){b.classList.toggle('on',b.dataset.v===v)})}
B.forEach(function(b){b.onclick=function(){setV(b.dataset.v)}});
if(matchMedia('(prefers-color-scheme:dark)').matches)setV('3');
document.querySelectorAll('[data-d]').forEach(function(b){b.onclick=function(){document.getElementById(b.dataset.d).showModal()}});
document.querySelectorAll('dialog').forEach(function(d){d.querySelector('.x').onclick=function(){d.close()};d.onclick=function(e){if(e.target===d)d.close()}});
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(n){io.observe(n)});
})();
