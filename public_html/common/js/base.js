window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelAnimFrame = (function(_id) {
  return window.cancelAnimationFrame ||
    window.cancelRequestAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.mozCancelRequestAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.msCancelRequestAnimationFrame ||
    window.oCancelAnimationFrame ||
    window.oCancelRequestAnimationFrame ||
    function(_id) { window.clearTimeout(id); };
})();

if (navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
  document.body.classList.add('ie');
}

function closest(el, selector) {
  var matchesFn;
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function(fn) {
    if (typeof document.body[fn] == 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  })
  var parent;
  while (el) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    el = parent;
  }
  return null;
}

var Base = function() {
  ! function Base() {
    new Menu();
    new Sticky();
    new Itlink();
  }();
  return Base;
};

window.addEventListener('DOMContentLoaded', function() {
  if (window.jQuery) window.Velocity = window.jQuery.fn.velocity;
  new Base();
});

var Menu = (function() {
  function Menu() {
    var m = this;
    this._target = document.getElementById('iconNav');
    this._mobile = document.getElementById('nav');
    this._header = document.getElementById('header');
    this._contents = document.getElementById('contents');
    this._target.addEventListener('click', function() {
      if (window.innerWidth < 769) {
        if (this.classList.contains('open')) {
          this.classList.remove('open');
          m._mobile.classList.remove('open');
          m._mobile.style.height = 0;
          document.body.style.overflow = 'inherit';
        } else {
          this.classList.add('open');
          m._mobile.classList.add('open');
          document.body.style.overflow = 'hidden';
          m._mobile.style.height = window.innerHeight - closest(m._target, 'header').clientHeight + 'px';
          m._mobile.style.top = m._header.clientHeight + 'px';
        }
      } else {
        if (this.classList.contains('open')) {
          this.classList.remove('open');
          m._header.classList.remove('open');
          m._contents.classList.remove('open');
        } else {
          this.classList.add('open');
          m._header.classList.add('open');
          m._contents.classList.add('open');
        }
      }
    })
    this._reset = function() {
      if (m._target.classList.contains('open')) {
        if (window.innerWidth > 768) {
          document.body.style.overflow = 'auto';
          m._mobile.removeAttribute('style');
          m._target.classList.add('open');
          m._header.classList.add('open');
          m._contents.classList.add('open');
        } else {
          m._target.classList.remove('open');
          m._header.classList.remove('open');
          m._contents.classList.remove('open');
          m._mobile.classList.remove('open');
          m._mobile.removeAttribute('style');
          m._mobile.style.top = 0;
          document.body.style.overflow = 'inherit';
        }
      } else {
        m._mobile.classList.remove('open');
        if (window.innerWidth < 769) {
          m._mobile.style.height = 0;
        } else {
          m._mobile.style.height = 'auto';
        }
      }
    }
    this._reset();
    window.addEventListener('resize', m._reset, false);
  }
  return Menu;
})();

var Sticky = function() {
  function Sticky() {
    var s = this;
    this._target = document.getElementById('header');
    this._mobile = document.getElementById('nav');
    this._for_pc = function(left) {
      if (window.innerWidth < 1217) {
        s._target.style.left = -left + 'px';
      } else {
        s._target.style.left = "";
      }
    }
    this._for_sp = function(top) {
      s._mobile.style.top = s._target.clientHeight + 'px';
      if (top > 0) {
        s._target.classList.add('fixed');
        document.body.style.paddingTop = s._target.clientHeight + 'px';
      } else {
        s._target.classList.remove('fixed');
        document.body.style.paddingTop = 0;
      }
    };
    this.handling = function() {
      var _top = document.documentElement.scrollTop || document.body.scrollTop;
      var _left = document.documentElement.scrollLeft || document.body.scrollLeft;
      if (window.innerWidth < 769) {
        s._for_sp(_top);
      } else {
        s._for_pc(_left);
        document.body.style.paddingTop = 0;
      }
    };
    window.addEventListener('scroll', s.handling, false);
    window.addEventListener('resize', s.handling, false);
    window.addEventListener('load', s.handling, false);
  }
  return Sticky;
}();



var Itlink = (function() {
  function Itlink() {
    var _this = this;
    this._link = window.location.pathname;
    this._el = document.querySelectorAll('.nav_list li a');
    Array.prototype.forEach.call(_this._el, function(el, i) {
      var href = el.getAttribute('href');
      if (href === _this._link || href.split('-')[0] === _this._link.split('-')[0]) {
        el.classList.add('active');
      }

      el.addEventListener('click', function() {
        sessionStorage.clear();
      });

      var local = document.querySelectorAll('.local');
      Array.prototype.forEach.call(local, function(elS) {
        elS.addEventListener('click', function() {
          sessionStorage.clear();
          sessionStorage.setItem("el", _this._link);
        });
      });
      if (!Object.entries) {
        Object.entries = function(obj) {
          var ownProps = Object.keys(obj),
            i = ownProps.length,
            resArray = new Array(i);
          while (i--)
            resArray[i] = [ownProps[i], obj[ownProps[i]]];
          return resArray;
        };
      }

      if (sessionStorage.getItem("el") === null) {
        return
      } else {
        var link = Object.entries(sessionStorage)[0][1];
        var elN = document.querySelector('a[href="' + link + '"]');
        if (elN) {
          elN.classList.add('active');
        }
      }

    });
  }
  return Itlink;
})();


/* images pc <---> sp */
(function() {
  var PicturePolyfill = (function() {
    function PicturePolyfill() {
      var _this = this;
      this.pictures = [];
      this.onResize = function() {
        var width = document.body.clientWidth;
        for (var i = 0; i < _this.pictures.length; i = (i + 1)) {
          _this.pictures[i].update(width);
        };
      };
      if ([].includes) return;
      var picture = Array.prototype.slice.call(document.getElementsByTagName('picture'));
      for (var i = 0; i < picture.length; i = (i + 1)) {
        this.pictures.push(new Picture(picture[i]));
      };
      window.addEventListener("resize", this.onResize, false);
      this.onResize();
    }
    return PicturePolyfill;
  }());
  var Picture = (function() {
    function Picture(node) {
      var _this = this;
      this.update = function(width) {
        width <= _this.breakPoint ? _this.toSP() : _this.toPC();
      };
      this.toSP = function() {
        if (_this.isSP) return;
        _this.isSP = true;
        _this.changeSrc();
      };
      this.toPC = function() {
        if (!_this.isSP) return;
        _this.isSP = false;
        _this.changeSrc();
      };
      this.changeSrc = function() {
        var toSrc = _this.isSP ? _this.srcSP : _this.srcPC;
        _this.img.setAttribute('src', toSrc);
      };
      this.img = node.getElementsByTagName('img')[0];
      this.srcPC = this.img.getAttribute('src');
      var source = node.getElementsByTagName('source')[0];
      this.srcSP = source.getAttribute('srcset');
      this.breakPoint = Number(source.getAttribute('media').match(/(\d+)px/)[1]);
      this.isSP = !document.body.clientWidth <= this.breakPoint;
      this.update();
    }
    return Picture;
  }());
  new PicturePolyfill();
}());