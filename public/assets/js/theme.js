"use strict";

var _excluded = ["endValue"];

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};

var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};

var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var getColor = function getColor(name) {
  var dom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
  return getComputedStyle(dom).getPropertyValue("--falcon-".concat(name)).trim();
};

var getColors = function getColors(dom) {
  return {
    primary: getColor('primary', dom),
    secondary: getColor('secondary', dom),
    success: getColor('success', dom),
    info: getColor('info', dom),
    warning: getColor('warning', dom),
    danger: getColor('danger', dom),
    light: getColor('light', dom),
    dark: getColor('dark', dom)
  };
};

var getSoftColors = function getSoftColors(dom) {
  return {
    primary: getColor('soft-primary', dom),
    secondary: getColor('soft-secondary', dom),
    success: getColor('soft-success', dom),
    info: getColor('soft-info', dom),
    warning: getColor('soft-warning', dom),
    danger: getColor('soft-danger', dom),
    light: getColor('soft-light', dom),
    dark: getColor('soft-dark', dom)
  };
};

var getGrays = function getGrays(dom) {
  return {
    white: getColor('white', dom),
    100: getColor('100', dom),
    200: getColor('200', dom),
    300: getColor('300', dom),
    400: getColor('400', dom),
    500: getColor('500', dom),
    600: getColor('600', dom),
    700: getColor('700', dom),
    800: getColor('800', dom),
    900: getColor('900', dom),
    1000: getColor('1000', dom),
    1100: getColor('1100', dom),
    black: getColor('black', dom)
  };
};

var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var windowHeight = window.innerHeight || document.documentElement.clientHeight;
  var windowWidth = window.innerWidth || document.documentElement.clientWidth;
  var vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  var horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return vertInView && horInView;
}

var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }

  return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};

var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};
/* get Dates between */


var getDates = function getDates(startDate, endDate) {
  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000 * 60 * 60 * 24;
  var duration = endDate - startDate;
  var steps = duration / interval;
  return Array.from({
    length: steps + 1
  }, function (v, i) {
    return new Date(startDate.valueOf() + interval * i);
  });
};

var getPastDates = function getPastDates(duration) {
  var days;

  switch (duration) {
    case 'week':
      days = 7;
      break;

    case 'month':
      days = 30;
      break;

    case 'year':
      days = 365;
      break;

    default:
      days = duration;
  }

  var date = new Date();
  var endDate = date;
  var startDate = new Date(new Date().setDate(date.getDate() - (days - 1)));
  return getDates(startDate, endDate);
};
/* Get Random Number */


var getRandomNumber = function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var utils = {
  docReady: docReady,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  getColor: getColor,
  getColors: getColors,
  getSoftColors: getSoftColors,
  getGrays: getGrays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace,
  getDates: getDates,
  getPastDates: getPastDates,
  getRandomNumber: getRandomNumber
};
/* -------------------------------------------------------------------------- */

/*                                  Detector                                  */

/* -------------------------------------------------------------------------- */

var detectorInit = function detectorInit() {
  var _window = window,
      is = _window.is;
  var html = document.querySelector('html');
  is.opera() && addClass(html, 'opera');
  is.mobile() && addClass(html, 'mobile');
  is.firefox() && addClass(html, 'firefox');
  is.safari() && addClass(html, 'safari');
  is.ios() && addClass(html, 'ios');
  is.iphone() && addClass(html, 'iphone');
  is.ipad() && addClass(html, 'ipad');
  is.ie() && addClass(html, 'ie');
  is.edge() && addClass(html, 'edge');
  is.chrome() && addClass(html, 'chrome');
  is.mac() && addClass(html, 'osx');
  is.windows() && addClass(html, 'windows');
  navigator.userAgent.match('CriOS') && addClass(html, 'chrome');
};
/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/


var DomNode = /*#__PURE__*/function () {
  function DomNode(node) {
    _classCallCheck(this, DomNode);

    this.node = node;
  }

  _createClass(DomNode, [{
    key: "addClass",
    value: function addClass(className) {
      this.isValidNode() && this.node.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.isValidNode() && this.node.classList.remove(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this.isValidNode() && this.node.classList.toggle(className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      this.isValidNode() && this.node.classList.contains(className);
    }
  }, {
    key: "data",
    value: function data(key) {
      if (this.isValidNode()) {
        try {
          return JSON.parse(this.node.dataset[this.camelize(key)]);
        } catch (e) {
          return this.node.dataset[this.camelize(key)];
        }
      }

      return null;
    }
  }, {
    key: "attr",
    value: function attr(name) {
      return this.isValidNode() && this.node[name];
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.isValidNode() && this.node.setAttribute(name, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this.isValidNode() && this.node.removeAttribute(name);
    }
  }, {
    key: "setProp",
    value: function setProp(name, value) {
      this.isValidNode() && (this.node[name] = value);
    }
  }, {
    key: "on",
    value: function on(event, cb) {
      this.isValidNode() && this.node.addEventListener(event, cb);
    }
  }, {
    key: "isValidNode",
    value: function isValidNode() {
      return !!this.node;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "camelize",
    value: function camelize(str) {
      var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
      return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
    }
  }]);

  return DomNode;
}();
/* -------------------------------------------------------------------------- */

/*                                  Anchor JS                                 */

/* -------------------------------------------------------------------------- */


var anchors = new window.AnchorJS();
anchors.options = {
  icon: '#'
};
anchors.add('[data-anchor]');
/* -------------------------------------------------------------------------- */

/*                              Config                                        */

/* -------------------------------------------------------------------------- */

var CONFIG = {
  isNavbarVerticalCollapsed: false,
  theme: 'light',
  isRTL: false,
  isFluid: false,
  navbarStyle: 'transparent',
  navbarPosition: 'vertical'
};
Object.keys(CONFIG).forEach(function (key) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, CONFIG[key]);
  }
});

if (JSON.parse(localStorage.getItem('isNavbarVerticalCollapsed'))) {
  document.documentElement.classList.add('navbar-vertical-collapsed');
}

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
/*-----------------------------------------------
|   Cookie notice
-----------------------------------------------*/


var cookieNoticeInit = function cookieNoticeInit() {
  var Selector = {
    NOTICE: '.notice',
    DATA_TOGGLE_Notice: '[data-bs-toggle="notice"]'
  };
  var Events = {
    CLICK: 'click',
    HIDDEN_BS_TOAST: 'hidden.bs.toast'
  };
  var DataKeys = {
    OPTIONS: 'options'
  };
  var ClassNames = {
    HIDE: 'hide'
  };
  var notices = document.querySelectorAll(Selector.NOTICE);
  var showNotice = true;
  notices.forEach(function (item) {
    var notice = new window.bootstrap.Toast(item);

    var options = _objectSpread({
      autoShow: false,
      autoShowDelay: 0,
      showOnce: false,
      cookieExpireTime: 3600000
    }, utils.getData(item, DataKeys.OPTIONS));

    var showOnce = options.showOnce,
        autoShow = options.autoShow,
        autoShowDelay = options.autoShowDelay;

    if (showOnce) {
      var hasNotice = utils.getCookie('notice');
      showNotice = hasNotice === null;
    }

    if (autoShow && showNotice) {
      setTimeout(function () {
        notice.show();
      }, autoShowDelay);
    }

    item.addEventListener(Events.HIDDEN_BS_TOAST, function (e) {
      var el = e.currentTarget;

      var toastOptions = _objectSpread({
        cookieExpireTime: 3600000,
        showOnce: false
      }, utils.getData(el, DataKeys.OPTIONS));

      toastOptions.showOnce && utils.setCookie('notice', false, toastOptions.cookieExpireTime);
    });
  });
  var btnNoticeToggle = document.querySelector(Selector.DATA_TOGGLE_Notice);
  btnNoticeToggle && btnNoticeToggle.addEventListener(Events.CLICK, function (_ref) {
    var currentTarget = _ref.currentTarget;
    var id = currentTarget.getAttribute('href');
    var notice = new window.bootstrap.Toast(document.querySelector(id));
    /*eslint-disable-next-line*/

    var el = notice._element;
    utils.hasClass(el, ClassNames.HIDE) ? notice.show() : notice.hide();
  });
};
/* -------------------------------------------------------------------------- */

/*                                  Copy LinK                                 */

/* -------------------------------------------------------------------------- */


var copyLink = function copyLink() {
  var copyLinkModal = document.getElementById('copyLinkModal');
  copyLinkModal && copyLinkModal.addEventListener('shown.bs.modal', function () {
    var invitationLink = document.querySelector('.invitation-link');
    invitationLink.select();
  });
  var copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons && copyButtons.forEach(function (button) {
    var tooltip = new window.bootstrap.Tooltip(button);
    button.addEventListener('mouseover', function () {
      return tooltip.show();
    });
    button.addEventListener('mouseleave', function () {
      return tooltip.hide();
    });
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      var el = e.target;
      el.setAttribute('data-original-title', 'Copied');
      tooltip.show();
      el.setAttribute('data-original-title', 'Copy to clipboard');
      tooltip.update();
      var inputID = utils.getData(el, 'copy');
      var input = document.querySelector(inputID);
      input.select();
      document.execCommand('copy');
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                  Count Up                                  */

/* -------------------------------------------------------------------------- */


var countupInit = function countupInit() {
  if (window.countUp) {
    var countups = document.querySelectorAll('[data-countup]');
    countups.forEach(function (node) {
      var _utils$getData = utils.getData(node, 'countup'),
          endValue = _utils$getData.endValue,
          options = _objectWithoutProperties(_utils$getData, _excluded);

      var countUp = new window.countUp.CountUp(node, endValue, _objectSpread({
        duration: 5
      }, options));

      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    });
  }
};
/*-----------------------------------------------
|   Dashboard Table dropdown
-----------------------------------------------*/


var dropdownMenuInit = function dropdownMenuInit() {
  // Only for ios
  if (window.is.ios()) {
    var Event = {
      SHOWN_BS_DROPDOWN: 'shown.bs.dropdown',
      HIDDEN_BS_DROPDOWN: 'hidden.bs.dropdown'
    };
    var Selector = {
      TABLE_RESPONSIVE: '.table-responsive',
      DROPDOWN_MENU: '.dropdown-menu'
    };
    document.querySelectorAll(Selector.TABLE_RESPONSIVE).forEach(function (table) {
      table.addEventListener(Event.SHOWN_BS_DROPDOWN, function (e) {
        var t = e.currentTarget;

        if (t.scrollWidth > t.clientWidth) {
          t.style.paddingBottom = "".concat(e.target.nextElementSibling.clientHeight, "px");
        }
      });
      table.addEventListener(Event.HIDDEN_BS_DROPDOWN, function (e) {
        e.currentTarget.style.paddingBottom = '';
      });
    });
  }
}; // Reference
// https://github.com/twbs/bootstrap/issues/11037#issuecomment-274870381

/* -------------------------------------------------------------------------- */

/*                           Open dropdown on hover                           */

/* -------------------------------------------------------------------------- */


var dropdownOnHover = function dropdownOnHover() {
  var navbarArea = document.querySelectorAll('[data-bs-toggle="dropdown"]');

  if (navbarArea) {
    navbarArea.forEach(function (navbarItem) {
      console.log(navbarItem.dataset.bsToggle);
      navbarItem.addEventListener('mouseover', function (e) {
        if (e.target.className.includes('dropdown-toggle') && window.innerWidth > 992) {
          var dropdownInstance = new window.bootstrap.Dropdown(e.target);
          /* eslint-disable no-underscore-dangle */

          dropdownInstance._element.classList.add('show');

          dropdownInstance._menu.classList.add('show');

          dropdownInstance._menu.setAttribute('data-bs-popper', 'none');

          e.target.parentNode.addEventListener('mouseleave', function () {
            dropdownInstance.hide();
          });
        }
      });
    });
  }
};
/* eslint-disable */

/*-----------------------------------------------
|   Dropzone
-----------------------------------------------*/


window.Dropzone ? window.Dropzone.autoDiscover = false : '';

var dropzoneInit = function dropzoneInit() {
  var merge = window._.merge;
  var Selector = {
    DROPZONE: '[data-dropzone]',
    DZ_ERROR_MESSAGE: '.dz-error-message',
    DZ_PREVIEW: '.dz-preview',
    DZ_PROGRESS: '.dz-preview .dz-preview-cover .dz-progress',
    DZ_PREVIEW_COVER: '.dz-preview .dz-preview-cover'
  };
  var ClassName = {
    DZ_FILE_PROCESSING: 'dz-file-processing',
    DZ_FILE_COMPLETE: 'dz-file-complete',
    DZ_COMPLETE: 'dz-complete',
    DZ_PROCESSING: 'dz-processing'
  };
  var DATA_KEY = {
    OPTIONS: 'options'
  };
  var Events = {
    ADDED_FILE: 'addedfile',
    REMOVED_FILE: 'removedfile',
    COMPLETE: 'complete'
  };
  var dropzones = document.querySelectorAll(Selector.DROPZONE);
  !!dropzones.length && dropzones.forEach(function (item) {
    var userOptions = utils.getData(item, DATA_KEY.OPTIONS);
    userOptions = userOptions ? userOptions : {};
    var data = userOptions.data ? userOptions.data : {};
    var options = merge({
      url: '/assets/php/',
      addRemoveLinks: false,
      previewsContainer: item.querySelector(Selector.DZ_PREVIEW),
      previewTemplate: item.querySelector(Selector.DZ_PREVIEW).innerHTML,
      thumbnailWidth: null,
      thumbnailHeight: null,
      maxFilesize: 20,
      autoProcessQueue: false,
      filesizeBase: 1000,
      init: function init() {
        var thisDropzone = this;

        if (data.length) {
          data.forEach(function (v) {
            var mockFile = {
              name: v.name,
              size: v.size
            };
            thisDropzone.options.addedfile.call(thisDropzone, mockFile);
            thisDropzone.options.thumbnail.call(thisDropzone, mockFile, "".concat(v.url, "/").concat(v.name));
          });
        }

        thisDropzone.on(Events.ADDED_FILE, function addedfile() {
          if ('maxFiles' in userOptions) {
            if (userOptions.maxFiles === 1 && item.querySelectorAll(Selector.DZ_PREVIEW_COVER).length > 1) {
              item.querySelector(Selector.DZ_PREVIEW_COVER).remove();
            }

            if (userOptions.maxFiles === 1 && this.files.length > 1) {
              this.removeFile(this.files[0]);
            }
          }
        });
      },
      error: function error(file, message) {
        if (file.previewElement) {
          file.previewElement.classList.add('dz-error');

          if (typeof message !== 'string' && message.error) {
            message = message.error;
          }

          var _iterator = _createForOfIteratorHelper(file.previewElement.querySelectorAll('[data-dz-errormessage]')),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var node = _step.value;
              node.textContent = message;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }
    }, userOptions); // eslint-disable-next-line

    item.querySelector(Selector.DZ_PREVIEW).innerHTML = '';
    var dropzone = new window.Dropzone(item, options);
    dropzone.on(Events.ADDED_FILE, function () {
      if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
        item.querySelector(Selector.DZ_PREVIEW_COVER).classList.remove(ClassName.DZ_FILE_COMPLETE);
      }

      item.classList.add(ClassName.DZ_FILE_PROCESSING);
    });
    dropzone.on(Events.REMOVED_FILE, function () {
      if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
        item.querySelector(Selector.DZ_PREVIEW_COVER).classList.remove(ClassName.DZ_PROCESSING);
      }

      item.classList.add(ClassName.DZ_FILE_COMPLETE);
    });
    dropzone.on(Events.COMPLETE, function () {
      if (item.querySelector(Selector.DZ_PREVIEW_COVER)) {
        item.querySelector(Selector.DZ_PREVIEW_COVER).classList.remove(ClassName.DZ_PROCESSING);
      }

      item.classList.add(ClassName.DZ_FILE_COMPLETE);
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                 Glightbox                                */

/* -------------------------------------------------------------------------- */


var glightboxInit = function glightboxInit() {
  if (window.GLightbox) {
    window.GLightbox({
      selector: '[data-gallery]'
    });
  }
};
/*-----------------------------------------------
|   Gooogle Map
-----------------------------------------------*/


function initMap() {
  var themeController = document.body;
  var $googlemaps = document.querySelectorAll('.googlemap');

  if ($googlemaps.length && window.google) {
    // Visit https://snazzymaps.com/ for more themes
    var mapStyles = {
      Default: [{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#e9e9e9'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f5f5'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#ffffff'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#f5f5f5'
        }, {
          lightness: 21
        }]
      }, {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{
          color: '#dedede'
        }, {
          lightness: 21
        }]
      }, {
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#ffffff'
        }, {
          lightness: 16
        }]
      }, {
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#333333'
        }, {
          lightness: 40
        }]
      }, {
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#f2f2f2'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#fefefe'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#fefefe'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }],
      Gray: [{
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#000000'
        }, {
          lightness: 40
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 21
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }]
      }],
      Midnight: [{
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          color: '#ffffff'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 13
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#144b53'
        }, {
          lightness: 14
        }, {
          weight: 1.4
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#08304b'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          color: '#0c4152'
        }, {
          lightness: 5
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#0b434f'
        }, {
          lightness: 25
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#0b3d51'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          color: '#146474'
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#021019'
        }]
      }],
      Hopper: [{
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          hue: '#165c64'
        }, {
          saturation: 34
        }, {
          lightness: -69
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          hue: '#b7caaa'
        }, {
          saturation: -14
        }, {
          lightness: -18
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [{
          hue: '#cbdac1'
        }, {
          saturation: -6
        }, {
          lightness: -9
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          hue: '#8d9b83'
        }, {
          saturation: -89
        }, {
          lightness: -12
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
          hue: '#d4dad0'
        }, {
          saturation: -88
        }, {
          lightness: 54
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          hue: '#bdc5b6'
        }, {
          saturation: -89
        }, {
          lightness: -3
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          hue: '#bdc5b6'
        }, {
          saturation: -89
        }, {
          lightness: -26
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          hue: '#c17118'
        }, {
          saturation: 61
        }, {
          lightness: -45
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi.park',
        elementType: 'all',
        stylers: [{
          hue: '#8ba975'
        }, {
          saturation: -46
        }, {
          lightness: -28
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          hue: '#a43218'
        }, {
          saturation: 74
        }, {
          lightness: -51
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'administrative.neighborhood',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative.locality',
        elementType: 'labels',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative.land_parcel',
        elementType: 'all',
        stylers: [{
          hue: '#ffffff'
        }, {
          saturation: 0
        }, {
          lightness: 100
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          hue: '#3a3935'
        }, {
          saturation: 5
        }, {
          lightness: -57
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'poi.medical',
        elementType: 'geometry',
        stylers: [{
          hue: '#cba923'
        }, {
          saturation: 50
        }, {
          lightness: -46
        }, {
          visibility: 'on'
        }]
      }],
      Beard: [{
        featureType: 'poi.business',
        elementType: 'labels.text',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#333333'
        }]
      }],
      AssassianCreed: [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
          visibility: 'on'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }, {
          saturation: '-100'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
          saturation: 36
        }, {
          color: '#000000'
        }, {
          lightness: 40
        }, {
          visibility: 'off'
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'off'
        }, {
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 17
        }, {
          weight: 1.2
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 20
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'landscape.natural',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
          lightness: 21
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'poi',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#4d6059'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          visibility: 'on'
        }, {
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }, {
          lightness: 29
        }, {
          weight: 0.2
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 18
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 16
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#7f8d89'
        }]
      }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
          color: '#000000'
        }, {
          lightness: 19
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#2b3638'
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          color: '#2b3638'
        }, {
          lightness: 17
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{
          color: '#24282b'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry.stroke',
        stylers: [{
          color: '#24282b'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text',
        stylers: [{
          visibility: 'off '
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'labels.icon',
        stylers: [{
          visibility: 'off'
        }]
      }],
      SubtleGray: [{
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          saturation: '-100'
        }]
      }, {
        featureType: 'administrative.province',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          lightness: 65
        }, {
          visibility: 'on'
        }]
      }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          lightness: '50'
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }]
      }, {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [{
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [{
          lightness: '30'
        }]
      }, {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [{
          lightness: '40'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          saturation: -100
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
          hue: '#ffff00'
        }, {
          lightness: -25
        }, {
          saturation: -97
        }]
      }, {
        featureType: 'water',
        elementType: 'labels',
        stylers: [{
          lightness: -25
        }, {
          saturation: -100
        }]
      }],
      Tripitty: [{
        featureType: 'all',
        elementType: 'labels',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{
          color: '#2c5ca5'
        }]
      }, {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{
          color: '#2c5ca5'
        }]
      }, {
        featureType: 'road',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{
          visibility: 'off'
        }]
      }, {
        featureType: 'water',
        elementType: 'all',
        stylers: [{
          color: '#193a70'
        }, {
          visibility: 'on'
        }]
      }],
      Cobalt: [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
          invert_lightness: true
        }, {
          saturation: 10
        }, {
          lightness: 30
        }, {
          gamma: 0.5
        }, {
          hue: '#435158'
        }]
      }]
    };
    $googlemaps.forEach(function (itm) {
      var latLng = utils.getData(itm, 'latlng').split(',');
      var markerPopup = itm.innerHTML;
      var icon = utils.getData(itm, 'icon') ? utils.getData(itm, 'icon') : 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png';
      var zoom = utils.getData(itm, 'zoom');
      var mapElement = itm;
      var mapStyle = utils.getData(itm, 'theme');

      if (utils.getData(itm, 'theme') === 'streetview') {
        var pov = utils.getData(itm, 'pov');
        var _mapOptions = {
          position: {
            lat: Number(latLng[0]),
            lng: Number(latLng[1])
          },
          pov: pov,
          zoom: zoom,
          gestureHandling: 'none',
          scrollwheel: false
        };
        return new window.google.maps.StreetViewPanorama(mapElement, _mapOptions);
      }

      var mapOptions = {
        zoom: zoom,
        scrollwheel: utils.getData(itm, 'scrollwheel'),
        center: new window.google.maps.LatLng(latLng[0], latLng[1]),
        styles: localStorage.getItem('theme') === 'dark' ? mapStyles.Cobalt : mapStyles[mapStyle]
      };
      var map = new window.google.maps.Map(mapElement, mapOptions);
      var infowindow = new window.google.maps.InfoWindow({
        content: markerPopup
      });
      var marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(latLng[0], latLng[1]),
        icon: icon,
        map: map
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
      themeController && themeController.addEventListener('clickControl', function (_ref2) {
        var _ref2$detail = _ref2.detail,
            control = _ref2$detail.control,
            value = _ref2$detail.value;

        if (control === 'theme') {
          map.set('styles', value === 'dark' ? mapStyles.Cobalt : mapStyles[mapStyle]);
        }
      });
      return null;
    });
  }
}
/* -------------------------------------------------------------------------- */

/*                                 bigPicture                                 */

/* -------------------------------------------------------------------------- */


var lightboxInit = function lightboxInit() {
  if (window.BigPicture) {
    var bpItems = document.querySelectorAll('[data-bigpicture]');
    bpItems.forEach(function (bpItem) {
      var userOptions = utils.getData(bpItem, 'bigpicture');
      var defaultOptions = {
        el: bpItem
      };

      var options = window._.merge(defaultOptions, userOptions);

      bpItem.addEventListener('click', function () {
        window.BigPicture(options);
      });
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                         Navbar Darken on scroll                        */

/* -------------------------------------------------------------------------- */


var navbarDarkenOnScroll = function navbarDarkenOnScroll() {
  var Selector = {
    NAVBAR: '[data-navbar-darken-on-scroll]',
    NAVBAR_COLLAPSE: '.navbar-collapse',
    NAVBAR_TOGGLER: '.navbar-toggler'
  };
  var ClassNames = {
    COLLAPSED: 'collapsed'
  };
  var Events = {
    SCROLL: 'scroll',
    SHOW_BS_COLLAPSE: 'show.bs.collapse',
    HIDE_BS_COLLAPSE: 'hide.bs.collapse',
    HIDDEN_BS_COLLAPSE: 'hidden.bs.collapse'
  };
  var DataKey = {
    NAVBAR_DARKEN_ON_SCROLL: 'navbar-darken-on-scroll'
  };
  var navbar = document.querySelector(Selector.NAVBAR);

  function removeNavbarBgClass() {
    navbar.classList.remove('bg-dark');
    navbar.classList.remove('bg-100');
  }

  var toggleThemeClass = function toggleThemeClass(theme) {
    if (theme === 'dark') {
      navbar.classList.remove('navbar-dark');
      navbar.classList.add('navbar-light');
    } else {
      navbar.classList.remove('navbar-light');
      navbar.classList.add('navbar-dark');
    }
  };

  function getBgClassName(name, defaultColorName) {
    var parent = document.documentElement;

    var allColors = _objectSpread(_objectSpread({}, utils.getColors(parent)), utils.getGrays(parent));

    var colorName = Object.keys(allColors).includes(name) ? name : defaultColorName;
    var color = allColors[colorName];
    var bgClassName = "bg-".concat(colorName);
    return {
      color: color,
      bgClassName: bgClassName
    };
  }

  if (navbar) {
    var theme = localStorage.getItem('theme');
    var defaultColorName = theme === 'dark' ? '100' : 'dark';
    var name = utils.getData(navbar, DataKey.NAVBAR_DARKEN_ON_SCROLL);
    toggleThemeClass(theme);
    var themeController = document.body;
    themeController.addEventListener('clickControl', function (_ref3) {
      var _ref3$detail = _ref3.detail,
          control = _ref3$detail.control,
          value = _ref3$detail.value;

      if (control === 'theme') {
        toggleThemeClass(value);
        defaultColorName = value === 'dark' ? '100' : 'dark';

        if (navbar.classList.contains('bg-dark') || navbar.classList.contains('bg-100')) {
          removeNavbarBgClass();
          navbar.classList.add(getBgClassName(name, defaultColorName).bgClassName);
        }
      }
    });
    var windowHeight = window.innerHeight;
    var html = document.documentElement;
    var navbarCollapse = navbar.querySelector(Selector.NAVBAR_COLLAPSE);
    var colorRgb = utils.hexToRgb(getBgClassName(name, defaultColorName).color);

    var _window$getComputedSt = window.getComputedStyle(navbar),
        backgroundImage = _window$getComputedSt.backgroundImage;

    var transition = 'background-color 0.35s ease';
    navbar.style.backgroundImage = 'none'; // Change navbar background color on scroll

    window.addEventListener(Events.SCROLL, function () {
      var scrollTop = html.scrollTop;
      var alpha = scrollTop / windowHeight * 2;
      alpha >= 1 && (alpha = 1);
      navbar.style.backgroundColor = "rgba(".concat(colorRgb[0], ", ").concat(colorRgb[1], ", ").concat(colorRgb[2], ", ").concat(alpha, ")");
      navbar.style.backgroundImage = alpha > 0 || utils.hasClass(navbarCollapse, 'show') ? backgroundImage : 'none';
    }); // Toggle bg class on window resize

    utils.resize(function () {
      var breakPoint = utils.getBreakpoint(navbar);

      if (window.innerWidth > breakPoint) {
        removeNavbarBgClass();
        navbar.style.backgroundImage = html.scrollTop ? backgroundImage : 'none';
        navbar.style.transition = 'none';
      } else if (!utils.hasClass(navbar.querySelector(Selector.NAVBAR_TOGGLER), ClassNames.COLLAPSED)) {
        removeNavbarBgClass();
        navbar.style.backgroundImage = backgroundImage;
      }

      if (window.innerWidth <= breakPoint) {
        navbar.style.transition = utils.hasClass(navbarCollapse, 'show') ? transition : 'none';
      }
    });
    navbarCollapse.addEventListener(Events.SHOW_BS_COLLAPSE, function () {
      navbar.classList.add(getBgClassName(name, defaultColorName).bgClassName);
      navbar.style.backgroundImage = backgroundImage;
      navbar.style.transition = transition;
    });
    navbarCollapse.addEventListener(Events.HIDE_BS_COLLAPSE, function () {
      removeNavbarBgClass();
      !html.scrollTop && (navbar.style.backgroundImage = 'none');
    });
    navbarCollapse.addEventListener(Events.HIDDEN_BS_COLLAPSE, function () {
      navbar.style.transition = 'none';
    });
  }
};
/*-----------------------------------------------
|   Inline Player [plyr]
-----------------------------------------------*/


var plyrInit = function plyrInit() {
  if (window.Plyr) {
    var plyrs = document.querySelectorAll('.player');
    plyrs.forEach(function (plyr) {
      var userOptions = utils.getData(plyr, 'options');
      var defaultOptions = {
        captions: {
          active: true
        }
      };

      var options = window._.merge(defaultOptions, userOptions);

      return new window.Plyr(plyr, options);
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                   Popover                                  */

/* -------------------------------------------------------------------------- */


var popoverInit = function popoverInit() {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function (popoverTriggerEl) {
    return new window.bootstrap.Popover(popoverTriggerEl);
  });
};
/* -------------------------------------------------------------------------- */

/*                         Bootstrap Animated Progress                        */

/* -------------------------------------------------------------------------- */


var progressAnimationToggle = function progressAnimationToggle() {
  var animatedProgress = document.querySelectorAll('[data-progress-animation]');
  animatedProgress.forEach(function (progress) {
    progress.addEventListener('click', function (e) {
      var progressID = utils.getData(e.currentTarget, 'progressAnimation');
      var $progress = document.getElementById(progressID);
      $progress.classList.toggle('progress-bar-animated');
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                Scroll To Top                               */

/* -------------------------------------------------------------------------- */


var scrollToTop = function scrollToTop() {
  document.querySelectorAll('[data-anchor] > a, [data-scroll-to]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var _utils$getData2;

      e.preventDefault();
      var el = e.target;
      var id = utils.getData(el, 'scroll-to') || el.getAttribute('href');
      window.scroll({
        top: (_utils$getData2 = utils.getData(el, 'offset-top')) !== null && _utils$getData2 !== void 0 ? _utils$getData2 : utils.getOffset(document.querySelector(id)).top - 100,
        left: 0,
        behavior: 'smooth'
      });
      window.location.hash = id;
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                 Scrollbars                                 */

/* -------------------------------------------------------------------------- */


var scrollbarInit = function scrollbarInit() {
  Array.prototype.forEach.call(document.querySelectorAll('.scrollbar-overlay'), function (el) {
    return new window.OverlayScrollbars(el, {
      scrollbars: {
        autoHide: 'leave',
        autoHideDelay: 200
      }
    });
  });
};
/*-----------------------------------------------
|  Swiper
-----------------------------------------------*/


var swiperInit = function swiperInit() {
  var swipers = document.querySelectorAll('[data-swiper]');
  var navbarVerticalToggle = document.querySelector('.navbar-vertical-toggle');
  swipers.forEach(function (swiper) {
    var options = utils.getData(swiper, 'swiper');
    var thumbsOptions = options.thumb;
    var thumbsInit;

    if (thumbsOptions) {
      var thumbImages = swiper.querySelectorAll('img');
      var slides = '';
      thumbImages.forEach(function (img) {
        slides += "\n          <div class='swiper-slide '>\n            <img class='img-fluid rounded mt-1' src=".concat(img.src, " alt=''/>\n          </div>\n        ");
      });
      var thumbs = document.createElement('div');
      thumbs.setAttribute('class', 'swiper thumb');
      thumbs.innerHTML = "<div class='swiper-wrapper'>".concat(slides, "</div>");

      if (thumbsOptions.parent) {
        var parent = document.querySelector(thumbsOptions.parent);
        parent.parentNode.appendChild(thumbs);
      } else {
        swiper.parentNode.appendChild(thumbs);
      }

      thumbsInit = new window.Swiper(thumbs, thumbsOptions);
    }

    var swiperNav = swiper.querySelector('.swiper-nav');
    var newSwiper = new window.Swiper(swiper, _objectSpread(_objectSpread({}, options), {}, {
      navigation: {
        nextEl: swiperNav === null || swiperNav === void 0 ? void 0 : swiperNav.querySelector('.swiper-button-next'),
        prevEl: swiperNav === null || swiperNav === void 0 ? void 0 : swiperNav.querySelector('.swiper-button-prev')
      },
      thumbs: {
        swiper: thumbsInit
      }
    }));

    if (navbarVerticalToggle) {
      navbarVerticalToggle.addEventListener('navbar.vertical.toggle', function () {
        newSwiper.update();
      });
    }
  });
};
/* -------------------------------------------------------------------------- */

/*                                    Toast                                   */

/* -------------------------------------------------------------------------- */


var toastInit = function toastInit() {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'));
  toastElList.map(function (toastEl) {
    return new window.bootstrap.Toast(toastEl);
  });
  var liveToastBtn = document.getElementById('liveToastBtn');

  if (liveToastBtn) {
    var liveToast = new window.bootstrap.Toast(document.getElementById('liveToast'));
    liveToastBtn.addEventListener('click', function () {
      liveToast && liveToast.show();
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                                   Tooltip                                  */

/* -------------------------------------------------------------------------- */


var tooltipInit = function tooltipInit() {
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new window.bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: 'hover'
    });
  });
};
/* -------------------------------------------------------------------------- */

/*                                 Typed Text                                 */

/* -------------------------------------------------------------------------- */


var typedTextInit = function typedTextInit() {
  var typedTexts = document.querySelectorAll('.typed-text');

  if (typedTexts.length && window.Typed) {
    typedTexts.forEach(function (typedText) {
      return new window.Typed(typedText, {
        strings: utils.getData(typedText, 'typedText'),
        typeSpeed: 100,
        loop: true,
        backDelay: 1500
      });
    });
  }
};
/* -------------------------------------------------------------------------- */

/*                            Theme Initialization                            */

/* -------------------------------------------------------------------------- */


docReady(detectorInit);
docReady(tooltipInit);
docReady(popoverInit);
docReady(toastInit);
docReady(progressAnimationToggle);
docReady(glightboxInit);
docReady(plyrInit);
docReady(initMap);
docReady(countupInit);
docReady(copyLink);
docReady(navbarDarkenOnScroll);
docReady(typedTextInit);
docReady(scrollToTop);
docReady(swiperInit);
docReady(cookieNoticeInit);
docReady(dropdownOnHover);
docReady(scrollbarInit);
docReady(dropdownMenuInit);
docReady(lightboxInit);
//# sourceMappingURL=theme.js.map
