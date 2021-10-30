window.addEventListener('DOMContentLoaded', function() {
  if (window.jQuery) window.Velocity = window.jQuery.fn.velocity;
  new Base();
  var bannerSwiper = new Swiper('.b-slider .swiper-container', {
    effect: 'fade',
    loop: true,
    autoplay: true,
    speed: 2000,
    centerInsufficientSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  var arrivalSwiper = new Swiper('.new-arrivals', {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      769: {
        slidesPerView: 4,
        spaceBetween: 20,
      }
    },
  });
});

var Base = function() {
  ! function Base() {
    new Menu();
    new Sticky();
  }();
  return Base;
};

function closest(el, selector) {
  let matchesFn, parent;
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some((fn) => {
    if (typeof document.body[fn] == 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  })
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    el = parent;
  }
  return null;
}
const Menu = (function() {
  function Menu() {
    let _target = document.getElementById('iconNav');
    let _nav = document.getElementById('nav');
    let _header = document.getElementById('header');
    let _bar = _header.querySelector('.header-bar');
    let _head = _header.querySelector('.header-head');
    _target.addEventListener('click', () => {
      if (_target.classList.contains('active')) {
        _target.classList.remove('active');
        _nav.classList.remove('active');
        _nav.removeAttribute('style');
        document.body.style.overflow = 'inherit';
      } else {
        _target.classList.add('active');
        _nav.classList.add('active');
        _nav.style.top = _bar.clientHeight + _head.clientHeight + 'px';
        _nav.style.height = window.innerHeight - _bar.clientHeight + 'px';
        document.body.style.overflow = 'hidden';
        if(_bar.classList.contains('fixed')){
          _nav.style.top = _bar.clientHeight + 'px';
        }
      }
    });
    const reset = () => {
      if (_target.classList.contains('active')) {
        if (window.innerWidth > 768) {
          _target.classList.remove('active');
          _nav.classList.remove('active');
          _nav.removeAttribute('style');
          document.body.style.overflow = 'inherit';
        }else{
          _nav.style.top = _header.clientHeight + 'px';
          _nav.style.height = window.innerHeight - _header.clientHeight + 'px';
        }
      }
      else {
        if (window.innerWidth < 769) {
          _nav.style.height = 0;
        } else {
          _nav.removeAttribute('style');
        }
      }
    }
    reset();
    window.addEventListener('resize', reset, false);
  }
  return Menu;
})();
const Sticky = (function() {
  function Sticky() {
    let _header = document.getElementById('header');
    let _head = _header.querySelector('.header-head');
    let _bar = _header.querySelector('.header-bar');
    let _nav = document.getElementById('nav');
    
    let _body = document.getElementsByTagName('body')[0];

    const _forPc = (top,left) => {
      _nav.style.left = -left + "px";
      let getH = _head.clientHeight + _bar.clientHeight;
      if (top > getH) {
        _nav.classList.add('fixed');
        _body.style.paddingTop = _nav.clientHeight + 'px';
      }else{
        _nav.classList.remove('fixed');
        _body.style.paddingTop = '';
      }
    }
    const _forSp = (top) => {
      _header.removeAttribute('style');
      if (top > _head.clientHeight) {
        _bar.classList.add('fixed');
        _body.style.paddingTop = _bar.clientHeight + 'px';
      }else{
        _bar.classList.remove('fixed');
        _body.style.paddingTop = '';
      }
    }
    const _hand = () => {
      let _top = document.documentElement.scrollTop || document.body.scrollTop;
      let _left = document.documentElement.scrollLeft || document.body.scrollLeft;
      
      if (window.innerWidth > 769) {
        _forPc(_top,_left);
      }else{
        _forSp(_top);
      }
    }
    window.addEventListener('scroll', _hand, false);
    window.addEventListener('resize', _hand, false);
    window.addEventListener('load', _hand, false);
  }
  return Sticky;
})();