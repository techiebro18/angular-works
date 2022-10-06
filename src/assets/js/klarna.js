!(function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var o = (n[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  var n = {};
  (t.m = e),
    (t.c = n),
    (t.d = function (e, n, r) {
      t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r });
    }),
    (t.n = function (e) {
      var n =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return t.d(n, 'a', n), n;
    }),
    (t.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (t.p = '/'),
    t((t.s = 154));
})([
  function (e, t) {
    var n = (e.exports = { version: '2.6.11' });
    'number' == typeof __e && (__e = n);
  },
  function (e, t, n) {
    e.exports = { default: n(186), __esModule: !0 };
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = n(25),
      o = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(r);
    t.default =
      o.default ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(18),
      o = n.n(r);
    t.a = {
      __data: {},
      clear: function () {
        var e = this;
        o()(this.__data).forEach(function (t) {
          delete e.__data[t];
        });
      },
      set: function (e, t) {
        this.__data[e] = t;
      },
      get: function (e) {
        return this.__data[e];
      },
      delete: function (e) {
        delete this.__data[e];
      },
    };
  },
  function (e, t, n) {
    var r = n(5),
      o = n(0),
      i = n(19),
      a = n(23),
      c = n(24),
      u = function (e, t, n) {
        var s,
          f,
          l,
          d = e & u.F,
          p = e & u.G,
          h = e & u.S,
          v = e & u.P,
          y = e & u.B,
          g = e & u.W,
          _ = p ? o : o[t] || (o[t] = {}),
          m = _.prototype,
          E = p ? r : h ? r[t] : (r[t] || {}).prototype;
        p && (n = t);
        for (s in n)
          ((f = !d && E && void 0 !== E[s]) && c(_, s)) ||
            ((l = f ? E[s] : n[s]),
            (_[s] =
              p && 'function' != typeof E[s]
                ? n[s]
                : y && f
                ? i(l, r)
                : g && E[s] == l
                ? (function (e) {
                    var t = function (t, n, r) {
                      if (this instanceof e) {
                        switch (arguments.length) {
                          case 0:
                            return new e();
                          case 1:
                            return new e(t);
                          case 2:
                            return new e(t, n);
                        }
                        return new e(t, n, r);
                      }
                      return e.apply(this, arguments);
                    };
                    return (t.prototype = e.prototype), t;
                  })(l)
                : v && 'function' == typeof l
                ? i(Function.call, l)
                : l),
            v && (((_.virtual || (_.virtual = {}))[s] = l), e & u.R && m && !m[s] && a(m, s, l)));
      };
    (u.F = 1), (u.G = 2), (u.S = 4), (u.P = 8), (u.B = 16), (u.W = 32), (u.U = 64), (u.R = 128), (e.exports = u);
  },
  function (e, t) {
    var n = (e.exports =
      'undefined' != typeof window && window.Math == Math
        ? window
        : 'undefined' != typeof self && self.Math == Math
        ? self
        : Function('return this')());
    'number' == typeof __g && (__g = n);
  },
  function (e, t, n) {
    var r = n(83)('wks'),
      o = n(58),
      i = n(5).Symbol,
      a = 'function' == typeof i;
    (e.exports = function (e) {
      return r[e] || (r[e] = (a && i[e]) || (a ? i : o)('Symbol.' + e));
    }).store = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(222),
      o = n(133),
      i = n(68);
    n.d(t, 'a', function () {
      return i.a;
    }),
      n.d(t, 'c', function () {
        return o;
      }),
      (t.b = r.a);
  },
  function (e, t) {
    e.exports = function (e) {
      return 'object' == typeof e ? null !== e : 'function' == typeof e;
    };
  },
  function (e, t, n) {
    'use strict';
    var r,
      o = n(36),
      i = n.n(o),
      a = n(178),
      c = n.n(a),
      u = n(62),
      s = n(118),
      f = function (e) {
        return -1 !== e.indexOf('payment-review') ? 'Klarna Payment Review' : 'Klarna';
      },
      l = ['ES', 'IT', 'GB', 'IE', 'PT', 'MX', 'GR', 'CZ'];
    t.a = {
      trackingPath: 'api/_t/v1/credit',
      acquiringPurchaseFlow: {
        libraryBaseUrl: 'https://x.klarnacdn.net',
        libraryPath: '/apf/latest/library/main.js',
        betaLibraryPath: '/apf/beta/library/main.js',
      },
      klarnaFontsCdnCssUrl: 'https://x.klarnacdn.net/ui/fonts/v1.4/fonts-no-swap.css',
      oneOfferingVersion: 'v1',
      app: {
        version: c.a.trim(),
        staticPaymentMethod: function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.oneOfferingVersion,
            n = void 0 === t ? 'v1' : t,
            r = e.oneOfferingStaticVariant,
            o = void 0 === r ? 'index' : r,
            i = e.oneOfferingBaseUrl,
            a = e.oneOfferingFallbackBaseUrl;
          return {
            id: s.d,
            staticCdnBaseUrl: i + '/kp/one-offering/' + n + '/static',
            appsCdnBaseUrl: a + '/kp/one-offering/' + n + '/apps',
            fallbackStaticCdnBaseUrl: a + '/kp/one-offering/' + n + '/static',
            fallbackAppsCdnBaseUrl: a + '/kp/one-offering/' + n + '/apps',
            iframeEntry: 'widget.html',
            entry: o + '.html',
            defaultEntry: 'index.html',
            containerStyle: {
              display: 'inline-block',
              position: 'relative',
              overflow: 'hidden',
              maxWidth: '600px',
              minWidth: '280px',
              width: '100%',
            },
            style: { width: '100%', textAlign: 'left' },
            marginBottom: '12px',
            supportedLocales: [
              'en',
              'en-au',
              'en-ca',
              'en-es',
              'en-fr',
              'en-gb',
              'en-ie',
              'en-it',
              'en-nz',
              'en-pl',
              'en-pt',
              'en-us',
              'es-es',
              'es-us',
              'fr-ca',
              'fr-fr',
              'it-it',
              'pl-pl',
              'pt-pt',
            ],
            supportedIntents: ['buy'],
            supportedPaymentMethodCategories: ['pay_over_time', 'pay_later'],
            timeout: 5e3,
            iframeTimeout: 15e3,
            checkHeightInterval: 200,
          };
        },
        popup: { id: s.c, entry: 'popup.html', width: 500, height: 700, title: 'Klarna Payments', timeout: 1e4 },
        main: {
          id: s.b,
          title: f,
          entry: 'main.html',
          style: { height: '230px', width: '100%', maxWidth: '600px', minWidth: '280px' },
          loaderStyle:
            ((r = {
              base: {
                alignItems: 'center',
                display: 'inline-flex',
                flexDirection: 'column',
                flexShrink: '0',
                height: '230px',
                maxWidth: '600px',
                minWidth: '280px',
                width: '100%',
                zIndex: '10',
              },
            }),
            i()(r, u.c.DOTS, { justifyContent: 'center' }),
            i()(r, u.c.SKELETON, { justifyContent: 'flex-start' }),
            r),
          timeout: 3e4,
          sandbox: 'allow-forms allow-modals allow-popups allow-same-origin allow-scripts',
          countriesWithAllowedCamera: l,
          countriesWithLoader: ['SE', 'NO', 'FI', 'DK', 'DE', 'AT', 'NL', 'CH', 'US', 'GB'],
          removalPollInterval: 100,
        },
        fullscreen: {
          id: s.a,
          title: f,
          entry: 'fullscreen.html',
          style: {
            border: '0',
            display: 'block',
            height: '0',
            left: '0',
            maxHeight: '100%',
            maxWidth: '100%',
            position: 'absolute',
            opacity: '0',
            top: '0',
            width: '100%',
            webkitTransition: 'opacity 0.3s',
            transition: 'opacity 0.3s',
            zIndex: '2147483647',
          },
          timeout: 3e4,
          creationDelay: 500,
          sandbox: 'allow-forms allow-modals allow-popups allow-same-origin allow-scripts',
          countriesWithAllowedCamera: l,
        },
        deviceRecognition: {
          id: 'klarna-payments-device-recognition',
          path: 'klarna-static-assets/device-recognition/c148776',
          style: {
            border: '0',
            display: 'block',
            height: '0',
            left: '0',
            position: 'absolute',
            opacity: '0',
            top: '0',
            width: '0',
          },
          supportedCountries: [
            'US',
            'GB',
            'CH',
            'DE',
            'AT',
            'NL',
            'BE',
            'AU',
            'DK',
            'ES',
            'IT',
            'CA',
            'FR',
            'NZ',
            'PL',
            'IE',
            'PT',
            'MX',
            'GR',
            'CZ',
          ],
          type1: { supportedCountries: ['US'] },
          type2: { supportedCountries: ['CH'] },
          type3: {
            supportedCountries: [
              'US',
              'GB',
              'DE',
              'AT',
              'NL',
              'BE',
              'AU',
              'ES',
              'IT',
              'CA',
              'FR',
              'NZ',
              'PL',
              'IE',
              'PT',
              'MX',
              'GR',
              'CZ',
            ],
            orgId: { US: '87rxrdob', EU: '87rxrdob' },
          },
          timeout: 3e4,
          sandbox: 'allow-same-origin allow-scripts',
        },
      },
      supportedPaymentMethodCategories: [
        'card',
        'direct_bank_transfer',
        'direct_debit',
        'pay_in_parts',
        'pay_later',
        'pay_now',
        'pay_over_time',
      ],
      internalOnlySupportedPaymentMethodCategories: ['credit_card'],
      paymentMethods: [
        'base_account',
        'deferred_interest',
        'direct_bank_transfer',
        'direct_debit',
        'fixed_amount',
        'invoice',
        'b2b_invoice',
        'pix',
      ],
      supportedIntegratingProducts: ['hpp', 'hppx', 'shppx'],
    };
  },
  function (e, t, n) {
    e.exports = n(180);
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = n(1),
      o = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(r);
    t.default = function (e) {
      return function () {
        var t = e.apply(this, arguments);
        return new o.default(function (e, n) {
          function r(i, a) {
            try {
              var c = t[i](a),
                u = c.value;
            } catch (e) {
              return void n(e);
            }
            if (!c.done)
              return o.default.resolve(u).then(
                function (e) {
                  r('next', e);
                },
                function (e) {
                  r('throw', e);
                }
              );
            e(u);
          }
          return r('next');
        });
      };
    };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return p;
    });
    var r = n(2),
      o = n.n(r),
      i = n(232),
      a = n(246),
      c = n(247),
      u = n(264),
      s = n(265),
      f = null,
      l = function (e) {
        f = e;
      },
      d = function () {
        return null !== f ? f : Object(s.a)();
      },
      p = { APPLICATION_FOREGROUND: 'application-foreground' },
      h = Object(c.a)({ adapter: i.a, featuresStore: a.a });
    t.b = o()({}, h, {
      init: i.a.init,
      isFeatureSupported: a.a.has,
      getFeatures: a.a.get,
      setIsSupportedOverride: l,
      isLoaded: u.a,
      isSupported: d,
    });
  },
  function (e, t, n) {
    e.exports = { default: n(158), __esModule: !0 };
  },
  function (e, t, n) {
    e.exports = !n(27)(function () {
      return (
        7 !=
        Object.defineProperty({}, 'a', {
          get: function () {
            return 7;
          },
        }).a
      );
    });
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = n(159),
      i = r(o),
      a = n(60),
      c = r(a);
    t.default = (function () {
      function e(e, t) {
        var n = [],
          r = !0,
          o = !1,
          i = void 0;
        try {
          for (
            var a, u = (0, c.default)(e);
            !(r = (a = u.next()).done) && (n.push(a.value), !t || n.length !== t);
            r = !0
          );
        } catch (e) {
          (o = !0), (i = e);
        } finally {
          try {
            !r && u.return && u.return();
          } finally {
            if (o) throw i;
          }
        }
        return n;
      }
      return function (t, n) {
        if (Array.isArray(t)) return t;
        if ((0, i.default)(Object(t))) return e(t, n);
        throw new TypeError('Invalid attempt to destructure non-iterable instance');
      };
    })();
  },
  function (e, t, n) {
    var r = n(17),
      o = n(113),
      i = n(79),
      a = Object.defineProperty;
    t.f = n(14)
      ? Object.defineProperty
      : function (e, t, n) {
          if ((r(e), (t = i(t, !0)), r(n), o))
            try {
              return a(e, t, n);
            } catch (e) {}
          if ('get' in n || 'set' in n) throw TypeError('Accessors not supported!');
          return 'value' in n && (e[t] = n.value), e;
        };
  },
  function (e, t, n) {
    var r = n(8);
    e.exports = function (e) {
      if (!r(e)) throw TypeError(e + ' is not an object!');
      return e;
    };
  },
  function (e, t, n) {
    e.exports = { default: n(195), __esModule: !0 };
  },
  function (e, t, n) {
    var r = n(44);
    e.exports = function (e, t, n) {
      if ((r(e), void 0 === t)) return e;
      switch (n) {
        case 1:
          return function (n) {
            return e.call(t, n);
          };
        case 2:
          return function (n, r) {
            return e.call(t, n, r);
          };
        case 3:
          return function (n, r, o) {
            return e.call(t, n, r, o);
          };
      }
      return function () {
        return e.apply(t, arguments);
      };
    };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'g', function () {
      return p;
    }),
      n.d(t, 'e', function () {
        return h;
      }),
      n.d(t, 'f', function () {
        return v;
      }),
      n.d(t, 'j', function () {
        return y;
      }),
      n.d(t, 'd', function () {
        return g;
      }),
      n.d(t, 'h', function () {
        return _;
      }),
      n.d(t, 'k', function () {
        return m;
      }),
      n.d(t, 'a', function () {
        return E;
      }),
      n.d(t, 'b', function () {
        return b;
      }),
      n.d(t, 'c', function () {
        return w;
      }),
      n.d(t, 'i', function () {
        return A;
      });
    var r = n(94),
      o = n.n(r),
      i = n(38),
      a = n.n(i),
      c = n(39),
      u = n.n(c),
      s = n(65),
      f = n.n(s),
      l = n(67),
      d = n.n(l),
      p = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'The container selector is invalid. Please, check that the used ID or CSS class name is correct and that it targets an existing DOM element.';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return (n.message = e), (n.name = 'InvalidContainerSelectorError'), n;
        }
        return d()(t, e), t;
      })(Error),
      h = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'The client token is invalid. Make sure it has not been tampered with in any way.';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return (n.message = e), (n.name = 'InvalidClientTokenError'), n;
        }
        return d()(t, e), t;
      })(Error),
      v = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'The client token signature is invalid. Make sure it has not been tampered with in any way.';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return (n.message = e), (n.name = 'InvalidClientTokenSignatureError'), n;
        }
        return d()(t, e), t;
      })(Error),
      y = (function (e) {
        function t(e) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 'This payment method category is not supported: ' + e;
          u()(this, t);
          var r = f()(this, (t.__proto__ || a()(t)).call(this, n));
          return (r.message = n), (r.name = 'PaymentMethodCategoryNotSupportedError'), r;
        }
        return d()(t, e), t;
      })(Error),
      g = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'An instance ID must be provided when the `payment_method_categories` option is used.';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return (n.message = e), (n.name = 'InstanceIDNotProvidedError'), n;
        }
        return d()(t, e), t;
      })(Error),
      _ = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'The instance ID must only contain alphabets, numbers, underscores (_) and hyphens (-).';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return (n.message = e), (n.name = 'InvalidInstanceIDError'), n;
        }
        return d()(t, e), t;
      })(Error),
      m = (function (e) {
        function t(e) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 'The provided preferred payment method is not supported.';
          u()(this, t);
          var r = f()(this, (t.__proto__ || a()(t)).call(this, n));
          return (r.message = n), (r.name = 'PreferredPaymentMethodNotSupportedError'), r;
        }
        return d()(t, e), t;
      })(Error),
      E = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'The application has not yet been initialized. Call `init` first to initialize it.';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return o()(n, t.prototype), n;
        }
        return d()(t, e), t;
      })(Error),
      b = (function (e) {
        function t() {
          var e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : 'The application has not yet been loaded. Call `load` first to load it.';
          u()(this, t);
          var n = f()(this, (t.__proto__ || a()(t)).call(this, e));
          return (n.message = e), (n.name = 'ApplicationNotLoadedError'), n;
        }
        return d()(t, e), t;
      })(Error),
      w = (function (e) {
        function t(e) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'This event name is not supported: ' + e;
          u()(this, t);
          var r = f()(this, (t.__proto__ || a()(t)).call(this, n));
          return (r.message = n), (r.name = 'EventNotSupportedError'), r;
        }
        return d()(t, e), t;
      })(Error),
      A = (function (e) {
        function t(e) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'This operation is not supported: ' + e;
          u()(this, t);
          var r = f()(this, (t.__proto__ || a()(t)).call(this, n));
          return (r.message = n), (r.name = 'OperationNotSupportedError'), r;
        }
        return d()(t, e), t;
      })(Error);
  },
  function (e, t, n) {
    'use strict';
    function r() {
      return Date.now() + ++o;
    }
    t.a = r;
    var o = 0;
  },
  function (e, t, n) {
    var r = n(75),
      o = n(76);
    e.exports = function (e) {
      return r(o(e));
    };
  },
  function (e, t, n) {
    var r = n(16),
      o = n(45);
    e.exports = n(14)
      ? function (e, t, n) {
          return r.f(e, t, o(1, n));
        }
      : function (e, t, n) {
          return (e[t] = n), e;
        };
  },
  function (e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function (e, t) {
      return n.call(e, t);
    };
  },
  function (e, t, n) {
    e.exports = { default: n(171), __esModule: !0 };
  },
  function (e, t, n) {
    n(161);
    for (
      var r = n(5),
        o = n(23),
        i = n(34),
        a = n(6)('toStringTag'),
        c =
          'CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList'.split(
            ','
          ),
        u = 0;
      u < c.length;
      u++
    ) {
      var s = c[u],
        f = r[s],
        l = f && f.prototype;
      l && !l[a] && o(l, a, s), (i[s] = i.Array);
    }
  },
  function (e, t) {
    e.exports = function (e) {
      try {
        return !!e();
      } catch (e) {
        return !0;
      }
    };
  },
  function (e, t, n) {
    var r = n(76);
    e.exports = function (e) {
      return Object(r(e));
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(167)(!0);
    n(77)(
      String,
      'String',
      function (e) {
        (this._t = String(e)), (this._i = 0);
      },
      function () {
        var e,
          t = this._t,
          n = this._i;
        return n >= t.length
          ? { value: void 0, done: !0 }
          : ((e = r(t, n)), (this._i += e.length), { value: e, done: !1 });
      }
    );
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = n(182),
      o = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(r);
    t.default = function (e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
      }
      return (0, o.default)(e);
    };
  },
  function (e, t, n) {
    'use strict';
    function r() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
      return t
        .filter(function (e) {
          return !!e;
        })
        .map(i)
        .join('/');
    }
    function o() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return c()(e)
        .map(function (t) {
          return t + '=' + encodeURIComponent(e[t]);
        })
        .join('&');
    }
    function i() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
      return 'string' != typeof e ? e : '/' === (e || '').substr(-1) ? e.slice(0, -1) : e;
    }
    (t.b = r), (t.a = o);
    var a = n(18),
      c = n.n(a);
  },
  function (e, t, n) {
    'use strict';
    var r = function () {
      return /^(dev-proxy|localhost|0\.0\.0\.0|(.+\.)?klarna\.(com|net)|(.+\.)?klarnapayments\.com)$/.test(
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).location.hostname
      );
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'c', function () {
      return c;
    }),
      n.d(t, 'b', function () {
        return u;
      });
    var r = n(60),
      o = n.n(r),
      i = ['kpc-', 'kp-client-', ''],
      a = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments[1];
        try {
          var n = !0,
            r = !1,
            a = void 0;
          try {
            for (var c, u = o()(i); !(n = (c = u.next()).done); n = !0) {
              var s = c.value,
                f = s + t;
              if (e.hasOwnProperty(f)) return e[f];
            }
          } catch (e) {
            (r = !0), (a = e);
          } finally {
            try {
              !n && u.return && u.return();
            } finally {
              if (r) throw a;
            }
          }
        } catch (e) {}
      },
      c = function (e, t) {
        var n = a(e, t);
        if (n) return n.variate || !0;
      },
      u = function (e, t, n) {
        var r = a(e, t);
        if (r) {
          var o = r.parameters;
          return (void 0 === o ? {} : o)[n];
        }
      };
    t.a = a;
  },
  function (e, t) {
    e.exports = {};
  },
  function (e, t, n) {
    var r = n(114),
      o = n(84);
    e.exports =
      Object.keys ||
      function (e) {
        return r(e, o);
      };
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = n(61),
      o = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(r);
    t.default = function (e, t, n) {
      return (
        t in e ? (0, o.default)(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e
      );
    };
  },
  function (e, t, n) {
    var r = n(19),
      o = n(120),
      i = n(121),
      a = n(17),
      c = n(57),
      u = n(85),
      s = {},
      f = {},
      t = (e.exports = function (e, t, n, l, d) {
        var p,
          h,
          v,
          y,
          g = d
            ? function () {
                return e;
              }
            : u(e),
          _ = r(n, l, t ? 2 : 1),
          m = 0;
        if ('function' != typeof g) throw TypeError(e + ' is not iterable!');
        if (i(g)) {
          for (p = c(e.length); p > m; m++)
            if ((y = t ? _(a((h = e[m]))[0], h[1]) : _(e[m])) === s || y === f) return y;
        } else for (v = g.call(e); !(h = v.next()).done; ) if ((y = o(v, _, h.value, t)) === s || y === f) return y;
      });
    (t.BREAK = s), (t.RETURN = f);
  },
  function (e, t, n) {
    e.exports = { default: n(210), __esModule: !0 };
  },
  function (e, t, n) {
    'use strict';
    (t.__esModule = !0),
      (t.default = function (e, t) {
        if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
      });
  },
  function (e, t, n) {
    var r = n(8);
    e.exports = function (e, t) {
      if (!r(e) || e._t !== t) throw TypeError('Incompatible receiver, ' + t + ' required!');
      return e;
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      return e.parentNode !== t.container;
    }
    function o(e, t) {
      return !new RegExp('^' + t.baseURL).test(e.src);
    }
    function i() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
      return new s.a(function (n, i) {
        var c = e.beforeLoad,
          u = void 0 === c ? function () {} : c,
          s = e.timeout,
          f = void 0 === s ? 2e4 : s,
          g = {},
          _ = a(e.id);
        if (
          _ &&
          (function (t) {
            return e.reCreateIframe || r(t, e) || o(t, e);
          })(_)
        )
          _.parentNode.removeChild(_), _.removeOnLoadListener();
        else if (_) return u({ iframe: _, removeLoader: m(_, g, e) }), n(_);
        if ((y[e.id] && (t.clearTimeout(y[e.id]), delete y[e.id]), e.showLoader && 'none' !== e.style.display))
          try {
            var w = Object(d.a)({ loaderType: e.loaderType }),
              A = w.el,
              O = w.styles;
            (g.el = document.createElement('div')),
              g.el.appendChild(A),
              g.el.setAttribute('id', e.id + '-loader'),
              (g.tagStyles = O),
              E(g, e);
          } catch (e) {
            g.el = null;
          }
        var S = document.createElement('iframe');
        (S.__ID__ = Object(p.a)()),
          S.setAttribute('id', e.id),
          S.setAttribute('name', e.id),
          S.setAttribute('title', e.title),
          S.setAttribute('scrolling', 'no'),
          S.setAttribute('frameborder', '0'),
          e.shouldAllowCamera && S.setAttribute('allow', 'camera'),
          (S.frameBorder = '0'),
          (S.src = e.url),
          e.sandbox && S.setAttribute('sandbox', e.sandbox),
          e.onCreate && e.onCreate(S);
        var R = m(S, g, e);
        u({ iframe: S, removeLoader: R }), l()(S.style, e.style);
        var I = t.setTimeout(function () {
          i(S);
        }, f);
        (y[e.id] = I),
          (S.removeLoader = R),
          (S.removeOnLoadListener = Object(h.a)(S, 'load', function () {
            t.clearTimeout(I), delete y[e.id], e.onLoad && e.onLoad(S), e.loaderType === v.c.DOTS && R(), n(S);
          })),
          b(S, g, e),
          e.container.appendChild(S);
      });
    }
    function a(e) {
      return document.getElementById(e);
    }
    function c(e) {
      try {
        return e.__ID__;
      } catch (e) {
        return;
      }
    }
    (t.b = i), (t.a = a), (t.c = c);
    var u = n(1),
      s = n.n(u),
      f = n(25),
      l = n.n(f),
      d = n(286),
      p = n(21),
      h = n(141),
      v = n(62),
      y = {},
      g = function (e) {
        return !(!e || !e.el);
      },
      _ = function (e) {
        var t = e && e.querySelector('.skeleton');
        t && t.classList && t.classList.add('is-hidden');
      },
      m = function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return function () {
          var r = 0;
          g(t) && n.loaderType === v.c.SKELETON && ((r = v.b), _(t.el)),
            setTimeout(function () {
              g(t) &&
                t.el.parentNode &&
                (t.el.parentNode.removeChild(t.el),
                t.tagStyles && t.tagStyles.parentNode && t.tagStyles.parentNode.removeChild(t.tagStyles)),
                g(t) && (e.style.display = 'inline');
            }, r);
        };
      },
      E = function (e, t) {
        var n = {};
        null != t.loaderStyle && (n = l()({}, t.loaderStyle.base, t.loaderStyle[t.loaderType])),
          l()(e.el.style, t.style, n);
      },
      b = function (e, t, n) {
        g(t) &&
          (t.tagStyles && n.container.appendChild(t.tagStyles),
          n.container.appendChild(t.el),
          (e.style.display = 'none'));
      };
  },
  function (e, t) {
    var n = {}.toString;
    e.exports = function (e) {
      return n.call(e).slice(8, -1);
    };
  },
  function (e, t) {
    e.exports = !0;
  },
  function (e, t) {
    e.exports = function (e) {
      if ('function' != typeof e) throw TypeError(e + ' is not a function!');
      return e;
    };
  },
  function (e, t) {
    e.exports = function (e, t) {
      return { enumerable: !(1 & e), configurable: !(2 & e), writable: !(4 & e), value: t };
    };
  },
  function (e, t, n) {
    var r = n(16).f,
      o = n(24),
      i = n(6)('toStringTag');
    e.exports = function (e, t, n) {
      e && !o((e = n ? e : e.prototype), i) && r(e, i, { configurable: !0, value: t });
    };
  },
  function (e, t) {
    t.f = {}.propertyIsEnumerable;
  },
  function (e, t, n) {
    'use strict';
    var r = n(179),
      o = n(193),
      i = n(199),
      a = n(202),
      c = n(203),
      u = n(204),
      s = n(130),
      f = n(205),
      l = Object(o.a)(r.a),
      d = Object(i.a)(l),
      p = Object(a.a)(l),
      h = Object(c.a)(l),
      v = Object(u.a)(l);
    t.a = {
      getNativeVersion: s.a,
      init: d,
      isSupported: f.a,
      sendSessionInitiatedEvent: p,
      sendSessionApprovedEvent: h,
      openExternalBrowser: v,
    };
  },
  function (e, t) {},
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return r;
    });
    var r = {
      BROWSER_INFO_HANDSHAKE: 'BROWSER_INFO_HANDSHAKE',
      SESSION_INITIATED: 'KP_SESSION_INITIATED',
      SESSION_APPROVED: 'KP_SESSION_APPROVED',
      AUTH_REQUEST: 'KP_AUTH_REQUEST',
      DEAL_REQUEST: 'KP_DEAL_REQUEST',
      OPEN_EXTERNAL_BROWSER: 'OPEN_EXTERNAL_BROWSER',
    };
  },
  function (e, t, n) {
    var r = n(58)('meta'),
      o = n(8),
      i = n(24),
      a = n(16).f,
      c = 0,
      u =
        Object.isExtensible ||
        function () {
          return !0;
        },
      s = !n(27)(function () {
        return u(Object.preventExtensions({}));
      }),
      f = function (e) {
        a(e, r, { value: { i: 'O' + ++c, w: {} } });
      },
      l = function (e, t) {
        if (!o(e)) return 'symbol' == typeof e ? e : ('string' == typeof e ? 'S' : 'P') + e;
        if (!i(e, r)) {
          if (!u(e)) return 'F';
          if (!t) return 'E';
          f(e);
        }
        return e[r].i;
      },
      d = function (e, t) {
        if (!i(e, r)) {
          if (!u(e)) return !0;
          if (!t) return !1;
          f(e);
        }
        return e[r].w;
      },
      p = function (e) {
        return s && h.NEED && u(e) && !i(e, r) && f(e), e;
      },
      h = (e.exports = { KEY: r, NEED: !1, fastKey: l, getWeak: d, onFreeze: p });
  },
  function (e, t, n) {
    'use strict';
    var r = function (e, t) {
        try {
          window.localStorage.setItem(e, t);
        } catch (e) {}
      },
      o = function (e) {
        try {
          return window.localStorage.getItem(e);
        } catch (e) {}
        return null;
      },
      i = function (e) {
        try {
          window.localStorage.removeItem(e);
        } catch (e) {}
      };
    t.a = { set: r, get: o, remove: i };
  },
  function (e, t, n) {
    'use strict';
    function r() {
      if (!i.b.isSupported() || !o.a.get('nativeHookApiHandshakeResponse')) return null;
      var e = o.a.get('nativeHookApiHandshakeResponse'),
        t = e.deviceName,
        n = e.merchantAppName,
        r = e.merchantAppVersion,
        a = e.merchantReturnURL,
        c = e.osName,
        u = e.osVersion,
        s = e.nativeVersion,
        f = e.productOptions,
        l = void 0;
      try {
        l = f ? JSON.parse(f) : {};
      } catch (e) {
        l = {};
      }
      return {
        deviceName: t,
        merchantAppName: n,
        merchantAppVersion: r,
        merchantReturnURL: a,
        osName: c,
        osVersion: u,
        nativeVersion: s,
        productOptions: l,
      };
    }
    t.a = r;
    var o = n(3),
      i = n(12);
  },
  function (e, t, n) {
    'use strict';
    function r() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = arguments[1],
        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        a = t,
        c = f[a];
      if (n && c && i(c.target) !== i(e)) {
        try {
          c.destroy();
        } catch (e) {}
        delete f[a];
      }
      return f[a] || ((c = f[a] = o(e, r)), (c.target = e)), c;
    }
    function o(e, t) {
      var n = { frame: e };
      return (
        e && e.nodeType !== window.Node.ELEMENT_NODE && e.window && (n = { window: e }),
        new u.a({ sourceID: 'library', target: n, debug: s }, c()({}, t))
      );
    }
    function i(e) {
      try {
        return e.__ID__;
      } catch (e) {}
    }
    t.a = r;
    var a = n(2),
      c = n.n(a),
      u = n(146),
      s = !1,
      f = {};
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = n(61),
      o = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(r);
    t.default = (function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            (0, o.default)(e, r.key, r);
        }
      }
      return function (t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })();
  },
  function (e, t, n) {
    var r = n(17),
      o = n(164),
      i = n(84),
      a = n(82)('IE_PROTO'),
      c = function () {},
      u = function () {
        var e,
          t = n(78)('iframe'),
          r = i.length;
        for (
          t.style.display = 'none',
            n(115).appendChild(t),
            t.src = 'javascript:',
            e = t.contentWindow.document,
            e.open(),
            e.write('<script>document.F=Object</script>'),
            e.close(),
            u = e.F;
          r--;

        )
          delete u.prototype[i[r]];
        return u();
      };
    e.exports =
      Object.create ||
      function (e, t) {
        var n;
        return (
          null !== e ? ((c.prototype = r(e)), (n = new c()), (c.prototype = null), (n[a] = e)) : (n = u()),
          void 0 === t ? n : o(n, t)
        );
      };
  },
  function (e, t, n) {
    var r = n(81),
      o = Math.min;
    e.exports = function (e) {
      return e > 0 ? o(r(e), 9007199254740991) : 0;
    };
  },
  function (e, t) {
    var n = 0,
      r = Math.random();
    e.exports = function (e) {
      return 'Symbol('.concat(void 0 === e ? '' : e, ')_', (++n + r).toString(36));
    };
  },
  function (e, t, n) {
    var r = n(42),
      o = n(6)('toStringTag'),
      i =
        'Arguments' ==
        r(
          (function () {
            return arguments;
          })()
        ),
      a = function (e, t) {
        try {
          return e[t];
        } catch (e) {}
      };
    e.exports = function (e) {
      var t, n, c;
      return void 0 === e
        ? 'Undefined'
        : null === e
        ? 'Null'
        : 'string' == typeof (n = a((t = Object(e)), o))
        ? n
        : i
        ? r(t)
        : 'Object' == (c = r(t)) && 'function' == typeof t.callee
        ? 'Arguments'
        : c;
    };
  },
  function (e, t, n) {
    e.exports = { default: n(169), __esModule: !0 };
  },
  function (e, t, n) {
    e.exports = { default: n(176), __esModule: !0 };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return r;
    }),
      n.d(t, 'b', function () {
        return o;
      }),
      n.d(t, 'c', function () {
        return i;
      });
    var r = 0.8,
      o = 1e3 * r,
      i = { DOTS: 'dots', SKELETON: 'skeleton' };
  },
  function (e, t) {
    e.exports = function (e, t, n, r) {
      if (!(e instanceof t) || (void 0 !== r && r in e)) throw TypeError(n + ': incorrect invocation!');
      return e;
    };
  },
  function (e, t, n) {
    var r = n(23);
    e.exports = function (e, t, n) {
      for (var o in t) n && e[o] ? (e[o] = t[o]) : r(e, o, t[o]);
      return e;
    };
  },
  function (e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = n(66),
      o = (function (e) {
        return e && e.__esModule ? e : { default: e };
      })(r);
    t.default = function (e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t || ('object' !== (void 0 === t ? 'undefined' : (0, o.default)(t)) && 'function' != typeof t) ? e : t;
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = n(96),
      i = r(o),
      a = n(98),
      c = r(a),
      u =
        'function' == typeof c.default && 'symbol' == typeof i.default
          ? function (e) {
              return typeof e;
            }
          : function (e) {
              return e && 'function' == typeof c.default && e.constructor === c.default && e !== c.default.prototype
                ? 'symbol'
                : typeof e;
            };
    t.default =
      'function' == typeof c.default && 'symbol' === u(i.default)
        ? function (e) {
            return void 0 === e ? 'undefined' : u(e);
          }
        : function (e) {
            return e && 'function' == typeof c.default && e.constructor === c.default && e !== c.default.prototype
              ? 'symbol'
              : void 0 === e
              ? 'undefined'
              : u(e);
          };
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = n(94),
      i = r(o),
      a = n(219),
      c = r(a),
      u = n(66),
      s = r(u);
    t.default = function (e, t) {
      if ('function' != typeof t && null !== t)
        throw new TypeError(
          'Super expression must either be null or a function, not ' + (void 0 === t ? 'undefined' : (0, s.default)(t))
        );
      (e.prototype = (0, c.default)(t && t.prototype, {
        constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
      })),
        t && (i.default ? (0, i.default)(e, t) : (e.__proto__ = t));
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      function t(e) {
        return i()(e)
          .sort()
          .map(function (t) {
            return encodeURIComponent(t) + '=' + encodeURIComponent(e[t]);
          })
          .join('&');
      }
      function n(e, n) {
        return '' + b + m + w + '/' + A + '/' + e + '?' + t(n);
      }
      function r(e) {
        var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o = arguments[2],
          i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : y.ALL;
        if (!(I > i)) {
          if (!e) throw new TypeError('expected `name` as first parameter');
          r = g({}, r, { iid: R, sid: O, timestamp: r.timestamp || new Date().getTime() });
          var a = n(e, r);
          try {
            v.a.create(p, a, o);
          } catch (e) {
            o && (a += '&' + t(o)), h.a.create(p, a);
          }
        }
      }
      function o(e, t, n) {
        r(e, t, n, y.TRACE);
      }
      function a(e, t, n) {
        r(e, t, n, y.DEBUG);
      }
      function c(e, t, n) {
        r(e, t, n, y.INFO);
      }
      function u(e, t, n) {
        r(e, t, n, y.WARN);
      }
      function s(e, t, n) {
        r(e, t, n, y.ERROR);
      }
      function f(e, t, n) {
        r(e, t, n, y.FATAL);
      }
      function l() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y.ALL;
        if ('number' != typeof e || e < y.ALL || e > y.OFF) throw new TypeError('invalid `logLevel` (' + e + ')');
        I = e;
      }
      function d() {
        return { baseUrl: b, client: w, clientVersion: A, sessionId: O, instanceId: R, logLevel: I };
      }
      var p = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
      if ('object' !== (void 0 === e ? 'undefined' : _(e)) || !e) throw new TypeError('expected configuration object');
      var E = e.baseUrl,
        b = void 0 === E ? 'https://eu.klarnaevt.com' : E,
        w = e.client,
        A = e.clientVersion,
        O = e.sessionId,
        S = e.instanceId,
        R = void 0 === S ? Math.floor(9e3 * Math.random()) + 1e3 : S,
        I = e.logLevel || y.ALL;
      if ('string' != typeof w) throw new TypeError('expected `client` in the configuration object');
      if ('string' != typeof A) throw new TypeError('expected `clientVersion` in the configuration object');
      if ('string' != typeof O) throw new TypeError('expected `sessionId` in the configuration object');
      if ('number' != typeof I || I < y.ALL || I > y.OFF) throw new TypeError('invalid `logLevel` (' + I + ')');
      return { event: r, trace: o, debug: a, info: c, warn: u, error: s, fatal: f, setLogLevel: l, getConfig: d };
    }
    t.b = r;
    var o = n(18),
      i = n.n(o),
      a = n(96),
      c = n.n(a),
      u = n(66),
      s = n.n(u),
      f = n(98),
      l = n.n(f),
      d = n(25),
      p = n.n(d),
      h = n(223),
      v = n(224),
      y = n(225);
    n.d(t, 'a', function () {
      return y;
    });
    var g =
        p.a ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        },
      _ =
        'function' == typeof l.a && 'symbol' === s()(c.a)
          ? function (e) {
              return void 0 === e ? 'undefined' : s()(e);
            }
          : function (e) {
              return e && 'function' == typeof l.a && e.constructor === l.a && e !== l.a.prototype
                ? 'symbol'
                : void 0 === e
                ? 'undefined'
                : s()(e);
            },
      m = '/v1/';
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return o;
    }),
      n.d(t, 'c', function () {
        return i;
      }),
      n.d(t, 'e', function () {
        return a;
      }),
      n.d(t, 'd', function () {
        return c;
      }),
      n.d(t, 'a', function () {
        return u;
      }),
      n.d(t, 'g', function () {
        return s;
      }),
      n.d(t, 'f', function () {
        return f;
      });
    var r = function (e, t) {
        if (!window.navigator || !window.navigator.userAgent) return !1;
        var n = window.navigator.userAgent;
        return t ? -1 !== n.toLowerCase().indexOf(e.toLowerCase()) : -1 !== n.indexOf(e);
      },
      o = function () {
        return (
          window.navigator &&
          window.navigator.platform &&
          (/iPad|iPhone/.test(window.navigator.platform) ||
            (/MacIntel/.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0))
        );
      },
      i = function () {
        return r('iPhone');
      },
      a = function () {
        return window.navigator.vendor && window.navigator.vendor.indexOf('Apple') > -1 && !r('CriOS') && !r('FxiOS');
      },
      c = function () {
        return r('Instagram') && r('iPhone');
      },
      u = function () {
        return r('Trident/7.0;', !0) && (r('; rv:11') || r('; rv 11'));
      },
      s = function () {
        if (!window.navigator || !window.navigator.userAgent) return !1;
        var e = window.navigator.standalone,
          t = window.navigator.userAgent.toLowerCase(),
          n = /safari/.test(t),
          r = /iphone|ipod|ipad/.test(t);
        return (
          (window.webkit && window.webkit.messageHandlers) ||
          (r && !e && !n) ||
          /webview/g.test(t) ||
          /android.*(wv|.0.0.0)/g.test(t) ||
          /linux; u; android/g.test(t)
        );
      },
      f = function () {
        return (
          'attachShadow' in
          (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).HTMLElement.prototype
        );
      };
  },
  function (e, t, n) {
    'use strict';
    function r() {
      try {
        var e = Object(o.a)('ku1-vid'),
          t = Object(o.a)('ku1-sid'),
          n = Object(o.a)('klarna-shopping-browser-session-id'),
          r = {};
        if (!e && !t && !n) return;
        return e && (r.ku1_vid = e), t && (r.ku1_sid = t), n && (r.shopping_browser_session_id = n), r;
      } catch (e) {}
    }
    t.a = r;
    var o = n(135);
  },
  function (e, t, n) {
    'use strict';
    var r = n(3),
      o = function (e) {
        var t = e.id,
          n = e.instanceID,
          o = e.paymentMethodCategory,
          i = n || o,
          a = r.a.get('instancesWithApplicationResetDone');
        if (i) {
          if (a && -1 === a.indexOf(i)) return r.a.set('instancesWithApplicationResetDone', a.concat(i)), !0;
        } else if (!1 === r.a.get(t + ':applicationResetDone')) return r.a.set(t + ':applicationResetDone', !0), !0;
        return !1;
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = e.sessionType,
        n = e.options,
        r = e.onError,
        o = void 0 === r ? function () {} : r,
        a = n.payment_method_category,
        c = n.payment_method_categories,
        u = n.preferred_payment_method,
        l = n.instance_id;
      if ('payments' === t) {
        if (a && !f(a)) throw (o('PaymentMethodCategoryNotSupportedError'), new i.j(a));
        if (
          (c &&
            c.forEach(function (e) {
              if (!f(e)) throw (o('PaymentMethodCategoryNotSupportedError'), new i.j(e));
            }),
          c && !l)
        )
          throw (o('InstanceIDNotProvidedError'), new i.d());
        if (c && !/^[\w-]+$/.test(l)) throw (o('InvalidInstanceIDError'), new i.h());
      }
      if (u && -1 === s.indexOf(u)) throw (o('PreferredPaymentMethodNotSupportedError'), new i.k(s));
    }
    n.d(t, 'b', function () {
      return f;
    }),
      (t.a = r);
    var o = n(9),
      i = n(20),
      a = n(32),
      c = o.a.internalOnlySupportedPaymentMethodCategories,
      u = o.a.supportedPaymentMethodCategories,
      s = o.a.paymentMethods,
      f = function (e) {
        return (c.indexOf(e) > -1 && Object(a.a)()) || u.indexOf(e) > -1;
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(15),
      a = n.n(i),
      c = n(13),
      u = n.n(c),
      s = n(2),
      f = n.n(s),
      l = n(11),
      d = n.n(l),
      p = n(12),
      h = n(9),
      v = n(41),
      y = n(107),
      g = n(7),
      _ = n(31),
      m = n(3),
      E = n(148),
      b = n(106),
      w = n(145),
      A = n(313),
      O = n(317),
      S = n(319),
      R = n(69),
      I = n(62),
      T = n(33);
    t.a = (function () {
      function e(e) {
        return t.apply(this, arguments);
      }
      var t = d()(
        o.a.mark(function e(t) {
          var n,
            r,
            i,
            c,
            s,
            l,
            d,
            L,
            P,
            C,
            x,
            N,
            D,
            j,
            M,
            F,
            U,
            H,
            B,
            K,
            W,
            G,
            V,
            Y,
            z,
            J,
            q,
            Z = t.id,
            Q = t.iframeName,
            X = t.clientToken,
            $ = void 0 === X ? {} : X,
            ee = t.container,
            te = t.tracker,
            ne = t.options,
            re = void 0 === ne ? {} : ne,
            oe = t.appConfig,
            ie = void 0 === oe ? {} : oe,
            ae = t.renderFullscreen,
            ce = void 0 === ae || ae;
          return o.a.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    (n = $.sessionID),
                      (r = $.sessionType),
                      (i = $.scheme),
                      (c = $.purchaseCountry),
                      (s = $.merchantName),
                      (l = $.environment),
                      (d = $.experiments),
                      (L = void 0 === d ? {} : d),
                      (P = f()({}, h.a.app, ie)),
                      (C = re.payment_method_category),
                      (x = re.payment_method_categories),
                      (N = re.instance_id),
                      (D = Q || N || C || r || Z),
                      (j = Object(y.a)(Z, D)),
                      (M = !!m.a.get(Z + ':popupExperimentEnabled'));
                    try {
                      (F = Object(b.a)(C, x)), Object(E.b)(F, ee);
                    } catch (e) {}
                    return (
                      (U = function (e, t) {
                        te.event(
                          e,
                          f()({}, t, {
                            app_version: P.version,
                            payment_method_category: C,
                            payment_method_categories: x,
                            name: D,
                          })
                        );
                      }),
                      (H = function (e, t) {
                        return function () {
                          var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                          U(e, f()({}, t, { iframe_unique_id: Object(v.c)(n) }));
                        };
                      }),
                      (B = p.b.isSupported()),
                      (K = p.b.getFeatures()),
                      (W = Object(_.a)({
                        data: u()({
                          mainIframeID: P.main.id(D),
                          popupWindowEnabled: M,
                          nativeHookApiSupported: B,
                          nativeHookApiFeatures: K,
                          paymentMethodCategory: C,
                          instanceID: N,
                          scheme: i,
                          sessionType: r,
                          sessionID: n,
                          merchantName: s,
                          environment: l,
                        }),
                      })),
                      (G = Object(_.a)({
                        data: u()({
                          onShowExternalDocumentRegistered: !!re.on_show_external_document,
                          fullscreenIframeID: P.fullscreen.id(D),
                          popupWindowEnabled: M,
                          nativeHookApiSupported: B,
                          nativeHookApiFeatures: K,
                          paymentMethodCategory: C,
                          purchaseCountry: c,
                          instanceID: N,
                          scheme: i,
                          sessionType: r,
                          sessionID: n,
                          merchantName: s,
                          environment: l,
                        }),
                      })),
                      (V = Object(R.c)() && Object(T.c)(L, 'fullscreen-layout-style-fix')),
                      (Y = Object(R.e)() && Object(T.c)(L, 'fullscreen-layout-style-fix')),
                      (z = V || Y || Object(R.d)()),
                      (J = function (e) {
                        return Object(w.a)(
                          f()(
                            {
                              name: D,
                              container: document.body,
                              scrollBlockStyleContainer: ee,
                              baseURL: m.a.get(Z + ':versionedBaseURL'),
                              params: W,
                              onCreate: H(g.c.FULLSCREEN_IFRAME_CREATED, { params: W }),
                              onLoad: H(g.c.FULLSCREEN_IFRAME_LOADED),
                              shouldSandbox: !!Object(T.c)(L, 'sandbox_iframes'),
                              shouldAllowCamera: -1 !== (P.fullscreen.countriesWithAllowedCamera || []).indexOf(c),
                              shouldUseLayoutStyleFix: z,
                            },
                            P.fullscreen
                          ),
                          j,
                          U
                        ).then(
                          function (t) {
                            return e.send(k('ready')), t;
                          },
                          function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            throw (H(g.c.FULLSCREEN_IFRAME_TIMED_OUT)(t), e.send(k('error')), t);
                          }
                        );
                      }),
                      (q = function (e, t) {
                        return function () {
                          var r = Object(_.a)({ sid: n, miid: P.main.id(D), id: D }),
                            o = void 0;
                          return Object(O.a)(
                            f()(
                              {
                                name: D,
                                baseURL: m.a.get(Z + ':versionedBaseURL'),
                                params: r,
                                onOpened: function (n, r) {
                                  (o = n),
                                    U(g.c.POPUP_WINDOW_OPENED),
                                    e.show(),
                                    t.send({ action: 'showPopupBackdrop' });
                                  var i = !1;
                                  t.addMethods({
                                    focusPopupWindow: function (e) {
                                      n.focus(),
                                        i ||
                                          setTimeout(function () {
                                            r.call('checkFocus', function (t) {
                                              (i = !0), e(t);
                                            });
                                          }, 0);
                                    },
                                    closePopupWindow: function () {
                                      n.close();
                                    },
                                  });
                                },
                                onClosed: function () {
                                  U(g.c.POPUP_WINDOW_CLOSED), e.hide(), t.send({ action: 'hidePopupBackdrop' });
                                },
                                onError: function (e) {
                                  U(g.c.POPUP_WINDOW_ERROR, { error: e });
                                },
                              },
                              P.popup
                            ),
                            U
                          )
                            .then(function (e) {
                              return U(g.c.POPUP_WINDOW_READY), e;
                            })
                            .catch(function (e) {
                              o && o.close();
                              var t = e instanceof Error ? e.message : e;
                              throw (U(g.c.POPUP_WINDOW_ERROR, { error: t }), e);
                            });
                        };
                      }),
                      e.abrupt(
                        'return',
                        Object(A.a)(
                          f()(
                            {
                              name: D,
                              container: ee,
                              showLoader: -1 !== P.main.countriesWithLoader.indexOf(c),
                              loaderType: Object(T.c)(L, 'loader_type') || I.c.DOTS,
                              baseURL: m.a.get(Z + ':versionedBaseURL'),
                              params: G,
                              onCreate: H(g.c.MAIN_IFRAME_CREATED, { params: G }),
                              onLoad: H(g.c.MAIN_IFRAME_LOADED),
                              onVisible: H(g.c.MAIN_IFRAME_VISIBLE),
                              onShowExternalDocument: re.on_show_external_document,
                              onRedirect: re.on_redirect,
                              shouldSandbox: !!Object(T.c)(L, 'sandbox_iframes'),
                              shouldAllowCamera: -1 !== (P.main.countriesWithAllowedCamera || []).indexOf(c),
                            },
                            P.main
                          ),
                          j,
                          function (e) {
                            return function () {
                              H.apply(void 0, arguments)(e);
                            };
                          }
                        ).then(
                          function (e) {
                            var t = a()(e, 2),
                              n = t[0],
                              r = t[1],
                              o = n.id;
                            return (
                              setTimeout(function () {
                                ce &&
                                  J(r)
                                    .then(function (e) {
                                      var t = a()(e, 3),
                                        i = t[0],
                                        c = t[1],
                                        u = t[2];
                                      M && m.a.set(Z + ':renderPopupFn', q(u, c));
                                      var s = h.a.app.main.removalPollInterval;
                                      Object(S.a)(o, s)
                                        .then(function () {
                                          H(g.c.MAIN_IFRAME_REMOVED)(n), r.destroy();
                                          try {
                                            i &&
                                              i.parentNode &&
                                              (i.parentNode.removeChild(i), H(g.c.FULLSCREEN_IFRAME_AUTO_REMOVED)(i)),
                                              c.destroy();
                                          } catch (e) {
                                            H(g.c.FULLSCREEN_IFRAME_AUTO_REMOVAL_FAILED)(i);
                                          }
                                        })
                                        .catch(function (e) {
                                          H(g.c.MAIN_IFRAME_REMOVAL_POLL_FAILED)(n);
                                        });
                                    })
                                    .catch(function (e) {
                                      r.send(k('error'));
                                    });
                              }, h.a.app.fullscreen.creationDelay),
                              r
                            );
                          },
                          function () {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            throw (H(g.c.MAIN_IFRAME_TIMED_OUT)(e), e);
                          }
                        )
                      )
                    );
                  case 21:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this
          );
        })
      );
      return e;
    })();
    var k = function (e) {
      return { action: 'setFullscreenStatus', status: e };
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(12),
      o = n(3),
      i = n(33),
      a = function () {
        return r.b.isSupported() && r.b.isFeatureSupported(r.a.APPLICATION_FOREGROUND);
      },
      c = function (e) {
        var t = e.id,
          n = e.sessionID;
        return !!o.a.get(t + ':' + n + ':shoppingBrowser:handshakeResponse');
      },
      u = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.experiments,
          n = void 0 === t ? {} : t,
          r = e.id,
          o = e.sessionID;
        try {
          var u = Object(i.c)(n, 'native-3ds2-support-disabled');
          if ('all' === u) return !1;
          return (
            (function () {
              return 'in-app-sdk' !== u && a();
            })() ||
            (function () {
              return 'shopping-browser' !== u && c({ id: r, sessionID: o });
            })()
          );
        } catch (e) {
          return !1;
        }
      };
    t.a = u;
  },
  function (e, t, n) {
    var r = n(42);
    e.exports = Object('z').propertyIsEnumerable(0)
      ? Object
      : function (e) {
          return 'String' == r(e) ? e.split('') : Object(e);
        };
  },
  function (e, t) {
    e.exports = function (e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e;
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(43),
      o = n(4),
      i = n(80),
      a = n(23),
      c = n(34),
      u = n(163),
      s = n(46),
      f = n(116),
      l = n(6)('iterator'),
      d = !([].keys && 'next' in [].keys()),
      p = function () {
        return this;
      };
    e.exports = function (e, t, n, h, v, y, g) {
      u(n, t, h);
      var _,
        m,
        E,
        b = function (e) {
          if (!d && e in S) return S[e];
          switch (e) {
            case 'keys':
            case 'values':
              return function () {
                return new n(this, e);
              };
          }
          return function () {
            return new n(this, e);
          };
        },
        w = t + ' Iterator',
        A = 'values' == v,
        O = !1,
        S = e.prototype,
        R = S[l] || S['@@iterator'] || (v && S[v]),
        I = R || b(v),
        T = v ? (A ? b('entries') : I) : void 0,
        k = 'Array' == t ? S.entries || R : R;
      if (
        (k &&
          (E = f(k.call(new e()))) !== Object.prototype &&
          E.next &&
          (s(E, w, !0), r || 'function' == typeof E[l] || a(E, l, p)),
        A &&
          R &&
          'values' !== R.name &&
          ((O = !0),
          (I = function () {
            return R.call(this);
          })),
        (r && !g) || (!d && !O && S[l]) || a(S, l, I),
        (c[t] = I),
        (c[w] = p),
        v)
      )
        if (((_ = { values: A ? I : b('values'), keys: y ? I : b('keys'), entries: T }), g))
          for (m in _) m in S || i(S, m, _[m]);
        else o(o.P + o.F * (d || O), t, _);
      return _;
    };
  },
  function (e, t, n) {
    var r = n(8),
      o = n(5).document,
      i = r(o) && r(o.createElement);
    e.exports = function (e) {
      return i ? o.createElement(e) : {};
    };
  },
  function (e, t, n) {
    var r = n(8);
    e.exports = function (e, t) {
      if (!r(e)) return e;
      var n, o;
      if (t && 'function' == typeof (n = e.toString) && !r((o = n.call(e)))) return o;
      if ('function' == typeof (n = e.valueOf) && !r((o = n.call(e)))) return o;
      if (!t && 'function' == typeof (n = e.toString) && !r((o = n.call(e)))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  },
  function (e, t, n) {
    e.exports = n(23);
  },
  function (e, t) {
    var n = Math.ceil,
      r = Math.floor;
    e.exports = function (e) {
      return isNaN((e = +e)) ? 0 : (e > 0 ? r : n)(e);
    };
  },
  function (e, t, n) {
    var r = n(83)('keys'),
      o = n(58);
    e.exports = function (e) {
      return r[e] || (r[e] = o(e));
    };
  },
  function (e, t, n) {
    var r = n(0),
      o = n(5),
      i = o['__core-js_shared__'] || (o['__core-js_shared__'] = {});
    (e.exports = function (e, t) {
      return i[e] || (i[e] = void 0 !== t ? t : {});
    })('versions', []).push({
      version: r.version,
      mode: n(43) ? 'pure' : 'global',
      copyright: 'Â© 2019 Denis Pushkarev (zloirock.ru)',
    });
  },
  function (e, t) {
    e.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(
      ','
    );
  },
  function (e, t, n) {
    var r = n(59),
      o = n(6)('iterator'),
      i = n(34);
    e.exports = n(0).getIteratorMethod = function (e) {
      if (void 0 != e) return e[o] || e['@@iterator'] || i[r(e)];
    };
  },
  function (e, t) {
    t.f = Object.getOwnPropertySymbols;
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t, n;
      (this.promise = new e(function (e, r) {
        if (void 0 !== t || void 0 !== n) throw TypeError('Bad Promise constructor');
        (t = e), (n = r);
      })),
        (this.resolve = o(t)),
        (this.reject = o(n));
    }
    var o = n(44);
    e.exports.f = function (e) {
      return new r(e);
    };
  },
  function (e, t, n) {
    'use strict';
    var r = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      o = function () {
        return r.replace(/[xy]/g, function (e) {
          var t = (16 * Math.random()) | 0;
          return ('x' === e ? t : (3 & t) | 8).toString(16);
        });
      };
    t.a = o;
  },
  function (e, t, n) {
    var r = n(4),
      o = n(0),
      i = n(27);
    e.exports = function (e, t) {
      var n = (o.Object || {})[e] || Object[e],
        a = {};
      (a[e] = t(n)),
        r(
          r.S +
            r.F *
              i(function () {
                n(1);
              }),
          'Object',
          a
        );
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(61),
      o = n.n(r),
      i = n(197),
      a = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window,
          n = Object(i.a)();
        return o()(t, n, { value: e }), n;
      };
    t.a = a;
  },
  function (e, t, n) {
    'use strict';
    var r = n(50);
    t.a = {
      minimumSupportedNativeVersion: { year: 21, week: 11 },
      features: {
        checkBeforeSend: [{ name: r.a.AUTH_REQUEST }],
        alwaysSend: [{ name: r.a.DEAL_REQUEST, minimumSupportedNativeVersion: { year: 21, week: 22 } }],
        handshake: { name: r.a.BROWSER_INFO_HANDSHAKE, minimumSupportedNativeVersion: { year: 21, week: 46 } },
      },
      handshakeTimeout: 1e3,
      sendFeatureMessagesTimeout: 100,
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(130),
      o = function (e, t) {
        return 'development' === e || /^.+\.klarna\.net$/.test(t.location.hostname);
      },
      i = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments[1],
          n = arguments[2];
        if (o(t, n)) return !0;
        var i = Object(r.b)(n),
          a = i.year,
          c = i.week,
          u = a === e.year && c >= e.week;
        return a > e.year || u;
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.region,
        n = void 0 === t ? '' : t,
        r = e.sessionID;
      return 'krn:kp-' + n.toLowerCase() + ':session:' + r;
    };
    t.a = r;
  },
  function (e, t, n) {
    e.exports = { default: n(207), __esModule: !0 };
  },
  function (e, t, n) {
    var r = n(47),
      o = n(45),
      i = n(22),
      a = n(79),
      c = n(24),
      u = n(113),
      s = Object.getOwnPropertyDescriptor;
    t.f = n(14)
      ? s
      : function (e, t) {
          if (((e = i(e)), (t = a(t, !0)), u))
            try {
              return s(e, t);
            } catch (e) {}
          if (c(e, t)) return o(!r.f.call(e, t), e[t]);
        };
  },
  function (e, t, n) {
    e.exports = { default: n(212), __esModule: !0 };
  },
  function (e, t, n) {
    t.f = n(6);
  },
  function (e, t, n) {
    e.exports = { default: n(213), __esModule: !0 };
  },
  function (e, t, n) {
    var r = n(5),
      o = n(0),
      i = n(43),
      a = n(97),
      c = n(16).f;
    e.exports = function (e) {
      var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
      '_' == e.charAt(0) || e in t || c(t, e, { value: a.f(e) });
    };
  },
  function (e, t, n) {
    'use strict';
    var r = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
      return e.top !== e;
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(5),
      o = n(4),
      i = n(51),
      a = n(27),
      c = n(23),
      u = n(64),
      s = n(37),
      f = n(63),
      l = n(8),
      d = n(46),
      p = n(16).f,
      h = n(102)(0),
      v = n(14);
    e.exports = function (e, t, n, y, g, _) {
      var m = r[e],
        E = m,
        b = g ? 'set' : 'add',
        w = E && E.prototype,
        A = {};
      return (
        v &&
        'function' == typeof E &&
        (_ ||
          (w.forEach &&
            !a(function () {
              new E().entries().next();
            })))
          ? ((E = t(function (t, n) {
              f(t, E, e, '_c'), (t._c = new m()), void 0 != n && s(n, g, t[b], t);
            })),
            h('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (e) {
              var t = 'add' == e || 'set' == e;
              e in w &&
                (!_ || 'clear' != e) &&
                c(E.prototype, e, function (n, r) {
                  if ((f(this, E, e), !t && _ && !l(n))) return 'get' == e && void 0;
                  var o = this._c[e](0 === n ? 0 : n, r);
                  return t ? this : o;
                });
            }),
            _ ||
              p(E.prototype, 'size', {
                get: function () {
                  return this._c.size;
                },
              }))
          : ((E = y.getConstructor(t, e, g, b)), u(E.prototype, n), (i.NEED = !0)),
        d(E, e),
        (A[e] = E),
        o(o.G + o.W + o.F, A),
        _ || y.setStrong(E, e, g),
        E
      );
    };
  },
  function (e, t, n) {
    var r = n(19),
      o = n(75),
      i = n(28),
      a = n(57),
      c = n(236);
    e.exports = function (e, t) {
      var n = 1 == e,
        u = 2 == e,
        s = 3 == e,
        f = 4 == e,
        l = 6 == e,
        d = 5 == e || l,
        p = t || c;
      return function (t, c, h) {
        for (
          var v, y, g = i(t), _ = o(g), m = r(c, h, 3), E = a(_.length), b = 0, w = n ? p(t, E) : u ? p(t, 0) : void 0;
          E > b;
          b++
        )
          if ((d || b in _) && ((v = _[b]), (y = m(v, b, g)), e))
            if (n) w[b] = y;
            else if (y)
              switch (e) {
                case 3:
                  return !0;
                case 5:
                  return v;
                case 6:
                  return b;
                case 2:
                  w.push(v);
              }
            else if (f) return !1;
        return l ? -1 : s || f ? f : w;
      };
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(4);
    e.exports = function (e) {
      r(r.S, e, {
        of: function () {
          for (var e = arguments.length, t = new Array(e); e--; ) t[e] = arguments[e];
          return new this(t);
        },
      });
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(4),
      o = n(44),
      i = n(19),
      a = n(37);
    e.exports = function (e) {
      r(r.S, e, {
        from: function (e) {
          var t,
            n,
            r,
            c,
            u = arguments[1];
          return (
            o(this),
            (t = void 0 !== u),
            t && o(u),
            void 0 == e
              ? new this()
              : ((n = []),
                t
                  ? ((r = 0),
                    (c = i(u, arguments[2], 2)),
                    a(e, !1, function (e) {
                      n.push(c(e, r++));
                    }))
                  : a(e, !1, n.push, n),
                new this(n))
          );
        },
      });
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return 'variate-1' === Object(o.c)(e, 'one-purchase-flow');
    }
    t.a = r;
    var o = n(33);
  },
  function (e, t, n) {
    'use strict';
    var r = n(9),
      o = r.a.app.staticPaymentMethod(),
      i = o.supportedPaymentMethodCategories,
      a = function (e) {
        return i.indexOf(e) > -1;
      },
      c = function (e, t) {
        return a(e)
          ? e
          : 'string' == typeof t && a(t)
          ? t
          : Array.isArray(t) && 1 === t.length && a(t[0])
          ? t[0]
          : i[0];
      };
    t.a = c;
  },
  function (e, t, n) {
    'use strict';
    var r = n(143),
      o = n(108),
      i = function (e, t) {
        return function (n) {
          return Object(o.a)(e + ':' + r.c, n, t);
        };
      },
      a = function (e, t) {
        return function () {
          return Object(o.a)(e + ':' + r.b, t);
        };
      },
      c = function (e, t) {
        return function () {
          return Object(o.a)(e + ':' + r.a, t);
        };
      },
      u = function (e, t) {
        return function (n) {
          return Object(o.a)(e + ':' + r.d, n, t);
        };
      },
      s = function (e, t) {
        return function () {
          return Object(o.a)(e + ':' + r.g, t);
        };
      },
      f = function (e, t) {
        return function () {
          return Object(o.a)(e + ':' + r.f, t);
        };
      },
      l = function (e, t) {
        return function () {
          return Object(o.a)(e + ':' + r.e, t);
        };
      },
      d = function (e, t) {
        return {
          heightChanged: i(e, t),
          fullscreenOverlayShown: a(e, t),
          fullscreenOverlayHidden: c(e, t),
          paymentMethodSelected: u(e, t),
          userAccountLoginRequested: s(e, t),
          userAccountLoginReady: f(e, t),
          userAccountLoginLoggedIn: l(e, t),
        };
      };
    t.a = d;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      u.on(e, t);
    }
    function o(e, t) {
      u.removeListener(e, t);
    }
    function i(e) {
      for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
      u.emit.apply(u, [e].concat(n));
    }
    (t.c = r), (t.b = o), (t.a = i);
    var a = n(144),
      c = n.n(a),
      u = new c.a();
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return r;
    }),
      n.d(t, 'a', function () {
        return o;
      }),
      n.d(t, 'c', function () {
        return i;
      });
    var r;
    !(function (e) {
      (e.FROM_PGW = '3rd_party_pm_event_from_pgw'),
        (e.TO_PGW = '3rd_party_pm_event_to_pgw'),
        (e.AP_TOKEN_COLLECTED = 'AP_TOKEN_COLLECTED'),
        (e.AP_TOKEN_COLLECTION_FAILED = 'AP_TOKEN_COLLECTION_FAILED'),
        (e.AP_PAYMENT_REQUEST = 'AP_PAYMENT_REQUEST'),
        (e.AP_ERROR = 'AP_ERROR'),
        (e.GP_PAYMENT_REQUEST = 'GP_PAYMENT_REQUEST'),
        (e.GP_TOKEN_COLLECTED = 'GP_TOKEN_COLLECTED'),
        (e.GP_TOKEN_COLLECTION_FAILED = 'GP_TOKEN_COLLECTION_FAILED'),
        (e.GP_ERROR = 'GP_ERROR');
    })(r || (r = {}));
    var o;
    !(function (e) {
      (e.AP_INITIAL_SYNC = 'ap_initial_sync_pay'),
        (e.AP_INITIAL_SYNC_RES = 'ap_initial_sync_parent'),
        (e.AP_PAYMENT_REQUEST = 'ap_payment_request'),
        (e.AP_MERCHANT_VALIDATION = 'ap_validate_merchant'),
        (e.AP_MERCHANT_VALIDATION_RES = 'merchant_validation_response'),
        (e.AP_SEND_TOKEN = 'ap_token'),
        (e.AP_CANCEL = 'ap_cancel'),
        (e.AP_ERROR = 'ap_error'),
        (e.GP_PAYMENT_REQUEST = 'gp_payment_request'),
        (e.GP_SEND_TOKEN = 'gp_token'),
        (e.GP_CANCEL = 'gp_cancel'),
        (e.GP_ERROR = 'gp_error');
    })(o || (o = {}));
    var i;
    !(function (e) {
      (e.APPLE_PAY = 'apple_pay'), (e.GOOGLE_PAY = 'google_pay');
    })(i || (i = {}));
    var a;
    !(function (e) {
      (e.PAYMENT_REQUEST = 'PAYMENT_REQUEST'),
        (e.TOKEN_COLLECTED = 'TOKEN_COLLECTED'),
        (e.TOKEN_COLLECTION_FAILED = 'TOKEN_COLLECTION_FAILED'),
        (e.ERROR = 'ERROR');
    })(a || (a = {}));
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return r;
    }),
      n.d(t, 'b', function () {
        return o;
      });
    var r = function (e) {
        var t;
        return (
          (null === (t = null === e || void 0 === e ? void 0 : e.ownerDocument) || void 0 === t
            ? void 0
            : t.defaultView) || window
        );
      },
      o = function () {
        return (
          (null === window || void 0 === window ? void 0 : window.ApplePaySession) && ApplePaySession.canMakePayments()
        );
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(100),
      o = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
        if (!Object(r.a)(e))
          try {
            return e.location.hostname;
          } catch (e) {}
      };
    t.a = o;
  },
  function (e, t) {
    e.exports = function (e, t) {
      return { value: t, done: !!e };
    };
  },
  function (e, t, n) {
    e.exports =
      !n(14) &&
      !n(27)(function () {
        return (
          7 !=
          Object.defineProperty(n(78)('div'), 'a', {
            get: function () {
              return 7;
            },
          }).a
        );
      });
  },
  function (e, t, n) {
    var r = n(24),
      o = n(22),
      i = n(165)(!1),
      a = n(82)('IE_PROTO');
    e.exports = function (e, t) {
      var n,
        c = o(e),
        u = 0,
        s = [];
      for (n in c) n != a && r(c, n) && s.push(n);
      for (; t.length > u; ) r(c, (n = t[u++])) && (~i(s, n) || s.push(n));
      return s;
    };
  },
  function (e, t, n) {
    var r = n(5).document;
    e.exports = r && r.documentElement;
  },
  function (e, t, n) {
    var r = n(24),
      o = n(28),
      i = n(82)('IE_PROTO'),
      a = Object.prototype;
    e.exports =
      Object.getPrototypeOf ||
      function (e) {
        return (
          (e = o(e)),
          r(e, i)
            ? e[i]
            : 'function' == typeof e.constructor && e instanceof e.constructor
            ? e.constructor.prototype
            : e instanceof Object
            ? a
            : null
        );
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(14),
      o = n(35),
      i = n(86),
      a = n(47),
      c = n(28),
      u = n(75),
      s = Object.assign;
    e.exports =
      !s ||
      n(27)(function () {
        var e = {},
          t = {},
          n = Symbol(),
          r = 'abcdefghijklmnopqrst';
        return (
          (e[n] = 7),
          r.split('').forEach(function (e) {
            t[e] = e;
          }),
          7 != s({}, e)[n] || Object.keys(s({}, t)).join('') != r
        );
      })
        ? function (e, t) {
            for (var n = c(e), s = arguments.length, f = 1, l = i.f, d = a.f; s > f; )
              for (var p, h = u(arguments[f++]), v = l ? o(h).concat(l(h)) : o(h), y = v.length, g = 0; y > g; )
                (p = v[g++]), (r && !d.call(h, p)) || (n[p] = h[p]);
            return n;
          }
        : s;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return i;
    }),
      n.d(t, 'd', function () {
        return a;
      }),
      n.d(t, 'c', function () {
        return c;
      }),
      n.d(t, 'b', function () {
        return u;
      });
    var r = n(119),
      o = function (e) {
        return function (t) {
          return 'klarna-' + Object(r.a)(t) + '-' + e;
        };
      },
      i = o('fullscreen'),
      a = o('static'),
      c = o('popup'),
      u = o('main');
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return e.replace(/_/g, '-').toLowerCase();
    };
    t.a = r;
  },
  function (e, t, n) {
    var r = n(17);
    e.exports = function (e, t, n, o) {
      try {
        return o ? t(r(n)[0], n[1]) : t(n);
      } catch (t) {
        var i = e.return;
        throw (void 0 !== i && r(i.call(e)), t);
      }
    };
  },
  function (e, t, n) {
    var r = n(34),
      o = n(6)('iterator'),
      i = Array.prototype;
    e.exports = function (e) {
      return void 0 !== e && (r.Array === e || i[o] === e);
    };
  },
  function (e, t, n) {
    var r = n(6)('iterator'),
      o = !1;
    try {
      var i = [7][r]();
      (i.return = function () {
        o = !0;
      }),
        Array.from(i, function () {
          throw 2;
        });
    } catch (e) {}
    e.exports = function (e, t) {
      if (!t && !o) return !1;
      var n = !1;
      try {
        var i = [7],
          a = i[r]();
        (a.next = function () {
          return { done: (n = !0) };
        }),
          (i[r] = function () {
            return a;
          }),
          e(i);
      } catch (e) {}
      return n;
    };
  },
  function (e, t, n) {
    var r = n(17),
      o = n(44),
      i = n(6)('species');
    e.exports = function (e, t) {
      var n,
        a = r(e).constructor;
      return void 0 === a || void 0 == (n = r(a)[i]) ? t : o(n);
    };
  },
  function (e, t, n) {
    var r,
      o,
      i,
      a = n(19),
      c = n(188),
      u = n(115),
      s = n(78),
      f = n(5),
      l = f.process,
      d = f.setImmediate,
      p = f.clearImmediate,
      h = f.MessageChannel,
      v = f.Dispatch,
      y = 0,
      g = {},
      _ = function () {
        var e = +this;
        if (g.hasOwnProperty(e)) {
          var t = g[e];
          delete g[e], t();
        }
      },
      m = function (e) {
        _.call(e.data);
      };
    (d && p) ||
      ((d = function (e) {
        for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
        return (
          (g[++y] = function () {
            c('function' == typeof e ? e : Function(e), t);
          }),
          r(y),
          y
        );
      }),
      (p = function (e) {
        delete g[e];
      }),
      'process' == n(42)(l)
        ? (r = function (e) {
            l.nextTick(a(_, e, 1));
          })
        : v && v.now
        ? (r = function (e) {
            v.now(a(_, e, 1));
          })
        : h
        ? ((o = new h()), (i = o.port2), (o.port1.onmessage = m), (r = a(i.postMessage, i, 1)))
        : f.addEventListener && 'function' == typeof postMessage && !f.importScripts
        ? ((r = function (e) {
            f.postMessage(e + '', '*');
          }),
          f.addEventListener('message', m, !1))
        : (r =
            'onreadystatechange' in s('script')
              ? function (e) {
                  u.appendChild(s('script')).onreadystatechange = function () {
                    u.removeChild(this), _.call(e);
                  };
                }
              : function (e) {
                  setTimeout(a(_, e, 1), 0);
                })),
      (e.exports = { set: d, clear: p });
  },
  function (e, t) {
    e.exports = function (e) {
      try {
        return { e: !1, v: e() };
      } catch (e) {
        return { e: !0, v: e };
      }
    };
  },
  function (e, t, n) {
    var r = n(17),
      o = n(8),
      i = n(87);
    e.exports = function (e, t) {
      if ((r(e), o(t) && t.constructor === e)) return t;
      var n = i.f(e);
      return (0, n.resolve)(t), n.promise;
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(5),
      o = n(0),
      i = n(16),
      a = n(14),
      c = n(6)('species');
    e.exports = function (e) {
      var t = 'function' == typeof o[e] ? o[e] : r[e];
      a &&
        t &&
        !t[c] &&
        i.f(t, c, {
          configurable: !0,
          get: function () {
            return this;
          },
        });
    };
  },
  function (e, t, n) {
    'use strict';
    var r = function (e, t) {
        return e[t].bind(e);
      },
      o = function (e, t) {
        return (
          t.webkit &&
          t.webkit.messageHandlers &&
          t.webkit.messageHandlers.AsyncJavaScriptHandler &&
          'function' == typeof t.webkit.messageHandlers.AsyncJavaScriptHandler[e] &&
          r(t.webkit.messageHandlers.AsyncJavaScriptHandler, e)
        );
      },
      i = function (e, t) {
        return (
          t.WCJavaScriptHandlerInterface &&
          'function' == typeof t.WCJavaScriptHandlerInterface[e] &&
          r(t.WCJavaScriptHandlerInterface, e)
        );
      },
      a = function (e, t) {
        return o(e, t) || i(e, t);
      },
      c = function (e) {
        return o('postMessage', e) || i('handleMessage', e);
      },
      u = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
        return e ? a(e, t) : c(t);
      };
    t.a = u;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return a;
    });
    var r = n(1),
      o = n.n(r),
      i = function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
        return new o.a(function (r) {
          return n.setTimeout(r, e, t);
        });
      },
      a = function (e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : window;
        return function () {
          return o.a.race([i(t, n, r), e.apply(void 0, arguments)]);
        };
      };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return c;
    }),
      n.d(t, 'a', function () {
        return u;
      });
    var r = n(15),
      o = n.n(r),
      i = /Klarna\/((\d+)\.(\d+)\.(\d+))/,
      a = function (e) {
        return (e.navigator && e.navigator.userAgent) || '';
      },
      c = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window,
          t = a(e),
          n = t.match(i) || [],
          r = o()(n, 5),
          c = r[0],
          u = r[1],
          s = r[2],
          f = r[3],
          l = r[4];
        return c ? { fullVersion: u, year: Number(s), week: Number(f), build: Number(l) } : {};
      },
      u = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
        return c(e).fullVersion;
      };
  },
  function (e, t, n) {
    var r = n(42);
    e.exports =
      Array.isArray ||
      function (e) {
        return 'Array' == r(e);
      };
  },
  function (e, t, n) {
    var r = n(114),
      o = n(84).concat('length', 'prototype');
    t.f =
      Object.getOwnPropertyNames ||
      function (e) {
        return r(e, o);
      };
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      n.d(t, 'API_SETUP', function () {
        return r;
      }),
      n.d(t, 'INITIALIZED_FLAG_READ', function () {
        return o;
      }),
      n.d(t, 'AUTHORIZE_CALLED', function () {
        return i;
      }),
      n.d(t, 'AUTHORIZE_COMPLETED', function () {
        return a;
      }),
      n.d(t, 'AUTHORIZE_FAILED', function () {
        return c;
      }),
      n.d(t, 'FULLSCREEN_IFRAME_CREATED', function () {
        return u;
      }),
      n.d(t, 'FULLSCREEN_IFRAME_LOADED', function () {
        return s;
      }),
      n.d(t, 'FULLSCREEN_IFRAME_TIMED_OUT', function () {
        return f;
      }),
      n.d(t, 'FULLSCREEN_IFRAME_AUTO_REMOVED', function () {
        return l;
      }),
      n.d(t, 'FULLSCREEN_IFRAME_AUTO_REMOVAL_FAILED', function () {
        return d;
      }),
      n.d(t, 'INIT_CALLED', function () {
        return p;
      }),
      n.d(t, 'LOAD_CALLED', function () {
        return h;
      }),
      n.d(t, 'LOAD_COMPLETED', function () {
        return v;
      }),
      n.d(t, 'LOAD_FAILED', function () {
        return y;
      }),
      n.d(t, 'LOAD_NATIVE_HOOK_API_HANDSHAKE_WAIT_STARTED', function () {
        return g;
      }),
      n.d(t, 'LOAD_NATIVE_HOOK_API_HANDSHAKE_WAIT_FINISHED', function () {
        return _;
      }),
      n.d(t, 'LOAD_NATIVE_HOOK_API_HANDSHAKE_WAIT_TIMED_OUT', function () {
        return m;
      }),
      n.d(t, 'LOAD_PAYMENT_REVIEW_CALLED', function () {
        return E;
      }),
      n.d(t, 'LOAD_PAYMENT_REVIEW_COMPLETED', function () {
        return b;
      }),
      n.d(t, 'LOAD_PAYMENT_REVIEW_FAILED', function () {
        return w;
      }),
      n.d(t, 'MAIN_IFRAME_CREATED', function () {
        return A;
      }),
      n.d(t, 'MAIN_IFRAME_LOADED', function () {
        return O;
      }),
      n.d(t, 'MAIN_IFRAME_VISIBLE', function () {
        return S;
      }),
      n.d(t, 'MAIN_IFRAME_TIMED_OUT', function () {
        return R;
      }),
      n.d(t, 'MAIN_IFRAME_REMOVED', function () {
        return I;
      }),
      n.d(t, 'MAIN_IFRAME_REMOVAL_POLL_FAILED', function () {
        return T;
      }),
      n.d(t, 'NATIVE_HOOK_API_APPLICATION_FOREGROUNDED', function () {
        return k;
      }),
      n.d(t, 'DEVICE_RECOGNITION_IFRAME_CREATED', function () {
        return L;
      }),
      n.d(t, 'DEVICE_RECOGNITION_IFRAME_LOADED', function () {
        return P;
      }),
      n.d(t, 'DEVICE_RECOGNITION_IFRAME_TIMED_OUT', function () {
        return C;
      }),
      n.d(t, 'REAUTHORIZE_CALLED', function () {
        return x;
      }),
      n.d(t, 'REAUTHORIZE_COMPLETED', function () {
        return N;
      }),
      n.d(t, 'REAUTHORIZE_FAILED', function () {
        return D;
      }),
      n.d(t, 'FINALIZE_CALLED', function () {
        return j;
      }),
      n.d(t, 'FINALIZE_COMPLETED', function () {
        return M;
      }),
      n.d(t, 'FINALIZE_FAILED', function () {
        return F;
      }),
      n.d(t, 'SHOW_FULLSCREEN', function () {
        return U;
      }),
      n.d(t, 'HIDE_FULLSCREEN', function () {
        return H;
      }),
      n.d(t, 'ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED', function () {
        return B;
      }),
      n.d(t, 'ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_COMPLETED', function () {
        return K;
      }),
      n.d(t, 'ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_ERROR', function () {
        return W;
      }),
      n.d(t, 'ON_SHOW_EXTERNAL_DOCUMENT_HANDLER_CALLED', function () {
        return G;
      }),
      n.d(t, 'ON_SHOW_EXTERNAL_DOCUMENT_FALLBACK_CALLED', function () {
        return V;
      }),
      n.d(t, 'ON_REDIRECT_HANDLER_CALLED', function () {
        return Y;
      }),
      n.d(t, 'REDIRECT', function () {
        return z;
      }),
      n.d(t, 'REDIRECT_FAILED', function () {
        return J;
      }),
      n.d(t, 'AUTHORIZE_UNEXPECTED_ERROR', function () {
        return q;
      }),
      n.d(t, 'INVALID_CLIENT_TOKEN_SIGNATURE', function () {
        return Z;
      }),
      n.d(t, 'INVALID_BASE_URL', function () {
        return Q;
      }),
      n.d(t, 'PAGE_ALREADY_LOADED', function () {
        return X;
      }),
      n.d(t, 'PAGE_LOADED', function () {
        return $;
      }),
      n.d(t, 'CHECK_ENABLED_WALLETS', function () {
        return ee;
      }),
      n.d(t, 'CHECK_ENABLED_WALLETS_FINISHED', function () {
        return te;
      }),
      n.d(t, 'CHECK_ENABLED_WALLETS_ERROR', function () {
        return ne;
      }),
      n.d(t, 'SHOW_WALLET_PAYMENT_SHEET', function () {
        return re;
      }),
      n.d(t, 'SHOW_WALLET_PAYMENT_SHEET_FINISHED', function () {
        return oe;
      }),
      n.d(t, 'SHOW_WALLET_PAYMENT_SHEET_ERROR', function () {
        return ie;
      }),
      n.d(t, 'POPUP_WINDOW_OPENED', function () {
        return ae;
      }),
      n.d(t, 'POPUP_WINDOW_READY', function () {
        return ce;
      }),
      n.d(t, 'POPUP_WINDOW_CLOSED', function () {
        return ue;
      }),
      n.d(t, 'POPUP_WINDOW_ERROR', function () {
        return se;
      }),
      n.d(t, 'SHOPPING_BROWSER_NATIVE_API_INIT', function () {
        return fe;
      }),
      n.d(t, 'SHOPPING_BROWSER_NATIVE_API_INIT_COMPLETED', function () {
        return le;
      }),
      n.d(t, 'SHOPPING_BROWSER_NATIVE_API_INIT_TIMED_OUT', function () {
        return de;
      }),
      n.d(t, 'SHOPPING_BROWSER_NATIVE_API_ERROR', function () {
        return pe;
      }),
      n.d(t, 'ONE_OFFERING_STATIC_FETCH_STARTED', function () {
        return he;
      }),
      n.d(t, 'ONE_OFFERING_STATIC_FETCH_COMPLETED', function () {
        return ve;
      }),
      n.d(t, 'ONE_OFFERING_STATIC_FETCH_ABORTED', function () {
        return ye;
      }),
      n.d(t, 'ONE_OFFERING_STATIC_FETCH_ERROR', function () {
        return ge;
      }),
      n.d(t, 'ONE_OFFERING_STATIC_IFRAME_STYLES_ERROR', function () {
        return _e;
      }),
      n.d(t, 'ONE_OFFERING_STATIC_API_CALLED', function () {
        return me;
      }),
      n.d(t, 'ONE_OFFERING_CREATE_IFRAME_ERROR', function () {
        return Ee;
      }),
      n.d(t, 'APF_UNHANDLED_ERROR', function () {
        return be;
      }),
      n.d(t, 'APF_ABORTED', function () {
        return we;
      }),
      n.d(t, 'APF_COMPLETED', function () {
        return Ae;
      }),
      n.d(t, 'APF_LIB_FETCH_STARTED', function () {
        return Oe;
      }),
      n.d(t, 'APF_LIB_FETCH_COMPLETED', function () {
        return Se;
      }),
      n.d(t, 'APF_LIB_FETCH_ERROR', function () {
        return Re;
      }),
      n.d(t, 'APF_LIB_FETCH_FALLBACK', function () {
        return Ie;
      }),
      n.d(t, 'APF_LIB_UNAVAILABLE', function () {
        return Te;
      }),
      n.d(t, 'APF_TRIGGERED', function () {
        return ke;
      }),
      n.d(t, 'REDIRECT_URL_VALIDATION_FAILED', function () {
        return Le;
      }),
      n.d(t, 'CSP_VIOLATION', function () {
        return Pe;
      }),
      n.d(t, 'CSP_VIOLATION_REGISTRATION_FAILED', function () {
        return Ce;
      });
    var r = 'api_setup',
      o = 'initialized_flag_read',
      i = 'authorize_called',
      a = 'authorize_completed',
      c = 'authorize_failed',
      u = 'fullscreen_iframe_created',
      s = 'fullscreen_iframe_loaded',
      f = 'fullscreen_iframe_timed_out',
      l = 'fullscreen_iframe_auto_removed',
      d = 'fullscreen_iframe_auto_removal_failed',
      p = 'init_called',
      h = 'load_called',
      v = 'load_completed',
      y = 'load_failed',
      g = 'load_nhapi_handshake_wait_started',
      _ = 'load_nhapi_handshake_wait_finished',
      m = 'load_nhapi_handshake_wait_timed_out',
      E = 'load_payment_review_called',
      b = 'load_payment_review_completed',
      w = 'load_payment_review_failed',
      A = 'main_iframe_created',
      O = 'main_iframe_loaded',
      S = 'main_iframe_visible',
      R = 'main_iframe_timed_out',
      I = 'main_iframe_removed',
      T = 'main_iframe_removal_poll_failed',
      k = 'nhapi_application_foregrounded',
      L = 'dr_iframe_created',
      P = 'dr_iframe_loaded',
      C = 'dr_iframe_timed_out',
      x = 'reauthorize_called',
      N = 'reauthorize_completed',
      D = 'reauthorize_failed',
      j = 'finalize_called',
      M = 'finalize_completed',
      F = 'finalize_failed',
      U = 'show_fullscreen',
      H = 'hide_fullscreen',
      B = 'lib_on_pgw_third_party_challenge_requested',
      K = 'lib_on_pgw_third_party_challenge_requested_completed',
      W = 'lib_on_pgw_third_party_challenge_requested_error',
      G = 'on_show_external_document_handler_called',
      V = 'on_show_external_document_fallback_called',
      Y = 'on_redirect_handler_called',
      z = 'redirect',
      J = 'redirect_failed',
      q = 'authorize_unexpected_error',
      Z = 'invalid_client_token_signature',
      Q = 'invalid_lib_base_url',
      X = 'page_already_loaded',
      $ = 'page_loaded',
      ee = 'check_enabled_wallets',
      te = 'check_enabled_wallets_finished',
      ne = 'check_enabled_wallets_error',
      re = 'show_wallet_payment_sheet',
      oe = 'show_wallet_payment_sheet_finished',
      ie = 'show_wallet_payment_sheet_error',
      ae = 'popup_window_opened',
      ce = 'popup_window_ready',
      ue = 'popup_window_closed',
      se = 'popup_window_error',
      fe = 'sbnapi_init',
      le = 'sbnapi_init_completed',
      de = 'sbnapi_init_timed_out',
      pe = 'sbnapi_error',
      he = 'one_offering_static_fetch_started',
      ve = 'one_offering_static_fetch_completed',
      ye = 'one_offering_static_fetch_aborted',
      ge = 'one_offering_static_fetch_error',
      _e = 'one_offering_static_iframe_styles_error',
      me = 'one_offering_static_api_called',
      Ee = 'one_offering_create_iframe_error',
      be = 'apf_unhandled_error',
      we = 'apf_aborted',
      Ae = 'apf_completed',
      Oe = 'apf_lib_fetch_started',
      Se = 'apf_lib_fetch_completed',
      Re = 'apf_lib_fetch_error',
      Ie = 'apf_lib_fetch_fallback',
      Te = 'apf_lib_unavailable',
      ke = 'apf_triggered',
      Le = 'redirect_url_validation_failed',
      Pe = 'csp_violation',
      Ce = 'csp_violation_registration_failed';
  },
  function (e, t, n) {
    'use strict';
    var r = n(135),
      o = function () {
        try {
          return !!Object(r.a)('klarna-shopping-browser-session-id');
        } catch (e) {}
        return !1;
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document.cookie,
        n = t.match(new RegExp(e + '=([^;]+)'));
      if (n) return n[1];
    }
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      try {
        return window.sessionStorage.getItem(e);
      } catch (e) {}
      return null;
    };
    t.a = { get: r };
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      var n = t ? l.a.acquiringPurchaseFlow.betaLibraryPath : l.a.acquiringPurchaseFlow.libraryPath,
        r = new URL(n, e).toString();
      return Object(f.a)(r);
    }
    function o(e) {
      var t = e.id,
        n = e.sessionID,
        r = e.tracker,
        o = e.isOpf,
        i = void 0 !== o && o,
        a = p({ id: t, sessionID: n, tracker: r, isOpf: i })
          .then(function () {
            r.event(d.c.APF_LIB_FETCH_COMPLETED);
          })
          .catch(function (e) {
            r.event(d.c.APF_LIB_FETCH_ERROR, { name: e.name, message: e.message }),
              s.a.delete(t + ':' + n + ':loadApfPromise');
          });
      return r.event(d.c.APF_LIB_FETCH_STARTED), s.a.set(t + ':' + n + ':loadApfPromise', a), a;
    }
    var i = n(10),
      a = n.n(i),
      c = n(11),
      u = n.n(c),
      s = n(3),
      f = n(231),
      l = n(9),
      d = n(7),
      p = (function () {
        var e = u()(
          a.a.mark(function e(t) {
            var n,
              o,
              i,
              c = t.id,
              u = t.sessionID,
              f = t.tracker,
              p = t.isOpf;
            return a.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (
                        ((n = s.a.get(c + ':' + u + ':apfLibraryOverrideDomain')),
                        (o = l.a.acquiringPurchaseFlow.libraryBaseUrl),
                        (i = s.a.get(c + ':' + u + ':apfLibraryFallbackDomain')),
                        !n)
                      ) {
                        e.next = 5;
                        break;
                      }
                      return e.abrupt('return', r(n, p));
                    case 5:
                      return (e.prev = 5), (e.next = 8), r(o, p);
                    case 8:
                      return e.abrupt('return', e.sent);
                    case 11:
                      return (
                        (e.prev = 11),
                        (e.t0 = e.catch(5)),
                        f.event(d.c.APF_LIB_FETCH_FALLBACK, { name: e.t0.name, message: e.t0.message }),
                        e.abrupt('return', r(i, p))
                      );
                    case 15:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              this,
              [[5, 11]]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })();
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    var r = n(16).f,
      o = n(56),
      i = n(64),
      a = n(19),
      c = n(63),
      u = n(37),
      s = n(77),
      f = n(112),
      l = n(127),
      d = n(14),
      p = n(51).fastKey,
      h = n(40),
      v = d ? '_s' : 'size',
      y = function (e, t) {
        var n,
          r = p(t);
        if ('F' !== r) return e._i[r];
        for (n = e._f; n; n = n.n) if (n.k == t) return n;
      };
    e.exports = {
      getConstructor: function (e, t, n, s) {
        var f = e(function (e, r) {
          c(e, f, t, '_i'),
            (e._t = t),
            (e._i = o(null)),
            (e._f = void 0),
            (e._l = void 0),
            (e[v] = 0),
            void 0 != r && u(r, n, e[s], e);
        });
        return (
          i(f.prototype, {
            clear: function () {
              for (var e = h(this, t), n = e._i, r = e._f; r; r = r.n)
                (r.r = !0), r.p && (r.p = r.p.n = void 0), delete n[r.i];
              (e._f = e._l = void 0), (e[v] = 0);
            },
            delete: function (e) {
              var n = h(this, t),
                r = y(n, e);
              if (r) {
                var o = r.n,
                  i = r.p;
                delete n._i[r.i],
                  (r.r = !0),
                  i && (i.n = o),
                  o && (o.p = i),
                  n._f == r && (n._f = o),
                  n._l == r && (n._l = i),
                  n[v]--;
              }
              return !!r;
            },
            forEach: function (e) {
              h(this, t);
              for (var n, r = a(e, arguments.length > 1 ? arguments[1] : void 0, 3); (n = n ? n.n : this._f); )
                for (r(n.v, n.k, this); n && n.r; ) n = n.p;
            },
            has: function (e) {
              return !!y(h(this, t), e);
            },
          }),
          d &&
            r(f.prototype, 'size', {
              get: function () {
                return h(this, t)[v];
              },
            }),
          f
        );
      },
      def: function (e, t, n) {
        var r,
          o,
          i = y(e, t);
        return (
          i
            ? (i.v = n)
            : ((e._l = i = { i: (o = p(t, !0)), k: t, v: n, p: (r = e._l), n: void 0, r: !1 }),
              e._f || (e._f = i),
              r && (r.n = i),
              e[v]++,
              'F' !== o && (e._i[o] = i)),
          e
        );
      },
      getEntry: y,
      setStrong: function (e, t, n) {
        s(
          e,
          t,
          function (e, n) {
            (this._t = h(e, t)), (this._k = n), (this._l = void 0);
          },
          function () {
            for (var e = this, t = e._k, n = e._l; n && n.r; ) n = n.p;
            return e._t && (e._l = n = n ? n.n : e._t._f)
              ? 'keys' == t
                ? f(0, n.k)
                : 'values' == t
                ? f(0, n.v)
                : f(0, [n.k, n.v])
              : ((e._t = void 0), f(1));
          },
          n ? 'entries' : 'values',
          !n,
          !0
        ),
          l(t);
      },
    };
  },
  function (e, t, n) {
    var r = n(59),
      o = n(239);
    e.exports = function (e) {
      return function () {
        if (r(this) != e) throw TypeError(e + "#toJSON isn't generic");
        return o(this);
      };
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(48),
      o = n(69),
      i = n(100),
      a = function (e) {
        return e.scheme && r.a.isSupported('production') && (!Object(o.b)() || !Object(i.a)());
      };
    t.a = a;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t, n) {
      return (
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent('on' + t, n),
        function () {
          return o(e, t, n);
        }
      );
    }
    function o(e, t, n) {
      e.removeEventListener ? e.removeEventListener(t, n) : e.detachEvent('on' + t, n);
    }
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r =
        /^http(s:\/\/([\w-.]+\.)?(klarnacdn\.net|klarna\.(net|com))|(:\/\/(localhost|0.0.0.0|dev-proxy)(:\d+)?(\/|$)))/,
      o = function (e) {
        return r.test(e);
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'c', function () {
      return r;
    }),
      n.d(t, 'b', function () {
        return o;
      }),
      n.d(t, 'a', function () {
        return i;
      }),
      n.d(t, 'd', function () {
        return a;
      }),
      n.d(t, 'g', function () {
        return c;
      }),
      n.d(t, 'f', function () {
        return u;
      }),
      n.d(t, 'e', function () {
        return s;
      });
    var r = 'heightChanged',
      o = 'fullscreenOverlayShown',
      i = 'fullscreenOverlayHidden',
      a = 'paymentMethodSelected',
      c = 'userAccountLoginRequested',
      u = 'userAccountLoginReady',
      s = 'userAccountLoginLoggedIn';
  },
  function (e, t, n) {
    'use strict';
    function r() {}
    function o(e, t, n) {
      (this.fn = e), (this.context = t), (this.once = n || !1);
    }
    function i(e, t, n, r, i) {
      if ('function' != typeof n) throw new TypeError('The listener must be a function');
      var a = new o(n, r || e, i),
        c = s ? s + t : t;
      return (
        e._events[c]
          ? e._events[c].fn
            ? (e._events[c] = [e._events[c], a])
            : e._events[c].push(a)
          : ((e._events[c] = a), e._eventsCount++),
        e
      );
    }
    function a(e, t) {
      0 == --e._eventsCount ? (e._events = new r()) : delete e._events[t];
    }
    function c() {
      (this._events = new r()), (this._eventsCount = 0);
    }
    var u = Object.prototype.hasOwnProperty,
      s = '~';
    Object.create && ((r.prototype = Object.create(null)), new r().__proto__ || (s = !1)),
      (c.prototype.eventNames = function () {
        var e,
          t,
          n = [];
        if (0 === this._eventsCount) return n;
        for (t in (e = this._events)) u.call(e, t) && n.push(s ? t.slice(1) : t);
        return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
      }),
      (c.prototype.listeners = function (e) {
        var t = s ? s + e : e,
          n = this._events[t];
        if (!n) return [];
        if (n.fn) return [n.fn];
        for (var r = 0, o = n.length, i = new Array(o); r < o; r++) i[r] = n[r].fn;
        return i;
      }),
      (c.prototype.listenerCount = function (e) {
        var t = s ? s + e : e,
          n = this._events[t];
        return n ? (n.fn ? 1 : n.length) : 0;
      }),
      (c.prototype.emit = function (e, t, n, r, o, i) {
        var a = s ? s + e : e;
        if (!this._events[a]) return !1;
        var c,
          u,
          f = this._events[a],
          l = arguments.length;
        if (f.fn) {
          switch ((f.once && this.removeListener(e, f.fn, void 0, !0), l)) {
            case 1:
              return f.fn.call(f.context), !0;
            case 2:
              return f.fn.call(f.context, t), !0;
            case 3:
              return f.fn.call(f.context, t, n), !0;
            case 4:
              return f.fn.call(f.context, t, n, r), !0;
            case 5:
              return f.fn.call(f.context, t, n, r, o), !0;
            case 6:
              return f.fn.call(f.context, t, n, r, o, i), !0;
          }
          for (u = 1, c = new Array(l - 1); u < l; u++) c[u - 1] = arguments[u];
          f.fn.apply(f.context, c);
        } else {
          var d,
            p = f.length;
          for (u = 0; u < p; u++)
            switch ((f[u].once && this.removeListener(e, f[u].fn, void 0, !0), l)) {
              case 1:
                f[u].fn.call(f[u].context);
                break;
              case 2:
                f[u].fn.call(f[u].context, t);
                break;
              case 3:
                f[u].fn.call(f[u].context, t, n);
                break;
              case 4:
                f[u].fn.call(f[u].context, t, n, r);
                break;
              default:
                if (!c) for (d = 1, c = new Array(l - 1); d < l; d++) c[d - 1] = arguments[d];
                f[u].fn.apply(f[u].context, c);
            }
        }
        return !0;
      }),
      (c.prototype.on = function (e, t, n) {
        return i(this, e, t, n, !1);
      }),
      (c.prototype.once = function (e, t, n) {
        return i(this, e, t, n, !0);
      }),
      (c.prototype.removeListener = function (e, t, n, r) {
        var o = s ? s + e : e;
        if (!this._events[o]) return this;
        if (!t) return a(this, o), this;
        var i = this._events[o];
        if (i.fn) i.fn !== t || (r && !i.once) || (n && i.context !== n) || a(this, o);
        else {
          for (var c = 0, u = [], f = i.length; c < f; c++)
            (i[c].fn !== t || (r && !i[c].once) || (n && i[c].context !== n)) && u.push(i[c]);
          u.length ? (this._events[o] = 1 === u.length ? u[0] : u) : a(this, o);
        }
        return this;
      }),
      (c.prototype.removeAllListeners = function (e) {
        var t;
        return (
          e
            ? ((t = s ? s + e : e), this._events[t] && a(this, t))
            : ((this._events = new r()), (this._eventsCount = 0)),
          this
        );
      }),
      (c.prototype.off = c.prototype.removeListener),
      (c.prototype.addListener = c.prototype.on),
      (c.prefixed = s),
      (c.EventEmitter = c),
      (e.exports = c);
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      try {
        var t = window.getComputedStyle(e).marginTop;
        return t ? parseInt(t) : 0;
      } catch (e) {
        return 0;
      }
    }
    function o() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = arguments[1],
        n = arguments[2],
        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        i = e.url || Object(g.b)(e.baseURL, e.entry),
        a = e.id(e.name),
        c = e.title(e.name),
        u = void 0,
        l = !1,
        p = void 0,
        _ = void 0,
        E = void 0,
        O = function (o) {
          return function () {
            n(y.c.SHOW_FULLSCREEN),
              l ||
                ((_ = r(document.documentElement)),
                (E = r(document.body)),
                (p = window.pageYOffset || document.documentElement.scrollTop));
            var i = function () {
              s({
                iframe: o,
                topPosition: p,
                extraDocumentTopOffset: _,
                extraBodyTopOffset: E,
                shouldMoveBody: !m.b.isSupported(),
                shouldUseLayoutStyleFix: e.shouldUseLayoutStyleFix,
              }),
                t.fullscreenOverlayShown(),
                (l = !0);
            };
            m.b.isSupported() && !w
              ? ((w = !0),
                m.b.fullscreenReplaceWebView().then(function (e) {
                  'true' === e.success
                    ? (i(),
                      m.b.fullscreenMoveWebView().then(function (e) {
                        'true' !== e.success && m.b.fullscreenRestoreWebView(), (w = !1);
                      }))
                    : (w = !1);
                }))
              : (i(), (w = !1));
          };
        },
        S = function (r) {
          return function () {
            n(y.c.HIDE_FULLSCREEN);
            var o = function () {
              f({ iframe: r, topPosition: p, shouldUseLayoutStyleFix: e.shouldUseLayoutStyleFix }),
                t.fullscreenOverlayHidden(),
                (l = !1);
            };
            m.b.isSupported() && !A
              ? ((A = !0),
                m.b.fullscreenReplaceOverlay().then(function (e) {
                  'true' === e.success && (o(), m.b.fullscreenRestoreWebView()), (A = !1);
                }))
              : (o(), (A = !1));
          };
        },
        R = function (e) {
          var t = e.iframe;
          u = Object(v.a)(
            t,
            a,
            !0,
            d()(
              {
                show: O(t),
                hide: S(t),
                nativeHookApi: function (e) {
                  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                    n[r - 1] = arguments[r];
                  var o = m.b[e],
                    i = 'function' == typeof n[n.length - 1] ? n.pop() : function () {};
                  'function' == typeof o && o.apply(void 0, n).then(i);
                },
                trackEvent: n,
              },
              o
            )
          );
        };
      return (
        e.scrollBlockStyleContainer && e.scrollBlockStyleContainer.appendChild(b),
        Object(h.b)({
          container: e.container,
          url: i + (e.params ? '#' + e.params + '&' : ''),
          baseURL: e.baseURL,
          id: a,
          title: c,
          onCreate: e.onCreate,
          onLoad: e.onLoad,
          style: e.style,
          timeout: e.timeout,
          sandbox: e.shouldSandbox ? e.sandbox : null,
          shouldAllowCamera: e.shouldAllowCamera,
          beforeLoad: R,
        }).then(function (e) {
          return [e, u, { show: O(e), hide: S(e) }];
        })
      );
    }
    function i(e) {
      var t = e.topPosition,
        n = e.bodyPositionType,
        r = e.extraDocumentTopOffset,
        o = e.shouldMoveBody,
        i = e.shouldUseLayoutStyleFix;
      b.innerHTML =
        '\n    html.' +
        E +
        ' {\n      overflow: visible !important;\n      ' +
        (i ? 'position: static !important;' : '') +
        '\n    }\n    body.' +
        E +
        ' {\n      width: 100% !important;\n      height: 100% !important;\n      min-height: 100% !important;\n      top: ' +
        (o ? -(t - r) : 0) +
        'px !important;\n      background-position-y: ' +
        (o ? -(t - r) : 0) +
        'px !important;\n      overflow: hidden !important;\n      position: ' +
        n +
        ' !important;\n      box-sizing: border-box !important;\n    }\n  ';
    }
    function a() {
      window.removeEventListener('scroll', a),
        window.scrollTo(0, 0),
        (b.innerHTML =
          '\n    ' +
          (b.innerHTML || '') +
          '\n    body.' +
          E +
          ' * { max-height: 0 !important; }\n    body.' +
          E +
          ' iframe[id$="-fullscreen"] { max-height: 100% !important; }\n  ');
    }
    function c(e, t, n, o) {
      var c = n ? 'absolute' : 'fixed';
      return (
        Object(_.e)() && 'relative' === window.getComputedStyle(document.body).position
          ? ((b.innerHTML = '\n      body.' + E + ' { position: initial !important; }\n    '),
            setTimeout(function () {
              var e = r(document.documentElement);
              i({
                topPosition: window.pageYOffset || document.documentElement.scrollTop,
                bodyPositionType: c,
                extraDocumentTopOffset: e,
                shouldMoveBody: o,
                shouldUseLayoutStyleFix: n,
              });
            }, 30))
          : i({
              topPosition: e,
              bodyPositionType: c,
              extraDocumentTopOffset: t,
              shouldMoveBody: o,
              shouldUseLayoutStyleFix: n,
            }),
        n && window.addEventListener('scroll', a),
        setTimeout(function () {
          p.a(document.documentElement, E), p.a(document.body, E);
        }, 10),
        b
      );
    }
    function u(e, t) {
      t && window.removeEventListener('scroll', a),
        p.b(document.documentElement, E),
        p.b(document.body, E),
        void 0 !== e && window.scrollTo(0, e);
    }
    function s(e) {
      var t = e.extraBodyTopOffset,
        n = e.extraDocumentTopOffset,
        r = e.iframe,
        o = e.shouldMoveBody,
        i = e.shouldUseLayoutStyleFix,
        a = e.topPosition;
      (r.style.height = '100%'), (r.style.opacity = '1'), o && (r.style.marginTop = a - (n + t) + 'px'), c(a, n, i, o);
    }
    function f(e) {
      var t = e.iframe,
        n = e.topPosition,
        r = e.shouldUseLayoutStyleFix,
        o = function () {
          (t.style.height = '0'), (t.style.opacity = '0');
        };
      r ? setTimeout(o, 100) : o(), u(n, r);
    }
    t.a = o;
    var l = n(2),
      d = n.n(l),
      p = n(285),
      h = n(41),
      v = n(54),
      y = n(7),
      g = n(31),
      _ = n(69),
      m = n(12),
      E = 'klarna-payments-fso-open',
      b = document.createElement('style'),
      w = !1,
      A = !1;
  },
  function (e, t, n) {
    'use strict';
    var r = (n(147), n(289));
    n.d(t, 'a', function () {
      return r.a;
    });
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(2),
      a = n.n(i),
      c = n(39),
      u = n.n(c),
      s = n(55),
      f = n.n(s),
      l = n(287),
      d = n.n(l),
      p = n(288),
      h = (function () {
        function e() {
          var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((u()(this, e), !n.target)) throw new Error('Property `options.target` is required.');
          '[object Object]' === Object.prototype.toString.call(n.debug)
            ? ((this.debug = !!n.debug.logs), (this.logErrors = !!n.debug.errors))
            : ((this.debug = !!n.debug), (this.logErrors = this.debug)),
            (this.posten = e.createPosten(a()({}, n, { debug: this.debug }))),
            (this.posten.onMessage = function () {
              t.posten && t.posten.hasTarget() && t.onMessage.apply(t, arguments);
            }),
            (this.messageHandlers = {}),
            (this.queue = n.queue || []),
            (this.sourceID = n.sourceID || 'NO NAME'),
            (this.targetIsReady = n.targetIsReady),
            (this.shouldBuffer = !this.targetIsReady),
            (this.autoSyncOnStart = null != n.autoSyncOnStart ? n.autoSyncOnStart : !this.targetIsReady),
            this.addMessageHandler('@@messenger/ready', this.onReadyMessage.bind(this)),
            this.addMessageHandler('@@messenger/SYN', this.onSyncMessage.bind(this)),
            this.addMessageHandler('@@messenger/SYN-ACK', this.onAcknowledgeSyncMessage.bind(this)),
            this.addMessageHandler('@@messenger/ACK', this.onAcknowledgeMessage.bind(this)),
            this.addMessageHandler('@@messenger/transferPort', this.onTransferPort.bind(this)),
            this.startTargetExistenceCheckPolling(n.targetExistenceCheckInterval),
            this.targetIsReady ? this.ready() : this.autoSyncOnStart && this.sync();
        }
        return (
          f()(e, null, [
            {
              key: 'createPosten',
              value: function (t) {
                var n = t.src,
                  r = void 0 === n ? window : n,
                  o = t.target,
                  i = t.origin,
                  a = void 0 === i ? '*' : i,
                  c = t.debug,
                  u = t.sourceID,
                  s = t.disableMessageSourceCheck,
                  f = { src: r, origin: a, console: d.a, debug: c, sourceID: u, disableMessageSourceCheck: s };
                return (
                  o.url && (f.origin = e.getOriginFromURL(o.url)),
                  o.window ? (f.target = o.window) : o.frame && (f.frame = o.frame),
                  new p.a(f)
                );
              },
            },
            {
              key: 'getOriginFromURL',
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
                  t = e.match(/^[a-z]+:\/\/[a-z0-9A-Z\.:\-]+/);
                if (t) return t[0];
              },
            },
          ]),
          f()(e, [
            {
              key: 'log',
              value: function () {
                if (this.debug) {
                  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                  d.a.log.apply(d.a, ['[Messenger(%s)]', this.sourceID].concat(t));
                }
              },
            },
            {
              key: 'logError',
              value: function () {
                if (this.debug && this.logErrors) {
                  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                  d.a.error.apply(d.a, ['[Messenger(%s)]', this.sourceID].concat(t));
                }
              },
            },
            {
              key: 'hasTarget',
              value: function () {
                return this.posten && this.posten.hasTarget();
              },
            },
            {
              key: 'startTargetExistenceCheckPolling',
              value: function () {
                var e = this,
                  t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 100;
                this.existenceCheckPoller = setInterval(function () {
                  e.shouldBuffer ||
                    e.hasTarget() ||
                    (e.log('Target no longer exists. Start buffering.'), (e.shouldBuffer = !0));
                }, t);
              },
            },
            {
              key: 'sync',
              value: function () {
                this.hasTarget() && (this.posten.send({ action: '@@messenger/SYN' }), this.log('SYN'));
              },
            },
            {
              key: 'acknowledgeSync',
              value: function () {
                this.hasTarget() && (this.posten.send({ action: '@@messenger/SYN-ACK' }), this.log('SYN-ACK'));
              },
            },
            {
              key: 'acknowledge',
              value: function () {
                this.hasTarget() && (this.posten.send({ action: '@@messenger/ACK' }), this.log('ACK'));
              },
            },
            {
              key: 'addMessageHandler',
              value: function (e, t) {
                var n = this;
                return (
                  (this.messageHandlers[e] = t),
                  function () {
                    delete n.messageHandlers[e];
                  }
                );
              },
            },
            {
              key: 'transferPort',
              value: function (e) {
                this.log('Transfer port:', e), this.send({ action: '@@messenger/transferPort', port: e });
              },
            },
            {
              key: 'getPort',
              value: function () {
                var e = this;
                return this.port
                  ? o.a.resolve(this.port)
                  : new o.a(function (t) {
                      e.resolvePortPromise = t;
                    });
              },
            },
            {
              key: 'send',
              value: function (e) {
                !this.shouldBuffer && this.hasTarget()
                  ? this.posten.send(a()({}, e, { __sourceID: this.sourceID }))
                  : (this.log('Buffering message:', e), this.queue.push(e));
              },
            },
            {
              key: 'ready',
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  t = e.fromPostMessage,
                  n = void 0 !== t && t;
                this.hasTarget() &&
                  (this.log('Ready to receive messages.'),
                  (this.shouldBuffer = !1),
                  n || this.send({ action: '@@messenger/ready' }),
                  this.flush(this.queue, this.send));
              },
            },
            {
              key: 'flush',
              value: function () {
                for (this.log('Flushing buffer:', [].concat(this.queue)); this.queue.length > 0; )
                  this.send(this.queue.shift());
              },
            },
            {
              key: 'pause',
              value: function () {
                this.shouldBuffer = !0;
              },
            },
            {
              key: 'destroy',
              value: function () {
                clearInterval(this.existenceCheckPoller), this.posten && this.posten.unbind(), delete this.posten;
              },
            },
            {
              key: 'onMessage',
              value: function (e, t, n) {
                if (e) return void this.logError(e);
                var r = this.messageHandlers[t.action];
                'function' == typeof r && r(t, n);
              },
            },
            {
              key: 'onReadyMessage',
              value: function () {
                this.ready({ fromPostMessage: !0 });
              },
            },
            {
              key: 'onSyncMessage',
              value: function (e) {
                this.acknowledgeSync();
              },
            },
            {
              key: 'onAcknowledgeSyncMessage',
              value: function (e) {
                this.ready({ fromPostMessage: !0 }), this.acknowledge();
              },
            },
            {
              key: 'onAcknowledgeMessage',
              value: function (e) {
                this.ready({ fromPostMessage: !0 });
              },
            },
            {
              key: 'onTransferPort',
              value: function (e, t) {
                var n = t.ports[0];
                this.log('Received port:', n),
                  !this.port && this.resolvePortPromise && this.resolvePortPromise(n),
                  (this.port = n);
              },
            },
          ]),
          e
        );
      })();
    t.a = h;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return X;
    });
    var r = n(10),
      o = n.n(r),
      i = n(30),
      a = n.n(i),
      c = n(11),
      u = n.n(c),
      s = n(25),
      f = n.n(s),
      l = n(1),
      d = n.n(l),
      p = n(290),
      h = n.n(p),
      v = n(2),
      y = n.n(v),
      g = n(15),
      _ = n.n(g),
      m = n(107),
      E = n(7),
      b = n(31),
      w = n(119),
      A = n(149),
      O = n(296),
      S = n(297),
      R = n(298),
      I = n(303),
      T = n(309),
      k = n(310),
      L = n(311),
      P = n(3),
      C = this,
      x = [
        'visibility',
        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',
        'marginTop',
        'marginRight',
        'marginBottom',
        'marginLeft',
      ],
      N = function (e) {
        return 'AbortError' === e.name;
      },
      D = function (e, t) {
        return t ? 'opf' : 'klarna' === e ? 'default' : e;
      },
      j = function (e, t, n) {
        var r = (e + '-' + t).toLowerCase(),
          o = n.supportedLocales;
        return o.includes(r) ? r : o.includes(e) ? e : o[0];
      },
      M = function (e) {
        var t = e.split('-'),
          n = _()(t, 2),
          r = n[0],
          o = n[1];
        return o ? [r, o.toUpperCase()].join('_') : r;
      },
      F = function (e) {
        return e.replace('.html', '');
      },
      U = function (e, t) {
        var n = t.supportedIntents;
        return n.includes(e) ? e : n[0];
      },
      H = function (e) {
        var t = e.category,
          n = e.config,
          r = e.designID,
          o = e.intent,
          i = void 0 === o ? 'buy' : o,
          a = e.isOpf,
          c = e.language,
          u = e.mask,
          s = e.purchaseCountry,
          f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          l = f.skipFlags,
          d = f.useDefaultEntry,
          p = f.useFallbackCdn,
          h = p ? n.fallbackStaticCdnBaseUrl : n.staticCdnBaseUrl,
          v = D(r, a),
          y = j(c, s, n).toLowerCase(),
          g = U(i, n),
          _ = Object(w.a)(t),
          m = l ? 0 : u,
          E = d ? n.defaultEntry : n.entry;
        return Object(b.b)(h, v, y, g, _, m, E);
      },
      B = function (e, t) {
        var n = e.baseURL,
          r = e.sessionID,
          o = t.category,
          i = t.config,
          a = t.designID,
          c = t.intent,
          u = void 0 === c ? 'buy' : c,
          s = t.isOpf,
          f = t.language,
          l = t.mask,
          d = t.purchaseCountry,
          p = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          h = p.skipFlags,
          v = p.useDefaultEntry,
          y = Object(w.a)(o),
          g = D(a, s),
          _ = h ? 0 : l,
          m = U(u, i),
          E = M(j(f, d, i)),
          A = F(v ? i.defaultEntry : i.entry);
        return (
          Object(b.b)(i.fallbackAppsCdnBaseUrl, i.iframeEntry) +
          '#' +
          Object(b.a)({
            baseUrl: n,
            component: y,
            design: g,
            features: _,
            intent: m,
            locale: E,
            sessionId: r,
            variant: A,
          })
        );
      },
      K = function () {
        return (Date.now() + Date.now() * Math.random()).toString(16).slice(0, 11);
      },
      W = function (e, t, n, r) {
        if (!n.useFallbackCdn && !N(e))
          return (
            r(E.c.ONE_OFFERING_STATIC_FETCH_ERROR, {
              error: e.message,
              flags: t.mask,
              request_blocked: !0,
              variant: t.config.entry,
            }),
            [t, y()({}, n, { useFallbackCdn: !0 }), r]
          );
      },
      G = function (e, t, n, r) {
        if (!n.useDefaultEntry && e.is4xx)
          return (
            r(E.c.ONE_OFFERING_STATIC_FETCH_ERROR, { error: e.message, variant: t.config.entry }),
            [t, y()({}, n, { useDefaultEntry: !0 }), r]
          );
      },
      V = function (e, t, n, r) {
        if (!n.skipFlags && e.is4xx)
          return (
            r(E.c.ONE_OFFERING_STATIC_FETCH_ERROR, { error: e.message, flags: t.mask }),
            [
              t,
              y()({}, n, {
                skipFlags: !0,
                useDefaultEntry: n.useDefaultEntry && t.config.entry === t.config.defaultEntry,
              }),
              r,
            ]
          );
      },
      Y = Object(S.a)(
        { accept: 'text/html', onError: [W], onFetchError: [G, V], responseType: 'text' },
        H,
        function (e, t, n, r, o) {
          var i = n.config;
          return (
            o(E.c.ONE_OFFERING_STATIC_FETCH_STARTED, {
              file_path: e.replace(r.useFallbackCdn ? i.fallbackStaticCdnBaseUrl : i.staticCdnBaseUrl, ''),
            }),
            window.fetch(e, t)
          );
        }
      ),
      z = new h.a(),
      J = function (e, t, n, r) {
        return new d.a(function (o, i) {
          var a = document.createElement('iframe');
          (a.style.display = 'none'),
            e.appendChild(a),
            setTimeout(function () {
              try {
                var e = r.getComputedStyle(a),
                  c = {};
                x.forEach(function (t) {
                  c[t] = e[t];
                });
                var u = n.marginBottom,
                  s = c.marginBottom || '0px';
                (c.marginBottom = 'calc(' + s + ' + ' + u + ')'), f()(t.style, c), o();
              } catch (e) {
                i(e);
              } finally {
                a.remove();
              }
            });
        });
      },
      q = function (e) {
        return function (t) {
          if (!N(t)) throw (e(E.c.ONE_OFFERING_STATIC_FETCH_ERROR, { error: t.message }), t);
          e(E.c.ONE_OFFERING_STATIC_FETCH_ABORTED);
        };
      },
      Z = function (e, t, n) {
        if (!t) return function () {};
        var r = function () {
          e(t.scrollHeight);
        };
        if ('ResizeObserver' in window) {
          var o = new window.ResizeObserver(r);
          return (
            o.observe(t),
            function () {
              o.disconnect();
            }
          );
        }
        var i = setInterval(r, n.checkHeightInterval);
        return function () {
          clearInterval(i);
        };
      },
      Q = function (e, t) {
        if (t) {
          try {
            t.removeResizeEventListener();
          } catch (e) {}
          try {
            var n = t.staticPaymentMethodLoadingCache || [],
              r = _()(n, 2),
              o = r[1];
            o && o.abort();
          } catch (e) {}
        }
        e.parentNode && e.parentNode.removeChild(e), z.delete(e);
      },
      X = function (e, t) {
        var n = Object(A.b)(e, t);
        n && Q(n, z.get(n));
      },
      $ = (function () {
        var e = u()(
          o.a.mark(function e(t, n) {
            var r,
              i,
              c,
              u,
              s,
              l,
              d,
              p,
              h,
              v,
              g,
              b,
              w,
              S,
              x,
              N,
              D,
              j,
              M,
              F,
              U,
              W,
              G,
              V,
              $,
              ee,
              te,
              ne,
              re,
              oe,
              ie,
              ae,
              ce = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (
                        ((r = q(n)),
                        (i = t.apiId),
                        (c = t.apiMethodName),
                        (u = t.category),
                        (s = t.config),
                        (l = t.container),
                        (d = t.environment),
                        (p = t.isDynamic),
                        (h = t.isOpf),
                        (v = t.offeringOptions),
                        (g = y()({}, t, { mask: v || 0 })),
                        (b = s.id(u)),
                        (w = H(g)),
                        !(S = Object(A.b)(u, l)))
                      ) {
                        e.next = 13;
                        break;
                      }
                      if (!(x = z.get(S))) {
                        e.next = 12;
                        break;
                      }
                      if (
                        ((N = x.staticPaymentMethodLoadingCache || []), (D = _()(N, 1)), (j = D[0]), x.cacheURL !== w)
                      ) {
                        e.next = 12;
                        break;
                      }
                      return e.abrupt('return', j && j.catch(r));
                    case 12:
                      Q(S, x);
                    case 13:
                      return (
                        (M = K() + K()),
                        t.registry.set(M, { category: u }),
                        (F = document.createElement('div')),
                        f()(F.style, s.containerStyle),
                        F.setAttribute('data-cid', b),
                        l.appendChild(F),
                        (U = { cacheURL: w, staticID: M }),
                        z.set(F, U),
                        (e.prev = 21),
                        (e.next = 24),
                        Object(I.a)(g.mask)
                      );
                    case 24:
                      return (
                        (g.mask = e.sent),
                        (W = void 0),
                        (G = [
                          g,
                          { skipFlags: !g.mask, useDefaultEntry: s.entry === s.defaultEntry, useFallbackCdn: !1 },
                        ]),
                        (e.prev = 27),
                        (V = Object(R.a)()),
                        ($ = Y({ abortController: V, timeout: s.timeout }).apply(void 0, a()(G).concat([n]))),
                        (U.staticPaymentMethodLoadingCache = [$, V]),
                        (e.next = 33),
                        $
                      );
                    case 33:
                      (ee = e.sent), (te = ee.response), (ne = ee.args), (G = ne), (W = te), (e.next = 44);
                      break;
                    case 40:
                      if (((e.prev = 40), (e.t0 = e.catch(27)), p)) {
                        e.next = 44;
                        break;
                      }
                      throw e.t0;
                    case 44:
                      if (
                        (delete U.staticPaymentMethodLoadingCache,
                        (re = 'playground' === d ? Object(T.a)(F) : { scrollHeight: 0 }),
                        (oe =
                          W &&
                          Object(L.a)(y()({}, s, { apiMethodName: c, container: F, html: W, isOpf: h, staticID: M }))),
                        (ie = Object(m.a)(i, u)),
                        (ae = Object(O.a)(ie, re)),
                        (U.removeResizeEventListener = Z(ae, oe, s)),
                        !oe || !t.copyAndApplyIframeStyles)
                      ) {
                        e.next = 59;
                        break;
                      }
                      return (e.prev = 51), (e.next = 54), J(l, oe, s, ce);
                    case 54:
                      e.next = 59;
                      break;
                    case 56:
                      (e.prev = 56),
                        (e.t1 = e.catch(51)),
                        n(E.c.ONE_OFFERING_STATIC_IFRAME_STYLES_ERROR, { error: e.t1.message });
                    case 59:
                      if ((oe && ae(oe.scrollHeight), !p)) {
                        e.next = 73;
                        break;
                      }
                      return (
                        (e.prev = 61),
                        (e.next = 64),
                        Object(k.a)(
                          {
                            apiMethodName: c,
                            config: s,
                            container: F,
                            emitHeight: ae,
                            isOpf: h,
                            removeResizeEventListener: U.removeResizeEventListener,
                            shadow: oe,
                            staticID: M,
                            trackEvent: n,
                            url: B.apply(void 0, [P.a.get(i + ':clientToken')].concat(a()(G))),
                          },
                          ce
                        )
                      );
                    case 64:
                      e.next = 73;
                      break;
                    case 66:
                      if (((e.prev = 66), (e.t2 = e.catch(61)), !oe)) {
                        e.next = 72;
                        break;
                      }
                      n(E.c.ONE_OFFERING_CREATE_IFRAME_ERROR, { error: e.t2.message }), (e.next = 73);
                      break;
                    case 72:
                      throw e.t2;
                    case 73:
                      n(E.c.ONE_OFFERING_STATIC_FETCH_COMPLETED), (e.next = 80);
                      break;
                    case 76:
                      (e.prev = 76), (e.t3 = e.catch(21)), X(u, l), r(e.t3);
                    case 80:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              C,
              [
                [21, 76],
                [27, 40],
                [51, 56],
                [61, 66],
              ]
            );
          })
        );
        return function (t, n) {
          return e.apply(this, arguments);
        };
      })();
    t.a = $;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return i;
    });
    var r = n(106),
      o = n(118),
      i = function (e) {
        return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : document).querySelector(
          '[data-cid="' + Object(o.d)(e) + '"]'
        );
      },
      a = function (e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document,
          o = Object(r.a)(e, t);
        return i(o, n);
      };
    t.a = a;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'c', function () {
      return f;
    }),
      n.d(t, 'b', function () {
        return l;
      }),
      n.d(t, 'a', function () {
        return d;
      });
    var r = n(36),
      o = n.n(r),
      i = n(1),
      a = n.n(i),
      c = n(151),
      u = n(304),
      s = o()({}, u.a.APPLE_PAY, {
        isEnabled: function () {
          return a.a.resolve(Object(u.c)());
        },
        authenticate: function (e, t) {
          var n = t.iframeId;
          return Object(u.b)(n, e);
        },
      }),
      f = function (e) {
        return s[e] ? c.a.withTimeout(s[e].isEnabled, 100) : a.a.resolve(!1);
      },
      l = function () {
        return f(u.a.APPLE_PAY);
      },
      d = function (e, t) {
        return s[e.wallet]
          ? s[e.wallet].authenticate(e, t)
          : a.a.reject(new Error('Wallet "' + e.wallet + '" is not defined'));
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(11),
      a = n.n(i),
      c = n(1),
      u = n.n(c),
      s = this,
      f = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4;
        return new u.a(
          (function () {
            var n = a()(
              o.a.mark(function n(r) {
                var i, a;
                return o.a.wrap(
                  function (n) {
                    for (;;)
                      switch ((n.prev = n.next)) {
                        case 0:
                          return (
                            (i = void 0),
                            (a = setTimeout(function () {
                              r(i);
                            }, t)),
                            (n.prev = 2),
                            (n.next = 5),
                            e()
                          );
                        case 5:
                          (i = n.sent), (n.next = 10);
                          break;
                        case 8:
                          (n.prev = 8), (n.t0 = n.catch(2));
                        case 10:
                          clearTimeout(a), r(i);
                        case 12:
                        case 'end':
                          return n.stop();
                      }
                  },
                  n,
                  s,
                  [[2, 8]]
                );
              })
            );
            return function (e) {
              return n.apply(this, arguments);
            };
          })()
        );
      };
    t.a = { withTimeout: f };
  },
  function (e, t, n) {
    'use strict';
    function r() {
      return o.a.get('_klarna_mdid') || o.a.get('klarna-mdid');
    }
    t.a = r;
    var o = n(52);
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return g;
    }),
      n.d(t, 'c', function () {
        return m;
      }),
      n.d(t, 'd', function () {
        return E;
      });
    var r = n(10),
      o = n.n(r),
      i = n(13),
      a = n.n(i),
      c = n(2),
      u = n.n(c),
      s = n(11),
      f = n.n(s),
      l = n(31),
      d = n(7),
      p = n(41),
      h = n(9),
      v = n(3),
      y = n(33),
      g = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.supportedCountries,
          n = void 0 === t ? [] : t,
          r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o = r.purchaseCountry;
        return n.indexOf(o) >= 0;
      },
      _ = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.type1;
        t = void 0 === t ? {} : t;
        var n = t.supportedCountries,
          r = void 0 === n ? [] : n,
          o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = o.environment,
          a = o.purchaseCountry;
        return 'production' === i && r.indexOf(a) > -1;
      },
      m = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.type2;
        t = void 0 === t ? {} : t;
        var n = t.supportedCountries,
          r = void 0 === n ? [] : n,
          o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = o.environment,
          a = o.purchaseCountry;
        return 'production' === i && r.indexOf(a) > -1;
      },
      E = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.type3;
        t = void 0 === t ? {} : t;
        var n = t.supportedCountries,
          r = void 0 === n ? [] : n,
          o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          i = o.environment,
          a = o.purchaseCountry;
        return 'production' === i && r.indexOf(a) > -1;
      },
      b = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.type3;
        t = void 0 === t ? {} : t;
        var n = t.orgId,
          r = void 0 === n ? {} : n;
        return r[(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).purchaseCountry] || r.EU;
      };
    t.a = (function () {
      function e(e) {
        return t.apply(this, arguments);
      }
      var t = f()(
        o.a.mark(function e(t) {
          var n,
            r,
            i,
            c,
            s,
            f,
            w,
            A,
            O,
            S,
            R,
            I,
            T,
            k,
            L,
            P,
            C,
            x,
            N = t.id,
            D = t.appConfig,
            j = void 0 === D ? {} : D,
            M = t.clientToken,
            F = void 0 === M ? {} : M,
            U = t.iframeName,
            H = t.options,
            B = void 0 === H ? {} : H,
            K = t.tracker;
          return o.a.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (
                      ((e.prev = 0), (n = u()({}, h.a.app, j)), (r = n.deviceRecognition), (i = n.version), g(r, F))
                    ) {
                      e.next = 4;
                      break;
                    }
                    return e.abrupt('return');
                  case 4:
                    return (
                      (c = !!v.a.get(N + ':reCreateDeviceRecognitionIframe')),
                      (s = F.baseURL),
                      (f = F.sessionID),
                      (w = F.sessionType),
                      (A = F.experiments),
                      (O = void 0 === A ? {} : A),
                      (S = s + '/v1/sessions/' + f),
                      (R = !!Object(y.c)(O, 'sandbox_iframes')),
                      (I = B.payment_method_category),
                      (T = B.payment_method_categories),
                      (k = B.instance_id),
                      (L = U || k || I || w || N),
                      (P = function (e) {
                        return function () {
                          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                          K.event(e, {
                            iframe_unique_id: Object(p.c)(t),
                            app_version: i,
                            payment_method_category: I,
                            payment_method_categories: T,
                            name: L,
                          });
                        };
                      }),
                      (C = Object(l.b)(s, r.path, 'index.html')),
                      (x = encodeURIComponent(
                        a()({
                          INTEGRATOR: 'klarna-payments',
                          DEVICE_RECOGNITION_URL: Object(l.b)(S, 'device_recognition'),
                          AUTH_HEADER: ' ',
                          TYPE1: { enabled: _(r, F) },
                          TYPE2: u()({}, m(r, F) ? { enabled: !0, ref: f } : { enabled: !1 }),
                          TYPE3: u()({}, E(r, F) ? { enabled: !0, orgId: b(r, F), ref: f } : { enabled: !1 }),
                        })
                      )),
                      (e.next = 17),
                      Object(p.b)({
                        container: document.body,
                        url: C + '#' + x,
                        baseURL: s,
                        id: r.id,
                        onCreate: P(d.c.DEVICE_RECOGNITION_IFRAME_CREATED),
                        onLoad: P(d.c.DEVICE_RECOGNITION_IFRAME_LOADED),
                        style: r.style,
                        timeout: r.timeout,
                        reCreateIframe: c,
                        sandbox: R ? r.sandbox : null,
                      }).catch(P(d.c.DEVICE_RECOGNITION_IFRAME_TIMED_OUT))
                    );
                  case 17:
                    v.a.set(N + ':reCreateDeviceRecognitionIframe', !1), (e.next = 22);
                    break;
                  case 20:
                    (e.prev = 20), (e.t0 = e.catch(0));
                  case 22:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this,
            [[0, 20]]
          );
        })
      );
      return e;
    })();
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = n(155);
    Object(r.a)();
  },
  function (e, t, n) {
    'use strict';
    function r() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
      if (l(e)) return i(e);
      u.a.set('setupTimestamp', new Date().getTime());
      var t = (e.Klarna = e.Klarna || {}),
        n = ['init', 'load', 'authorize', 'on', 'off'];
      (t.Credit = o('credit', [].concat(n, ['reauthorize', 'loadPaymentReview']))),
        (t.DirectBankTransfer = o('direct_bank_transfer', [].concat(n, ['finalize']))),
        (t.DirectDebit = o('direct_debit', [].concat(n, ['reauthorize']))),
        (t.Payments = o(
          'payments',
          [].concat(n, ['reauthorize', 'finalize', 'loadPaymentReview']).concat(Object(s.a)() ? ['validateCard'] : [])
        )),
        c.b.isSupported()
          ? (c.b.init(),
            c.b.handshake().then(function (t) {
              u.a.set('nativeHookApiHandshakeResponse', t), Object(f.a)() || i(e);
            }),
            Object(f.a)() && i(e))
          : i(e);
    }
    function o(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return t.reduce(function (t, r) {
        return (t[r] = a.a[r](e, n)), t;
      }, n);
    }
    function i(e) {
      var t = e.klarnaAsyncCallback;
      'function' == typeof t && t();
    }
    t.a = r;
    var a = n(156),
      c = n(12),
      u = n(3),
      s = n(32),
      f = n(134),
      l = function (e) {
        return e.Klarna && e.Klarna.Credit && e.Klarna.DirectBankTransfer && e.Klarna.DirectDebit && e.Klarna.Payments;
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(157),
      o = n(268),
      i = n(326),
      a = n(327),
      c = n(330),
      u = n(331),
      s = n(332),
      f = n(333),
      l = n(334),
      d = n(32),
      p = {
        init: r.a,
        load: o.a,
        loadPaymentReview: i.a,
        authorize: a.a,
        reauthorize: c.a,
        finalize: u.a,
        on: s.a,
        off: f.a,
      };
    Object(d.a)() && (p.validateCard = l.a), (t.a = p);
  },
  function (e, t, n) {
    'use strict';
    var r = n(13),
      o = n.n(r),
      i = n(15),
      a = n.n(i),
      c = n(2),
      u = n.n(c),
      s = n(173),
      f = n.n(s),
      l = n(9),
      d = n(48),
      p = n(3),
      h = n(206),
      v = n(20),
      y = n(7),
      g = n(31),
      _ = n(69),
      m = n(134),
      E = n(229),
      b = n(230),
      w = n(137),
      A = n(33),
      O = n(52),
      S = n(100),
      R = n(12),
      I = n(140),
      T = n(32),
      k = n(266),
      L = n(267),
      P = n(142),
      C = n(105),
      x = /^v\d\.\d\.\d-\d+-g[a-z0-9]{10}$/,
      N = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
        return function () {
          var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            i = r.client_token,
            c = void 0;
          try {
            c = f()(i);
          } catch (e) {
            throw new v.e();
          }
          var s = Object(g.b)(c.base_url),
            N = c.session_id,
            D = Object(y.b)(e + ':' + N),
            j = (c.session_type || e).toLowerCase(),
            M = c.language,
            F = c.purchase_country,
            U = c.region,
            H = !!c.scheme,
            B = c.experiments || [],
            K = Object(E.a)(B),
            W = Object(b.a)(K),
            G = null != c.oo ? parseInt(c.oo, 36) : void 0,
            V = t.__APP_VERSION__ || l.a.app.version.trim();
          Object(C.a)(K) &&
            void 0 === G &&
            (G = parseInt(Object(A.b)(K, 'utopia-static-widget', 'offering_opts'), 36) || 0),
            W && x.test(W) && (V = W);
          var Y = !!O.a.get('__klarna_payments_local_mode__'),
            z = Y ? 'http://0.0.0.0:3000' : Object(g.b)(s, V),
            J = n.location.hostname,
            q = e + ':' + N + ':isUtopiaFlowEnabled';
          try {
            var Z = !R.b.isSupported() && Object(_.g)(),
              Q = 'variate-1' === Object(A.c)(K, 'utopia-webview-flow'),
              X = 'variate-1' === Object(A.c)(K, 'utopia-sdk-flow'),
              $ =
                Object(_.f)() &&
                (!R.b.isSupported() || (R.b.isFeatureSupported('sdk-version-fix') && X)) &&
                (!Z || Q) &&
                'klarna' === c.design &&
                H;
            p.a.set(q, 'variate-1' === Object(A.c)(K, 'utopia-flow') && $),
              'string' == typeof Object(A.c)(K, 'utopia-flow') &&
                p.a.set(e + ':' + N + ':isEligibleUtopiaEnvironment', $);
          } catch (e) {
            p.a.set(q, !1);
          }
          var ee = !!p.a.get(q),
            te = ee && Object(A.c)(K, 'utopia-static-widget') && 'control' !== Object(A.c)(K, 'utopia-static-widget');
          p.a.set(e + ':' + N + ':isUtopiaStaticWidgetEnabled', te);
          var ne = Object(A.c)(K, 'log-level'),
            re = p.a.get('browserSessionId') || Object(L.a)();
          p.a.set('browserSessionId', re);
          var oe = { session_type: j, merchant_url: J, scheme: H };
          if ((ee && (oe.utopia = !0), D.configure(c, oe, re), D.setLogLevel(ne), !Object(P.a)(s)))
            return D.event(y.c.INVALID_BASE_URL, { base_url: s }), void p.a.set(e + ':initialized', !1);
          try {
            var ie = p.a.get('unregisterCspViolationsTracker');
            ie && ie(), p.a.set('unregisterCspViolationsTracker', Object(k.a)(D, c.client_event_base_url));
          } catch (e) {
            D.event(y.c.CSP_VIOLATION_REGISTRATION_FAILED, e ? { name: e.name, message: e.message } : {});
          }
          var ae = p.a.get(e + ':rawClientToken');
          if (
            (ae &&
              ae !== i &&
              (p.a.set('instancesWithApplicationResetDone', []),
              p.a.set(e + ':applicationResetDone', !1),
              p.a.set(e + ':reCreateDeviceRecognitionIframe', !0)),
            R.b.isSupported())
          ) {
            var ce = !(
              !Object(A.c)(K, 'prevent-native-hook-api-in-iframe') &&
              !Object(A.c)(K, 'in-app-sdk-prevent-native-hook-api-in-iframe')
            );
            if (Object(m.a)() && !Object(A.c)(K, 'in-app-sdk-enabled-for-shopping-browser'))
              R.b.setIsSupportedOverride(!1);
            else if (ce)
              try {
                n !== n.top && R.b.setIsSupportedOverride(!1);
              } catch (e) {}
          }
          if (
            (R.b.isSupported() &&
              R.b.isFeatureSupported('experiments') &&
              R.b.setExperiments(
                B.map(function (e) {
                  return { reference: e.name, variate: (e.parameters || {}).variate_id };
                })
              ),
            H && 'variate-1' === Object(A.c)(K, 'popup-purchase-flow'))
          ) {
            var ue = R.b.isSupported() || Object(_.a)() || Object(_.g)();
            p.a.set(e + ':popupExperimentEnabled', !ue);
          }
          ee &&
            (te &&
              (p.a.set(
                e + ':' + N + ':oneOfferingBaseUrl',
                Object(A.c)(K, 'one-offering-base-url') || 'https://x.klarnacdn.net'
              ),
              p.a.set(e + ':' + N + ':oneOfferingFallbackBaseUrl', (new URL(s) || {}).origin),
              p.a.set(
                e + ':' + N + ':oneOfferingVersion',
                Object(A.c)(K, 'one-offering-version') || l.a.oneOfferingVersion
              ),
              p.a.set(e + ':' + N + ':oneOfferingStaticVariant', Object(A.c)(K, 'utopia-static-widget'))),
            p.a.set(e + ':' + N + ':apfLibraryOverrideDomain', Object(A.c)(K, 'apf-library-url')),
            p.a.set(e + ':' + N + ':apfLibraryFallbackDomain', s),
            p.a.get(e + ':' + N + ':loadApfPromise') ||
              Object(w.a)({ id: e, sessionID: N, tracker: D, isOpf: Object(C.a)(K) })),
            p.a.set(e + ':versionedBaseURL', z),
            p.a.set(e + ':previousRawClientToken', ae),
            p.a.set(e + ':rawClientToken', i),
            p.a.set(e + ':clientToken', {
              designID: c.design,
              analyticsPropertyID: c.analytics_property_id,
              traceFlow: c.trace_flow,
              environment: c.environment,
              merchantName: c.merchant_name,
              clientEventBaseURL: c.client_event_base_url,
              sessionID: N,
              scheme: H,
              experiments: K,
              merchantURL: J,
              sessionType: j,
              language: M,
              offeringOptions: G,
              purchaseCountry: F,
              region: U,
              baseURL: s,
              logLevel: ne,
              version: 'v1.10.0-1022-gdf85d0b2',
            }),
            p.a.set(e + ':initialized', !0),
            p.a.get('apiSetupEventSent') ||
              (D.event(y.c.API_SETUP, {
                api_script_url: Object(h.a)(),
                app_version: V,
                in_top_window: !Object(S.a)(),
                native_hook_api_supported: R.b.isSupported(),
                timestamp: p.a.get('setupTimestamp'),
              }),
              p.a.set('apiSetupEventSent', !0)),
            D.event(
              y.c.INIT_CALLED,
              u()(
                { client_token: i, log_level: y.a[(ne || '').toUpperCase()] || y.a.ALL },
                void 0 !== G ? { oo: G, pc: F } : {}
              )
            );
          var se = e + ':' + N + ':shoppingBrowser:initPromise';
          try {
            if (Object(I.a)({ scheme: H }) && !p.a.get(se)) {
              var fe = d.a.getNativeVersion(),
                le = { region: U, sessionID: N };
              p.a.get(e + ':' + N + ':shoppingBrowser:sessionInitiated') ||
                (d.a.sendSessionInitiatedEvent(le), p.a.set(e + ':' + N + ':shoppingBrowser:sessionInitiated', !0)),
                D.event(y.c.SHOPPING_BROWSER_NATIVE_API_INIT, { native_version: fe });
              var de = d.a
                .init(le, 'production')
                .then(function (t) {
                  var n = a()(t, 2),
                    r = n[0],
                    i = n[1];
                  return (
                    p.a.set(e + ':' + N + ':shoppingBrowser:handshakeResponse', r),
                    D.event(y.c.SHOPPING_BROWSER_NATIVE_API_INIT_COMPLETED, {
                      native_version: fe,
                      pending_messages: o()(i),
                      handshake_response: !!r,
                    }),
                    i
                  );
                })
                .catch(function (e) {
                  '`shoppingBrowserNativeApi.init` timed out.' === e.message
                    ? D.event(y.c.SHOPPING_BROWSER_NATIVE_API_INIT_TIMED_OUT, { native_version: fe })
                    : D.event(y.c.SHOPPING_BROWSER_NATIVE_API_ERROR, { native_version: fe, error: e.message }),
                    p.a.delete(se);
                });
              p.a.set(se, de);
            }
          } catch (t) {
            D.event(y.c.SHOPPING_BROWSER_NATIVE_API_ERROR, { error: t.message }),
              p.a.delete(e + ':' + N + ':shoppingBrowser:sessionInitiated'),
              p.a.delete(se);
          }
          return (
            Object(T.a)() && r.product && p.a.set(e + ':integratingProduct', r.product),
            ('credit' === j || H) &&
              Object.defineProperty(t, 'initialized', {
                get: function () {
                  return D.event(y.c.INITIALIZED_FLAG_READ), !0;
                },
                configurable: !0,
              }),
            'complete' === document.readyState
              ? D.event(y.c.PAGE_ALREADY_LOADED)
              : n.addEventListener('load', function () {
                  return D.event(y.c.PAGE_LOADED);
                }),
            r.product &&
              l.a.supportedIntegratingProducts.indexOf(r.product.product_id) > -1 &&
              (ee && (t.isUtopiaFlowEnabled = ee),
              c.ua_enabled_and_one_pm && (t.isUserAccountEnabledWithOnePaymentMethod = !0)),
            t
          );
        };
      };
    t.a = N;
  },
  function (e, t, n) {
    var r = n(0),
      o = r.JSON || (r.JSON = { stringify: JSON.stringify });
    e.exports = function (e) {
      return o.stringify.apply(o, arguments);
    };
  },
  function (e, t, n) {
    e.exports = { default: n(160), __esModule: !0 };
  },
  function (e, t, n) {
    n(26), n(29), (e.exports = n(168));
  },
  function (e, t, n) {
    'use strict';
    var r = n(162),
      o = n(112),
      i = n(34),
      a = n(22);
    (e.exports = n(77)(
      Array,
      'Array',
      function (e, t) {
        (this._t = a(e)), (this._i = 0), (this._k = t);
      },
      function () {
        var e = this._t,
          t = this._k,
          n = this._i++;
        return !e || n >= e.length
          ? ((this._t = void 0), o(1))
          : 'keys' == t
          ? o(0, n)
          : 'values' == t
          ? o(0, e[n])
          : o(0, [n, e[n]]);
      },
      'values'
    )),
      (i.Arguments = i.Array),
      r('keys'),
      r('values'),
      r('entries');
  },
  function (e, t) {
    e.exports = function () {};
  },
  function (e, t, n) {
    'use strict';
    var r = n(56),
      o = n(45),
      i = n(46),
      a = {};
    n(23)(a, n(6)('iterator'), function () {
      return this;
    }),
      (e.exports = function (e, t, n) {
        (e.prototype = r(a, { next: o(1, n) })), i(e, t + ' Iterator');
      });
  },
  function (e, t, n) {
    var r = n(16),
      o = n(17),
      i = n(35);
    e.exports = n(14)
      ? Object.defineProperties
      : function (e, t) {
          o(e);
          for (var n, a = i(t), c = a.length, u = 0; c > u; ) r.f(e, (n = a[u++]), t[n]);
          return e;
        };
  },
  function (e, t, n) {
    var r = n(22),
      o = n(57),
      i = n(166);
    e.exports = function (e) {
      return function (t, n, a) {
        var c,
          u = r(t),
          s = o(u.length),
          f = i(a, s);
        if (e && n != n) {
          for (; s > f; ) if ((c = u[f++]) != c) return !0;
        } else for (; s > f; f++) if ((e || f in u) && u[f] === n) return e || f || 0;
        return !e && -1;
      };
    };
  },
  function (e, t, n) {
    var r = n(81),
      o = Math.max,
      i = Math.min;
    e.exports = function (e, t) {
      return (e = r(e)), e < 0 ? o(e + t, 0) : i(e, t);
    };
  },
  function (e, t, n) {
    var r = n(81),
      o = n(76);
    e.exports = function (e) {
      return function (t, n) {
        var i,
          a,
          c = String(o(t)),
          u = r(n),
          s = c.length;
        return u < 0 || u >= s
          ? e
            ? ''
            : void 0
          : ((i = c.charCodeAt(u)),
            i < 55296 || i > 56319 || u + 1 === s || (a = c.charCodeAt(u + 1)) < 56320 || a > 57343
              ? e
                ? c.charAt(u)
                : i
              : e
              ? c.slice(u, u + 2)
              : a - 56320 + ((i - 55296) << 10) + 65536);
      };
    };
  },
  function (e, t, n) {
    var r = n(59),
      o = n(6)('iterator'),
      i = n(34);
    e.exports = n(0).isIterable = function (e) {
      var t = Object(e);
      return void 0 !== t[o] || '@@iterator' in t || i.hasOwnProperty(r(t));
    };
  },
  function (e, t, n) {
    n(26), n(29), (e.exports = n(170));
  },
  function (e, t, n) {
    var r = n(17),
      o = n(85);
    e.exports = n(0).getIterator = function (e) {
      var t = o(e);
      if ('function' != typeof t) throw TypeError(e + ' is not iterable!');
      return r(t.call(e));
    };
  },
  function (e, t, n) {
    n(172), (e.exports = n(0).Object.assign);
  },
  function (e, t, n) {
    var r = n(4);
    r(r.S + r.F, 'Object', { assign: n(117) });
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      this.message = e;
    }
    var o = n(174);
    (r.prototype = new Error()),
      (r.prototype.name = 'InvalidTokenError'),
      (e.exports = function (e, t) {
        if ('string' != typeof e) throw new r('Invalid token specified');
        t = t || {};
        var n = !0 === t.header ? 0 : 1;
        try {
          return JSON.parse(o(e.split('.')[n]));
        } catch (e) {
          throw new r('Invalid token specified: ' + e.message);
        }
      }),
      (e.exports.InvalidTokenError = r);
  },
  function (e, t, n) {
    function r(e) {
      return decodeURIComponent(
        o(e).replace(/(.)/g, function (e, t) {
          var n = t.charCodeAt(0).toString(16).toUpperCase();
          return n.length < 2 && (n = '0' + n), '%' + n;
        })
      );
    }
    var o = n(175);
    e.exports = function (e) {
      var t = e.replace(/-/g, '+').replace(/_/g, '/');
      switch (t.length % 4) {
        case 0:
          break;
        case 2:
          t += '==';
          break;
        case 3:
          t += '=';
          break;
        default:
          throw 'Illegal base64url string!';
      }
      try {
        return r(t);
      } catch (e) {
        return o(t);
      }
    };
  },
  function (e, t) {
    function n(e) {
      this.message = e;
    }
    function r(e) {
      var t = String(e).replace(/=+$/, '');
      if (t.length % 4 == 1) throw new n("'atob' failed: The string to be decoded is not correctly encoded.");
      for (
        var r, i, a = 0, c = 0, u = '';
        (i = t.charAt(c++));
        ~i && ((r = a % 4 ? 64 * r + i : i), a++ % 4) ? (u += String.fromCharCode(255 & (r >> ((-2 * a) & 6)))) : 0
      )
        i = o.indexOf(i);
      return u;
    }
    var o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    (n.prototype = new Error()),
      (n.prototype.name = 'InvalidCharacterError'),
      (e.exports = ('undefined' != typeof window && window.atob && window.atob.bind(window)) || r);
  },
  function (e, t, n) {
    n(177);
    var r = n(0).Object;
    e.exports = function (e, t, n) {
      return r.defineProperty(e, t, n);
    };
  },
  function (e, t, n) {
    var r = n(4);
    r(r.S + r.F * !n(14), 'Object', { defineProperty: n(16).f });
  },
  function (e, t) {
    e.exports = 'v1.0.0-22906-g22a518e2ec\n';
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(30),
      a = n.n(i),
      c = n(11),
      u = n.n(c),
      s = n(13),
      f = n.n(s),
      l = n(128),
      d = n(88),
      p = this,
      h = function (e, t) {
        Object(l.a)()(f()({ event: e, id: Object(d.a)(), message: f()(t) }));
      },
      v = function (e) {
        return !!Object(l.a)(e);
      },
      y = (function () {
        var e = u()(
          o.a.mark(function e(t) {
            for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
            var c;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (!(c = Object(l.a)(t))) {
                        e.next = 3;
                        break;
                      }
                      return e.abrupt('return', c.apply(void 0, a()(r)));
                    case 3:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              p
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })();
    t.a = { sendMessage: h, isSupportedMethod: v, callMethod: y };
  },
  function (e, t, n) {
    var r =
        (function () {
          return this;
        })() || Function('return this')(),
      o = r.regeneratorRuntime && Object.getOwnPropertyNames(r).indexOf('regeneratorRuntime') >= 0,
      i = o && r.regeneratorRuntime;
    if (((r.regeneratorRuntime = void 0), (e.exports = n(181)), o)) r.regeneratorRuntime = i;
    else
      try {
        delete r.regeneratorRuntime;
      } catch (e) {
        r.regeneratorRuntime = void 0;
      }
  },
  function (e, t) {
    !(function (t) {
      'use strict';
      function n(e, t, n, r) {
        var i = t && t.prototype instanceof o ? t : o,
          a = Object.create(i.prototype),
          c = new p(r || []);
        return (a._invoke = s(e, n, c)), a;
      }
      function r(e, t, n) {
        try {
          return { type: 'normal', arg: e.call(t, n) };
        } catch (e) {
          return { type: 'throw', arg: e };
        }
      }
      function o() {}
      function i() {}
      function a() {}
      function c(e) {
        ['next', 'throw', 'return'].forEach(function (t) {
          e[t] = function (e) {
            return this._invoke(t, e);
          };
        });
      }
      function u(e) {
        function t(n, o, i, a) {
          var c = r(e[n], e, o);
          if ('throw' !== c.type) {
            var u = c.arg,
              s = u.value;
            return s && 'object' == typeof s && _.call(s, '__await')
              ? Promise.resolve(s.__await).then(
                  function (e) {
                    t('next', e, i, a);
                  },
                  function (e) {
                    t('throw', e, i, a);
                  }
                )
              : Promise.resolve(s).then(function (e) {
                  (u.value = e), i(u);
                }, a);
          }
          a(c.arg);
        }
        function n(e, n) {
          function r() {
            return new Promise(function (r, o) {
              t(e, n, r, o);
            });
          }
          return (o = o ? o.then(r, r) : r());
        }
        var o;
        this._invoke = n;
      }
      function s(e, t, n) {
        var o = S;
        return function (i, a) {
          if (o === I) throw new Error('Generator is already running');
          if (o === T) {
            if ('throw' === i) throw a;
            return v();
          }
          for (n.method = i, n.arg = a; ; ) {
            var c = n.delegate;
            if (c) {
              var u = f(c, n);
              if (u) {
                if (u === k) continue;
                return u;
              }
            }
            if ('next' === n.method) n.sent = n._sent = n.arg;
            else if ('throw' === n.method) {
              if (o === S) throw ((o = T), n.arg);
              n.dispatchException(n.arg);
            } else 'return' === n.method && n.abrupt('return', n.arg);
            o = I;
            var s = r(e, t, n);
            if ('normal' === s.type) {
              if (((o = n.done ? T : R), s.arg === k)) continue;
              return { value: s.arg, done: n.done };
            }
            'throw' === s.type && ((o = T), (n.method = 'throw'), (n.arg = s.arg));
          }
        };
      }
      function f(e, t) {
        var n = e.iterator[t.method];
        if (n === y) {
          if (((t.delegate = null), 'throw' === t.method)) {
            if (e.iterator.return && ((t.method = 'return'), (t.arg = y), f(e, t), 'throw' === t.method)) return k;
            (t.method = 'throw'), (t.arg = new TypeError("The iterator does not provide a 'throw' method"));
          }
          return k;
        }
        var o = r(n, e.iterator, t.arg);
        if ('throw' === o.type) return (t.method = 'throw'), (t.arg = o.arg), (t.delegate = null), k;
        var i = o.arg;
        return i
          ? i.done
            ? ((t[e.resultName] = i.value),
              (t.next = e.nextLoc),
              'return' !== t.method && ((t.method = 'next'), (t.arg = y)),
              (t.delegate = null),
              k)
            : i
          : ((t.method = 'throw'), (t.arg = new TypeError('iterator result is not an object')), (t.delegate = null), k);
      }
      function l(e) {
        var t = { tryLoc: e[0] };
        1 in e && (t.catchLoc = e[1]), 2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])), this.tryEntries.push(t);
      }
      function d(e) {
        var t = e.completion || {};
        (t.type = 'normal'), delete t.arg, (e.completion = t);
      }
      function p(e) {
        (this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(l, this), this.reset(!0);
      }
      function h(e) {
        if (e) {
          var t = e[E];
          if (t) return t.call(e);
          if ('function' == typeof e.next) return e;
          if (!isNaN(e.length)) {
            var n = -1,
              r = function t() {
                for (; ++n < e.length; ) if (_.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                return (t.value = y), (t.done = !0), t;
              };
            return (r.next = r);
          }
        }
        return { next: v };
      }
      function v() {
        return { value: y, done: !0 };
      }
      var y,
        g = Object.prototype,
        _ = g.hasOwnProperty,
        m = 'function' == typeof Symbol ? Symbol : {},
        E = m.iterator || '@@iterator',
        b = m.asyncIterator || '@@asyncIterator',
        w = m.toStringTag || '@@toStringTag',
        A = 'object' == typeof e,
        O = t.regeneratorRuntime;
      if (O) return void (A && (e.exports = O));
      (O = t.regeneratorRuntime = A ? e.exports : {}), (O.wrap = n);
      var S = 'suspendedStart',
        R = 'suspendedYield',
        I = 'executing',
        T = 'completed',
        k = {},
        L = {};
      L[E] = function () {
        return this;
      };
      var P = Object.getPrototypeOf,
        C = P && P(P(h([])));
      C && C !== g && _.call(C, E) && (L = C);
      var x = (a.prototype = o.prototype = Object.create(L));
      (i.prototype = x.constructor = a),
        (a.constructor = i),
        (a[w] = i.displayName = 'GeneratorFunction'),
        (O.isGeneratorFunction = function (e) {
          var t = 'function' == typeof e && e.constructor;
          return !!t && (t === i || 'GeneratorFunction' === (t.displayName || t.name));
        }),
        (O.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, a)
              : ((e.__proto__ = a), w in e || (e[w] = 'GeneratorFunction')),
            (e.prototype = Object.create(x)),
            e
          );
        }),
        (O.awrap = function (e) {
          return { __await: e };
        }),
        c(u.prototype),
        (u.prototype[b] = function () {
          return this;
        }),
        (O.AsyncIterator = u),
        (O.async = function (e, t, r, o) {
          var i = new u(n(e, t, r, o));
          return O.isGeneratorFunction(t)
            ? i
            : i.next().then(function (e) {
                return e.done ? e.value : i.next();
              });
        }),
        c(x),
        (x[w] = 'Generator'),
        (x[E] = function () {
          return this;
        }),
        (x.toString = function () {
          return '[object Generator]';
        }),
        (O.keys = function (e) {
          var t = [];
          for (var n in e) t.push(n);
          return (
            t.reverse(),
            function n() {
              for (; t.length; ) {
                var r = t.pop();
                if (r in e) return (n.value = r), (n.done = !1), n;
              }
              return (n.done = !0), n;
            }
          );
        }),
        (O.values = h),
        (p.prototype = {
          constructor: p,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = y),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = y),
              this.tryEntries.forEach(d),
              !e)
            )
              for (var t in this) 't' === t.charAt(0) && _.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = y);
          },
          stop: function () {
            this.done = !0;
            var e = this.tryEntries[0],
              t = e.completion;
            if ('throw' === t.type) throw t.arg;
            return this.rval;
          },
          dispatchException: function (e) {
            function t(t, r) {
              return (i.type = 'throw'), (i.arg = e), (n.next = t), r && ((n.method = 'next'), (n.arg = y)), !!r;
            }
            if (this.done) throw e;
            for (var n = this, r = this.tryEntries.length - 1; r >= 0; --r) {
              var o = this.tryEntries[r],
                i = o.completion;
              if ('root' === o.tryLoc) return t('end');
              if (o.tryLoc <= this.prev) {
                var a = _.call(o, 'catchLoc'),
                  c = _.call(o, 'finallyLoc');
                if (a && c) {
                  if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                  if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                } else if (a) {
                  if (this.prev < o.catchLoc) return t(o.catchLoc, !0);
                } else {
                  if (!c) throw new Error('try statement without catch or finally');
                  if (this.prev < o.finallyLoc) return t(o.finallyLoc);
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
              var r = this.tryEntries[n];
              if (r.tryLoc <= this.prev && _.call(r, 'finallyLoc') && this.prev < r.finallyLoc) {
                var o = r;
                break;
              }
            }
            o && ('break' === e || 'continue' === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
            var i = o ? o.completion : {};
            return (
              (i.type = e), (i.arg = t), o ? ((this.method = 'next'), (this.next = o.finallyLoc), k) : this.complete(i)
            );
          },
          complete: function (e, t) {
            if ('throw' === e.type) throw e.arg;
            return (
              'break' === e.type || 'continue' === e.type
                ? (this.next = e.arg)
                : 'return' === e.type
                ? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
                : 'normal' === e.type && t && (this.next = t),
              k
            );
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), d(n), k;
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var n = this.tryEntries[t];
              if (n.tryLoc === e) {
                var r = n.completion;
                if ('throw' === r.type) {
                  var o = r.arg;
                  d(n);
                }
                return o;
              }
            }
            throw new Error('illegal catch attempt');
          },
          delegateYield: function (e, t, n) {
            return (
              (this.delegate = { iterator: h(e), resultName: t, nextLoc: n }),
              'next' === this.method && (this.arg = y),
              k
            );
          },
        });
    })(
      (function () {
        return this;
      })() || Function('return this')()
    );
  },
  function (e, t, n) {
    e.exports = { default: n(183), __esModule: !0 };
  },
  function (e, t, n) {
    n(29), n(184), (e.exports = n(0).Array.from);
  },
  function (e, t, n) {
    'use strict';
    var r = n(19),
      o = n(4),
      i = n(28),
      a = n(120),
      c = n(121),
      u = n(57),
      s = n(185),
      f = n(85);
    o(
      o.S +
        o.F *
          !n(122)(function (e) {
            Array.from(e);
          }),
      'Array',
      {
        from: function (e) {
          var t,
            n,
            o,
            l,
            d = i(e),
            p = 'function' == typeof this ? this : Array,
            h = arguments.length,
            v = h > 1 ? arguments[1] : void 0,
            y = void 0 !== v,
            g = 0,
            _ = f(d);
          if ((y && (v = r(v, h > 2 ? arguments[2] : void 0, 2)), void 0 == _ || (p == Array && c(_))))
            for (t = u(d.length), n = new p(t); t > g; g++) s(n, g, y ? v(d[g], g) : d[g]);
          else
            for (l = _.call(d), n = new p(); !(o = l.next()).done; g++)
              s(n, g, y ? a(l, v, [o.value, g], !0) : o.value);
          return (n.length = g), n;
        },
      }
    );
  },
  function (e, t, n) {
    'use strict';
    var r = n(16),
      o = n(45);
    e.exports = function (e, t, n) {
      t in e ? r.f(e, t, o(0, n)) : (e[t] = n);
    };
  },
  function (e, t, n) {
    n(49), n(29), n(26), n(187), n(191), n(192), (e.exports = n(0).Promise);
  },
  function (e, t, n) {
    'use strict';
    var r,
      o,
      i,
      a,
      c = n(43),
      u = n(5),
      s = n(19),
      f = n(59),
      l = n(4),
      d = n(8),
      p = n(44),
      h = n(63),
      v = n(37),
      y = n(123),
      g = n(124).set,
      _ = n(189)(),
      m = n(87),
      E = n(125),
      b = n(190),
      w = n(126),
      A = u.TypeError,
      O = u.process,
      S = O && O.versions,
      R = (S && S.v8) || '',
      I = u.Promise,
      T = 'process' == f(O),
      k = function () {},
      L = (o = m.f),
      P = !!(function () {
        try {
          var e = I.resolve(1),
            t = ((e.constructor = {})[n(6)('species')] = function (e) {
              e(k, k);
            });
          return (
            (T || 'function' == typeof PromiseRejectionEvent) &&
            e.then(k) instanceof t &&
            0 !== R.indexOf('6.6') &&
            -1 === b.indexOf('Chrome/66')
          );
        } catch (e) {}
      })(),
      C = function (e) {
        var t;
        return !(!d(e) || 'function' != typeof (t = e.then)) && t;
      },
      x = function (e, t) {
        if (!e._n) {
          e._n = !0;
          var n = e._c;
          _(function () {
            for (var r = e._v, o = 1 == e._s, i = 0; n.length > i; )
              !(function (t) {
                var n,
                  i,
                  a,
                  c = o ? t.ok : t.fail,
                  u = t.resolve,
                  s = t.reject,
                  f = t.domain;
                try {
                  c
                    ? (o || (2 == e._h && j(e), (e._h = 1)),
                      !0 === c ? (n = r) : (f && f.enter(), (n = c(r)), f && (f.exit(), (a = !0))),
                      n === t.promise ? s(A('Promise-chain cycle')) : (i = C(n)) ? i.call(n, u, s) : u(n))
                    : s(r);
                } catch (e) {
                  f && !a && f.exit(), s(e);
                }
              })(n[i++]);
            (e._c = []), (e._n = !1), t && !e._h && N(e);
          });
        }
      },
      N = function (e) {
        g.call(u, function () {
          var t,
            n,
            r,
            o = e._v,
            i = D(e);
          if (
            (i &&
              ((t = E(function () {
                T
                  ? O.emit('unhandledRejection', o, e)
                  : (n = u.onunhandledrejection)
                  ? n({ promise: e, reason: o })
                  : (r = u.console) && r.error && r.error('Unhandled promise rejection', o);
              })),
              (e._h = T || D(e) ? 2 : 1)),
            (e._a = void 0),
            i && t.e)
          )
            throw t.v;
        });
      },
      D = function (e) {
        return 1 !== e._h && 0 === (e._a || e._c).length;
      },
      j = function (e) {
        g.call(u, function () {
          var t;
          T ? O.emit('rejectionHandled', e) : (t = u.onrejectionhandled) && t({ promise: e, reason: e._v });
        });
      },
      M = function (e) {
        var t = this;
        t._d || ((t._d = !0), (t = t._w || t), (t._v = e), (t._s = 2), t._a || (t._a = t._c.slice()), x(t, !0));
      },
      F = function (e) {
        var t,
          n = this;
        if (!n._d) {
          (n._d = !0), (n = n._w || n);
          try {
            if (n === e) throw A("Promise can't be resolved itself");
            (t = C(e))
              ? _(function () {
                  var r = { _w: n, _d: !1 };
                  try {
                    t.call(e, s(F, r, 1), s(M, r, 1));
                  } catch (e) {
                    M.call(r, e);
                  }
                })
              : ((n._v = e), (n._s = 1), x(n, !1));
          } catch (e) {
            M.call({ _w: n, _d: !1 }, e);
          }
        }
      };
    P ||
      ((I = function (e) {
        h(this, I, 'Promise', '_h'), p(e), r.call(this);
        try {
          e(s(F, this, 1), s(M, this, 1));
        } catch (e) {
          M.call(this, e);
        }
      }),
      (r = function (e) {
        (this._c = []),
          (this._a = void 0),
          (this._s = 0),
          (this._d = !1),
          (this._v = void 0),
          (this._h = 0),
          (this._n = !1);
      }),
      (r.prototype = n(64)(I.prototype, {
        then: function (e, t) {
          var n = L(y(this, I));
          return (
            (n.ok = 'function' != typeof e || e),
            (n.fail = 'function' == typeof t && t),
            (n.domain = T ? O.domain : void 0),
            this._c.push(n),
            this._a && this._a.push(n),
            this._s && x(this, !1),
            n.promise
          );
        },
        catch: function (e) {
          return this.then(void 0, e);
        },
      })),
      (i = function () {
        var e = new r();
        (this.promise = e), (this.resolve = s(F, e, 1)), (this.reject = s(M, e, 1));
      }),
      (m.f = L =
        function (e) {
          return e === I || e === a ? new i(e) : o(e);
        })),
      l(l.G + l.W + l.F * !P, { Promise: I }),
      n(46)(I, 'Promise'),
      n(127)('Promise'),
      (a = n(0).Promise),
      l(l.S + l.F * !P, 'Promise', {
        reject: function (e) {
          var t = L(this);
          return (0, t.reject)(e), t.promise;
        },
      }),
      l(l.S + l.F * (c || !P), 'Promise', {
        resolve: function (e) {
          return w(c && this === a ? I : this, e);
        },
      }),
      l(
        l.S +
          l.F *
            !(
              P &&
              n(122)(function (e) {
                I.all(e).catch(k);
              })
            ),
        'Promise',
        {
          all: function (e) {
            var t = this,
              n = L(t),
              r = n.resolve,
              o = n.reject,
              i = E(function () {
                var n = [],
                  i = 0,
                  a = 1;
                v(e, !1, function (e) {
                  var c = i++,
                    u = !1;
                  n.push(void 0),
                    a++,
                    t.resolve(e).then(function (e) {
                      u || ((u = !0), (n[c] = e), --a || r(n));
                    }, o);
                }),
                  --a || r(n);
              });
            return i.e && o(i.v), n.promise;
          },
          race: function (e) {
            var t = this,
              n = L(t),
              r = n.reject,
              o = E(function () {
                v(e, !1, function (e) {
                  t.resolve(e).then(n.resolve, r);
                });
              });
            return o.e && r(o.v), n.promise;
          },
        }
      );
  },
  function (e, t) {
    e.exports = function (e, t, n) {
      var r = void 0 === n;
      switch (t.length) {
        case 0:
          return r ? e() : e.call(n);
        case 1:
          return r ? e(t[0]) : e.call(n, t[0]);
        case 2:
          return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
        case 3:
          return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
        case 4:
          return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
      }
      return e.apply(n, t);
    };
  },
  function (e, t, n) {
    var r = n(5),
      o = n(124).set,
      i = r.MutationObserver || r.WebKitMutationObserver,
      a = r.process,
      c = r.Promise,
      u = 'process' == n(42)(a);
    e.exports = function () {
      var e,
        t,
        n,
        s = function () {
          var r, o;
          for (u && (r = a.domain) && r.exit(); e; ) {
            (o = e.fn), (e = e.next);
            try {
              o();
            } catch (r) {
              throw (e ? n() : (t = void 0), r);
            }
          }
          (t = void 0), r && r.enter();
        };
      if (u)
        n = function () {
          a.nextTick(s);
        };
      else if (!i || (r.navigator && r.navigator.standalone))
        if (c && c.resolve) {
          var f = c.resolve(void 0);
          n = function () {
            f.then(s);
          };
        } else
          n = function () {
            o.call(r, s);
          };
      else {
        var l = !0,
          d = document.createTextNode('');
        new i(s).observe(d, { characterData: !0 }),
          (n = function () {
            d.data = l = !l;
          });
      }
      return function (r) {
        var o = { fn: r, next: void 0 };
        t && (t.next = o), e || ((e = o), n()), (t = o);
      };
    };
  },
  function (e, t, n) {
    var r = n(5),
      o = r.navigator;
    e.exports = (o && o.userAgent) || '';
  },
  function (e, t, n) {
    'use strict';
    var r = n(4),
      o = n(0),
      i = n(5),
      a = n(123),
      c = n(126);
    r(r.P + r.R, 'Promise', {
      finally: function (e) {
        var t = a(this, o.Promise || i.Promise),
          n = 'function' == typeof e;
        return this.then(
          n
            ? function (n) {
                return c(t, e()).then(function () {
                  return n;
                });
              }
            : e,
          n
            ? function (n) {
                return c(t, e()).then(function () {
                  throw n;
                });
              }
            : e
        );
      },
    });
  },
  function (e, t, n) {
    'use strict';
    var r = n(4),
      o = n(87),
      i = n(125);
    r(r.S, 'Promise', {
      try: function (e) {
        var t = o.f(this),
          n = i(e);
        return (n.e ? t.reject : t.resolve)(n.v), t.promise;
      },
    });
  },
  function (e, t, n) {
    'use strict';
    var r = n(194),
      o = n(198),
      i = function (e) {
        return { checkFeatures: Object(r.a)(e), external: Object(o.a)(e) };
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(18),
      a = n.n(i),
      c = n(90),
      u = function (e) {
        return '[object Object]' === {}.toString.call(e);
      },
      s = function (e) {
        return u(e)
          ? a()(e).filter(function (t) {
              return e[t];
            })
          : [];
      },
      f = function (e, t) {
        return new o.a(function (n) {
          var r = Object(c.a)(function (e) {
            n(s(e));
          });
          e.sendMessage('checkFeatures', { features: t, handlerName: r });
        });
      },
      l = function (e) {
        return function (t) {
          return e.isSupportedMethod('checkFeatures')
            ? e.callMethod('checkFeatures', t).then(JSON.parse).then(s)
            : f(e, t);
        };
      };
    t.a = l;
  },
  function (e, t, n) {
    n(196), (e.exports = n(0).Object.keys);
  },
  function (e, t, n) {
    var r = n(28),
      o = n(35);
    n(89)('keys', function () {
      return function (e) {
        return o(r(e));
      };
    });
  },
  function (e, t, n) {
    'use strict';
    var r = n(88),
      o = function () {
        return Object(r.a)().replace(/-/g, '').slice(0, 20);
      },
      i = function () {
        return 'kp_shopping_browser_cb_' + o();
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        e.sendMessage('external', t);
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(200),
      a = n(201),
      c = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
        return function (n, r) {
          return o.a.all([
            Object(i.a)({ actions: e, env: r, win: t }),
            Object(a.a)({ actions: e, env: r, options: n, win: t }),
          ]);
        };
      };
    t.a = c;
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(11),
      a = n.n(i),
      c = n(1),
      u = n.n(c),
      s = n(129),
      f = n(90),
      l = n(91),
      d = n(50),
      p = n(92),
      h = this,
      v = function () {
        return /^klarna([a-z]+)?:\/\//.test(
          (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).appSchema
        );
      },
      y = function (e) {
        var t = e.actions,
          n = e.env,
          r = e.win;
        return new u.a(
          (function () {
            var e = a()(
              o.a.mark(function e(i) {
                var a, c, u, s, y, g;
                return o.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((a = l.a.features.handshake),
                            (c = a.minimumSupportedNativeVersion),
                            (u = a.name),
                            Object(p.a)(c, n, r))
                          ) {
                            e.next = 3;
                            break;
                          }
                          return e.abrupt('return', i(null));
                        case 3:
                          return (e.next = 5), t.checkFeatures([u]);
                        case 5:
                          if (((s = e.sent), -1 !== s.indexOf(d.a.BROWSER_INFO_HANDSHAKE))) {
                            e.next = 8;
                            break;
                          }
                          return e.abrupt('return', i(null));
                        case 8:
                          (y = Object(f.a)(function (e) {
                            i(v(e) ? e : null);
                          })),
                            (g = { handlerName: y }),
                            t.external({ eventName: d.a.BROWSER_INFO_HANDSHAKE, eventData: g });
                        case 11:
                        case 'end':
                          return e.stop();
                      }
                  },
                  e,
                  h
                );
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })()
        );
      };
    t.a = Object(s.a)(y, l.a.handshakeTimeout, null);
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(11),
      a = n.n(i),
      c = n(30),
      u = n.n(c),
      s = n(93),
      f = n(88),
      l = n(129),
      d = n(92),
      p = n(91),
      h = this,
      v = function (e, t, n) {
        return e.reduce(function (e, r) {
          var o = r.minimumSupportedNativeVersion,
            i = r.name;
          return !o || Object(d.a)(o, t, n) ? [].concat(u()(e), [i]) : e;
        }, []);
      },
      y = function (e, t) {
        return function (n) {
          var r = Object(f.a)(),
            o = { message_id: r, message_type: n, session_krn: Object(s.a)(t) };
          return e.external({ eventName: n, eventData: o }), r;
        };
      },
      g = function (e) {
        return function (t) {
          return t.map(e);
        };
      },
      _ = Object(l.a)(
        function (e, t) {
          return e.checkFeatures(t);
        },
        p.a.sendFeatureMessagesTimeout,
        []
      ),
      m = (function () {
        var e = a()(
          o.a.mark(function e(t) {
            var n,
              r,
              i,
              a,
              c,
              s,
              f,
              l = t.actions,
              d = t.env,
              m = t.options,
              E = t.win;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (n = p.a.features),
                        (r = n.checkBeforeSend),
                        (i = n.alwaysSend),
                        (a = v(r, d, E)),
                        (e.next = 4),
                        _(l, a, E)
                      );
                    case 4:
                      return (
                        (c = e.sent),
                        (s = v(i, d, E)),
                        (f = g(y(l, m))),
                        e.abrupt('return', f([].concat(u()(c), u()(s))))
                      );
                    case 8:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              h
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })();
    t.a = m;
  },
  function (e, t, n) {
    'use strict';
    var r = n(50),
      o = n(93),
      i = function (e) {
        return function (t) {
          var n = { session_krn: Object(o.a)(t), session_id: t.sessionID };
          e.external({ eventName: r.a.SESSION_INITIATED, eventData: n });
        };
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = n(50),
      o = n(93),
      i = function (e) {
        return function (t) {
          var n = { session_krn: Object(o.a)(t), session_id: t.sessionID };
          e.external({ eventName: r.a.SESSION_APPROVED, eventData: n });
        };
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = n(50),
      o = n(90),
      i = function (e, t) {
        return function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = n.onAppForegrounded,
            a = n.onAppBackgrounded,
            c = void 0 === a ? function () {} : a,
            u = Object(o.a)(i),
            s = Object(o.a)(c),
            f = { url: t, onAppForegroundedHandlerName: u, onAppBackgroundedHandlerName: s };
          e.external({ eventName: r.a.OPEN_EXTERNAL_BROWSER, eventData: f });
        };
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = n(128),
      o = n(92),
      i = n(91),
      a = i.a.minimumSupportedNativeVersion,
      c = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
        try {
          return Object(o.a)(a, e, t) && !!Object(r.a)();
        } catch (e) {
          return !1;
        }
      };
    t.a = c;
  },
  function (e, t, n) {
    'use strict';
    function r() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
      try {
        if (e.currentScript instanceof HTMLScriptElement) return e.currentScript.src;
      } catch (e) {}
    }
    t.a = r;
  },
  function (e, t, n) {
    n(208), (e.exports = n(0).Object.setPrototypeOf);
  },
  function (e, t, n) {
    var r = n(4);
    r(r.S, 'Object', { setPrototypeOf: n(209).set });
  },
  function (e, t, n) {
    var r = n(8),
      o = n(17),
      i = function (e, t) {
        if ((o(e), !r(t) && null !== t)) throw TypeError(t + ": can't set as prototype!");
      };
    e.exports = {
      set:
        Object.setPrototypeOf ||
        ('__proto__' in {}
          ? (function (e, t, r) {
              try {
                (r = n(19)(Function.call, n(95).f(Object.prototype, '__proto__').set, 2)),
                  r(e, []),
                  (t = !(e instanceof Array));
              } catch (e) {
                t = !0;
              }
              return function (e, n) {
                return i(e, n), t ? (e.__proto__ = n) : r(e, n), e;
              };
            })({}, !1)
          : void 0),
      check: i,
    };
  },
  function (e, t, n) {
    n(211), (e.exports = n(0).Object.getPrototypeOf);
  },
  function (e, t, n) {
    var r = n(28),
      o = n(116);
    n(89)('getPrototypeOf', function () {
      return function (e) {
        return o(r(e));
      };
    });
  },
  function (e, t, n) {
    n(29), n(26), (e.exports = n(97).f('iterator'));
  },
  function (e, t, n) {
    n(214), n(49), n(217), n(218), (e.exports = n(0).Symbol);
  },
  function (e, t, n) {
    'use strict';
    var r = n(5),
      o = n(24),
      i = n(14),
      a = n(4),
      c = n(80),
      u = n(51).KEY,
      s = n(27),
      f = n(83),
      l = n(46),
      d = n(58),
      p = n(6),
      h = n(97),
      v = n(99),
      y = n(215),
      g = n(131),
      _ = n(17),
      m = n(8),
      E = n(28),
      b = n(22),
      w = n(79),
      A = n(45),
      O = n(56),
      S = n(216),
      R = n(95),
      I = n(86),
      T = n(16),
      k = n(35),
      L = R.f,
      P = T.f,
      C = S.f,
      x = r.Symbol,
      N = r.JSON,
      D = N && N.stringify,
      j = p('_hidden'),
      M = p('toPrimitive'),
      F = {}.propertyIsEnumerable,
      U = f('symbol-registry'),
      H = f('symbols'),
      B = f('op-symbols'),
      K = Object.prototype,
      W = 'function' == typeof x && !!I.f,
      G = r.QObject,
      V = !G || !G.prototype || !G.prototype.findChild,
      Y =
        i &&
        s(function () {
          return (
            7 !=
            O(
              P({}, 'a', {
                get: function () {
                  return P(this, 'a', { value: 7 }).a;
                },
              })
            ).a
          );
        })
          ? function (e, t, n) {
              var r = L(K, t);
              r && delete K[t], P(e, t, n), r && e !== K && P(K, t, r);
            }
          : P,
      z = function (e) {
        var t = (H[e] = O(x.prototype));
        return (t._k = e), t;
      },
      J =
        W && 'symbol' == typeof x.iterator
          ? function (e) {
              return 'symbol' == typeof e;
            }
          : function (e) {
              return e instanceof x;
            },
      q = function (e, t, n) {
        return (
          e === K && q(B, t, n),
          _(e),
          (t = w(t, !0)),
          _(n),
          o(H, t)
            ? (n.enumerable
                ? (o(e, j) && e[j][t] && (e[j][t] = !1), (n = O(n, { enumerable: A(0, !1) })))
                : (o(e, j) || P(e, j, A(1, {})), (e[j][t] = !0)),
              Y(e, t, n))
            : P(e, t, n)
        );
      },
      Z = function (e, t) {
        _(e);
        for (var n, r = y((t = b(t))), o = 0, i = r.length; i > o; ) q(e, (n = r[o++]), t[n]);
        return e;
      },
      Q = function (e, t) {
        return void 0 === t ? O(e) : Z(O(e), t);
      },
      X = function (e) {
        var t = F.call(this, (e = w(e, !0)));
        return (
          !(this === K && o(H, e) && !o(B, e)) && (!(t || !o(this, e) || !o(H, e) || (o(this, j) && this[j][e])) || t)
        );
      },
      $ = function (e, t) {
        if (((e = b(e)), (t = w(t, !0)), e !== K || !o(H, t) || o(B, t))) {
          var n = L(e, t);
          return !n || !o(H, t) || (o(e, j) && e[j][t]) || (n.enumerable = !0), n;
        }
      },
      ee = function (e) {
        for (var t, n = C(b(e)), r = [], i = 0; n.length > i; ) o(H, (t = n[i++])) || t == j || t == u || r.push(t);
        return r;
      },
      te = function (e) {
        for (var t, n = e === K, r = C(n ? B : b(e)), i = [], a = 0; r.length > a; )
          !o(H, (t = r[a++])) || (n && !o(K, t)) || i.push(H[t]);
        return i;
      };
    W ||
      ((x = function () {
        if (this instanceof x) throw TypeError('Symbol is not a constructor!');
        var e = d(arguments.length > 0 ? arguments[0] : void 0),
          t = function (n) {
            this === K && t.call(B, n), o(this, j) && o(this[j], e) && (this[j][e] = !1), Y(this, e, A(1, n));
          };
        return i && V && Y(K, e, { configurable: !0, set: t }), z(e);
      }),
      c(x.prototype, 'toString', function () {
        return this._k;
      }),
      (R.f = $),
      (T.f = q),
      (n(132).f = S.f = ee),
      (n(47).f = X),
      (I.f = te),
      i && !n(43) && c(K, 'propertyIsEnumerable', X, !0),
      (h.f = function (e) {
        return z(p(e));
      })),
      a(a.G + a.W + a.F * !W, { Symbol: x });
    for (
      var ne =
          'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(
            ','
          ),
        re = 0;
      ne.length > re;

    )
      p(ne[re++]);
    for (var oe = k(p.store), ie = 0; oe.length > ie; ) v(oe[ie++]);
    a(a.S + a.F * !W, 'Symbol', {
      for: function (e) {
        return o(U, (e += '')) ? U[e] : (U[e] = x(e));
      },
      keyFor: function (e) {
        if (!J(e)) throw TypeError(e + ' is not a symbol!');
        for (var t in U) if (U[t] === e) return t;
      },
      useSetter: function () {
        V = !0;
      },
      useSimple: function () {
        V = !1;
      },
    }),
      a(a.S + a.F * !W, 'Object', {
        create: Q,
        defineProperty: q,
        defineProperties: Z,
        getOwnPropertyDescriptor: $,
        getOwnPropertyNames: ee,
        getOwnPropertySymbols: te,
      });
    var ae = s(function () {
      I.f(1);
    });
    a(a.S + a.F * ae, 'Object', {
      getOwnPropertySymbols: function (e) {
        return I.f(E(e));
      },
    }),
      N &&
        a(
          a.S +
            a.F *
              (!W ||
                s(function () {
                  var e = x();
                  return '[null]' != D([e]) || '{}' != D({ a: e }) || '{}' != D(Object(e));
                })),
          'JSON',
          {
            stringify: function (e) {
              for (var t, n, r = [e], o = 1; arguments.length > o; ) r.push(arguments[o++]);
              if (((n = t = r[1]), (m(t) || void 0 !== e) && !J(e)))
                return (
                  g(t) ||
                    (t = function (e, t) {
                      if (('function' == typeof n && (t = n.call(this, e, t)), !J(t))) return t;
                    }),
                  (r[1] = t),
                  D.apply(N, r)
                );
            },
          }
        ),
      x.prototype[M] || n(23)(x.prototype, M, x.prototype.valueOf),
      l(x, 'Symbol'),
      l(Math, 'Math', !0),
      l(r.JSON, 'JSON', !0);
  },
  function (e, t, n) {
    var r = n(35),
      o = n(86),
      i = n(47);
    e.exports = function (e) {
      var t = r(e),
        n = o.f;
      if (n) for (var a, c = n(e), u = i.f, s = 0; c.length > s; ) u.call(e, (a = c[s++])) && t.push(a);
      return t;
    };
  },
  function (e, t, n) {
    var r = n(22),
      o = n(132).f,
      i = {}.toString,
      a = 'object' == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      c = function (e) {
        try {
          return o(e);
        } catch (e) {
          return a.slice();
        }
      };
    e.exports.f = function (e) {
      return a && '[object Window]' == i.call(e) ? c(e) : o(r(e));
    };
  },
  function (e, t, n) {
    n(99)('asyncIterator');
  },
  function (e, t, n) {
    n(99)('observable');
  },
  function (e, t, n) {
    e.exports = { default: n(220), __esModule: !0 };
  },
  function (e, t, n) {
    n(221);
    var r = n(0).Object;
    e.exports = function (e, t) {
      return r.create(e, t);
    };
  },
  function (e, t, n) {
    var r = n(4);
    r(r.S, 'Object', { create: n(56) });
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = function (n) {
          var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            o = arguments[2],
            i = arguments[3];
          if (y[e]) {
            var a = null != i ? i : Object(h.a)(n);
            y[e].event(n, l()({ level: a }, t, g[e], r), o, a);
          }
        };
      return {
        configure: function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = arguments[2];
          o(y[e], t) && ((y[e] = Object(p.a)(a(y[e], t, r))), (g[e] = n));
        },
        event: n,
        trace: Object(v.a)(n, d.a.TRACE),
        debug: Object(v.a)(n, d.a.DEBUG),
        info: Object(v.a)(n, d.a.INFO),
        warn: Object(v.a)(n, d.a.WARN),
        error: Object(v.a)(n, d.a.ERROR),
        fatal: Object(v.a)(n, d.a.FATAL),
        setLogLevel: function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 'ALL';
          try {
            if (y[e]) {
              var n = ('string' == typeof t ? t : 'ALL').toUpperCase(),
                r = d.a.hasOwnProperty(n) ? d.a[n] : d.a.ALL;
              y[e].setLogLevel(r);
            }
          } catch (e) {}
        },
      };
    }
    function o(e, t) {
      return !e || i(e, t);
    }
    function i(e, t) {
      var n = e.getConfig(),
        r = c(t);
      return (
        s()(r).filter(function (e) {
          return r[e] !== n[e];
        }).length > 0
      );
    }
    function a(e, t, n) {
      return l()({}, c(t), { instanceId: (e && e.getConfig().instanceId) || n });
    }
    function c(e) {
      return {
        baseUrl: e.client_event_base_url,
        client: 'kp',
        clientVersion: 'v1.10.0-1022-gdf85d0b2',
        environment: e.environment,
        sessionId: e.session_id,
      };
    }
    t.a = r;
    var u = n(18),
      s = n.n(u),
      f = n(2),
      l = n.n(f),
      d = n(68),
      p = n(226),
      h = n(227),
      v = n(228),
      y = {},
      g = {};
  },
  function (e, t, n) {
    'use strict';
    t.a = {
      create: function (e, t) {
        new e.Image().src = t;
      },
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(13),
      o = n.n(r);
    t.a = {
      create: function (e, t, n) {
        e.navigator.sendBeacon(t, o()(n));
      },
    };
  },
  function (e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }),
      n.d(t, 'ALL', function () {
        return r;
      }),
      n.d(t, 'TRACE', function () {
        return o;
      }),
      n.d(t, 'DEBUG', function () {
        return i;
      }),
      n.d(t, 'INFO', function () {
        return a;
      }),
      n.d(t, 'WARN', function () {
        return c;
      }),
      n.d(t, 'ERROR', function () {
        return u;
      }),
      n.d(t, 'FATAL', function () {
        return s;
      }),
      n.d(t, 'OFF', function () {
        return f;
      });
    var r = 0,
      o = 0,
      i = 1,
      a = 2,
      c = 3,
      u = 4,
      s = 5,
      f = 6;
  },
  function (e, t, n) {
    'use strict';
    function r() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.baseUrl,
        n = e.environment;
      return (
        t || console.log('[Error] client_event_base_url not provided in the clientToken!'),
        i(n) && t ? Object(a.b)(e) : o(e)
      );
    }
    function o(e) {
      return (
        (e.instanceId = e.instanceId || Math.floor(9e3 * Math.random()) + 1e3),
        console.info('[Tracking (disabled)] Setting up fake instance with config', e),
        {
          event: function (t, n, r, o) {
            e.logLevel > o || console.info('[Tracking (disabled)]', t, n, r, o, { config: e });
          },
          setLogLevel: function (t) {
            console.info('[Tracking (disabled)] Setting up fake instance logLevel to', t), (e.logLevel = t);
          },
          getConfig: function () {
            return e;
          },
        }
      );
    }
    function i(e) {
      return ['production', 'playground', 'staging'].indexOf(e) > -1;
    }
    t.a = r;
    var a = n(68);
  },
  function (e, t, n) {
    'use strict';
    var r = n(68),
      o = n(133),
      i = [
        o.API_SETUP,
        o.AUTHORIZE_CALLED,
        o.AUTHORIZE_COMPLETED,
        o.FULLSCREEN_IFRAME_CREATED,
        o.FULLSCREEN_IFRAME_LOADED,
        o.INIT_CALLED,
        o.LOAD_CALLED,
        o.LOAD_COMPLETED,
        o.MAIN_IFRAME_CREATED,
        o.MAIN_IFRAME_LOADED,
        o.MAIN_IFRAME_VISIBLE,
        o.NATIVE_HOOK_API_APPLICATION_FOREGROUNDED,
        o.REAUTHORIZE_CALLED,
        o.REAUTHORIZE_COMPLETED,
        o.FINALIZE_CALLED,
        o.FINALIZE_COMPLETED,
        o.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED,
        o.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_COMPLETED,
        o.REDIRECT,
        o.ONE_OFFERING_STATIC_FETCH_STARTED,
        o.ONE_OFFERING_STATIC_FETCH_COMPLETED,
        o.ONE_OFFERING_STATIC_API_CALLED,
        o.APF_ABORTED,
        o.APF_COMPLETED,
        o.APF_LIB_FETCH_STARTED,
        o.APF_LIB_FETCH_COMPLETED,
        o.APF_TRIGGERED,
        o.CSP_VIOLATION,
        'main_iframe_rendered',
      ],
      a = [
        o.AUTHORIZE_UNEXPECTED_ERROR,
        o.INVALID_CLIENT_TOKEN_SIGNATURE,
        o.ONE_OFFERING_STATIC_IFRAME_STYLES_ERROR,
        o.ONE_OFFERING_CREATE_IFRAME_ERROR,
        o.CSP_VIOLATION_REGISTRATION_FAILED,
      ],
      c = [
        o.AUTHORIZE_FAILED,
        o.FULLSCREEN_IFRAME_TIMED_OUT,
        o.LOAD_FAILED,
        o.MAIN_IFRAME_TIMED_OUT,
        o.REAUTHORIZE_FAILED,
        o.FINALIZE_FAILED,
        o.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_ERROR,
        o.REDIRECT_FAILED,
        o.ONE_OFFERING_STATIC_FETCH_ERROR,
        o.APF_UNHANDLED_ERROR,
        o.APF_LIB_FETCH_ERROR,
      ],
      u = function (e) {
        return i.indexOf(e) >= 0 ? r.a.INFO : a.indexOf(e) >= 0 ? r.a.WARN : c.indexOf(e) >= 0 ? r.a.ERROR : r.a.DEBUG;
      };
    t.a = u;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e, t) {
      return function (n, r, o) {
        return e(n, r, o, t);
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(36),
      o = n.n(r),
      i = n(2),
      a = n.n(i),
      c = n(30),
      u = n.n(c),
      s = n(66),
      f = n.n(s),
      l = n(136),
      d = n(32),
      p = function (e) {
        return (
          'object' === (void 0 === e ? 'undefined' : f()(e)) &&
          'kp-client-local-experiments' === (e.reference || e.name) &&
          e.variate &&
          'control' !== e.variate
        );
      },
      h = function (e) {
        var t = void 0;
        try {
          (Object(d.a)() || e.some(p)) &&
            (t = JSON.parse(l.a.get('__klarna_experiments__'))) &&
            t.length &&
            console.warn('Overriding experiments with sessionStorage:', t);
        } catch (e) {}
        return t || [];
      },
      v = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        try {
          var t = h(e);
          return [].concat(u()(e), u()(t)).reduce(function (e, t) {
            return 'object' === (void 0 === t ? 'undefined' : f()(t)) && (t.reference || t.name)
              ? a()({}, e, o()({}, t.reference || t.name, t))
              : e;
          }, {});
        } catch (e) {}
        return {};
      };
    t.a = v;
  },
  function (e, t, n) {
    'use strict';
    var r = n(33),
      o = function (e) {
        var t = Object(r.a)(e, 'app-version');
        if (t && 'string' == typeof t.variate) {
          var n = t.parameters,
            o = void 0 === n ? {} : n,
            i = t.variate;
          return o.version || i;
        }
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(1),
      a = n.n(i),
      c = n(11),
      u = n.n(c);
    t.a = (function () {
      function e(e) {
        return t.apply(this, arguments);
      }
      var t = u()(
        o.a.mark(function e(t) {
          return o.a.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt(
                      'return',
                      new a.a(function (e, n) {
                        var r = document.createElement('script');
                        (r.src = t),
                          r.addEventListener('load', function () {
                            return e();
                          }),
                          r.addEventListener('error', function (e) {
                            return n(e);
                          }),
                          document.body.appendChild(r);
                      })
                    );
                  case 1:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this
          );
        })
      );
      return e;
    })();
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(233),
      a = n.n(i),
      c = n(15),
      u = n.n(c),
      s = n(242),
      f = n(243),
      l = [],
      d = {},
      p = {},
      h = void 0,
      v = function () {
        for (; l.length; ) {
          var e = l.shift(),
            t = u()(e, 3),
            n = t[0],
            r = t[1],
            o = t[2];
          g(n, r).then(o);
        }
      },
      y = function () {
        return Object(f.a)().then(function (e) {
          e.addReceiver('KlarnaPayments', function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.action,
              n = e.messageId,
              r = e.params;
            'function' == typeof d[n] && d[n](r || {}),
              p[t] instanceof a.a &&
                p[t].forEach(function (e) {
                  'function' == typeof e && e(r || {});
                });
          }),
            (h = e),
            v();
        });
      },
      g = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return h
          ? new o.a(function (n) {
              var r = Object(s.a)();
              (d[r] = n),
                h.postMessage({ receiver: 'Native', sender: 'KlarnaPayments', messageId: r, action: e, params: t });
            })
          : new o.a(function (n) {
              l.push([e, t, n]);
            });
      },
      _ = function (e, t) {
        return (
          p[e] || (p[e] = new a.a()),
          p[e].add(t),
          function () {
            p[e].delete(t);
          }
        );
      };
    t.a = { init: y, callAction: g, onAction: _ };
  },
  function (e, t, n) {
    e.exports = { default: n(234), __esModule: !0 };
  },
  function (e, t, n) {
    n(49), n(29), n(26), n(235), n(238), n(240), n(241), (e.exports = n(0).Set);
  },
  function (e, t, n) {
    'use strict';
    var r = n(138),
      o = n(40);
    e.exports = n(101)(
      'Set',
      function (e) {
        return function () {
          return e(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      },
      {
        add: function (e) {
          return r.def(o(this, 'Set'), (e = 0 === e ? 0 : e), e);
        },
      },
      r
    );
  },
  function (e, t, n) {
    var r = n(237);
    e.exports = function (e, t) {
      return new (r(e))(t);
    };
  },
  function (e, t, n) {
    var r = n(8),
      o = n(131),
      i = n(6)('species');
    e.exports = function (e) {
      var t;
      return (
        o(e) &&
          ((t = e.constructor),
          'function' != typeof t || (t !== Array && !o(t.prototype)) || (t = void 0),
          r(t) && null === (t = t[i]) && (t = void 0)),
        void 0 === t ? Array : t
      );
    };
  },
  function (e, t, n) {
    var r = n(4);
    r(r.P + r.R, 'Set', { toJSON: n(139)('Set') });
  },
  function (e, t, n) {
    var r = n(37);
    e.exports = function (e, t) {
      var n = [];
      return r(e, !1, n.push, n, t), n;
    };
  },
  function (e, t, n) {
    n(103)('Set');
  },
  function (e, t, n) {
    n(104)('Set');
  },
  function (e, t, n) {
    'use strict';
    var r = (function (e) {
      return function () {
        return String(++e);
      };
    })(0);
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(244),
      a = n(245),
      c = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
        return e.__KlarnaNativeHook
          ? o.a.resolve(e.__KlarnaNativeHook)
          : Object(i.a)(a.a.sdkBridgeScriptURL).then(function () {
              return e.__KlarnaNativeHook;
            });
      };
    t.a = c;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : document;
        return new o.a(function (r, o) {
          setTimeout(function () {
            o(new Error('Loading of ' + e + ' timed out.'));
          }, t);
          var i = n.createElement('script');
          (i.src = e), (i.onload = r), n.body.appendChild(i);
        });
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    t.a = { sdkBridgeScriptURL: 'https://x.klarnacdn.net/mobile-sdk/mobile-js-snippet/v1/app.min.js' };
  },
  function (e, t, n) {
    'use strict';
    var r = [],
      o = function (e) {
        Array.isArray(e) && (r = e);
      },
      i = function () {
        return r;
      },
      a = function (e) {
        return r.indexOf(e) > -1;
      };
    t.a = { set: o, get: i, has: a };
  },
  function (e, t, n) {
    'use strict';
    var r = n(248),
      o = n(249),
      i = n(250),
      a = n(251),
      c = n(252),
      u = n(253),
      s = n(254),
      f = n(255),
      l = n(256),
      d = n(257),
      p = n(258),
      h = n(259),
      v = n(260),
      y = n(261),
      g = n(262),
      _ = n(263),
      m = function (e) {
        var t = e.adapter,
          n = e.featuresStore;
        return {
          fullscreenMoveWebView: Object(r.a)(t),
          fullscreenReplaceOverlay: Object(o.a)(t),
          fullscreenReplaceWebView: Object(i.a)(t),
          fullscreenRestoreWebView: Object(a.a)(t),
          getData: Object(c.a)(t),
          handshake: Object(u.a)(t, n),
          heightChanged: Object(s.a)(t),
          hideInternalBrowser: Object(f.a)(t),
          onApplicationBackgrounded: Object(l.a)(t),
          onApplicationForegrounded: Object(d.a)(t),
          openExternalApp: Object(p.a)(t),
          openExternalBrowser: Object(h.a)(t),
          putData: Object(v.a)(t),
          setExperiments: Object(y.a)(t),
          show3DSecure: Object(g.a)(t),
          showInternalBrowser: Object(_.a)(t),
        };
      };
    t.a = m;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function () {
        return e.callAction('fullscreenMoveWebView', { shouldScrollToTop: 'true' });
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function () {
        return e.callAction('fullscreenReplaceOverlay');
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function () {
        return e.callAction('fullscreenReplaceWebView');
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function () {
        return e.callAction('fullscreenRestoreWebView');
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        return e.callAction('getData', { key: t });
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e, t) {
        return function () {
          return e
            .callAction('handshake', { componentName: 'KlarnaPayments', componentVersion: 'v1.10.0-1022-gdf85d0b2' })
            .then(function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return o(t, e), e;
            });
        };
      },
      o = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = JSON.parse(t.features || '[]'),
          r = n.filter(function (e) {
            return 'api-features' !== e;
          });
        e.set(r);
      };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        return e.callAction('heightChanged', { height: String(t) });
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function () {
        return e.callAction('hideInternalBrowser');
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        if ('function' != typeof t) throw new TypeError('`callback` is not a function.');
        return e.onAction('applicationBackgrounded', t);
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        if ('function' != typeof t) throw new TypeError('`callback` is not a function.');
        return e.onAction('applicationForegrounded', t);
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        return e.callAction('openExternalApp', { url: t });
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        return e.callAction('openExternalBrowser', { url: t });
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t, n) {
        return e.callAction('putData', { key: t, value: void 0 === n ? void 0 : String(n) });
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(13),
      o = n.n(r),
      i = function (e) {
        return function (t) {
          e.callAction('setExperiments', { experiments: o()(t) });
        };
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = function (e) {
      return function (t) {
        return e.callAction('show3DSecure', t);
      };
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(2),
      o = n.n(r),
      i = n(1),
      a = n.n(i),
      c = n(13),
      u = n.n(c),
      s = function (e) {
        return function (t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = function (t) {
              return e.callAction('showInternalBrowser', t);
            },
            i = n.hideOnUrls;
          if (Array.isArray(i) && i.filter(Boolean).length) {
            return r({ url: t, hideOnUrls: u()(i) }).then(function (t) {
              return t.success
                ? new a.a(function (t) {
                    var n = e.onAction('hideOnUrlInternalBrowser', function (e) {
                      i.indexOf(e.cause) > -1 && (n(), t(o()({}, e, { hidden: !0 })));
                    });
                  })
                : t;
            });
          }
          return r({ url: t });
        };
      };
    t.a = s;
  },
  function (e, t, n) {
    'use strict';
    var r = function () {
      return !!(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).__KlarnaNativeHook;
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window;
      return (
        !!(e.webkit && e.webkit.messageHandlers && e.webkit.messageHandlers.KlarnaNativeHookMessageHandler) ||
        !!e.KlarnaNativeHookMessageHandler
      );
    };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      return Object(p.a)(document, 'securitypolicyviolation', function (n) {
        if (n.blockedURI.match(/klarnacdn\.net|klarna\.com/) && !(n.blockedURI.indexOf(t) > -1)) {
          var r = l()(s()(n)).reduce(function (e, t) {
            return c()({}, e, i()({}, t, n[t]));
          }, {});
          e.event(d.c.CSP_VIOLATION, {}, r);
        }
      });
    }
    var o = n(36),
      i = n.n(o),
      a = n(2),
      c = n.n(a),
      u = n(38),
      s = n.n(u),
      f = n(18),
      l = n.n(f),
      d = n(7),
      p = n(141);
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
      o = function () {
        return r.replace(/[xy]/g, function (e) {
          var t = (16 * Math.random()) | 0;
          return ('x' === e ? t : (3 & t) | 8).toString(16);
        });
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    var r = n(25),
      o = n.n(r),
      i = n(30),
      a = n.n(i),
      c = n(269),
      u = n.n(c),
      s = n(1),
      f = n.n(s),
      l = n(2),
      d = n.n(l),
      p = n(15),
      h = n.n(p),
      v = n(3),
      y = (n(273), n(20)),
      g = n(7),
      _ = n(21),
      m = n(70),
      E = n(53),
      b = n(71),
      w = n(72),
      A = n(277),
      O = n(73),
      S = n(320),
      R = n(152),
      I = n(136),
      T = (n(321), n(151)),
      k = n(12),
      L = n(48),
      P = n(74),
      C = n(325),
      x = n(111),
      N = function (e, t) {
        return function (n, r, i) {
          var c = D(n, r, i),
            s = h()(c, 3);
          if (((n = s[0]), (r = s[1]), (i = s[2]), void 0 === n.client_token)) {
            if (!v.a.get(e + ':initialized')) throw (i({ show_form: !1 }), new y.a());
          } else v.a.get(e + ':rawClientToken') !== n.client_token && t.init({ client_token: n.client_token });
          var l = Object(_.a)(),
            p = v.a.get(e + ':clientToken'),
            N = (p.environment, p.experiments),
            M = p.scheme,
            F = p.sessionType,
            U = p.sessionID,
            H = Object(g.b)(e + ':' + U, { api: e, oid: l }),
            B = n.payment_method_category,
            K = n.payment_method_categories,
            W = n.preferred_payment_method,
            G = n.instance_id,
            V = {
              payment_method_category: B,
              payment_method_categories: K,
              preferred_payment_method: W,
              instance_id: G,
            },
            Y = function (e) {
              return e && H.event(g.c.LOAD_FAILED, d()({}, V, { error: e })), i({ show_form: !1 });
            };
          H.event(g.c.LOAD_CALLED, d()({}, V, { client_token: n.client_token }));
          var z = G || B || F || e;
          v.a.set(z + ':' + U + ':paymentMethodCategories', K);
          var J = n.container;
          if ('string' != typeof J) {
            if (!(J instanceof HTMLElement))
              throw (
                (Y('TypeError(options.container)'),
                new TypeError('Property `options.container` must be a string (CSS selector) or HTMLElement'))
              );
          } else if (!(J = document.querySelector(J))) throw (Y('InvalidContainerSelectorError'), new y.g());
          Object(w.a)({ scheme: M, sessionType: F, options: n, onError: Y }), v.a.set(e + ':' + U + ':loadOptions', n);
          v.a.get(e + ':rawClientToken');
          try {
            if (v.a.get(e + ':' + U + ':isUtopiaStaticWidgetEnabled'))
              return void Object(A.a)({
                apiId: e,
                callback: i,
                clientToken: p,
                container: J,
                data: r,
                name: z,
                onError: Y,
                options: n,
                tracker: H,
              });
          } catch (e) {
            return void Y(e.message);
          }
          var q = Object(m.a)(),
            Z = I.a.get('_klarna_access_token'),
            Q = Object(b.a)({ id: e, instanceID: G, paymentMethodCategory: B }),
            X = v.a.get(e + ':integratingProduct'),
            $ = function (t) {
              var n = function (n) {
                  var o = n.mdid,
                    a = n.inAppSdkParams,
                    c = n.shoppingBrowserParams,
                    u = n.shoppingBrowserPendingMessages,
                    s = v.a.get(e + ':' + U + ':isEligibleUtopiaEnvironment'),
                    f = d()(
                      {
                        api: e,
                        integratingProduct: X,
                        integratorHostname: Object(x.a)(),
                        isOnPgwThirdPartyChallengeRequestedSupported: Object(P.a)({
                          experiments: N,
                          id: e,
                          sessionID: U,
                        }),
                        libVersion: 'v1.10.0-1022-gdf85d0b2',
                        mdid: o,
                        nativeHookApiSupported: k.b.isSupported(),
                        operationID: l,
                        paymentMethodCategories: K,
                        paymentMethodCategory: B,
                        preferredPaymentMethod: W,
                        resetApplication: Q,
                        upstreamData: q,
                        userAccountAccessToken: Z,
                      },
                      a ? { inAppSdkParams: a } : {},
                      u ? { shoppingBrowserPendingMessages: u } : {},
                      c ? { shoppingBrowserParams: c } : {},
                      void 0 !== s ? { isEligibleUtopiaEnvironment: s } : {},
                      p
                    );
                  t.call('load', f, r, function () {
                    H.event(g.c.LOAD_COMPLETED), i.apply(void 0, arguments);
                  });
                },
                c = {};
              try {
                if (L.a.isSupported('production')) {
                  var s = v.a.get(e + ':' + U + ':shoppingBrowser:initPromise');
                  s &&
                    (c.shoppingBrowserNativeApi = new f.a(function (t) {
                      try {
                        s.then(function (n) {
                          var r = Object(C.a)({ id: e, sessionID: U, scheme: M });
                          t(
                            Array.isArray(n) && n.length
                              ? { shoppingBrowserPendingMessages: n, shoppingBrowserParams: r }
                              : { shoppingBrowserParams: r }
                          );
                        }).finally(function () {
                          t({});
                        });
                      } catch (e) {
                        t({});
                      }
                    }));
                }
              } catch (e) {
                delete c.shoppingBrowserNativeApi;
              }
              try {
                k.b.isSupported() &&
                  (c.nativeHookApi = new f.a(function (e) {
                    try {
                      H.event(g.c.LOAD_NATIVE_HOOK_API_HANDSHAKE_WAIT_STARTED),
                        Object(S.a)(5e3)
                          .then(function () {
                            H.event(g.c.LOAD_NATIVE_HOOK_API_HANDSHAKE_WAIT_FINISHED);
                            var t = Object(E.a)();
                            return T.a
                              .withTimeout(j, 5e3)
                              .then(function () {
                                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                                  r = n.value;
                                e({ mdid: r, inAppSdkParams: t });
                              })
                              .catch(function () {
                                e({ mdid: null, inAppSdkParams: t });
                              });
                          })
                          .catch(function (e) {
                            e &&
                              'Handshake timeout' === e.message &&
                              (H.event(g.c.LOAD_NATIVE_HOOK_API_HANDSHAKE_WAIT_TIMED_OUT),
                              k.b.setIsSupportedOverride(!1));
                          })
                          .finally(function () {
                            e({ mdid: null });
                          });
                    } catch (t) {
                      e({ mdid: null });
                    }
                  }));
              } catch (e) {
                delete c.nativeHookApi;
              }
              var h = { mdid: Object(R.a)() },
                y = u()(c);
              if (y.length)
                try {
                  f.a
                    .all(y)
                    .then(function (e) {
                      n(o.a.apply(Object, [h].concat(a()(e))));
                    })
                    .catch(function () {
                      n(h);
                    });
                } catch (e) {
                  n(h);
                }
              else n(h);
            };
          Object(O.a)({ id: e, clientToken: p, container: J, tracker: H, options: n }).then($, function () {
            return Y('bootstrap_failed');
          });
        };
      },
      D = function (e, t, n) {
        if ('function' == typeof t) {
          var r = [t, {}];
          (n = r[0]), (t = r[1]);
        } else (t = t || {}), (n = n || function () {});
        return [e || {}, t, n];
      },
      j = function () {
        return k.b.getData('klarna-mdid');
      };
    t.a = N;
  },
  function (e, t, n) {
    e.exports = { default: n(270), __esModule: !0 };
  },
  function (e, t, n) {
    n(271), (e.exports = n(0).Object.values);
  },
  function (e, t, n) {
    var r = n(4),
      o = n(272)(!1);
    r(r.S, 'Object', {
      values: function (e) {
        return o(e);
      },
    });
  },
  function (e, t, n) {
    var r = n(14),
      o = n(35),
      i = n(22),
      a = n(47).f;
    e.exports = function (e) {
      return function (t) {
        for (var n, c = i(t), u = o(c), s = u.length, f = 0, l = []; s > f; )
          (n = u[f++]), (r && !a.call(c, n)) || l.push(e ? [n, c[n]] : c[n]);
        return l;
      };
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(25),
      o = (n.n(r), n(274)),
      i = n.n(o),
      a = n(275),
      c = n.n(a),
      u = n(276),
      s = n.n(u);
    !(function () {
      i.a, c.a, s.a;
    })();
  },
  function (e, t) {
    e.exports = {
      e: 'AQAB',
      n: 'rvgQXST3R7oGUm_EVD4-Yq4Z2xPsiYIpSiSvn6oP93Grybftb4gAI7LuFbIAjWbqA4eWU7A9N7v4e9z7t-ObtLlLEZU3C0ybo47iCza7-URcI74sDb755BuucHsz2yVa3dzRVNvL_g5aryCETgomXnSKBC45SiE8jvpvJxUdFpxDhRLHZ7aPx1_TefDkvcQ6ZCRpT8HZqudZ0Ire0FZusj11EmZ8zRy3HTq-ERm5mn8mBNsswywbWrfOnJHLMmfX8cOxhywdik1lQYXxTVyLE7UImN3bf6dexVmUparrVnXpGV3pWB5SJLKFNVvbnrElqosaW53hMBkP6mOta9ibJw',
      kty: 'RSA',
      kid: 'LkO1jkj0htwzI32KnlH4LS0FY___65O25rXiXOxqzgQ',
    };
  },
  function (e, t) {
    e.exports = {
      e: 'AQAB',
      n: '7-gQDoUGlVFyDzLw4D2OQR8fDR_PTmztBNpxG2M7AhJ-S_ReNSVPLucZFv1WnXlXhcl2SxAyyKaBZObpztwcGNuEuRQCh_kerhLkbeu_JUgcFf5iHhq5kWEvBEI_knOuAcKVkH5ueHd8VixvxVEcYVkDwyYj8j0SZyzwT8Nx6dFz0nU-XGmMoDZSjNJgKDDRMdX6DJTLyLqW5GY531wAUYUZxzJgdSaMMK355cRV1fR2YEI52yhaUBGdESsAZeZCvbENcdOIGirrFUGy5yKhv-4evaO-AMBewHePa2qqSppf3URfFiVkrmPdkT4GTm5xc6u9V0n2e21SpR60IbsRyQ',
      kty: 'RSA',
      kid: 'G-eRSv2-sWKgRaVdk92o7NpISOka-z1wgXpverflxaw',
    };
  },
  function (e, t) {
    e.exports = {
      e: 'AQAB',
      n: 'maQhqXBSqr-Qyb3YftZu_5ZqytDEAWn2frrtG5VKrEJLOfl6xNNZJ4IvA4adykPWrceXU3F6Y_cDx-2ZO-w2UccHa2mNBQyDqQaQBn5xp2BZvPNFRzLPTwac_msIrgSa4yvbaUhU-d4uHkfzOXyeK9dDf8Thk7FurN0Blyqztu6jaYfhukYfO0c35_C5Xox1jg3w8OhgaNc6ho0ATTyxDJXTT9Eh0FwgmdZEC01kioRK3hkEb5UvXufcXhowDrSCYoCiwjRi5hDoBxYgYirjhckQVQ-KqgeNs5ikcXRTCYezN_NLFhim-agyIAlE3aXFYFxrBWS1mZfx9Yc7EIOB8w',
      kty: 'RSA',
      kid: 'tkiJj_cFIXuHgXhnzU6DtJGcwbWN4FV3pT5suTPKvYM',
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = e.apiId,
        n = e.callback,
        r = e.clientToken,
        o = e.container,
        a = e.data,
        u = e.name,
        m = e.onError,
        E = e.options,
        b = e.tracker,
        w = r.experiments,
        A = r.sessionID;
      f.a.set(u + ':' + A + ':updateFromLoad', a);
      try {
        var O = l.a.app.main.id(u),
          S = o.querySelector('#' + O);
        if (S) {
          try {
            'function' == typeof S.removeLoader && S.removeLoader();
          } catch (e) {}
          S.remove();
        }
      } catch (e) {}
      var R = Object(h.a)(E.payment_method_category, E.payment_method_categories),
        I = R + ':staticPaymentMethodRegistry',
        T = R + ':staticPaymentMethodApiMethodName';
      f.a.get(I) || (f.a.set(T, '__kp_static_api_' + Object(p.a)() + '__'), f.a.set(I, new s.a()));
      var k = f.a.get(I),
        L = f.a.get(T);
      window[L] || c()(window, L, { value: Object(v.a)(t, A, R, b.event) });
      var P = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          n = f.a.get(t + ':' + A + ':oneOfferingVersion'),
          a = f.a.get(t + ':' + A + ':oneOfferingStaticVariant'),
          c = f.a.get(t + ':' + A + ':oneOfferingBaseUrl'),
          u = f.a.get(t + ':' + A + ':oneOfferingFallbackBaseUrl');
        return Object(y.a)(
          i()(
            {
              apiId: t,
              apiMethodName: L,
              category: R,
              config: l.a.app.staticPaymentMethod({
                oneOfferingBaseUrl: c,
                oneOfferingFallbackBaseUrl: u,
                oneOfferingStaticVariant: a,
                oneOfferingVersion: n,
              }),
              container: o,
              copyAndApplyIframeStyles: !0,
              isDynamic: 'true' === Object(g.b)(w, 'utopia-static-widget', 'dynamic'),
              isOpf: Object(_.a)(w),
              registry: k,
            },
            r,
            e
          ),
          b.event
        );
      };
      P().then(
        function () {
          b.event(d.c.LOAD_COMPLETED), n({ show_form: !0 });
        },
        function () {
          m('create_static_payment_method_failed');
        }
      ),
        f.a.set(u + ':createStaticPaymentMethod', P);
    }
    t.a = r;
    var o = n(2),
      i = n.n(o),
      a = n(61),
      c = n.n(a),
      u = n(278),
      s = n.n(u),
      f = n(3),
      l = n(9),
      d = n(7),
      p = n(21),
      h = n(106),
      v = n(284),
      y = n(148),
      g = n(33),
      _ = n(105);
  },
  function (e, t, n) {
    e.exports = { default: n(279), __esModule: !0 };
  },
  function (e, t, n) {
    n(49), n(29), n(26), n(280), n(281), n(282), n(283), (e.exports = n(0).Map);
  },
  function (e, t, n) {
    'use strict';
    var r = n(138),
      o = n(40);
    e.exports = n(101)(
      'Map',
      function (e) {
        return function () {
          return e(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      },
      {
        get: function (e) {
          var t = r.getEntry(o(this, 'Map'), e);
          return t && t.v;
        },
        set: function (e, t) {
          return r.def(o(this, 'Map'), 0 === e ? 0 : e, t);
        },
      },
      r,
      !0
    );
  },
  function (e, t, n) {
    var r = n(4);
    r(r.P + r.R, 'Map', { toJSON: n(139)('Map') });
  },
  function (e, t, n) {
    n(103)('Map');
  },
  function (e, t, n) {
    n(104)('Map');
  },
  function (e, t, n) {
    'use strict';
    var r = n(13),
      o = n.n(r),
      i = n(10),
      a = n.n(i),
      c = n(15),
      u = n.n(c),
      s = n(2),
      f = n.n(s),
      l = n(11),
      d = n.n(l),
      p = n(12),
      h = n(9),
      v = n(3),
      y = n(107),
      g = n(145),
      _ = n(7),
      m = n(142),
      E = this,
      b = function (e, t) {
        return (v.a.get(e + ':' + t + ':loadOptions') || {}).on_show_external_document;
      },
      w = function (e, t) {
        return function (n) {
          var r = n.url;
          if (!Object(m.a)(r)) throw new Error('URL hostname not supported.');
          var o = b(e, t);
          p.b.isSupported()
            ? p.b.showInternalBrowser(r).then(function (e) {
                'true' !== e.success && window.open(r);
              })
            : 'function' == typeof o
            ? o(r)
            : window.open(r);
        };
      },
      A = function (e, t, n, r, o) {
        return (function () {
          var i = d()(
            a.a.mark(function i(c) {
              var s,
                l,
                d,
                p,
                _,
                A,
                O,
                S,
                R,
                I,
                T,
                k,
                L,
                P,
                C,
                x = c.url,
                N = c.hidden;
              return a.a.wrap(
                function (i) {
                  for (;;)
                    switch ((i.prev = i.next)) {
                      case 0:
                        if (Object(m.a)(x)) {
                          i.next = 2;
                          break;
                        }
                        throw new Error('URL hostname not supported.');
                      case 2:
                        if ('function' != typeof (s = b(e, t))) {
                          i.next = 6;
                          break;
                        }
                        return (
                          N || ((l = 'hide_close_controls=true'), (d = /&$/.test(x) ? l : '&' + l), s(x + d)),
                          i.abrupt('return')
                        );
                      case 6:
                        if (((p = n + ':staticPaymentMethodFullscreenReference'), (_ = v.a.get(p) || {}), !_[x])) {
                          i.next = 14;
                          break;
                        }
                        if (((A = _[x]), (O = A.api), (S = A.id), !document.getElementById(S))) {
                          i.next = 14;
                          break;
                        }
                        if (!N) {
                          i.next = 13;
                          break;
                        }
                        return i.abrupt('return');
                      case 13:
                        return i.abrupt('return', O.show());
                      case 14:
                        return (
                          (R = f()(
                            { container: document.body, scrollBlockStyleContainer: document.body, name: n, url: x },
                            h.a.app.fullscreen
                          )),
                          (I = Object(y.a)(e, r.category)),
                          (T = { openExternalLink: w(e, t) }),
                          (i.next = 19),
                          Object(g.a)(R, I, o, T)
                        );
                      case 19:
                        (k = i.sent),
                          (L = u()(k, 3)),
                          (P = L[0]),
                          (C = L[2]),
                          (_[x] = { api: C, id: P.id }),
                          v.a.set(p, _),
                          N || C.show();
                      case 26:
                      case 'end':
                        return i.stop();
                    }
                },
                i,
                E
              );
            })
          );
          return function (e) {
            return i.apply(this, arguments);
          };
        })();
      },
      O = function (e) {
        return function (t) {
          var n = t.url;
          return e.openInFullscreen({ hidden: !0, url: n });
        };
      },
      S = function (e, t, n, r) {
        return function (i, a) {
          var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            u = v.a.get(n + ':staticPaymentMethodRegistry'),
            s = u && u.get(i);
          if (!s) throw new Error('Invalid API key.');
          r(_.c.ONE_OFFERING_STATIC_API_CALLED, { method_name: a, method_options: o()(c) });
          var f = [e, t, n, s, r],
            l = { openExternalLink: w.apply(void 0, f), openInFullscreen: A.apply(void 0, f) };
          if (((l.preloadInFullscreen = O(l)), !l.hasOwnProperty(a))) throw new Error('Method not supported.');
          return l[a](c);
        };
      };
    t.a = S;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      RegExp(t).test(e.className) || (e.className ? (e.className += ' ' + t) : (e.className = t));
    }
    function o(e, t) {
      var n = e.className.split(' ');
      e.className = n
        .filter(function (e) {
          return e !== t;
        })
        .join(' ');
    }
    (t.a = r), (t.b = o);
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = e.loaderType,
        n = document.createElement('div'),
        r = 'kp-loader-' + Date.now().toString(16);
      if (t === o.c.SKELETON) {
        n.innerHTML =
          '\n      <div class="klarna-payments-skeleton">\n        <div class="klarna-payments-skeleton-container">\n          <div class="klarna-payments-skeleton-paragraph is-short"></div>\n          <div class="klarna-payments-skeleton-paragraph is-short"></div>\n          <div class="klarna-payments-skeleton-paragraph"></div>\n        </div>\n        <div class="klarna-payments-skeleton-paragraph is-medium"></div>\n      </div>\n    ';
        var i = n.querySelector('.klarna-payments-skeleton'),
          a = document.createElement('style');
        return (
          (a.innerHTML =
            '      \n      .klarna-payments-skeleton {\n        display: flex;\n        flex-direction: column;\n        width: 100%;\n        max-width: 600px;\n        min-width: 240px;\n        opacity: 1;\n        transition: opacity ' +
            o.a +
            's ease-in;\n      }\n      \n      .klarna-payments-skeleton.is-hidden {\n        opacity: 0;\n      }\n\n      .klarna-payments-skeleton-container {\n        display: flex;\n        flex-direction: column;\n        padding: 10px 15px 0;\n        margin-bottom: 10px;\n        background-color: #f0eeeb;\n      }\n      \n      .klarna-payments-skeleton-paragraph {\n        margin: 0 0 10px;\n        background-color: #e1dfdf;\n        height: 15px;\n        width: 100%;\n\n        animation-name: shimmer;\n        animation-duration: 1.5s;\n        animation-iteration-count: infinite;\n\n        -webkit-animation-name: shimmer;\n        -webkit-animation-duration: 1.5s;\n        -webkit-animation-iteration-count: infinite;\n      }\n      \n      .klarna-payments-skeleton-paragraph.is-short {\n        width: 33%;\n      }\n      \n      .klarna-payments-skeleton-paragraph.is-medium {\n        width: 66%;\n      }\n      \n      @keyframes shimmer {\n        0% {\n          opacity: 1;\n        }\n        30% {\n          opacity: 0.6;\n        }\n        50% {\n          opacity: 1;\n        }\n        100% {\n          opacity: 1;\n        }\n      }\n    '),
          { el: i, styles: a }
        );
      }
      var c = document.createElement('style');
      return (
        (c.innerHTML =
          '\n    .klarna-payments-loader {\n      display: inline-block;\n      position: relative;\n      width: 30px;\n      height: 30px;\n      box-sizing: border-box;\n      transform: scale(.65);\n    }\n    .klarna-payments-loader div {\n      box-sizing: border-box;\n      display: block;\n      position: absolute;\n      box-sizing: border-box;\n      width: 30px;\n      height: 30px;\n      border: 3px solid #000;\n      border-radius: 50%;\n      animation: klarna-payments-loader 1.3s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n      border-color: #000 transparent transparent transparent;\n    }\n    .klarna-payments-loader div:nth-child(1) {\n      animation-delay: -0.45s;\n    }\n    .klarna-payments-loader div:nth-child(2) {\n      animation-delay: -0.3s;\n    }\n    .klarna-payments-loader div:nth-child(3) {\n      animation-delay: -0.15s;\n    }\n    @keyframes klarna-payments-loader {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  '),
        (n.innerHTML =
          '\n    <div id="' +
          r +
          '" class="klarna-payments-loader"><div></div><div></div><div></div><div></div></div>\n  '),
        { el: n.querySelector('div'), styles: c }
      );
    }
    t.a = r;
    var o = n(62);
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      for (e = e.split(','); e.length; ) {
        var n = e.pop();
        o[n] || (o[n] = t);
      }
    }
    var o = window.console || {};
    r('memory', {});
    r(
      'assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn',
      function () {}
    ),
      (e.exports = o);
  },
  function (e, t, n) {
    'use strict';
    var r = n(13),
      o = n.n(r),
      i = n(39),
      a = n.n(i),
      c = n(55),
      u = n.n(c),
      s = (function () {
        function e(t) {
          a()(this, e),
            (this.origin = t.origin),
            (this.target = t.target),
            (this.frame = t.frame),
            (this.debug = t.debug),
            (this.console = t.console || console),
            (this.sendPlainObject = t.sendPlainObject),
            (this.sourceID = t.sourceID || 'unknown'),
            (this.disableMessageSourceCheck = !!t.disableMessageSourceCheck),
            (this._listener = null),
            (this.onMessage = function () {
              throw new Error('Missing `onMessage` callback');
            }),
            this.bindToMessage(this.onPostMessage, this);
        }
        return (
          u()(e, null, [
            {
              key: 'addListener',
              value: function (e, t) {
                window.removeEventListener
                  ? window.addEventListener('message', t, !1)
                  : window.attachEvent('on' + e, t, !1);
              },
            },
            {
              key: 'removeListener',
              value: function (e, t) {
                window.removeEventListener ? window.removeEventListener('message', t) : window.detachEvent('on' + e, t);
              },
            },
          ]),
          u()(e, [
            {
              key: 'getTarget',
              value: function () {
                return this.frame
                  ? 'function' == typeof this.frame
                    ? this.frame()
                    : this.frame.contentWindow
                  : this.target;
              },
            },
            {
              key: 'hasTarget',
              value: function () {
                try {
                  return !!this.getTarget();
                } catch (e) {
                  return !1;
                }
              },
            },
            {
              key: 'onPostMessage',
              value: function (e) {
                var t = void 0;
                try {
                  if (
                    !this.disableMessageSourceCheck &&
                    this.hasTarget() &&
                    !f(e.srcElement) &&
                    !l(e.srcElement) &&
                    e.source !== this.getTarget()
                  )
                    return void (this.debug && this.console.warn('[Posten(%s)] ignored message:', this.sourceID, e));
                  if ('*' !== this.origin && e.origin !== this.origin)
                    return void (
                      this.debug &&
                      this.console.warn(
                        '[Posten(%s)] rejected message from ' +
                          e.origin +
                          ', expecting ' +
                          this.origin +
                          '. Target window:',
                        this.sourceID,
                        this.getTarget()
                      )
                    );
                  (t = this.sendPlainObject ? e.data : JSON.parse(e.data)),
                    this.debug &&
                      this.console.info(
                        '%c [Posten(%s) <- %s] message received:',
                        'color: #16a085',
                        this.sourceID,
                        e.origin || 'unknown',
                        t
                      ),
                    this.onMessage(null, t, e);
                } catch (e) {
                  this.onMessage(e);
                }
              },
            },
            {
              key: 'send',
              value: function (e) {
                if (!this.sendPlainObject)
                  for (var t in e)
                    if (e[t] && e[t].toJSON)
                      try {
                        e[t].toJSON = null;
                      } catch (e) {}
                var n = void 0;
                f(e.port) && ((n = e.port), delete e.port);
                var r = this.getTarget(),
                  i = this.sendPlainObject ? e : o()(e);
                f(r) || l(r) ? r.postMessage(i) : r.postMessage(i, this.origin, n ? [n] : []),
                  this.debug &&
                    this.console.info('%c [Posten -> %s] sending message:', 'color: #16a085', this.origin, e);
              },
            },
            {
              key: 'bindToMessage',
              value: function (t, n) {
                this._listener = function () {
                  t.apply(n, arguments);
                };
                var r = this.getTarget();
                f(r) || l(r) ? (r.onmessage = this._listener) : e.addListener('message', this._listener);
              },
            },
            {
              key: 'unbind',
              value: function () {
                if (this._listener) {
                  var t = this.getTarget();
                  f(t) || l(t) ? (t.onmessage = null) : e.removeListener('message', this._listener),
                    (this._listener = null);
                }
              },
            },
          ]),
          e
        );
      })();
    t.a = s;
    var f = function (e) {
        return 'MessagePort' in window && e instanceof window.MessagePort;
      },
      l = function (e) {
        return 'BroadcastChannel' in window && e instanceof window.BroadcastChannel;
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(30),
      o = n.n(r),
      i = n(2),
      a = n.n(i),
      c = n(1),
      u = n.n(c),
      s = n(38),
      f = n.n(s),
      l = n(39),
      d = n.n(l),
      p = n(55),
      h = n.n(p),
      v = n(65),
      y = n.n(v),
      g = n(67),
      _ = n.n(g),
      m = n(147),
      E = (function (e) {
        function t() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          d()(this, t);
          var r = y()(this, (t.__proto__ || f()(t)).call(this, e));
          return (
            r.addMessageHandler('rpc', function (e) {
              r.onRPCMessage(e);
            }),
            (r.methods = n),
            (r.callbacks = {}),
            (r.sequence = 0),
            r
          );
        }
        return (
          _()(t, e),
          h()(t, [
            {
              key: 'apply',
              value: function (e, t) {
                var n = this,
                  r = t[t.length - 1],
                  o = '' + this.sequence++,
                  i = void 0;
                return (
                  'function' == typeof r
                    ? ((this.callbacks[o] = r), (t = t.slice(0, -1)))
                    : (i = new u.a(function (e) {
                        n.callbacks[o] = function () {
                          for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                          e(n);
                        };
                      })),
                  this.send({ action: 'rpc', seq: o, method: e, args: t }),
                  i
                );
              },
            },
            {
              key: 'call',
              value: function (e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                return this.apply(e, n);
              },
            },
            {
              key: 'addMethods',
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.methods = a()({}, this.methods, e);
              },
            },
            {
              key: 'onRequest',
              value: function (e) {
                var t = this,
                  n = e.method,
                  r = e.seq,
                  i = e.args,
                  a = void 0 === i ? [] : i,
                  c = this.methods[n];
                if (c && 'function' == typeof c) {
                  var u = a.concat(function () {
                    for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];
                    t.send({ action: 'rpc', responseSeq: r, args: n });
                  });
                  c.apply(void 0, o()(u));
                }
              },
            },
            {
              key: 'onResponse',
              value: function (e) {
                var t = e.responseSeq,
                  n = e.args,
                  r = void 0 === n ? [] : n;
                if (t) {
                  var i = this.callbacks[t];
                  delete this.callbacks[t], 'function' == typeof i && i.apply(void 0, o()(r));
                }
              },
            },
            {
              key: 'onRPCMessage',
              value: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e.method ? this.onRequest(e) : e.responseSeq && this.onResponse(e);
              },
            },
          ]),
          t
        );
      })(m.a);
    t.a = E;
  },
  function (e, t, n) {
    e.exports = { default: n(291), __esModule: !0 };
  },
  function (e, t, n) {
    n(49), n(26), n(292), n(294), n(295), (e.exports = n(0).WeakMap);
  },
  function (e, t, n) {
    'use strict';
    var r,
      o = n(5),
      i = n(102)(0),
      a = n(80),
      c = n(51),
      u = n(117),
      s = n(293),
      f = n(8),
      l = n(40),
      d = n(40),
      p = !o.ActiveXObject && 'ActiveXObject' in o,
      h = c.getWeak,
      v = Object.isExtensible,
      y = s.ufstore,
      g = function (e) {
        return function () {
          return e(this, arguments.length > 0 ? arguments[0] : void 0);
        };
      },
      _ = {
        get: function (e) {
          if (f(e)) {
            var t = h(e);
            return !0 === t ? y(l(this, 'WeakMap')).get(e) : t ? t[this._i] : void 0;
          }
        },
        set: function (e, t) {
          return s.def(l(this, 'WeakMap'), e, t);
        },
      },
      m = (e.exports = n(101)('WeakMap', g, _, s, !0, !0));
    d &&
      p &&
      ((r = s.getConstructor(g, 'WeakMap')),
      u(r.prototype, _),
      (c.NEED = !0),
      i(['delete', 'has', 'get', 'set'], function (e) {
        var t = m.prototype,
          n = t[e];
        a(t, e, function (t, o) {
          if (f(t) && !v(t)) {
            this._f || (this._f = new r());
            var i = this._f[e](t, o);
            return 'set' == e ? this : i;
          }
          return n.call(this, t, o);
        });
      }));
  },
  function (e, t, n) {
    'use strict';
    var r = n(64),
      o = n(51).getWeak,
      i = n(17),
      a = n(8),
      c = n(63),
      u = n(37),
      s = n(102),
      f = n(24),
      l = n(40),
      d = s(5),
      p = s(6),
      h = 0,
      v = function (e) {
        return e._l || (e._l = new y());
      },
      y = function () {
        this.a = [];
      },
      g = function (e, t) {
        return d(e.a, function (e) {
          return e[0] === t;
        });
      };
    (y.prototype = {
      get: function (e) {
        var t = g(this, e);
        if (t) return t[1];
      },
      has: function (e) {
        return !!g(this, e);
      },
      set: function (e, t) {
        var n = g(this, e);
        n ? (n[1] = t) : this.a.push([e, t]);
      },
      delete: function (e) {
        var t = p(this.a, function (t) {
          return t[0] === e;
        });
        return ~t && this.a.splice(t, 1), !!~t;
      },
    }),
      (e.exports = {
        getConstructor: function (e, t, n, i) {
          var s = e(function (e, r) {
            c(e, s, t, '_i'), (e._t = t), (e._i = h++), (e._l = void 0), void 0 != r && u(r, n, e[i], e);
          });
          return (
            r(s.prototype, {
              delete: function (e) {
                if (!a(e)) return !1;
                var n = o(e);
                return !0 === n ? v(l(this, t)).delete(e) : n && f(n, this._i) && delete n[this._i];
              },
              has: function (e) {
                if (!a(e)) return !1;
                var n = o(e);
                return !0 === n ? v(l(this, t)).has(e) : n && f(n, this._i);
              },
            }),
            s
          );
        },
        def: function (e, t, n) {
          var r = o(i(t), !0);
          return !0 === r ? v(e).set(t, n) : (r[e._i] = n), e;
        },
        ufstore: v,
      });
  },
  function (e, t, n) {
    n(103)('WeakMap');
  },
  function (e, t, n) {
    n(104)('WeakMap');
  },
  function (e, t, n) {
    'use strict';
    var r = n(12),
      o = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.heightChanged,
          n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o = n.scrollHeight,
          i = void 0 === o ? 0 : o,
          a = void 0;
        return function (e) {
          e + i !== a && ((a = e + i), t(a), r.b.isSupported() && r.b.heightChanged(a));
        };
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(10),
      a = n.n(i),
      c = n(30),
      u = n.n(c),
      s = n(11),
      f = n.n(s),
      l = n(55),
      d = n.n(l),
      p = n(94),
      h = n.n(p),
      v = n(38),
      y = n.n(v),
      g = n(39),
      _ = n.n(g),
      m = n(65),
      E = n.n(m),
      b = n(67),
      w = n.n(b),
      A = (function (e) {
        function t(e) {
          _()(this, t);
          var n = E()(this, (t.__proto__ || y()(t)).call(this, e));
          return h()(n, t.prototype), (n.name = 'AbortError'), n;
        }
        return w()(t, e), t;
      })(Error),
      O = (function (e) {
        function t(e) {
          _()(this, t);
          var n = E()(this, (t.__proto__ || y()(t)).call(this, e));
          return h()(n, t.prototype), n;
        }
        return w()(t, e), t;
      })(Error),
      S = (function (e) {
        function t(e, n) {
          _()(this, t);
          var r = E()(this, (t.__proto__ || y()(t)).call(this, e));
          return h()(r, t.prototype), (r.status = n), r;
        }
        return (
          w()(t, e),
          d()(t, [
            {
              key: 'is4xx',
              get: function () {
                return this.status >= 400 && this.status < 500;
              },
            },
          ]),
          t
        );
      })(Error),
      R = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.accept,
          n = e.onError,
          r = void 0 === n ? [] : n,
          o = e.onFetchError,
          i = void 0 === o ? [] : o,
          c = e.onTypeError,
          s = void 0 === c ? [] : c,
          l = e.responseType,
          d = arguments[1],
          p = arguments[2];
        return function (e) {
          return function n() {
            for (var o = this, c = arguments.length, h = Array(c), v = 0; v < c; v++) h[v] = arguments[v];
            var y = d.apply(void 0, h);
            return (p || window.fetch).apply(void 0, [y, { signal: e }].concat(h)).then(
              (function () {
                var e = f()(
                  a.a.mark(function e(c) {
                    var f, d, p, v, g, _;
                    return a.a.wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!(c instanceof Error)) {
                                e.next = 5;
                                break;
                              }
                              if (
                                !(f = r.reduce(function (e, t) {
                                  return e || t.apply(void 0, [c].concat(h));
                                }, null))
                              ) {
                                e.next = 4;
                                break;
                              }
                              return e.abrupt('return', n.apply(void 0, u()(f)));
                            case 4:
                              throw c;
                            case 5:
                              if (c.ok) {
                                e.next = 11;
                                break;
                              }
                              if (
                                ((d = new S('Fetching ' + y + ' failed (' + c.status + ')', c.status)),
                                !(p = i.reduce(function (e, t) {
                                  return e || t.apply(void 0, [d].concat(h));
                                }, null)))
                              ) {
                                e.next = 10;
                                break;
                              }
                              return e.abrupt('return', n.apply(void 0, u()(p)));
                            case 10:
                              throw d;
                            case 11:
                              if (!t) {
                                e.next = 19;
                                break;
                              }
                              if ((v = c.headers.get('content-type')) && v.includes(t)) {
                                e.next = 19;
                                break;
                              }
                              if (
                                ((g = new TypeError('Fetched content has incorrect MIME type (' + v + ')')),
                                !(_ = s.reduce(function (e, t) {
                                  return e || t.apply(void 0, [g].concat(h));
                                }, null)))
                              ) {
                                e.next = 18;
                                break;
                              }
                              return e.abrupt('return', n.apply(void 0, u()(_)));
                            case 18:
                              throw g;
                            case 19:
                              (e.t0 = l), (e.next = 'json' === e.t0 ? 22 : 'text' === e.t0 ? 27 : 32);
                              break;
                            case 22:
                              return (e.next = 24), c.json();
                            case 24:
                              return (e.t1 = e.sent), (e.t2 = h), e.abrupt('return', { response: e.t1, args: e.t2 });
                            case 27:
                              return (e.next = 29), c.text();
                            case 29:
                              return (e.t3 = e.sent), (e.t4 = h), e.abrupt('return', { response: e.t3, args: e.t4 });
                            case 32:
                              return e.abrupt('return', { response: c, args: h });
                            case 33:
                            case 'end':
                              return e.stop();
                          }
                      },
                      e,
                      o
                    );
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })(),
              function (e) {
                var t = r.reduce(function (t, n) {
                  return t || n.apply(void 0, [e].concat(h));
                }, null);
                if (t) return n.apply(void 0, u()(t));
                throw e;
              }
            );
          };
        };
      },
      I = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : function (e) {
                  return e;
                },
          n = arguments[2],
          r = R(e, t, n);
        return function () {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = e.abortController,
            i = e.timeout;
          return function () {
            for (var e = arguments.length, a = Array(e), c = 0; c < e; c++) a[c] = arguments[c];
            return new o.a(function (e, o) {
              var c = t.apply(void 0, a),
                u = void 0,
                s = void 0,
                f = void 0;
              if (n) {
                if (n.signal.aborted) return o(new A());
                (f = n.abort.bind(n)),
                  window.AbortController
                    ? ((s = n.signal),
                      s.addEventListener(
                        'abort',
                        function () {
                          return clearTimeout(u);
                        },
                        { once: !0 }
                      ))
                    : n.signal.once('abort', function () {
                        o(new A()), clearTimeout(u);
                      });
              }
              null != i &&
                (u = setTimeout(function () {
                  o(new O('Fetching ' + c + ' timed out')), 'function' == typeof f && f();
                }, i));
              var l = function () {
                clearTimeout(u);
              };
              r(s)
                .apply(void 0, a)
                .then(
                  function () {
                    e.apply(void 0, arguments), l();
                  },
                  function (e) {
                    o(e), l();
                  }
                )
                .catch(function (e) {
                  throw (l(), e);
                });
            });
          };
        };
      };
    t.a = I;
  },
  function (e, t, n) {
    'use strict';
    var r = n(38),
      o = n.n(r),
      i = n(39),
      a = n.n(i),
      c = n(55),
      u = n.n(c),
      s = n(65),
      f = n.n(s),
      l = n(299),
      d = n.n(l),
      p = n(67),
      h = n.n(p),
      v = n(144),
      y = n.n(v),
      g = (function (e) {
        function t() {
          a()(this, t);
          var e = f()(this, (t.__proto__ || o()(t)).call(this));
          return (e.aborted = !1), e;
        }
        return (
          h()(t, e),
          u()(t, [
            {
              key: 'emit',
              value: function (e) {
                var n;
                'abort' === e && (this.aborted = !0);
                for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                (n = d()(t.prototype.__proto__ || o()(t.prototype), 'emit', this)).call.apply(n, [this, e].concat(i));
              },
            },
          ]),
          t
        );
      })(y.a),
      _ = (function () {
        function e() {
          a()(this, e), (this.signal = new g());
        }
        return (
          u()(e, [
            {
              key: 'abort',
              value: function () {
                this.signal.emit('abort');
              },
            },
          ]),
          e
        );
      })(),
      m = function () {
        return new ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window).AbortController || _)();
      };
    t.a = m;
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return e && e.__esModule ? e : { default: e };
    }
    t.__esModule = !0;
    var o = n(38),
      i = r(o),
      a = n(300),
      c = r(a);
    t.default = function e(t, n, r) {
      null === t && (t = Function.prototype);
      var o = (0, c.default)(t, n);
      if (void 0 === o) {
        var a = (0, i.default)(t);
        return null === a ? void 0 : e(a, n, r);
      }
      if ('value' in o) return o.value;
      var u = o.get;
      if (void 0 !== u) return u.call(r);
    };
  },
  function (e, t, n) {
    e.exports = { default: n(301), __esModule: !0 };
  },
  function (e, t, n) {
    n(302);
    var r = n(0).Object;
    e.exports = function (e, t) {
      return r.getOwnPropertyDescriptor(e, t);
    };
  },
  function (e, t, n) {
    var r = n(22),
      o = n(95).f;
    n(89)('getOwnPropertyDescriptor', function () {
      return function (e, t) {
        return o(r(e), t);
      };
    });
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(60),
      a = n.n(i),
      c = n(15),
      u = n.n(c),
      s = n(11),
      f = n.n(s),
      l = n(150),
      d = this,
      p = { APPLE_PAY: 1 },
      h = [[p.APPLE_PAY, l.b]],
      v = function (e, t) {
        return (e & t) === t;
      },
      y = function (e, t) {
        return e - t;
      },
      g = (function () {
        var e = f()(
          o.a.mark(function e(t) {
            var n, r, i, c, s, f, l, p, g, _;
            return o.a.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (t) {
                        e.next = 2;
                        break;
                      }
                      return e.abrupt('return', 0);
                    case 2:
                      (n = t), (r = !0), (i = !1), (c = void 0), (e.prev = 6), (s = a()(h));
                    case 8:
                      if ((r = (f = s.next()).done)) {
                        e.next = 23;
                        break;
                      }
                      if (((l = f.value), (p = u()(l, 2)), (g = p[0]), (_ = p[1]), (e.t0 = v(n, g)), !e.t0)) {
                        e.next = 18;
                        break;
                      }
                      return (e.next = 17), _();
                    case 17:
                      e.t0 = !e.sent;
                    case 18:
                      if (!e.t0) {
                        e.next = 20;
                        break;
                      }
                      n = y(n, g);
                    case 20:
                      (r = !0), (e.next = 8);
                      break;
                    case 23:
                      e.next = 29;
                      break;
                    case 25:
                      (e.prev = 25), (e.t1 = e.catch(6)), (i = !0), (c = e.t1);
                    case 29:
                      (e.prev = 29), (e.prev = 30), !r && s.return && s.return();
                    case 32:
                      if (((e.prev = 32), !i)) {
                        e.next = 35;
                        break;
                      }
                      throw c;
                    case 35:
                      return e.finish(32);
                    case 36:
                      return e.finish(29);
                    case 37:
                      return e.abrupt('return', n);
                    case 38:
                    case 'end':
                      return e.stop();
                  }
              },
              e,
              d,
              [
                [6, 25, 29, 37],
                [30, , 32, 36],
              ]
            );
          })
        );
        return function (t) {
          return e.apply(this, arguments);
        };
      })();
    t.a = g;
  },
  function (e, t, n) {
    'use strict';
    var r = n(109),
      o = (n(305), n(306)),
      i = (n(307), n(110));
    n.d(t, 'a', function () {
      return r.c;
    }),
      n.d(t, 'b', function () {
        return o.a;
      }),
      n.d(t, 'c', function () {
        return i.b;
      });
  },
  function (e, t, n) {
    'use strict';
    n(109), n(110);
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return y;
    });
    var r,
      o,
      i = n(1),
      a = n.n(i),
      c = n(13),
      u = (n.n(c), n(109)),
      s = (n(110), !0),
      f = !0,
      l = function (e) {
        return document.getElementById(e);
      },
      d = function (e) {
        var t = e.iframeId;
        return function (e) {
          var n;
          o = !0;
          var r = e.validationURL,
            i = l(t);
          null === (n = null === i || void 0 === i ? void 0 : i.contentWindow) ||
            void 0 === n ||
            n.postMessage(
              { event: u.b.TO_PGW, action: u.a.AP_MERCHANT_VALIDATION, validationURL: r, domain: window.location.host },
              '*'
            );
        };
      },
      p = function (e) {
        var t = e.session,
          n = e.resolve;
        return function (e) {
          var r,
            o = null === (r = null === e || void 0 === e ? void 0 : e.payment) || void 0 === r ? void 0 : r.token;
          n(o), t.completePayment(ApplePaySession.STATUS_SUCCESS);
        };
      },
      h = function (e) {
        var t = e.resolve,
          n = e.reject;
        return function () {
          (s = !0), o ? t() : n(new Error('Payment sheet was not shown'));
        };
      },
      v = function e(t) {
        var n;
        try {
          n = JSON.parse(t.data);
        } catch (e) {
          n = t.data;
        }
        if (n.event === u.b.FROM_PGW)
          switch (n.action) {
            case u.a.AP_MERCHANT_VALIDATION_RES:
              delete n.event,
                delete n.action,
                f &&
                  ((f = !1),
                  setTimeout(function () {
                    return (f = !0);
                  }, 1e3),
                  r.completeMerchantValidation(n),
                  window.removeEventListener('message', e));
          }
      },
      y = function (e, t) {
        return new a.a(function (n, i) {
          s &&
            ((o = !1),
            (s = !1),
            setTimeout(function () {
              return (s = !0);
            }, 5e3),
            window.addEventListener('message', v),
            (r = new ApplePaySession(1, t)),
            (r.onvalidatemerchant = d({ iframeId: e })),
            (r.onpaymentauthorized = p({ iframeId: e, session: r, resolve: n })),
            (r.oncancel = h({ resolve: n, reject: i })),
            r.begin());
        });
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(96),
      o = n.n(r),
      i = n(98),
      a = n.n(i),
      c = n(1),
      u = n.n(c);
    n(308), this && this.__awaiter, this && this.__generator;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return r;
    });
    var r = {
      jsApiUrl: 'https://pay.google.com/gp/p/js/pay.js',
      apiVersion: 2,
      apiVersionMinor: 0,
      prod: { environment: 'PRODUCTION' },
      dev: { environment: 'TEST' },
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(21),
      o = function (e) {
        var t = document.createElement('style');
        return (
          (t.innerHTML =
            '.' +
            e +
            ' {\n  position: absolute;\n  z-index: 100;\n  background-color: rgb(126, 211, 33);\n  color: rgb(255, 255, 255);\n  padding: 10px 20px;\n  margin-bottom: 8px;\n  font-size: 10px;\n  text-align: center;\n  letter-spacing: 1px;\n  cursor: default;\n  font-family: Helvetica, Arial, sans-serif;\n  line-height: 0.8px;\n  right: 8px;\n  border-radius: 0px 0px 5px 5px;\n  transition: transform 0.5s ease 0.5s;\n}\n.' +
            e +
            ':hover { transform: translateY(-100%); }\n@media (max-width: 570px) {\n  .' +
            e +
            ' {\n    position: relative;\n    right: 0px;\n  }\n  .' +
            e +
            ':hover { transform: none; }\n}'),
          t
        );
      },
      i = function (e, t) {
        var n = document.createElement('div');
        return (n.className = e), (n.innerText = t), n;
      },
      a = function (e, t) {
        var n = document.createElement('div');
        return n.appendChild(e), n.appendChild(t), n;
      },
      c = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'TESTDRIVE',
          n = '_' + Object(r.a)(),
          c = a(o(n), i(n, t));
        return e.appendChild(c), c;
      };
    t.a = c;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return u;
    });
    var r = n(25),
      o = n.n(r),
      i = n(1),
      a = n.n(i),
      c = n(146),
      u = function (e) {
        var t = e.apiMethodName,
          n = e.config,
          r = e.container,
          i = e.emitHeight,
          u = e.isOpf,
          s = e.removeResizeEventListener,
          f = e.shadow,
          l = e.staticID,
          d = e.trackEvent,
          p = e.url,
          h = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window;
        return new a.a(function (e, a) {
          var v = document.createElement('iframe');
          (v.src = p),
            o()(v.style, n.style, {
              height: (f ? f.scrollHeight : 0) + 'px',
              display: 'inline',
              border: 0,
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
            });
          var y = h.setTimeout(function () {
              a(new Error('Widget timeout')), v.remove();
            }, n.iframeTimeout),
            g = h[t].bind(h, l),
            _ = new h.MessageChannel(),
            m = _.port1,
            E = _.port2,
            b = new c.a({ debug: !1, target: { window: m }, targetIsReady: !1 });
          b.addMessageHandler('setHeight', function (e) {
            var t = e.height;
            (v.style.height = t + 'px'), i(t);
          }),
            b.addMessageHandler('trackEvent', function (e) {
              var t = e.name,
                n = e.query,
                r = e.body;
              d(t, n, r);
            }),
            b.addMessageHandler('preloadInFullscreen', function (e) {
              var t = e.url;
              g('preloadInFullscreen', { url: u ? t + '&is_opf=true' : t });
            }),
            b.addMessageHandler('openInFullscreen', function (e) {
              var t = e.url;
              g('openInFullscreen', { url: u ? t + '&is_opf=true' : t });
            }),
            b.addMessageHandler('openExternalLink', function (e) {
              var t = e.url;
              g('openExternalLink', { url: t });
            }),
            b.addMessageHandler('ready', function () {
              h.clearTimeout(y),
                setTimeout(function () {
                  (v.style.pointerEvents = 'initial'), (v.style.position = 'static'), (v.style.opacity = 1);
                  try {
                    s();
                  } catch (e) {}
                  f ? f.remove() : e({ iframe: v, messenger: b });
                });
            }),
            new c.a({ debug: !1, target: { frame: v }, targetIsReady: !1 }).transferPort(E),
            r.appendChild(v),
            f && e({ iframe: v, messenger: b });
        });
      };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return l;
    });
    var r = n(36),
      o = n.n(r),
      i = n(13),
      a = n.n(i),
      c = n(25),
      u = n.n(c),
      s = n(312),
      f = { API_METHOD_NAME: 'apiMethodName', APPS_BASE_URL: 'appsBaseUrl', API_KEY: 'apiKey', IS_OPF: 'isOpf' },
      l = function (e) {
        var t,
          n = e.apiMethodName,
          r = e.appsCdnBaseUrl,
          i = e.container,
          c = e.html,
          l = e.isOpf,
          d = e.marginBottom,
          p = e.staticID,
          h = e.style,
          v = document.createElement('div');
        u()(v.style, h, { marginBottom: d });
        var y = c.replace(/^<!--.*-->\n?/, ''),
          g = a()(
            ((t = {}),
            o()(t, f.API_METHOD_NAME, n),
            o()(t, f.APPS_BASE_URL, r),
            o()(t, f.API_KEY, p),
            o()(t, f.IS_OPF, l),
            t)
          ).replace(/\\"/g, '"'),
          _ = y.replace(new RegExp('__RUNTIME_SETTINGS__', 'g'), g),
          m = v.attachShadow({ mode: 'closed' });
        return (m.innerHTML = _), Object(s.a)(m), i.appendChild(v), v;
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(60),
      o = n.n(r),
      i = function e(t) {
        if ('SCRIPT' === t.tagName) t.parentNode.replaceChild(a(t), t);
        else {
          var n = !0,
            r = !1,
            i = void 0;
          try {
            for (var c, u = o()(t.childNodes); !(n = (c = u.next()).done); n = !0) {
              e(c.value);
            }
          } catch (e) {
            (r = !0), (i = e);
          } finally {
            try {
              !n && u.return && u.return();
            } finally {
              if (r) throw i;
            }
          }
        }
        return t;
      },
      a = function (e) {
        var t = document.createElement('script');
        t.text = e.innerHTML;
        var n = !0,
          r = !1,
          i = void 0;
        try {
          for (var a, c = o()(e.attributes); !(n = (a = c.next()).done); n = !0) {
            var u = a.value;
            t.setAttribute(u.name, u.value);
          }
        } catch (e) {
          (r = !0), (i = e);
        } finally {
          try {
            !n && c.return && c.return();
          } finally {
            if (r) throw i;
          }
        }
        return t;
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    function r() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = arguments[1],
        n = arguments[2],
        r = Object(h.b)(e.baseURL, e.entry),
        i = e.id(e.name),
        c = e.title(e.name),
        y = void 0,
        m = function (r) {
          var c = r.iframe,
            l = r.removeLoader,
            h = n ? n(c) : function () {},
            m = function (t) {
              return h(p.c.ON_SHOW_EXTERNAL_DOCUMENT_HANDLER_CALLED, { document_url: t }), e.onShowExternalDocument(t);
            };
          (y = Object(d.a)(c, i, !0, {
            startIframeVisibilityPolling: function (t) {
              o(c, e, t);
            },
            trackEvent: h,
            redirect: function (t) {
              var n = b.exec(t),
                r = n && n.length > 1 && n[1];
              if (!n || (r && !w.test(r)))
                return void h(p.c.REDIRECT_URL_VALIDATION_FAILED, { url_protocol: r || 'unknown' });
              h(p.c.REDIRECT, { url_protocol: r });
              try {
                s.b.isSupported()
                  ? s.b.openExternalApp(t).then(function (e) {
                      'true' !== e.success && s.b.openExternalBrowser(t);
                    })
                  : Object(g.a)() && 'function' == typeof e.onRedirect
                  ? (h(p.c.ON_REDIRECT_HANDLER_CALLED), e.onRedirect(t))
                  : 'function' == typeof e.onShowExternalDocument
                  ? m(t)
                  : Object(v.a)(t);
              } catch (e) {
                h(p.c.REDIRECT_FAILED, { error: e.message });
              }
            },
            onShowExternalDocument: function (t, n) {
              if ('function' == typeof e.onShowExternalDocument) {
                n(!1 === m(t));
              } else h(p.c.ON_SHOW_EXTERNAL_DOCUMENT_FALLBACK_CALLED, { document_url: t }), n(!1);
            },
            onPaymentMethodSelected: function (e) {
              t.paymentMethodSelected(e);
            },
            onPgwThirdPartyChallengeRequested: function (e, t) {
              var n = function (e) {
                  t({ success: !1 }), h(p.c.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_ERROR, { error: e.message });
                },
                r = function () {
                  h(p.c.NATIVE_HOOK_API_APPLICATION_FOREGROUNDED), y.send({ action: 'onApplicationForegrounded:' + e });
                };
              try {
                h(p.c.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED),
                  s.b.isSupported()
                    ? s.b
                        .openExternalBrowser(e)
                        .then(function (e) {
                          var n = e.success;
                          t({ success: 'true' === n }),
                            h(p.c.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_COMPLETED, { success: 'true' === n }),
                            'true' === n && s.b.onApplicationForegrounded(r);
                        })
                        .catch(n)
                    : f.a.isSupported('production') &&
                      (f.a.openExternalBrowser(e, { onAppForegrounded: r }),
                      t({ success: !0 }),
                      h(p.c.ON_PGW_THIRD_PARTY_CHALLENGE_REQUESTED_COMPLETED, { success: !0 }));
              } catch (e) {
                n(e);
              }
            },
            onUserAccountLoginRequested: function () {
              t.userAccountLoginRequested();
            },
            onUserAccountLoginReady: function () {
              t.userAccountLoginReady();
            },
            onUserAccountLoginLoggedIn: function () {
              t.userAccountLoginLoggedIn();
            },
            nativeHookApi: function (e) {
              for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
              var o = s.b[e],
                i = 'function' == typeof n[n.length - 1] ? n.pop() : function () {};
              'function' == typeof o && o.apply(void 0, n).then(i);
            },
            removeLoader: l,
            checkEnabledWallets: function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = arguments[1];
              h(p.c.CHECK_ENABLED_WALLETS, { wallets: u()(e) });
              var n = e.map(function (e) {
                return Object(_.c)(e).then(function (t) {
                  return t && e;
                });
              });
              a.a
                .all(n)
                .then(function (e) {
                  var n = e.filter(function (e) {
                    return e;
                  });
                  h(p.c.CHECK_ENABLED_WALLETS_FINISHED, { enabled_wallets: u()(n) }), t(n);
                })
                .catch(function (e) {
                  h(p.c.CHECK_ENABLED_WALLETS_ERROR, { error: e.message }), t([]);
                });
            },
            showWalletPaymentSheet: function (e, t) {
              h(p.c.SHOW_WALLET_PAYMENT_SHEET),
                Object(_.a)(e, { iframeId: i })
                  .then(function (e) {
                    h(p.c.SHOW_WALLET_PAYMENT_SHEET_FINISHED), t(e);
                  })
                  .catch(function (e) {
                    h(p.c.SHOW_WALLET_PAYMENT_SHEET_ERROR, { error: e.message }), t(null);
                  });
            },
          })),
            y.addMessageHandler('setHeight', function () {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = parseInt(e.height, 10);
              (c.style.height = n + 'px'), t.heightChanged(n), s.b.isSupported() && s.b.heightChanged(n);
            });
        };
      return Object(l.b)({
        showLoader: e.showLoader,
        loaderType: e.loaderType,
        container: e.container,
        url: r + '#' + e.params + '&',
        baseURL: e.baseURL,
        id: i,
        title: c,
        onCreate: e.onCreate,
        onLoad: e.onLoad,
        style: e.style,
        loaderStyle: e.loaderStyle,
        timeout: e.timeout,
        sandbox: e.shouldSandbox ? e.sandbox : null,
        shouldAllowCamera: e.shouldAllowCamera,
        beforeLoad: m,
      }).then(function (e) {
        return [e, y];
      });
    }
    function o(e, t, n) {
      var r = function () {
        n(), t.onVisible && t.onVisible(e);
      };
      Object(y.a)(e, r, { interval: m, timeout: E });
    }
    t.a = r;
    var i = n(1),
      a = n.n(i),
      c = n(13),
      u = n.n(c),
      s = n(12),
      f = n(48),
      l = n(41),
      d = n(54),
      p = n(7),
      h = n(31),
      v = n(314),
      y = n(315),
      g = n(32),
      _ = n(150),
      m = 300,
      E = 12e4,
      b = /^([a-z]+:\/\/\/?)/,
      w = /^(https|bankid|klarna)/;
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : window).location.href = e;
    }
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        r = setInterval(function () {
          Object(o.a)(e, 0.51) && (clearInterval(r), (r = null), t());
        }, n.interval);
      setTimeout(function () {
        r && clearInterval(r);
      }, n.timeout);
    }
    t.a = r;
    var o = n(316);
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
        n = function (e, t) {
          return document.elementFromPoint(e, t);
        },
        r = window.innerWidth || document.documentElement.clientWidth,
        o = window.innerHeight || document.documentElement.clientHeight,
        i = e.getBoundingClientRect(),
        a = i.bottom - i.top,
        c = i.right - i.left,
        u = parseInt(a * t, 10),
        s = parseInt(c * t, 10),
        f = i.top > 0 && i.top < o - u,
        l = i.bottom < o && i.bottom > u,
        d = i.left > 0 && i.left < r - s,
        p = i.right < r && i.right > s;
      return (
        !((!f && !l) || (!d && !p)) &&
        (e.contains(n(i.left, i.top + u)) ||
          e.contains(n(i.right - 1, i.top + u)) ||
          e.contains(n(i.top + s, i.top)) ||
          e.contains(n(i.bottom + s, i.bottom)))
      );
    }
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(318),
      a = n.n(i),
      c = n(31),
      u = n(21),
      s = n(54),
      f = function (e, t) {
        var n = e.width,
          r = e.height,
          i = a()(e, ['width', 'height']);
        return new o.a(function (e, o) {
          var a = i.id(i.name),
            f = Object(c.b)(i.baseURL, i.entry),
            l = f + '?' + i.params,
            d = window.top.outerHeight / 2 + window.top.screenY - r / 2,
            p = window.top.outerWidth / 2 + window.top.screenX - n / 2,
            h = i.onOpened || function () {},
            v = i.onClosed || function () {},
            y = i.onError || function () {},
            g = window.open(
              l,
              a,
              '\n      scrollbars=yes,\n      status=no,\n      resizable=no,\n      width=' +
                n +
                ',\n      height=' +
                r +
                ',\n      top=' +
                d +
                ',\n      left=' +
                p +
                '\n    '
            ),
            _ = !1,
            m = !1;
          if (!g) return void o(new Error('Popup window blocked.'));
          g.__ID__ = Object(u.a)();
          var E = {
              getReference: function () {
                return g;
              },
              getID: function () {
                return a;
              },
              isClosed: function () {
                return g && g.closed;
              },
              focus: function () {
                g && window.focus && g.focus();
              },
              close: function () {
                E.isClosed() || g.close();
              },
            },
            b = Object(s.a)(g, a, !0, { trackEvent: t });
          h(E, b), E.focus(), window.addEventListener('unload', E.close);
          try {
            var w = g.document.open();
            w.write(
              '\n  <!DOCTYPE html>\n  <html>\n    <head>\n      <title>Klarna Payments</title>\n      <style>\n        html {\n          width: 100%;\n          height: 100%;\n          background-color: white;\n        }\n        body {\n          width: 100%;\n          height: 100%;\n          padding: 0;\n          margin: 0;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n        }\n        #logo-wrapper {\n          opacity: 0.5;\n          transform: scale(1.8);\n          transition: opacity .1s linear;\n        }\n       </style>\n    </head>\n    <body>\n      <div id="logo-wrapper">\n        <svg focusable="false" width="81" height="20">\n          <g transform="translate(0, 0) scale(1)">\n            <path d="M78.3352549,14.3292706 C77.0678017,14.3292706 76.0403439,15.3567284 76.0403439,16.6243597 C76.0403439,17.8916348 77.0678017,18.9192707 78.3352549,18.9192707 C79.6027081,18.9192707 80.630344,17.8916348 80.630344,16.6243597 C80.630344,15.3567284 79.6027081,14.3292706 78.3352549,14.3292706" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M70.7958568,7.22817345 L70.7958568,6.4467803 L74.4529833,6.4467803 L74.4529833,18.6618356 L70.7958568,18.6618356 L70.7958568,17.8811547 C69.7626656,18.5857975 68.5156063,19 67.1704277,19 C63.6107082,19 60.7250027,16.1142945 60.7250027,12.554575 C60.7250027,8.99485561 63.6107082,6.10915009 67.1704277,6.10915009 C68.5156063,6.10915009 69.7626656,6.52335256 70.7958568,7.22817345 Z M67.4697718,15.6974209 C69.3000267,15.6974209 70.7835696,14.2902722 70.7835696,12.554575 C70.7835696,10.8188779 69.3000267,9.41208536 67.4697718,9.41208536 C65.6395168,9.41208536 64.1559739,10.8188779 64.1559739,12.554575 C64.1559739,14.2902722 65.6395168,15.6974209 67.4697718,15.6974209 Z" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M54.2263333,6.11823191 C52.765406,6.11823191 51.3828316,6.57178896 50.4584442,7.82312205 L50.4584442,6.4474926 L46.8169884,6.4474926 L46.8169884,18.6618356 L50.503141,18.6618356 L50.503141,12.2427657 C50.503141,10.3852653 51.7487757,9.47565814 53.2485235,9.47565814 C54.8558285,9.47565814 55.7798597,10.4358386 55.7798597,12.2174791 L55.7798597,18.6618356 L59.4327124,18.6618356 L59.4327124,10.8940256 C59.4327124,8.05141421 57.1725844,6.11823191 54.2263333,6.11823191" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M41.5278044,8.03788051 L41.5278044,6.44695838 L37.7834212,6.44695838 L37.7834212,18.6618356 L41.536174,18.6618356 L41.536174,12.9588053 C41.536174,11.0347048 43.6216104,10.0004452 45.0686479,10.0004452 C45.0834281,10.0004452 45.097318,10.0018698 45.1120982,10.0020479 L45.1120982,6.44767068 C43.6269526,6.44767068 42.2609392,7.08357654 41.5278044,8.03788051" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M32.2128788,7.22817345 L32.2128788,6.4467803 L35.8701833,6.4467803 L35.8701833,18.6618356 L32.2128788,18.6618356 L32.2128788,17.8811547 C31.1796876,18.5857975 29.9326283,19 28.5876277,19 C25.0279083,19 22.1422028,16.1142945 22.1422028,12.554575 C22.1422028,8.99485561 25.0279083,6.10915009 28.5876277,6.10915009 C29.9326283,6.10915009 31.1796876,6.52335256 32.2128788,7.22817345 Z M28.8867938,15.6974209 C30.7170487,15.6974209 32.2007697,14.2902722 32.2007697,12.554575 C32.2007697,10.8188779 30.7170487,9.41208536 28.8867938,9.41208536 C27.0567169,9.41208536 25.5729959,10.8188779 25.5729959,12.554575 C25.5729959,14.2902722 27.0567169,15.6974209 28.8867938,15.6974209 Z" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M16.8150889 18.6618356 20.6429893 18.6618356 20.6429893 1.00338343 16.8150889 1.00338343z" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M14.1770857,1 L10.2104649,1 C10.2104649,4.25111544 8.71570325,7.23511837 6.10957549,9.1873547 L4.53806353,10.3642524 L10.6271604,18.6673559 L15.6335612,18.6673559 L10.0307872,11.0272257 C12.6865979,8.38263373 14.1770857,4.82469505 14.1770857,1" fill="rgba(150, 147, 145, 1)"></path>\n            <path d="M0 18.6666436 4.05334336 18.6666436 4.05334336 1 0 1z" fill="rgba(150, 147, 145, 1)"></path>\n          </g>\n        </svg>\n      </div>\n      <script>\n        window.loaded = true;\n      </script>\n    </body>\n  </html>\n'
            ),
              w.close();
          } catch (e) {
            y(e.message, E);
          }
          var A = setInterval(function () {
              try {
                g.loaded && (clearInterval(A), g.location.replace(l));
              } catch (e) {
                clearInterval(A), y(e.message, E);
              }
            }, 20),
            O = setInterval(function () {
              E.isClosed() &&
                (v(),
                b.destroy(),
                clearInterval(O),
                clearInterval(A),
                _ || (o(new Error('Popup closed prematurely.')), (m = !0)));
            }, 100),
            S = setTimeout(function () {
              o(new Error('Popup window timed out.')), (m = !0), E.close();
            }, i.timeout);
          b.addMessageHandler('error', function () {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            _
              ? (y(e.error, E), e.closePopup && E.close())
              : (o(new Error(e.error || 'Unexpected error.')), (m = !0), clearInterval(A), clearTimeout(S), E.close());
          }),
            b.addMessageHandler('ready', function () {
              m || (E.focus(), (_ = !0), e(E), clearTimeout(S));
            });
        });
      };
    t.a = f;
  },
  function (e, t, n) {
    'use strict';
    (t.__esModule = !0),
      (t.default = function (e, t) {
        var n = {};
        for (var r in e) t.indexOf(r) >= 0 || (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]));
        return n;
      });
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = function (e, t) {
        if (!e) return o.a.reject(new Error('Provided element ID is null.'));
        var n = void 0,
          r = new o.a(function (r) {
            n = setInterval(function () {
              document.getElementById(e) || (clearInterval(n), r());
            }, t);
          });
        return (
          r.catch(function () {
            clearInterval(n);
          }),
          r
        );
      };
    t.a = i;
  },
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(3),
      a = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
        return new o.a(function (r, o) {
          var a = void 0,
            c = void 0,
            u = function () {
              i.a.get('nativeHookApiHandshakeResponse') && (n.clearInterval(a), n.clearTimeout(c), r());
            };
          (a = n.setInterval(u, t)),
            (c = n.setTimeout(function () {
              n.clearInterval(a), o(new Error('Handshake timeout'));
            }, e)),
            u();
        });
      };
    t.a = a;
  },
  function (e, t, n) {
    'use strict';
    var r = n(10),
      o = n.n(r),
      i = n(11),
      a = n.n(i),
      c = n(20),
      u = n(322);
    !(function () {
      function e() {
        return t.apply(this, arguments);
      }
      var t = a()(
        o.a.mark(function e() {
          var t,
            r,
            i,
            a,
            s,
            f,
            l = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            d = l.token,
            p = l.publicKey;
          return o.a.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      Object(u.a)(),
                      (t = n(324)),
                      (r = t.Jose),
                      (i = t.JoseJWS),
                      (a = new r.WebCryptographer()),
                      (s = void 0),
                      (e.prev = 4),
                      (f = new i.Verifier(a, d)),
                      (e.next = 8),
                      f.addRecipient(p, p.kid, 'RS256')
                    );
                  case 8:
                    return (e.next = 10), f.verify();
                  case 10:
                    (s = e.sent), (e.next = 17);
                    break;
                  case 13:
                    throw ((e.prev = 13), (e.t0 = e.catch(4)), new c.f());
                  case 17:
                    if (null != s && (!s || s[0].verified)) {
                      e.next = 19;
                      break;
                    }
                    throw new c.f();
                  case 19:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this,
            [[4, 13]]
          );
        })
      );
    })();
  },
  function (e, t, n) {
    'use strict';
    var r = function () {
      ('crypto' in window && 'subtle' in window.crypto) || n(323);
    };
    t.a = r;
  },
  function (e, t, n) {
    var r, o;
    /**
     * @file Web Cryptography API shim
     * @author Artem S Vybornov <vybornov@gmail.com>
     * @license MIT
     */
    !(function (n, i) {
      (r = []),
        void 0 !==
          (o = function () {
            return i(n);
          }.apply(t, r)) && (e.exports = o);
    })('undefined' != typeof self ? self : this, function (e) {
      'use strict';
      function t(e) {
        return btoa(e).replace(/\=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
      }
      function n(e) {
        return (e += '==='), (e = e.slice(0, -e.length % 4)), atob(e.replace(/-/g, '+').replace(/_/g, '/'));
      }
      function r(e) {
        for (var t = new Uint8Array(e.length), n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
        return t;
      }
      function o(e) {
        return e instanceof ArrayBuffer && (e = new Uint8Array(e)), String.fromCharCode.apply(String, e);
      }
      function i(e) {
        var t = { name: (e.name || e || '').toUpperCase().replace('V', 'v') };
        switch (t.name) {
          case 'SHA-1':
          case 'SHA-256':
          case 'SHA-384':
          case 'SHA-512':
            break;
          case 'AES-CBC':
          case 'AES-GCM':
          case 'AES-KW':
            e.length && (t.length = e.length);
            break;
          case 'HMAC':
            e.hash && (t.hash = i(e.hash)), e.length && (t.length = e.length);
            break;
          case 'RSAES-PKCS1-v1_5':
            e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
              e.modulusLength && (t.modulusLength = e.modulusLength);
            break;
          case 'RSASSA-PKCS1-v1_5':
          case 'RSA-OAEP':
            e.hash && (t.hash = i(e.hash)),
              e.publicExponent && (t.publicExponent = new Uint8Array(e.publicExponent)),
              e.modulusLength && (t.modulusLength = e.modulusLength);
            break;
          default:
            throw new SyntaxError('Bad algorithm name');
        }
        return t;
      }
      function a(e) {
        return {
          'HMAC': { 'SHA-1': 'HS1', 'SHA-256': 'HS256', 'SHA-384': 'HS384', 'SHA-512': 'HS512' },
          'RSASSA-PKCS1-v1_5': { 'SHA-1': 'RS1', 'SHA-256': 'RS256', 'SHA-384': 'RS384', 'SHA-512': 'RS512' },
          'RSAES-PKCS1-v1_5': { '': 'RSA1_5' },
          'RSA-OAEP': { 'SHA-1': 'RSA-OAEP', 'SHA-256': 'RSA-OAEP-256' },
          'AES-KW': { 128: 'A128KW', 192: 'A192KW', 256: 'A256KW' },
          'AES-GCM': { 128: 'A128GCM', 192: 'A192GCM', 256: 'A256GCM' },
          'AES-CBC': { 128: 'A128CBC', 192: 'A192CBC', 256: 'A256CBC' },
        }[e.name][(e.hash || {}).name || e.length || ''];
      }
      function c(e) {
        (e instanceof ArrayBuffer || e instanceof Uint8Array) && (e = JSON.parse(decodeURIComponent(escape(o(e)))));
        var t = { kty: e.kty, alg: e.alg, ext: e.ext || e.extractable };
        switch (t.kty) {
          case 'oct':
            t.k = e.k;
          case 'RSA':
            ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi', 'oth'].forEach(function (n) {
              n in e && (t[n] = e[n]);
            });
            break;
          default:
            throw new TypeError('Unsupported key type');
        }
        return t;
      }
      function u(e) {
        var t = c(e);
        return b && ((t.extractable = t.ext), delete t.ext), r(unescape(encodeURIComponent(JSON.stringify(t)))).buffer;
      }
      function s(e) {
        var n = l(e),
          r = !1;
        n.length > 2 && ((r = !0), n.shift());
        var i = { ext: !0 };
        switch (n[0][0]) {
          case '1.2.840.113549.1.1.1':
            var a = ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'],
              c = l(n[1]);
            r && c.shift();
            for (var u = 0; u < c.length; u++) c[u][0] || (c[u] = c[u].subarray(1)), (i[a[u]] = t(o(c[u])));
            i.kty = 'RSA';
            break;
          default:
            throw new TypeError('Unsupported key type');
        }
        return i;
      }
      function f(e) {
        var t,
          o = [['', null]],
          i = !1;
        switch (e.kty) {
          case 'RSA':
            for (var a = ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'], c = [], u = 0; u < a.length && a[u] in e; u++) {
              var s = (c[u] = r(n(e[a[u]])));
              128 & s[0] && ((c[u] = new Uint8Array(s.length + 1)), c[u].set(s, 1));
            }
            c.length > 2 && ((i = !0), c.unshift(new Uint8Array([0]))), (o[0][0] = '1.2.840.113549.1.1.1'), (t = c);
            break;
          default:
            throw new TypeError('Unsupported key type');
        }
        return (
          o.push(new Uint8Array(d(t)).buffer),
          i ? o.unshift(new Uint8Array([0])) : (o[1] = { tag: 3, value: o[1] }),
          new Uint8Array(d(o)).buffer
        );
      }
      function l(e, t) {
        if (
          (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
          t || (t = { pos: 0, end: e.length }),
          t.end - t.pos < 2 || t.end > e.length)
        )
          throw new RangeError('Malformed DER');
        var n = e[t.pos++],
          r = e[t.pos++];
        if (r >= 128) {
          if (((r &= 127), t.end - t.pos < r)) throw new RangeError('Malformed DER');
          for (var i = 0; r--; ) (i <<= 8), (i |= e[t.pos++]);
          r = i;
        }
        if (t.end - t.pos < r) throw new RangeError('Malformed DER');
        var a;
        switch (n) {
          case 2:
            a = e.subarray(t.pos, (t.pos += r));
            break;
          case 3:
            if (e[t.pos++]) throw new Error('Unsupported bit string');
            r--;
          case 4:
            a = new Uint8Array(e.subarray(t.pos, (t.pos += r))).buffer;
            break;
          case 5:
            a = null;
            break;
          case 6:
            var c = btoa(o(e.subarray(t.pos, (t.pos += r))));
            if (!(c in A)) throw new Error('Unsupported OBJECT ID ' + c);
            a = A[c];
            break;
          case 48:
            a = [];
            for (var u = t.pos + r; t.pos < u; ) a.push(l(e, t));
            break;
          default:
            throw new Error('Unsupported DER tag 0x' + n.toString(16));
        }
        return a;
      }
      function d(e, t) {
        t || (t = []);
        var n = 0,
          o = 0,
          i = t.length + 2;
        if ((t.push(0, 0), e instanceof Uint8Array)) {
          (n = 2), (o = e.length);
          for (var a = 0; a < o; a++) t.push(e[a]);
        } else if (e instanceof ArrayBuffer) {
          (n = 4), (o = e.byteLength), (e = new Uint8Array(e));
          for (var a = 0; a < o; a++) t.push(e[a]);
        } else if (null === e) (n = 5), (o = 0);
        else if ('string' == typeof e && e in O) {
          var c = r(atob(O[e]));
          (n = 6), (o = c.length);
          for (var a = 0; a < o; a++) t.push(c[a]);
        } else if (e instanceof Array) {
          for (var a = 0; a < e.length; a++) d(e[a], t);
          (n = 48), (o = t.length - i);
        } else {
          if (!('object' == typeof e && 3 === e.tag && e.value instanceof ArrayBuffer))
            throw new Error('Unsupported DER value ' + e);
          (e = new Uint8Array(e.value)), (n = 3), (o = e.byteLength), t.push(0);
          for (var a = 0; a < o; a++) t.push(e[a]);
          o++;
        }
        if (o >= 128) {
          var u = o,
            o = 4;
          for (t.splice(i, 0, (u >> 24) & 255, (u >> 16) & 255, (u >> 8) & 255, 255 & u); o > 1 && !(u >> 24); )
            (u <<= 8), o--;
          o < 4 && t.splice(i, 4 - o), (o |= 128);
        }
        return t.splice(i - 2, 2, n, o), t;
      }
      function p(e, t, n, r) {
        Object.defineProperties(this, {
          _key: { value: e },
          type: { value: e.type, enumerable: !0 },
          extractable: { value: void 0 === n ? e.extractable : n, enumerable: !0 },
          algorithm: { value: void 0 === t ? e.algorithm : t, enumerable: !0 },
          usages: { value: void 0 === r ? e.usages : r, enumerable: !0 },
        });
      }
      function h(e) {
        return 'verify' === e || 'encrypt' === e || 'wrapKey' === e;
      }
      function v(e) {
        return 'sign' === e || 'decrypt' === e || 'unwrapKey' === e;
      }
      if ('function' != typeof Promise) throw 'Promise support required';
      var y = e.crypto || e.msCrypto;
      if (y) {
        var g = y.subtle || y.webkitSubtle;
        if (g) {
          var _ = e.Crypto || y.constructor || Object,
            m = e.SubtleCrypto || g.constructor || Object,
            E = (e.CryptoKey || e.Key || Object, e.navigator.userAgent.indexOf('Edge/') > -1),
            b = !!e.msCrypto && !E,
            w = !y.subtle && !!y.webkitSubtle;
          if (b || w) {
            var A = { KoZIhvcNAQEB: '1.2.840.113549.1.1.1' },
              O = { '1.2.840.113549.1.1.1': 'KoZIhvcNAQEB' };
            if (
              (['generateKey', 'importKey', 'unwrapKey'].forEach(function (e) {
                var t = g[e];
                g[e] = function (o, f, l) {
                  var d,
                    _,
                    m,
                    E = [].slice.call(arguments);
                  switch (e) {
                    case 'generateKey':
                      (d = i(o)), (_ = f), (m = l);
                      break;
                    case 'importKey':
                      (d = i(l)),
                        (_ = E[3]),
                        (m = E[4]),
                        'jwk' === o &&
                          ((f = c(f)),
                          f.alg || (f.alg = a(d)),
                          f.key_ops ||
                            (f.key_ops = 'oct' !== f.kty ? ('d' in f ? m.filter(v) : m.filter(h)) : m.slice()),
                          (E[1] = u(f)));
                      break;
                    case 'unwrapKey':
                      (d = E[4]), (_ = E[5]), (m = E[6]), (E[2] = l._key);
                  }
                  if ('generateKey' === e && 'HMAC' === d.name && d.hash)
                    return (
                      (d.length =
                        d.length || { 'SHA-1': 512, 'SHA-256': 512, 'SHA-384': 1024, 'SHA-512': 1024 }[d.hash.name]),
                      g.importKey('raw', y.getRandomValues(new Uint8Array((d.length + 7) >> 3)), d, _, m)
                    );
                  if (
                    w &&
                    'generateKey' === e &&
                    'RSASSA-PKCS1-v1_5' === d.name &&
                    (!d.modulusLength || d.modulusLength >= 2048)
                  )
                    return (
                      (o = i(o)),
                      (o.name = 'RSAES-PKCS1-v1_5'),
                      delete o.hash,
                      g
                        .generateKey(o, !0, ['encrypt', 'decrypt'])
                        .then(function (e) {
                          return Promise.all([g.exportKey('jwk', e.publicKey), g.exportKey('jwk', e.privateKey)]);
                        })
                        .then(function (e) {
                          return (
                            (e[0].alg = e[1].alg = a(d)),
                            (e[0].key_ops = m.filter(h)),
                            (e[1].key_ops = m.filter(v)),
                            Promise.all([
                              g.importKey('jwk', e[0], d, !0, e[0].key_ops),
                              g.importKey('jwk', e[1], d, _, e[1].key_ops),
                            ])
                          );
                        })
                        .then(function (e) {
                          return { publicKey: e[0], privateKey: e[1] };
                        })
                    );
                  if (
                    (w || (b && 'SHA-1' === (d.hash || {}).name)) &&
                    'importKey' === e &&
                    'jwk' === o &&
                    'HMAC' === d.name &&
                    'oct' === f.kty
                  )
                    return g.importKey('raw', r(n(f.k)), l, E[3], E[4]);
                  if (w && 'importKey' === e && ('spki' === o || 'pkcs8' === o))
                    return g.importKey('jwk', s(f), l, E[3], E[4]);
                  if (b && 'unwrapKey' === e)
                    return g.decrypt(E[3], l, f).then(function (e) {
                      return g.importKey(o, e, E[4], E[5], E[6]);
                    });
                  var A;
                  try {
                    A = t.apply(g, E);
                  } catch (e) {
                    return Promise.reject(e);
                  }
                  return (
                    b &&
                      (A = new Promise(function (e, t) {
                        (A.onabort = A.onerror =
                          function (e) {
                            t(e);
                          }),
                          (A.oncomplete = function (t) {
                            e(t.target.result);
                          });
                      })),
                    (A = A.then(function (e) {
                      return (
                        'HMAC' === d.name && (d.length || (d.length = 8 * e.algorithm.length)),
                        0 == d.name.search('RSA') &&
                          (d.modulusLength || (d.modulusLength = (e.publicKey || e).algorithm.modulusLength),
                          d.publicExponent || (d.publicExponent = (e.publicKey || e).algorithm.publicExponent)),
                        (e =
                          e.publicKey && e.privateKey
                            ? {
                                publicKey: new p(e.publicKey, d, _, m.filter(h)),
                                privateKey: new p(e.privateKey, d, _, m.filter(v)),
                              }
                            : new p(e, d, _, m))
                      );
                    }))
                  );
                };
              }),
              ['exportKey', 'wrapKey'].forEach(function (e) {
                var n = g[e];
                g[e] = function (i, u, s) {
                  var l = [].slice.call(arguments);
                  switch (e) {
                    case 'exportKey':
                      l[1] = u._key;
                      break;
                    case 'wrapKey':
                      (l[1] = u._key), (l[2] = s._key);
                  }
                  if (
                    ((w || (b && 'SHA-1' === (u.algorithm.hash || {}).name)) &&
                      'exportKey' === e &&
                      'jwk' === i &&
                      'HMAC' === u.algorithm.name &&
                      (l[0] = 'raw'),
                    !w || 'exportKey' !== e || ('spki' !== i && 'pkcs8' !== i) || (l[0] = 'jwk'),
                    b && 'wrapKey' === e)
                  )
                    return g.exportKey(i, u).then(function (e) {
                      return (
                        'jwk' === i && (e = r(unescape(encodeURIComponent(JSON.stringify(c(e)))))),
                        g.encrypt(l[3], s, e)
                      );
                    });
                  var d;
                  try {
                    d = n.apply(g, l);
                  } catch (e) {
                    return Promise.reject(e);
                  }
                  return (
                    b &&
                      (d = new Promise(function (e, t) {
                        (d.onabort = d.onerror =
                          function (e) {
                            t(e);
                          }),
                          (d.oncomplete = function (t) {
                            e(t.target.result);
                          });
                      })),
                    'exportKey' === e &&
                      'jwk' === i &&
                      (d = d.then(function (e) {
                        return (w || (b && 'SHA-1' === (u.algorithm.hash || {}).name)) && 'HMAC' === u.algorithm.name
                          ? { kty: 'oct', alg: a(u.algorithm), key_ops: u.usages.slice(), ext: !0, k: t(o(e)) }
                          : ((e = c(e)),
                            e.alg || (e.alg = a(u.algorithm)),
                            e.key_ops ||
                              (e.key_ops =
                                'public' === u.type
                                  ? u.usages.filter(h)
                                  : 'private' === u.type
                                  ? u.usages.filter(v)
                                  : u.usages.slice()),
                            e);
                      })),
                    !w ||
                      'exportKey' !== e ||
                      ('spki' !== i && 'pkcs8' !== i) ||
                      (d = d.then(function (e) {
                        return (e = f(c(e)));
                      })),
                    d
                  );
                };
              }),
              ['encrypt', 'decrypt', 'sign', 'verify'].forEach(function (e) {
                var t = g[e];
                g[e] = function (n, r, o, a) {
                  if (b && (!o.byteLength || (a && !a.byteLength))) throw new Error('Empy input is not allowed');
                  var c = [].slice.call(arguments),
                    u = i(n);
                  if (
                    (b &&
                      ('encrypt' === e || 'decrypt' === e) &&
                      r.algorithm.hash &&
                      (c[0].hash = c[0].hash || r.algorithm.hash),
                    b && 'decrypt' === e && 'AES-GCM' === u.name)
                  ) {
                    var s = n.tagLength >> 3;
                    (c[2] = (o.buffer || o).slice(0, o.byteLength - s)),
                      (n.tag = (o.buffer || o).slice(o.byteLength - s));
                  }
                  c[1] = r._key;
                  var f;
                  try {
                    f = t.apply(g, c);
                  } catch (e) {
                    return Promise.reject(e);
                  }
                  return (
                    b &&
                      (f = new Promise(function (t, n) {
                        (f.onabort = f.onerror =
                          function (e) {
                            n(e);
                          }),
                          (f.oncomplete = function (n) {
                            var n = n.target.result;
                            if ('encrypt' === e && n instanceof AesGcmEncryptResult) {
                              var r = n.ciphertext,
                                o = n.tag;
                              (n = new Uint8Array(r.byteLength + o.byteLength)),
                                n.set(new Uint8Array(r), 0),
                                n.set(new Uint8Array(o), r.byteLength),
                                (n = n.buffer);
                            }
                            t(n);
                          });
                      })),
                    f
                  );
                };
              }),
              b)
            ) {
              var S = g.digest;
              (g.digest = function (e, t) {
                if (!t.byteLength) throw new Error('Empy input is not allowed');
                var n;
                try {
                  n = S.call(g, e, t);
                } catch (e) {
                  return Promise.reject(e);
                }
                return (n = new Promise(function (e, t) {
                  (n.onabort = n.onerror =
                    function (e) {
                      t(e);
                    }),
                    (n.oncomplete = function (t) {
                      e(t.target.result);
                    });
                }));
              }),
                (e.crypto = Object.create(y, {
                  getRandomValues: {
                    value: function (e) {
                      return y.getRandomValues(e);
                    },
                  },
                  subtle: { value: g },
                })),
                (e.CryptoKey = p);
            }
            w && ((y.subtle = g), (e.Crypto = _), (e.SubtleCrypto = m), (e.CryptoKey = p));
          }
        }
      }
    });
  },
  function (e, t, n) {
    !(function (t, n) {
      e.exports = n();
    })(window, function () {
      return (function (e) {
        function t(r) {
          if (n[r]) return n[r].exports;
          var o = (n[r] = { i: r, l: !1, exports: {} });
          return e[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
        }
        var n = {};
        return (
          (t.m = e),
          (t.c = n),
          (t.d = function (e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: r });
          }),
          (t.r = function (e) {
            'undefined' != typeof Symbol &&
              Symbol.toStringTag &&
              Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
              Object.defineProperty(e, '__esModule', { value: !0 });
          }),
          (t.t = function (e, n) {
            if ((1 & n && (e = t(e)), 8 & n)) return e;
            if (4 & n && 'object' == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (
              (t.r(r), Object.defineProperty(r, 'default', { enumerable: !0, value: e }), 2 & n && 'string' != typeof e)
            )
              for (var o in e)
                t.d(
                  r,
                  o,
                  function (t) {
                    return e[t];
                  }.bind(null, o)
                );
            return r;
          }),
          (t.n = function (e) {
            var n =
              e && e.__esModule
                ? function () {
                    return e.default;
                  }
                : function () {
                    return e;
                  };
            return t.d(n, 'a', n), n;
          }),
          (t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }),
          (t.p = ''),
          t((t.s = 1))
        );
      })([
        function (e, t, n) {
          'use strict';
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          function o() {
            for (var e = [], t = 0, n = 0; n < arguments.length; n++) e.push(v(arguments[n])), (t += e[n].length);
            var r = new Uint8Array(t),
              o = 0;
            for (n = 0; n < arguments.length; n++) for (var i = 0; i < e[n].length; i++) r[o++] = e[n][i];
            return c.assert(o === t, 'arrayBufferConcat: unexpected offset'), r;
          }
          n.r(t),
            n.d(t, 'importPublicKey', function () {
              return u;
            }),
            n.d(t, 'importPrivateKey', function () {
              return s;
            }),
            n.d(t, 'importEcPublicKey', function () {
              return f;
            }),
            n.d(t, 'importEcPrivateKey', function () {
              return l;
            }),
            n.d(t, 'importRsaPublicKey', function () {
              return d;
            }),
            n.d(t, 'importRsaPrivateKey', function () {
              return p;
            }),
            n.d(t, 'isString', function () {
              return h;
            }),
            n.d(t, 'arrayish', function () {
              return v;
            }),
            n.d(t, 'convertRsaKey', function () {
              return y;
            }),
            n.d(t, 'arrayFromString', function () {
              return g;
            }),
            n.d(t, 'arrayFromUtf8String', function () {
              return _;
            }),
            n.d(t, 'stringFromArray', function () {
              return m;
            }),
            n.d(t, 'utf8StringFromArray', function () {
              return E;
            }),
            n.d(t, 'stripLeadingZeros', function () {
              return b;
            }),
            n.d(t, 'arrayFromInt32', function () {
              return w;
            }),
            n.d(t, 'arrayBufferConcat', function () {
              return o;
            }),
            n.d(t, 'sha256', function () {
              return A;
            }),
            n.d(t, 'isCryptoKey', function () {
              return O;
            }),
            n.d(t, 'Base64Url', function () {
              return S;
            });
          var i = n(2),
            a = n(1),
            c = new i.a(),
            u = function (e, t) {
              switch (t) {
                case 'RS256':
                case 'RS384':
                case 'RS512':
                case 'PS256':
                case 'PS384':
                case 'PS512':
                  return d(e, t);
                case 'ES256':
                case 'ES384':
                case 'ES512':
                  return f(e, t);
                default:
                  throw Error('unsupported algorithm: ' + t);
              }
            },
            s = function (e, t) {
              switch (t) {
                case 'RS256':
                case 'RS384':
                case 'RS512':
                case 'PS256':
                case 'PS384':
                case 'PS512':
                  return p(e, t);
                case 'ES256':
                case 'ES384':
                case 'ES512':
                  return l(e, t);
                default:
                  throw Error('unsupported algorithm: ' + t);
              }
            },
            f = function (e, t) {
              var n = c.getSignConfig(t),
                r = c.getKeyUsageByAlg(t);
              return a.Jose.crypto.subtle.importKey('jwk', e, n.id, !1, [r.publicKey]);
            },
            l = function (e, t) {
              var n = c.getSignConfig(t),
                r = c.getKeyUsageByAlg(t);
              return a.Jose.crypto.subtle.importKey('jwk', e, n.id, !1, [r.privateKey]);
            },
            d = function (e, t) {
              var n,
                r,
                o = c.getKeyUsageByAlg(t);
              if ('wrapKey' === o.publicKey) e.alg || (e.alg = t), (n = y(e, ['n', 'e'])), (r = c.getCryptoConfig(t));
              else {
                var i = {};
                for (var u in e) Object.prototype.hasOwnProperty.call(e, u) && (i[u] = e[u]);
                !i.alg && t && (i.alg = t), (r = c.getSignConfig(i.alg)), ((n = y(i, ['n', 'e'])).ext = !0);
              }
              return a.Jose.crypto.subtle.importKey('jwk', n, r.id, !1, [o.publicKey]);
            },
            p = function (e, t) {
              var n,
                r,
                o = c.getKeyUsageByAlg(t);
              if ('unwrapKey' === o.privateKey)
                e.alg || (e.alg = t),
                  (n = y(e, ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'])),
                  (r = c.getCryptoConfig(t));
              else {
                var i = {};
                for (var u in e) Object.prototype.hasOwnProperty.call(e, u) && (i[u] = e[u]);
                (r = c.getSignConfig(t)),
                  !i.alg && t && (i.alg = t),
                  ((n = y(i, ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'])).ext = !0);
              }
              return a.Jose.crypto.subtle.importKey('jwk', n, r.id, !1, [o.privateKey]);
            },
            h = function (e) {
              return 'string' == typeof e || e instanceof String;
            },
            v = function (e) {
              return e instanceof Array
                ? e
                : e instanceof Uint8Array
                ? e
                : e instanceof ArrayBuffer
                ? new Uint8Array(e)
                : void c.assert(!1, 'arrayish: invalid input');
            },
            y = function (e, t) {
              var n,
                r = {},
                o = [];
              t.map(function (t) {
                void 0 === e[t] && o.push(t);
              }),
                o.length > 0 && c.assert(!1, 'convertRsaKey: Was expecting ' + o.join()),
                void 0 !== e.kty && c.assert('RSA' === e.kty, "convertRsaKey: expecting rsaKey['kty'] to be 'RSA'"),
                (r.kty = 'RSA');
              try {
                c.getSignConfig(e.alg), (n = e.alg);
              } catch (t) {
                try {
                  c.getCryptoConfig(e.alg), (n = e.alg);
                } catch (e) {
                  c.assert(n, "convertRsaKey: expecting rsaKey['alg'] to have a valid value");
                }
              }
              r.alg = n;
              for (
                var i = function (e) {
                    return parseInt(e, 16);
                  },
                  a = 0;
                a < t.length;
                a++
              ) {
                var u = t[a],
                  s = e[u],
                  f = new S();
                if ('e' === u) 'number' == typeof s && (s = f.encodeArray(b(w(s))));
                else if (/^([0-9a-fA-F]{2}:)+[0-9a-fA-F]{2}$/.test(s)) {
                  var l = s.split(':').map(i);
                  s = f.encodeArray(b(l));
                } else
                  'string' != typeof s && c.assert(!1, "convertRsaKey: expecting rsaKey['" + u + "'] to be a string");
                r[u] = s;
              }
              return r;
            },
            g = function (e) {
              c.assert(h(e), 'arrayFromString: invalid input');
              var t = e.split('').map(function (e) {
                return e.charCodeAt(0);
              });
              return new Uint8Array(t);
            },
            _ = function (e) {
              return c.assert(h(e), 'arrayFromUtf8String: invalid input'), (e = unescape(encodeURIComponent(e))), g(e);
            },
            m = function (e) {
              e = v(e);
              for (var t = '', n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
              return t;
            },
            E = function (e) {
              c.assert(e instanceof ArrayBuffer, 'utf8StringFromArray: invalid input');
              var t = m(e);
              return decodeURIComponent(escape(t));
            },
            b = function (e) {
              e instanceof ArrayBuffer && (e = new Uint8Array(e));
              for (var t = !0, n = [], r = 0; r < e.length; r++) (t && 0 === e[r]) || ((t = !1), n.push(e[r]));
              return n;
            },
            w = function (e) {
              c.assert('number' == typeof e, 'arrayFromInt32: invalid input'),
                c.assert((e == e) | 0, 'arrayFromInt32: out of range');
              for (var t = new Uint8Array(new Uint32Array([e]).buffer), n = new Uint8Array(4), r = 0; r < 4; r++)
                n[r] = t[3 - r];
              return n.buffer;
            },
            A = function (e) {
              return a.Jose.crypto.subtle.digest({ name: 'SHA-256' }, g(e)).then(function (e) {
                return new S().encodeArray(e);
              });
            },
            O = function (e) {
              return 'CryptoKey' === e.constructor.name || !!Object.prototype.hasOwnProperty.call(e, 'algorithm');
            },
            S = (function () {
              function e() {
                !(function (e, t) {
                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, e);
              }
              var t, n;
              return (
                (t = e),
                (n = [
                  {
                    key: 'encode',
                    value: function (e) {
                      return (
                        c.assert(h(e), 'Base64Url.encode: invalid input'),
                        btoa(e).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
                      );
                    },
                  },
                  {
                    key: 'encodeArray',
                    value: function (e) {
                      return this.encode(m(e));
                    },
                  },
                  {
                    key: 'decode',
                    value: function (e) {
                      return (
                        c.assert(h(e), 'Base64Url.decode: invalid input'), atob(e.replace(/-/g, '+').replace(/_/g, '/'))
                      );
                    },
                  },
                  {
                    key: 'decodeArray',
                    value: function (e) {
                      return c.assert(h(e), 'Base64Url.decodeArray: invalid input'), g(this.decode(e));
                    },
                  },
                ]) && r(t.prototype, n),
                e
              );
            })();
        },
        function (e, t, n) {
          'use strict';
          n.r(t),
            function (e, r) {
              function o(e) {
                return (o =
                  'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (e) {
                        return typeof e;
                      }
                    : function (e) {
                        return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                          ? 'symbol'
                          : typeof e;
                      })(e);
              }
              n.d(t, 'crypto', function () {
                return i;
              }),
                n.d(t, 'Utils', function () {
                  return d;
                }),
                n.d(t, 'setCrypto', function () {
                  return v;
                }),
                n.d(t, 'Jose', function () {
                  return y;
                }),
                n.d(t, 'JoseJWE', function () {
                  return p;
                }),
                n.d(t, 'JoseJWS', function () {
                  return h;
                }),
                n.d(t, 'caniuse', function () {
                  return g;
                });
              var i,
                a = n(0),
                c = n(4),
                u = n(5),
                s = n(6),
                f = n(7),
                l = n(2);
              n.d(t, 'WebCryptographer', function () {
                return l.a;
              });
              var d = a,
                p = { Encrypter: c.a, Decrypter: u.a },
                h = { Signer: s.a, Verifier: f.a },
                v = function (e) {
                  i = e;
                };
              'undefined' != typeof window &&
                void 0 !== window.crypto &&
                (v(window.crypto), i.subtle || (i.subtle = i.webkitSubtle));
              var y = { JoseJWS: h, JoseJWE: p, WebCryptographer: l.a, crypto: i, Utils: d };
              (t.default = { Jose: y, WebCryptographer: l.a }),
                'function' != typeof atob &&
                  (atob = function (t) {
                    return e.from(t, 'base64').toString('binary');
                  }),
                'function' != typeof btoa &&
                  (btoa = function (t) {
                    return (t instanceof e ? t : e.from(t.toString(), 'binary')).toString('base64');
                  });
              var g = function () {
                var e = !0;
                e =
                  (e =
                    (e = (e = e && 'function' == typeof Promise) && 'function' == typeof Promise.reject) &&
                    'function' == typeof Promise.prototype.then) && 'function' == typeof Promise.all;
                var t = window || r;
                return (e =
                  (e =
                    (e =
                      (e =
                        (e =
                          (e =
                            (e =
                              (e =
                                (e =
                                  (e =
                                    (e =
                                      (e =
                                        (e =
                                          (e =
                                            (e =
                                              (e =
                                                (e =
                                                  (e =
                                                    (e = e && 'object' === o(t.crypto)) &&
                                                    'object' === o(t.crypto.subtle)) &&
                                                  'function' == typeof t.crypto.getRandomValues) &&
                                                'function' == typeof t.crypto.subtle.importKey) &&
                                              'function' == typeof t.crypto.subtle.generateKey) &&
                                            'function' == typeof t.crypto.subtle.exportKey) &&
                                          'function' == typeof t.crypto.subtle.wrapKey) &&
                                        'function' == typeof t.crypto.subtle.unwrapKey) &&
                                      'function' == typeof t.crypto.subtle.encrypt) &&
                                    'function' == typeof t.crypto.subtle.decrypt) &&
                                  'function' == typeof t.crypto.subtle.sign) && 'function' == typeof ArrayBuffer) &&
                              ('function' == typeof Uint8Array ||
                                'object' === ('undefined' == typeof Uint8Array ? 'undefined' : o(Uint8Array)))) &&
                            ('function' == typeof Uint32Array ||
                              'object' === ('undefined' == typeof Uint32Array ? 'undefined' : o(Uint32Array)))) &&
                          'object' === ('undefined' == typeof JSON ? 'undefined' : o(JSON))) &&
                        'function' == typeof JSON.parse) && 'function' == typeof JSON.stringify) &&
                    'function' == typeof atob) && 'function' == typeof btoa);
              };
            }.call(this, n(8).Buffer, n(3));
        },
        function (e, t, n) {
          'use strict';
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          n.d(t, 'a', function () {
            return a;
          });
          var o = n(0),
            i = n(1),
            a = (function () {
              function e() {
                !(function (e, t) {
                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, e),
                  this.setKeyEncryptionAlgorithm('RSA-OAEP'),
                  this.setContentEncryptionAlgorithm('A256GCM'),
                  this.setContentSignAlgorithm('RS256');
              }
              var t, n;
              return (
                (t = e),
                (n = [
                  {
                    key: 'setKeyEncryptionAlgorithm',
                    value: function (e) {
                      this.keyEncryption = this.getCryptoConfig(e);
                    },
                  },
                  {
                    key: 'getKeyEncryptionAlgorithm',
                    value: function () {
                      return this.keyEncryption.jweName;
                    },
                  },
                  {
                    key: 'setContentEncryptionAlgorithm',
                    value: function (e) {
                      this.content_encryption = this.getCryptoConfig(e);
                    },
                  },
                  {
                    key: 'getContentEncryptionAlgorithm',
                    value: function () {
                      return this.content_encryption.jweName;
                    },
                  },
                  {
                    key: 'setContentSignAlgorithm',
                    value: function (e) {
                      this.content_sign = this.getSignConfig(e);
                    },
                  },
                  {
                    key: 'getContentSignAlgorithm',
                    value: function () {
                      return this.content_sign.jwa_name;
                    },
                  },
                  {
                    key: 'createIV',
                    value: function () {
                      var e = new Uint8Array(new Array(this.content_encryption.iv_bytes));
                      return i.Jose.crypto.getRandomValues(e);
                    },
                  },
                  {
                    key: 'createCek',
                    value: function () {
                      var e = this.getCekWorkaround(this.content_encryption);
                      return i.Jose.crypto.subtle.generateKey(e.id, !0, e.enc_op);
                    },
                  },
                  {
                    key: 'wrapCek',
                    value: function (e, t) {
                      return i.Jose.crypto.subtle.wrapKey('raw', e, t, this.keyEncryption.id);
                    },
                  },
                  {
                    key: 'unwrapCek',
                    value: function (e, t) {
                      var n = this.getCekWorkaround(this.content_encryption),
                        r = this.content_encryption.specific_cekBytes > 0,
                        o = this.keyEncryption.id;
                      return i.Jose.crypto.subtle.unwrapKey('raw', e, t, o, n.id, r, n.dec_op);
                    },
                  },
                  {
                    key: 'getCekWorkaround',
                    value: function (e) {
                      var t = e.specific_cekBytes;
                      if (t) {
                        if (16 === t)
                          return { id: { name: 'AES-CBC', length: 128 }, enc_op: ['encrypt'], dec_op: ['decrypt'] };
                        if (32 === t)
                          return { id: { name: 'AES-CBC', length: 256 }, enc_op: ['encrypt'], dec_op: ['decrypt'] };
                        if (64 === t)
                          return {
                            id: { name: 'HMAC', hash: { name: 'SHA-256' } },
                            enc_op: ['sign'],
                            dec_op: ['verify'],
                          };
                        if (128 === t)
                          return {
                            id: { name: 'HMAC', hash: { name: 'SHA-384' } },
                            enc_op: ['sign'],
                            dec_op: ['verify'],
                          };
                        this.assert(!1, 'getCekWorkaround: invalid len');
                      }
                      return { id: e.id, enc_op: ['encrypt'], dec_op: ['decrypt'] };
                    },
                  },
                  {
                    key: 'encrypt',
                    value: function (e, t, n, r) {
                      var o = this,
                        a = this.content_encryption;
                      if (e.length !== a.iv_bytes) return Promise.reject(Error('invalid IV length'));
                      if (a.auth.aead) {
                        var c = a.auth.tagBytes,
                          u = { name: a.id.name, iv: e, additionalData: t, tagLength: 8 * c };
                        return n.then(function (e) {
                          return i.Jose.crypto.subtle.encrypt(u, e, r).then(function (e) {
                            var t = e.byteLength - c;
                            return { cipher: e.slice(0, t), tag: e.slice(t) };
                          });
                        });
                      }
                      var s = this.splitKey(a, n, ['encrypt']),
                        f = s[0],
                        l = s[1].then(function (t) {
                          var n = { name: a.id.name, iv: e };
                          return i.Jose.crypto.subtle.encrypt(n, t, r);
                        }),
                        d = l.then(function (n) {
                          return o.truncatedMac(a, f, t, e, n);
                        });
                      return Promise.all([l, d]).then(function (e) {
                        return { cipher: e[0], tag: e[1] };
                      });
                    },
                  },
                  {
                    key: 'compare',
                    value: function (e, t, n, r) {
                      return (
                        this.assert(n instanceof Uint8Array, 'compare: invalid input'),
                        this.assert(r instanceof Uint8Array, 'compare: invalid input'),
                        t.then(function (t) {
                          var o = i.Jose.crypto.subtle.sign(e.auth.id, t, n),
                            a = i.Jose.crypto.subtle.sign(e.auth.id, t, r);
                          return Promise.all([o, a]).then(function (e) {
                            var t = new Uint8Array(e[0]),
                              n = new Uint8Array(e[1]);
                            if (t.length !== n.length) throw new Error('compare failed');
                            for (var r = 0; r < t.length; r++) if (t[r] !== n[r]) throw new Error('compare failed');
                            return Promise.resolve(null);
                          });
                        })
                      );
                    },
                  },
                  {
                    key: 'decrypt',
                    value: function (e, t, n, r, a) {
                      var c = this;
                      if (n.length !== this.content_encryption.iv_bytes)
                        return Promise.reject(Error('decryptCiphertext: invalid IV'));
                      var u = this.content_encryption;
                      if (u.auth.aead) {
                        var s = { name: u.id.name, iv: n, additionalData: t, tagLength: 8 * u.auth.tagBytes };
                        return e.then(function (e) {
                          var t = o.arrayBufferConcat(r, a);
                          return i.Jose.crypto.subtle.decrypt(s, e, t);
                        });
                      }
                      var f = this.splitKey(u, e, ['decrypt']),
                        l = f[0],
                        d = f[1],
                        p = this.truncatedMac(u, l, t, n, r);
                      return Promise.all([d, p]).then(function (e) {
                        var t = e[0],
                          o = e[1];
                        return c
                          .compare(u, l, new Uint8Array(o), a)
                          .then(function () {
                            var e = { name: u.id.name, iv: n };
                            return i.Jose.crypto.subtle.decrypt(e, t, r);
                          })
                          .catch(function () {
                            return Promise.reject(Error('decryptCiphertext: MAC failed.'));
                          });
                      });
                    },
                  },
                  {
                    key: 'sign',
                    value: function (e, t, n) {
                      var r = this.content_sign;
                      return (
                        e.alg && (r = this.getSignConfig(e.alg)),
                        n.then(function (n) {
                          var a = new o.Base64Url();
                          return i.Jose.crypto.subtle.sign(
                            r.id,
                            n,
                            o.arrayFromString(a.encode(JSON.stringify(e)) + '.' + a.encodeArray(t))
                          );
                        })
                      );
                    },
                  },
                  {
                    key: 'verify',
                    value: function (e, t, n, r, a) {
                      var c = this.content_sign;
                      return r.then(function (r) {
                        return i.Jose.crypto.subtle
                          .verify(c.id, r, n, o.arrayFromString(e + '.' + t))
                          .then(function (e) {
                            return { kid: a, verified: e };
                          });
                      });
                    },
                  },
                  {
                    key: 'keyId',
                    value: function (e) {
                      return o.sha256(e.n + '+' + e.d);
                    },
                  },
                  {
                    key: 'splitKey',
                    value: function (e, t, n) {
                      var r = t.then(function (e) {
                        return i.Jose.crypto.subtle.exportKey('raw', e);
                      });
                      return [
                        r.then(function (t) {
                          if (8 * t.byteLength !== e.id.length + 8 * e.auth.key_bytes)
                            return Promise.reject(Error('encryptPlainText: incorrect cek length'));
                          var n = t.slice(0, e.auth.key_bytes);
                          return i.Jose.crypto.subtle.importKey('raw', n, e.auth.id, !1, ['sign']);
                        }),
                        r.then(function (t) {
                          if (8 * t.byteLength !== e.id.length + 8 * e.auth.key_bytes)
                            return Promise.reject(Error('encryptPlainText: incorrect cek length'));
                          var r = t.slice(e.auth.key_bytes);
                          return i.Jose.crypto.subtle.importKey('raw', r, e.id, !1, n);
                        }),
                      ];
                    },
                  },
                  {
                    key: 'getCryptoConfig',
                    value: function (e) {
                      switch (e) {
                        case 'RSA-OAEP':
                          return { jweName: 'RSA-OAEP', id: { name: 'RSA-OAEP', hash: { name: 'SHA-1' } } };
                        case 'RSA-OAEP-256':
                          return { jweName: 'RSA-OAEP-256', id: { name: 'RSA-OAEP', hash: { name: 'SHA-256' } } };
                        case 'A128KW':
                          return { jweName: 'A128KW', id: { name: 'AES-KW', length: 128 } };
                        case 'A256KW':
                          return { jweName: 'A256KW', id: { name: 'AES-KW', length: 256 } };
                        case 'dir':
                          return { jweName: 'dir' };
                        case 'A128CBC-HS256':
                          return {
                            jweName: 'A128CBC-HS256',
                            id: { name: 'AES-CBC', length: 128 },
                            iv_bytes: 16,
                            specific_cekBytes: 32,
                            auth: {
                              key_bytes: 16,
                              id: { name: 'HMAC', hash: { name: 'SHA-256' } },
                              truncated_bytes: 16,
                            },
                          };
                        case 'A256CBC-HS512':
                          return {
                            jweName: 'A256CBC-HS512',
                            id: { name: 'AES-CBC', length: 256 },
                            iv_bytes: 16,
                            specific_cekBytes: 64,
                            auth: {
                              key_bytes: 32,
                              id: { name: 'HMAC', hash: { name: 'SHA-512' } },
                              truncated_bytes: 32,
                            },
                          };
                        case 'A128GCM':
                          return {
                            jweName: 'A128GCM',
                            id: { name: 'AES-GCM', length: 128 },
                            iv_bytes: 12,
                            auth: { aead: !0, tagBytes: 16 },
                          };
                        case 'A256GCM':
                          return {
                            jweName: 'A256GCM',
                            id: { name: 'AES-GCM', length: 256 },
                            iv_bytes: 12,
                            auth: { aead: !0, tagBytes: 16 },
                          };
                        default:
                          throw Error('unsupported algorithm: ' + e);
                      }
                    },
                  },
                  {
                    key: 'truncatedMac',
                    value: function (e, t, n, r, a) {
                      return t.then(function (t) {
                        var c = new Uint8Array(o.arrayFromInt32(8 * n.length)),
                          u = new Uint8Array(8);
                        u.set(c, 4);
                        var s = o.arrayBufferConcat(n, r, a, u);
                        return i.Jose.crypto.subtle.sign(e.auth.id, t, s).then(function (t) {
                          return t.slice(0, e.auth.truncated_bytes);
                        });
                      });
                    },
                  },
                  {
                    key: 'getSignConfig',
                    value: function (e) {
                      switch (e) {
                        case 'RS256':
                          return { jwa_name: 'RS256', id: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } } };
                        case 'RS384':
                          return { jwa_name: 'RS384', id: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-384' } } };
                        case 'RS512':
                          return { jwa_name: 'RS512', id: { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-512' } } };
                        case 'PS256':
                          return {
                            jwa_name: 'PS256',
                            id: { name: 'RSA-PSS', hash: { name: 'SHA-256' }, saltLength: 20 },
                          };
                        case 'PS384':
                          return {
                            jwa_name: 'PS384',
                            id: { name: 'RSA-PSS', hash: { name: 'SHA-384' }, saltLength: 20 },
                          };
                        case 'PS512':
                          return {
                            jwa_name: 'PS512',
                            id: { name: 'RSA-PSS', hash: { name: 'SHA-512' }, saltLength: 20 },
                          };
                        case 'HS256':
                          return { jwa_name: 'HS256', id: { name: 'HMAC', hash: { name: 'SHA-256' } } };
                        case 'HS384':
                          return { jwa_name: 'HS384', id: { name: 'HMAC', hash: { name: 'SHA-384' } } };
                        case 'HS512':
                          return { jwa_name: 'HS512', id: { name: 'HMAC', hash: { name: 'SHA-512' } } };
                        case 'ES256':
                          return {
                            jwa_name: 'ES256',
                            id: { name: 'ECDSA', namedCurve: 'P-256', hash: { name: 'SHA-256' } },
                          };
                        case 'ES384':
                          return {
                            jwa_name: 'ES384',
                            id: { name: 'ECDSA', namedCurve: 'P-384', hash: { name: 'SHA-384' } },
                          };
                        case 'ES512':
                          return {
                            jwa_name: 'ES512',
                            id: { name: 'ECDSA', namedCurve: 'P-521', hash: { name: 'SHA-512' } },
                          };
                        default:
                          throw Error('unsupported algorithm: ' + e);
                      }
                    },
                  },
                  {
                    key: 'getKeyUsageByAlg',
                    value: function (e) {
                      switch (e) {
                        case 'RS256':
                        case 'RS384':
                        case 'RS512':
                        case 'PS256':
                        case 'PS384':
                        case 'PS512':
                        case 'HS256':
                        case 'HS384':
                        case 'HS512':
                        case 'ES256':
                        case 'ES384':
                        case 'ES512':
                        case 'ES256K':
                          return { publicKey: 'verify', privateKey: 'sign' };
                        case 'RSA-OAEP':
                        case 'RSA-OAEP-256':
                        case 'A128KW':
                        case 'A256KW':
                          return { publicKey: 'wrapKey', privateKey: 'unwrapKey' };
                        default:
                          throw Error('unsupported algorithm: ' + e);
                      }
                    },
                  },
                  {
                    key: 'assert',
                    value: function (e, t) {
                      if (!e) throw new Error(t);
                    },
                  },
                ]) && r(t.prototype, n),
                e
              );
            })();
        },
        function (e, t) {
          function n(e) {
            return (n =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  })(e);
          }
          var r;
          r = (function () {
            return this;
          })();
          try {
            r = r || new Function('return this')();
          } catch (e) {
            'object' === ('undefined' == typeof window ? 'undefined' : n(window)) && (r = window);
          }
          e.exports = r;
        },
        function (e, t, n) {
          'use strict';
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          n.d(t, 'a', function () {
            return i;
          });
          var o = n(0),
            i = (function () {
              function e(t, n) {
                !(function (e, t) {
                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, e),
                  (this.cryptographer = t),
                  (this.keyPromise = n),
                  (this.userHeaders = {});
              }
              var t, n;
              return (
                (t = e),
                (n = [
                  {
                    key: 'addHeader',
                    value: function (e, t) {
                      this.userHeaders[e] = t;
                    },
                  },
                  {
                    key: 'encrypt',
                    value: function (e) {
                      var t, n;
                      'dir' === this.cryptographer.getKeyEncryptionAlgorithm()
                        ? ((t = Promise.resolve(this.keyPromise)), (n = []))
                        : ((t = this.cryptographer.createCek()),
                          (n = Promise.all([this.keyPromise, t]).then(
                            function (e) {
                              var t = e[0],
                                n = e[1];
                              return this.cryptographer.wrapCek(n, t);
                            }.bind(this)
                          )));
                      var r = function (e, t) {
                        var n = {};
                        for (var r in this.userHeaders) n[r] = this.userHeaders[r];
                        (n.alg = this.cryptographer.getKeyEncryptionAlgorithm()),
                          (n.enc = this.cryptographer.getContentEncryptionAlgorithm());
                        var i = new o.Base64Url().encode(JSON.stringify(n)),
                          a = this.cryptographer.createIV(),
                          c = o.arrayFromString(i);
                        return (
                          (t = o.arrayFromUtf8String(t)),
                          this.cryptographer.encrypt(a, c, e, t).then(function (e) {
                            return (e.header = i), (e.iv = a), e;
                          })
                        );
                      }.bind(this, t, e)();
                      return Promise.all([n, r]).then(function (e) {
                        var t = e[0],
                          n = e[1],
                          r = new o.Base64Url();
                        return (
                          n.header +
                          '.' +
                          r.encodeArray(t) +
                          '.' +
                          r.encodeArray(n.iv) +
                          '.' +
                          r.encodeArray(n.cipher) +
                          '.' +
                          r.encodeArray(n.tag)
                        );
                      });
                    },
                  },
                ]) && r(t.prototype, n),
                e
              );
            })();
        },
        function (e, t, n) {
          'use strict';
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          n.d(t, 'a', function () {
            return i;
          });
          var o = n(0),
            i = (function () {
              function e(t, n) {
                !(function (e, t) {
                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, e),
                  (this.cryptographer = t),
                  (this.keyPromise = n),
                  (this.headers = {}),
                  (this.base64UrlEncoder = new o.Base64Url());
              }
              var t, n;
              return (
                (t = e),
                (n = [
                  {
                    key: 'getHeaders',
                    value: function () {
                      return this.headers;
                    },
                  },
                  {
                    key: 'decrypt',
                    value: function (e) {
                      var t,
                        n = e.split('.');
                      if (5 !== n.length) return Promise.reject(Error('decrypt: invalid input'));
                      if (((this.headers = JSON.parse(this.base64UrlEncoder.decode(n[0]))), !this.headers.alg))
                        return Promise.reject(Error('decrypt: missing alg'));
                      if (!this.headers.enc) return Promise.reject(Error('decrypt: missing enc'));
                      if (
                        (this.cryptographer.setKeyEncryptionAlgorithm(this.headers.alg),
                        this.cryptographer.setContentEncryptionAlgorithm(this.headers.enc),
                        this.headers.crit)
                      )
                        return Promise.reject(Error('decrypt: crit is not supported'));
                      if ('dir' === this.headers.alg) t = Promise.resolve(this.keyPromise);
                      else {
                        var r = this.base64UrlEncoder.decodeArray(n[1]);
                        t = this.keyPromise.then(
                          function (e) {
                            return this.cryptographer.unwrapCek(r, e);
                          }.bind(this)
                        );
                      }
                      return this.cryptographer
                        .decrypt(
                          t,
                          o.arrayFromString(n[0]),
                          this.base64UrlEncoder.decodeArray(n[2]),
                          this.base64UrlEncoder.decodeArray(n[3]),
                          this.base64UrlEncoder.decodeArray(n[4])
                        )
                        .then(o.utf8StringFromArray);
                    },
                  },
                ]) && r(t.prototype, n),
                e
              );
            })();
        },
        function (e, t, n) {
          'use strict';
          function r(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          }
          function o(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          function i(e, t, n) {
            return t && o(e.prototype, t), n && o(e, n), e;
          }
          n.d(t, 'a', function () {
            return c;
          });
          var a = n(0),
            c = (function () {
              function e(t) {
                r(this, e),
                  (this.cryptographer = t),
                  (this.keyPromises = {}),
                  (this.waiting_kid = 0),
                  (this.headers = {}),
                  (this.signer_aads = {}),
                  (this.signer_headers = {});
              }
              return (
                i(e, [
                  {
                    key: 'addSigner',
                    value: function (e, t, n, r) {
                      var o,
                        i,
                        c,
                        u = this;
                      if (
                        (a.isCryptoKey(e)
                          ? (o = new Promise(function (t) {
                              t(e);
                            }))
                          : ((i = n && n.alg ? n.alg : u.cryptographer.getContentSignAlgorithm()),
                            (o = a.importPrivateKey(e, i, 'sign'))),
                        t)
                      )
                        c = new Promise(function (e) {
                          e(t);
                        });
                      else {
                        if (a.isCryptoKey(e))
                          throw new Error('keyId is a mandatory argument when the key is a CryptoKey');
                        c = this.cryptographer.keyId(e);
                      }
                      return (
                        u.waiting_kid++,
                        c.then(function (e) {
                          return (
                            (u.keyPromises[e] = o),
                            u.waiting_kid--,
                            n && (u.signer_aads[e] = n),
                            r && (u.signer_headers[e] = r),
                            e
                          );
                        })
                      );
                    },
                  },
                  {
                    key: 'addSignature',
                    value: function (e, t, n) {
                      if (
                        (a.isString(e) && (e = JSON.parse(e)),
                        e.payload &&
                          a.isString(e.payload) &&
                          e.protected &&
                          a.isString(e.protected) &&
                          e.header &&
                          e.header instanceof Object &&
                          e.signature &&
                          a.isString(e.signature))
                      )
                        return this.sign(u.fromObject(e), t, n);
                      throw new Error('JWS is not a valid JWS object');
                    },
                  },
                  {
                    key: 'sign',
                    value: function (e, t, n) {
                      function r(e, t, n, r, i) {
                        var c;
                        if (
                          (t || (t = {}),
                          t.alg || ((t.alg = o.cryptographer.getContentSignAlgorithm()), (t.typ = 'JWT')),
                          t.kid || (t.kid = i),
                          a.isString(e))
                        )
                          c = a.arrayFromUtf8String(e);
                        else
                          try {
                            c = a.arrayish(e);
                          } catch (t) {
                            if (e instanceof u) c = a.arrayFromString(new a.Base64Url().decode(e.payload));
                            else {
                              if (!(e instanceof Object)) throw new Error('cannot sign this message');
                              c = a.arrayFromUtf8String(JSON.stringify(e));
                            }
                          }
                        return o.cryptographer.sign(t, c, r).then(function (r) {
                          var o = new u(t, n, c, r);
                          return e instanceof u
                            ? (delete o.payload, e.signatures ? e.signatures.push(o) : (e.signatures = [o]), e)
                            : o;
                        });
                      }
                      var o = this,
                        i = [];
                      if (0 === Object.keys(o.keyPromises).length)
                        throw new Error('No signers defined. At least one is required to sign the JWS.');
                      if (o.waiting_kid) throw new Error('still generating key IDs');
                      for (var c in o.keyPromises) Object.prototype.hasOwnProperty.call(o.keyPromises, c) && i.push(c);
                      return (function e(t, n, i, a, c) {
                        if (c.length) {
                          var u = c.shift(),
                            s = r(t, o.signer_aads[u] || n, o.signer_headers[u] || i, a[u], u);
                          return (
                            c.length &&
                              (s = s.then(function (t) {
                                return e(t, null, null, a, c);
                              })),
                            s
                          );
                        }
                      })(e, t, n, o.keyPromises, i);
                    },
                  },
                ]),
                e
              );
            })(),
            u = (function () {
              function e(t, n, o, i) {
                r(this, e), (this.header = n);
                var c = new a.Base64Url();
                (this.payload = c.encodeArray(o)),
                  i && (this.signature = c.encodeArray(i)),
                  (this.protected = c.encode(JSON.stringify(t)));
              }
              return (
                i(e, [
                  {
                    key: 'fromObject',
                    value: function (t) {
                      var n = new e(t.protected, t.header, t.payload, null);
                      return (n.signature = t.signature), (n.signatures = t.signatures), n;
                    },
                  },
                  {
                    key: 'JsonSerialize',
                    value: function () {
                      return JSON.stringify(this);
                    },
                  },
                  {
                    key: 'CompactSerialize',
                    value: function () {
                      return this.protected + '.' + this.payload + '.' + this.signature;
                    },
                  },
                ]),
                e
              );
            })();
        },
        function (e, t, n) {
          'use strict';
          function r(e) {
            return (r =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  })(e);
          }
          function o(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          n.d(t, 'a', function () {
            return a;
          });
          var i = n(0),
            a = (function () {
              function e(t, n, o) {
                !(function (e, t) {
                  if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                })(this, e);
                var a, c, u, s, f, l, d;
                if (((this.cryptographer = t), (a = t.getContentSignAlgorithm()), i.isString(n)))
                  if ((c = /^([0-9a-z_-]+)\.([0-9a-z_-]+)\.([0-9a-z_-]+)$/i.exec(n))) {
                    if (4 !== c.length) throw new Error('wrong JWS compact serialization format');
                    n = { protected: c[1], payload: c[2], signature: c[3] };
                  } else n = JSON.parse(n);
                else if ('object' !== r(n)) throw new Error('data format not supported');
                (u = n.protected),
                  (s = n.header),
                  (f = n.payload),
                  (l = n.signatures instanceof Array ? n.signatures.slice(0) : []).forEach(function (e) {
                    (e.aad = e.protected), (e.protected = JSON.parse(new i.Base64Url().decode(e.protected)));
                  }),
                  (this.aad = u),
                  (d = new i.Base64Url().decode(u));
                try {
                  d = JSON.parse(d);
                } catch (e) {}
                if (!d && !s) throw new Error('at least one header is required');
                if (!d.alg) throw new Error("'alg' is a mandatory header");
                if (d.alg !== a)
                  throw new Error("the alg header '" + d.alg + "' doesn't match the requested algorithm '" + a + "'");
                if (d && d.typ && 'JWT' !== d.typ) throw new Error("typ '" + d.typ + "' not supported");
                n.signature && l.unshift({ aad: u, protected: d, header: s, signature: n.signature }),
                  (this.signatures = []);
                for (var p = 0; p < l.length; p++)
                  (this.signatures[p] = JSON.parse(JSON.stringify(l[p]))),
                    (this.signatures[p].signature = i.arrayFromString(new i.Base64Url().decode(l[p].signature)));
                (this.payload = f), (this.keyPromises = {}), (this.waiting_kid = 0), o && (this.keyfinder = o);
              }
              var t, n;
              return (
                (t = e),
                (n = [
                  {
                    key: 'addRecipient',
                    value: function (e, t, n) {
                      var r,
                        o,
                        a = this;
                      if (
                        ((o = i.isCryptoKey(e)
                          ? new Promise(function (t) {
                              t(e);
                            })
                          : i.importPublicKey(e, n || a.cryptographer.getContentSignAlgorithm(), 'verify')),
                        t)
                      )
                        r = new Promise(function (e) {
                          e(t);
                        });
                      else {
                        if (i.isCryptoKey(e))
                          throw new Error('keyId is a mandatory argument when the key is a CryptoKey');
                        console.log("it's unsafe to omit a keyId"), (r = this.cryptographer.keyId(e));
                      }
                      return (
                        a.waiting_kid++,
                        r.then(function (e) {
                          return (a.keyPromises[e] = o), a.waiting_kid--, e;
                        })
                      );
                    },
                  },
                  {
                    key: 'verify',
                    value: function () {
                      var e = this,
                        t = e.signatures,
                        n = e.keyPromises,
                        r = e.keyfinder,
                        o = [];
                      if (!(r || Object.keys(e.keyPromises).length > 0))
                        throw new Error('No recipients defined. At least one is required to verify the JWS.');
                      if (e.waiting_kid) throw new Error('still generating key IDs');
                      return (
                        t.forEach(function (t) {
                          var a = t.protected.kid;
                          r && (n[a] = r(a)),
                            o.push(
                              e.cryptographer.verify(t.aad, e.payload, t.signature, n[a], a).then(function (t) {
                                return t.verified && (t.payload = new i.Base64Url().decode(e.payload)), t;
                              })
                            );
                        }),
                        Promise.all(o)
                      );
                    },
                  },
                ]) && o(t.prototype, n),
                e
              );
            })();
        },
        function (e, t, n) {
          'use strict';
          (function (e) {
            function r() {
              return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
            }
            function o(e, t) {
              if (r() < t) throw new RangeError('Invalid typed array length');
              return (
                i.TYPED_ARRAY_SUPPORT
                  ? ((e = new Uint8Array(t)).__proto__ = i.prototype)
                  : (null === e && (e = new i(t)), (e.length = t)),
                e
              );
            }
            function i(e, t, n) {
              if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(e, t, n);
              if ('number' == typeof e) {
                if ('string' == typeof t)
                  throw new Error('If encoding is specified then the first argument must be a string');
                return u(this, e);
              }
              return a(this, e, t, n);
            }
            function a(e, t, n, r) {
              if ('number' == typeof t) throw new TypeError('"value" argument must not be a number');
              return 'undefined' != typeof ArrayBuffer && t instanceof ArrayBuffer
                ? (function (e, t, n, r) {
                    if ((t.byteLength, n < 0 || t.byteLength < n)) throw new RangeError("'offset' is out of bounds");
                    if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
                    return (
                      (t =
                        void 0 === n && void 0 === r
                          ? new Uint8Array(t)
                          : void 0 === r
                          ? new Uint8Array(t, n)
                          : new Uint8Array(t, n, r)),
                      i.TYPED_ARRAY_SUPPORT ? ((e = t).__proto__ = i.prototype) : (e = s(e, t)),
                      e
                    );
                  })(e, t, n, r)
                : 'string' == typeof t
                ? (function (e, t, n) {
                    if ((('string' == typeof n && '' !== n) || (n = 'utf8'), !i.isEncoding(n)))
                      throw new TypeError('"encoding" must be a valid string encoding');
                    var r = 0 | l(t, n),
                      a = (e = o(e, r)).write(t, n);
                    return a !== r && (e = e.slice(0, a)), e;
                  })(e, t, n)
                : (function (e, t) {
                    if (i.isBuffer(t)) {
                      var n = 0 | f(t.length);
                      return 0 === (e = o(e, n)).length ? e : (t.copy(e, 0, 0, n), e);
                    }
                    if (t) {
                      if (('undefined' != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer) || 'length' in t)
                        return 'number' != typeof t.length || (r = t.length) != r ? o(e, 0) : s(e, t);
                      if ('Buffer' === t.type && B(t.data)) return s(e, t.data);
                    }
                    var r;
                    throw new TypeError(
                      'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
                    );
                  })(e, t);
            }
            function c(e) {
              if ('number' != typeof e) throw new TypeError('"size" argument must be a number');
              if (e < 0) throw new RangeError('"size" argument must not be negative');
            }
            function u(e, t) {
              if ((c(t), (e = o(e, t < 0 ? 0 : 0 | f(t))), !i.TYPED_ARRAY_SUPPORT))
                for (var n = 0; n < t; ++n) e[n] = 0;
              return e;
            }
            function s(e, t) {
              var n = t.length < 0 ? 0 : 0 | f(t.length);
              e = o(e, n);
              for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
              return e;
            }
            function f(e) {
              if (e >= r())
                throw new RangeError(
                  'Attempt to allocate Buffer larger than maximum size: 0x' + r().toString(16) + ' bytes'
                );
              return 0 | e;
            }
            function l(e, t) {
              if (i.isBuffer(e)) return e.length;
              if (
                'undefined' != typeof ArrayBuffer &&
                'function' == typeof ArrayBuffer.isView &&
                (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
              )
                return e.byteLength;
              'string' != typeof e && (e = '' + e);
              var n = e.length;
              if (0 === n) return 0;
              for (var r = !1; ; )
                switch (t) {
                  case 'ascii':
                  case 'latin1':
                  case 'binary':
                    return n;
                  case 'utf8':
                  case 'utf-8':
                  case void 0:
                    return j(e).length;
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return 2 * n;
                  case 'hex':
                    return n >>> 1;
                  case 'base64':
                    return M(e).length;
                  default:
                    if (r) return j(e).length;
                    (t = ('' + t).toLowerCase()), (r = !0);
                }
            }
            function d(e, t, n) {
              var r = !1;
              if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return '';
              if (((void 0 === n || n > this.length) && (n = this.length), n <= 0)) return '';
              if ((n >>>= 0) <= (t >>>= 0)) return '';
              for (e || (e = 'utf8'); ; )
                switch (e) {
                  case 'hex':
                    return R(this, t, n);
                  case 'utf8':
                  case 'utf-8':
                    return A(this, t, n);
                  case 'ascii':
                    return O(this, t, n);
                  case 'latin1':
                  case 'binary':
                    return S(this, t, n);
                  case 'base64':
                    return w(this, t, n);
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return I(this, t, n);
                  default:
                    if (r) throw new TypeError('Unknown encoding: ' + e);
                    (e = (e + '').toLowerCase()), (r = !0);
                }
            }
            function p(e, t, n) {
              var r = e[t];
              (e[t] = e[n]), (e[n] = r);
            }
            function h(e, t, n, r, o) {
              if (0 === e.length) return -1;
              if (
                ('string' == typeof n
                  ? ((r = n), (n = 0))
                  : n > 2147483647
                  ? (n = 2147483647)
                  : n < -2147483648 && (n = -2147483648),
                (n = +n),
                isNaN(n) && (n = o ? 0 : e.length - 1),
                n < 0 && (n = e.length + n),
                n >= e.length)
              ) {
                if (o) return -1;
                n = e.length - 1;
              } else if (n < 0) {
                if (!o) return -1;
                n = 0;
              }
              if (('string' == typeof t && (t = i.from(t, r)), i.isBuffer(t)))
                return 0 === t.length ? -1 : v(e, t, n, r, o);
              if ('number' == typeof t)
                return (
                  (t &= 255),
                  i.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
                    ? o
                      ? Uint8Array.prototype.indexOf.call(e, t, n)
                      : Uint8Array.prototype.lastIndexOf.call(e, t, n)
                    : v(e, [t], n, r, o)
                );
              throw new TypeError('val must be string, number or Buffer');
            }
            function v(e, t, n, r, o) {
              function i(e, t) {
                return 1 === c ? e[t] : e.readUInt16BE(t * c);
              }
              var a,
                c = 1,
                u = e.length,
                s = t.length;
              if (
                void 0 !== r &&
                ('ucs2' === (r = String(r).toLowerCase()) || 'ucs-2' === r || 'utf16le' === r || 'utf-16le' === r)
              ) {
                if (e.length < 2 || t.length < 2) return -1;
                (c = 2), (u /= 2), (s /= 2), (n /= 2);
              }
              if (o) {
                var f = -1;
                for (a = n; a < u; a++)
                  if (i(e, a) === i(t, -1 === f ? 0 : a - f)) {
                    if ((-1 === f && (f = a), a - f + 1 === s)) return f * c;
                  } else -1 !== f && (a -= a - f), (f = -1);
              } else
                for (n + s > u && (n = u - s), a = n; a >= 0; a--) {
                  for (var l = !0, d = 0; d < s; d++)
                    if (i(e, a + d) !== i(t, d)) {
                      l = !1;
                      break;
                    }
                  if (l) return a;
                }
              return -1;
            }
            function y(e, t, n, r) {
              n = Number(n) || 0;
              var o = e.length - n;
              r ? (r = Number(r)) > o && (r = o) : (r = o);
              var i = t.length;
              if (i % 2 != 0) throw new TypeError('Invalid hex string');
              r > i / 2 && (r = i / 2);
              for (var a = 0; a < r; ++a) {
                var c = parseInt(t.substr(2 * a, 2), 16);
                if (isNaN(c)) return a;
                e[n + a] = c;
              }
              return a;
            }
            function g(e, t, n, r) {
              return F(j(t, e.length - n), e, n, r);
            }
            function _(e, t, n, r) {
              return F(
                (function (e) {
                  for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                  return t;
                })(t),
                e,
                n,
                r
              );
            }
            function m(e, t, n, r) {
              return _(e, t, n, r);
            }
            function E(e, t, n, r) {
              return F(M(t), e, n, r);
            }
            function b(e, t, n, r) {
              return F(
                (function (e, t) {
                  for (var n, r, o, i = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
                    (n = e.charCodeAt(a)), (r = n >> 8), (o = n % 256), i.push(o), i.push(r);
                  return i;
                })(t, e.length - n),
                e,
                n,
                r
              );
            }
            function w(e, t, n) {
              return 0 === t && n === e.length ? U.fromByteArray(e) : U.fromByteArray(e.slice(t, n));
            }
            function A(e, t, n) {
              n = Math.min(e.length, n);
              for (var r = [], o = t; o < n; ) {
                var i,
                  a,
                  c,
                  u,
                  s = e[o],
                  f = null,
                  l = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                if (o + l <= n)
                  switch (l) {
                    case 1:
                      s < 128 && (f = s);
                      break;
                    case 2:
                      128 == (192 & (i = e[o + 1])) && (u = ((31 & s) << 6) | (63 & i)) > 127 && (f = u);
                      break;
                    case 3:
                      (i = e[o + 1]),
                        (a = e[o + 2]),
                        128 == (192 & i) &&
                          128 == (192 & a) &&
                          (u = ((15 & s) << 12) | ((63 & i) << 6) | (63 & a)) > 2047 &&
                          (u < 55296 || u > 57343) &&
                          (f = u);
                      break;
                    case 4:
                      (i = e[o + 1]),
                        (a = e[o + 2]),
                        (c = e[o + 3]),
                        128 == (192 & i) &&
                          128 == (192 & a) &&
                          128 == (192 & c) &&
                          (u = ((15 & s) << 18) | ((63 & i) << 12) | ((63 & a) << 6) | (63 & c)) > 65535 &&
                          u < 1114112 &&
                          (f = u);
                  }
                null === f
                  ? ((f = 65533), (l = 1))
                  : f > 65535 && ((f -= 65536), r.push(((f >>> 10) & 1023) | 55296), (f = 56320 | (1023 & f))),
                  r.push(f),
                  (o += l);
              }
              return (function (e) {
                var t = e.length;
                if (t <= K) return String.fromCharCode.apply(String, e);
                for (var n = '', r = 0; r < t; ) n += String.fromCharCode.apply(String, e.slice(r, (r += K)));
                return n;
              })(r);
            }
            function O(e, t, n) {
              var r = '';
              n = Math.min(e.length, n);
              for (var o = t; o < n; ++o) r += String.fromCharCode(127 & e[o]);
              return r;
            }
            function S(e, t, n) {
              var r = '';
              n = Math.min(e.length, n);
              for (var o = t; o < n; ++o) r += String.fromCharCode(e[o]);
              return r;
            }
            function R(e, t, n) {
              var r = e.length;
              (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
              for (var o = '', i = t; i < n; ++i) o += D(e[i]);
              return o;
            }
            function I(e, t, n) {
              for (var r = e.slice(t, n), o = '', i = 0; i < r.length; i += 2)
                o += String.fromCharCode(r[i] + 256 * r[i + 1]);
              return o;
            }
            function T(e, t, n) {
              if (e % 1 != 0 || e < 0) throw new RangeError('offset is not uint');
              if (e + t > n) throw new RangeError('Trying to access beyond buffer length');
            }
            function k(e, t, n, r, o, a) {
              if (!i.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
              if (t > o || t < a) throw new RangeError('"value" argument is out of bounds');
              if (n + r > e.length) throw new RangeError('Index out of range');
            }
            function L(e, t, n, r) {
              t < 0 && (t = 65535 + t + 1);
              for (var o = 0, i = Math.min(e.length - n, 2); o < i; ++o)
                e[n + o] = (t & (255 << (8 * (r ? o : 1 - o)))) >>> (8 * (r ? o : 1 - o));
            }
            function P(e, t, n, r) {
              t < 0 && (t = 4294967295 + t + 1);
              for (var o = 0, i = Math.min(e.length - n, 4); o < i; ++o) e[n + o] = (t >>> (8 * (r ? o : 3 - o))) & 255;
            }
            function C(e, t, n, r, o, i) {
              if (n + r > e.length) throw new RangeError('Index out of range');
              if (n < 0) throw new RangeError('Index out of range');
            }
            function x(e, t, n, r, o) {
              return o || C(e, 0, n, 4), H.write(e, t, n, r, 23, 4), n + 4;
            }
            function N(e, t, n, r, o) {
              return o || C(e, 0, n, 8), H.write(e, t, n, r, 52, 8), n + 8;
            }
            function D(e) {
              return e < 16 ? '0' + e.toString(16) : e.toString(16);
            }
            function j(e, t) {
              var n;
              t = t || 1 / 0;
              for (var r = e.length, o = null, i = [], a = 0; a < r; ++a) {
                if ((n = e.charCodeAt(a)) > 55295 && n < 57344) {
                  if (!o) {
                    if (n > 56319) {
                      (t -= 3) > -1 && i.push(239, 191, 189);
                      continue;
                    }
                    if (a + 1 === r) {
                      (t -= 3) > -1 && i.push(239, 191, 189);
                      continue;
                    }
                    o = n;
                    continue;
                  }
                  if (n < 56320) {
                    (t -= 3) > -1 && i.push(239, 191, 189), (o = n);
                    continue;
                  }
                  n = 65536 + (((o - 55296) << 10) | (n - 56320));
                } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                if (((o = null), n < 128)) {
                  if ((t -= 1) < 0) break;
                  i.push(n);
                } else if (n < 2048) {
                  if ((t -= 2) < 0) break;
                  i.push((n >> 6) | 192, (63 & n) | 128);
                } else if (n < 65536) {
                  if ((t -= 3) < 0) break;
                  i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
                } else {
                  if (!(n < 1114112)) throw new Error('Invalid code point');
                  if ((t -= 4) < 0) break;
                  i.push((n >> 18) | 240, ((n >> 12) & 63) | 128, ((n >> 6) & 63) | 128, (63 & n) | 128);
                }
              }
              return i;
            }
            function M(e) {
              return U.toByteArray(
                (function (e) {
                  if (
                    (e = (function (e) {
                      return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
                    })(e).replace(W, '')).length < 2
                  )
                    return '';
                  for (; e.length % 4 != 0; ) e += '=';
                  return e;
                })(e)
              );
            }
            function F(e, t, n, r) {
              for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); ++o) t[o + n] = e[o];
              return o;
            }
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
             * @license  MIT
             */
            var U = n(9),
              H = n(10),
              B = n(11);
            (t.Buffer = i),
              (t.SlowBuffer = function (e) {
                return +e != e && (e = 0), i.alloc(+e);
              }),
              (t.INSPECT_MAX_BYTES = 50),
              (i.TYPED_ARRAY_SUPPORT =
                void 0 !== e.TYPED_ARRAY_SUPPORT
                  ? e.TYPED_ARRAY_SUPPORT
                  : (function () {
                      try {
                        var e = new Uint8Array(1);
                        return (
                          (e.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function () {
                              return 42;
                            },
                          }),
                          42 === e.foo() && 'function' == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                        );
                      } catch (e) {
                        return !1;
                      }
                    })()),
              (t.kMaxLength = r()),
              (i.poolSize = 8192),
              (i._augment = function (e) {
                return (e.__proto__ = i.prototype), e;
              }),
              (i.from = function (e, t, n) {
                return a(null, e, t, n);
              }),
              i.TYPED_ARRAY_SUPPORT &&
                ((i.prototype.__proto__ = Uint8Array.prototype),
                (i.__proto__ = Uint8Array),
                'undefined' != typeof Symbol &&
                  Symbol.species &&
                  i[Symbol.species] === i &&
                  Object.defineProperty(i, Symbol.species, { value: null, configurable: !0 })),
              (i.alloc = function (e, t, n) {
                return (function (e, t, n, r) {
                  return (
                    c(t),
                    t <= 0
                      ? o(e, t)
                      : void 0 !== n
                      ? 'string' == typeof r
                        ? o(e, t).fill(n, r)
                        : o(e, t).fill(n)
                      : o(e, t)
                  );
                })(null, e, t, n);
              }),
              (i.allocUnsafe = function (e) {
                return u(null, e);
              }),
              (i.allocUnsafeSlow = function (e) {
                return u(null, e);
              }),
              (i.isBuffer = function (e) {
                return !(null == e || !e._isBuffer);
              }),
              (i.compare = function (e, t) {
                if (!i.isBuffer(e) || !i.isBuffer(t)) throw new TypeError('Arguments must be Buffers');
                if (e === t) return 0;
                for (var n = e.length, r = t.length, o = 0, a = Math.min(n, r); o < a; ++o)
                  if (e[o] !== t[o]) {
                    (n = e[o]), (r = t[o]);
                    break;
                  }
                return n < r ? -1 : r < n ? 1 : 0;
              }),
              (i.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                  case 'hex':
                  case 'utf8':
                  case 'utf-8':
                  case 'ascii':
                  case 'latin1':
                  case 'binary':
                  case 'base64':
                  case 'ucs2':
                  case 'ucs-2':
                  case 'utf16le':
                  case 'utf-16le':
                    return !0;
                  default:
                    return !1;
                }
              }),
              (i.concat = function (e, t) {
                if (!B(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return i.alloc(0);
                var n;
                if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
                var r = i.allocUnsafe(t),
                  o = 0;
                for (n = 0; n < e.length; ++n) {
                  var a = e[n];
                  if (!i.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                  a.copy(r, o), (o += a.length);
                }
                return r;
              }),
              (i.byteLength = l),
              (i.prototype._isBuffer = !0),
              (i.prototype.swap16 = function () {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
                for (var t = 0; t < e; t += 2) p(this, t, t + 1);
                return this;
              }),
              (i.prototype.swap32 = function () {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
                for (var t = 0; t < e; t += 4) p(this, t, t + 3), p(this, t + 1, t + 2);
                return this;
              }),
              (i.prototype.swap64 = function () {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
                for (var t = 0; t < e; t += 8)
                  p(this, t, t + 7), p(this, t + 1, t + 6), p(this, t + 2, t + 5), p(this, t + 3, t + 4);
                return this;
              }),
              (i.prototype.toString = function () {
                var e = 0 | this.length;
                return 0 === e ? '' : 0 === arguments.length ? A(this, 0, e) : d.apply(this, arguments);
              }),
              (i.prototype.equals = function (e) {
                if (!i.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
                return this === e || 0 === i.compare(this, e);
              }),
              (i.prototype.inspect = function () {
                var e = '',
                  n = t.INSPECT_MAX_BYTES;
                return (
                  this.length > 0 &&
                    ((e = this.toString('hex', 0, n).match(/.{2}/g).join(' ')), this.length > n && (e += ' ... ')),
                  '<Buffer ' + e + '>'
                );
              }),
              (i.prototype.compare = function (e, t, n, r, o) {
                if (!i.isBuffer(e)) throw new TypeError('Argument must be a Buffer');
                if (
                  (void 0 === t && (t = 0),
                  void 0 === n && (n = e ? e.length : 0),
                  void 0 === r && (r = 0),
                  void 0 === o && (o = this.length),
                  t < 0 || n > e.length || r < 0 || o > this.length)
                )
                  throw new RangeError('out of range index');
                if (r >= o && t >= n) return 0;
                if (r >= o) return -1;
                if (t >= n) return 1;
                if (this === e) return 0;
                for (
                  var a = (o >>>= 0) - (r >>>= 0),
                    c = (n >>>= 0) - (t >>>= 0),
                    u = Math.min(a, c),
                    s = this.slice(r, o),
                    f = e.slice(t, n),
                    l = 0;
                  l < u;
                  ++l
                )
                  if (s[l] !== f[l]) {
                    (a = s[l]), (c = f[l]);
                    break;
                  }
                return a < c ? -1 : c < a ? 1 : 0;
              }),
              (i.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n);
              }),
              (i.prototype.indexOf = function (e, t, n) {
                return h(this, e, t, n, !0);
              }),
              (i.prototype.lastIndexOf = function (e, t, n) {
                return h(this, e, t, n, !1);
              }),
              (i.prototype.write = function (e, t, n, r) {
                if (void 0 === t) (r = 'utf8'), (n = this.length), (t = 0);
                else if (void 0 === n && 'string' == typeof t) (r = t), (n = this.length), (t = 0);
                else {
                  if (!isFinite(t))
                    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
                  (t |= 0), isFinite(n) ? ((n |= 0), void 0 === r && (r = 'utf8')) : ((r = n), (n = void 0));
                }
                var o = this.length - t;
                if (((void 0 === n || n > o) && (n = o), (e.length > 0 && (n < 0 || t < 0)) || t > this.length))
                  throw new RangeError('Attempt to write outside buffer bounds');
                r || (r = 'utf8');
                for (var i = !1; ; )
                  switch (r) {
                    case 'hex':
                      return y(this, e, t, n);
                    case 'utf8':
                    case 'utf-8':
                      return g(this, e, t, n);
                    case 'ascii':
                      return _(this, e, t, n);
                    case 'latin1':
                    case 'binary':
                      return m(this, e, t, n);
                    case 'base64':
                      return E(this, e, t, n);
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                      return b(this, e, t, n);
                    default:
                      if (i) throw new TypeError('Unknown encoding: ' + r);
                      (r = ('' + r).toLowerCase()), (i = !0);
                  }
              }),
              (i.prototype.toJSON = function () {
                return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
              });
            var K = 4096;
            (i.prototype.slice = function (e, t) {
              var n,
                r = this.length;
              if (
                ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
                (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
                t < e && (t = e),
                i.TYPED_ARRAY_SUPPORT)
              )
                (n = this.subarray(e, t)).__proto__ = i.prototype;
              else {
                var o = t - e;
                n = new i(o, void 0);
                for (var a = 0; a < o; ++a) n[a] = this[a + e];
              }
              return n;
            }),
              (i.prototype.readUIntLE = function (e, t, n) {
                (e |= 0), (t |= 0), n || T(e, t, this.length);
                for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) r += this[e + i] * o;
                return r;
              }),
              (i.prototype.readUIntBE = function (e, t, n) {
                (e |= 0), (t |= 0), n || T(e, t, this.length);
                for (var r = this[e + --t], o = 1; t > 0 && (o *= 256); ) r += this[e + --t] * o;
                return r;
              }),
              (i.prototype.readUInt8 = function (e, t) {
                return t || T(e, 1, this.length), this[e];
              }),
              (i.prototype.readUInt16LE = function (e, t) {
                return t || T(e, 2, this.length), this[e] | (this[e + 1] << 8);
              }),
              (i.prototype.readUInt16BE = function (e, t) {
                return t || T(e, 2, this.length), (this[e] << 8) | this[e + 1];
              }),
              (i.prototype.readUInt32LE = function (e, t) {
                return (
                  t || T(e, 4, this.length),
                  (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) + 16777216 * this[e + 3]
                );
              }),
              (i.prototype.readUInt32BE = function (e, t) {
                return (
                  t || T(e, 4, this.length),
                  16777216 * this[e] + ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
                );
              }),
              (i.prototype.readIntLE = function (e, t, n) {
                (e |= 0), (t |= 0), n || T(e, t, this.length);
                for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) r += this[e + i] * o;
                return r >= (o *= 128) && (r -= Math.pow(2, 8 * t)), r;
              }),
              (i.prototype.readIntBE = function (e, t, n) {
                (e |= 0), (t |= 0), n || T(e, t, this.length);
                for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256); ) i += this[e + --r] * o;
                return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
              }),
              (i.prototype.readInt8 = function (e, t) {
                return t || T(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
              }),
              (i.prototype.readInt16LE = function (e, t) {
                t || T(e, 2, this.length);
                var n = this[e] | (this[e + 1] << 8);
                return 32768 & n ? 4294901760 | n : n;
              }),
              (i.prototype.readInt16BE = function (e, t) {
                t || T(e, 2, this.length);
                var n = this[e + 1] | (this[e] << 8);
                return 32768 & n ? 4294901760 | n : n;
              }),
              (i.prototype.readInt32LE = function (e, t) {
                return (
                  t || T(e, 4, this.length), this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
                );
              }),
              (i.prototype.readInt32BE = function (e, t) {
                return (
                  t || T(e, 4, this.length), (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
                );
              }),
              (i.prototype.readFloatLE = function (e, t) {
                return t || T(e, 4, this.length), H.read(this, e, !0, 23, 4);
              }),
              (i.prototype.readFloatBE = function (e, t) {
                return t || T(e, 4, this.length), H.read(this, e, !1, 23, 4);
              }),
              (i.prototype.readDoubleLE = function (e, t) {
                return t || T(e, 8, this.length), H.read(this, e, !0, 52, 8);
              }),
              (i.prototype.readDoubleBE = function (e, t) {
                return t || T(e, 8, this.length), H.read(this, e, !1, 52, 8);
              }),
              (i.prototype.writeUIntLE = function (e, t, n, r) {
                (e = +e), (t |= 0), (n |= 0), r || k(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                var o = 1,
                  i = 0;
                for (this[t] = 255 & e; ++i < n && (o *= 256); ) this[t + i] = (e / o) & 255;
                return t + n;
              }),
              (i.prototype.writeUIntBE = function (e, t, n, r) {
                (e = +e), (t |= 0), (n |= 0), r || k(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                var o = n - 1,
                  i = 1;
                for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); ) this[t + o] = (e / i) & 255;
                return t + n;
              }),
              (i.prototype.writeUInt8 = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 1, 255, 0),
                  i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (i.prototype.writeUInt16LE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 2, 65535, 0),
                  i.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8)) : L(this, e, t, !0),
                  t + 2
                );
              }),
              (i.prototype.writeUInt16BE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 2, 65535, 0),
                  i.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e)) : L(this, e, t, !1),
                  t + 2
                );
              }),
              (i.prototype.writeUInt32LE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 4, 4294967295, 0),
                  i.TYPED_ARRAY_SUPPORT
                    ? ((this[t + 3] = e >>> 24), (this[t + 2] = e >>> 16), (this[t + 1] = e >>> 8), (this[t] = 255 & e))
                    : P(this, e, t, !0),
                  t + 4
                );
              }),
              (i.prototype.writeUInt32BE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 4, 4294967295, 0),
                  i.TYPED_ARRAY_SUPPORT
                    ? ((this[t] = e >>> 24), (this[t + 1] = e >>> 16), (this[t + 2] = e >>> 8), (this[t + 3] = 255 & e))
                    : P(this, e, t, !1),
                  t + 4
                );
              }),
              (i.prototype.writeIntLE = function (e, t, n, r) {
                if (((e = +e), (t |= 0), !r)) {
                  var o = Math.pow(2, 8 * n - 1);
                  k(this, e, t, n, o - 1, -o);
                }
                var i = 0,
                  a = 1,
                  c = 0;
                for (this[t] = 255 & e; ++i < n && (a *= 256); )
                  e < 0 && 0 === c && 0 !== this[t + i - 1] && (c = 1), (this[t + i] = (((e / a) >> 0) - c) & 255);
                return t + n;
              }),
              (i.prototype.writeIntBE = function (e, t, n, r) {
                if (((e = +e), (t |= 0), !r)) {
                  var o = Math.pow(2, 8 * n - 1);
                  k(this, e, t, n, o - 1, -o);
                }
                var i = n - 1,
                  a = 1,
                  c = 0;
                for (this[t + i] = 255 & e; --i >= 0 && (a *= 256); )
                  e < 0 && 0 === c && 0 !== this[t + i + 1] && (c = 1), (this[t + i] = (((e / a) >> 0) - c) & 255);
                return t + n;
              }),
              (i.prototype.writeInt8 = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 1, 127, -128),
                  i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
                  e < 0 && (e = 255 + e + 1),
                  (this[t] = 255 & e),
                  t + 1
                );
              }),
              (i.prototype.writeInt16LE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 2, 32767, -32768),
                  i.TYPED_ARRAY_SUPPORT ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8)) : L(this, e, t, !0),
                  t + 2
                );
              }),
              (i.prototype.writeInt16BE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 2, 32767, -32768),
                  i.TYPED_ARRAY_SUPPORT ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e)) : L(this, e, t, !1),
                  t + 2
                );
              }),
              (i.prototype.writeInt32LE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 4, 2147483647, -2147483648),
                  i.TYPED_ARRAY_SUPPORT
                    ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8), (this[t + 2] = e >>> 16), (this[t + 3] = e >>> 24))
                    : P(this, e, t, !0),
                  t + 4
                );
              }),
              (i.prototype.writeInt32BE = function (e, t, n) {
                return (
                  (e = +e),
                  (t |= 0),
                  n || k(this, e, t, 4, 2147483647, -2147483648),
                  e < 0 && (e = 4294967295 + e + 1),
                  i.TYPED_ARRAY_SUPPORT
                    ? ((this[t] = e >>> 24), (this[t + 1] = e >>> 16), (this[t + 2] = e >>> 8), (this[t + 3] = 255 & e))
                    : P(this, e, t, !1),
                  t + 4
                );
              }),
              (i.prototype.writeFloatLE = function (e, t, n) {
                return x(this, e, t, !0, n);
              }),
              (i.prototype.writeFloatBE = function (e, t, n) {
                return x(this, e, t, !1, n);
              }),
              (i.prototype.writeDoubleLE = function (e, t, n) {
                return N(this, e, t, !0, n);
              }),
              (i.prototype.writeDoubleBE = function (e, t, n) {
                return N(this, e, t, !1, n);
              }),
              (i.prototype.copy = function (e, t, n, r) {
                if (
                  (n || (n = 0),
                  r || 0 === r || (r = this.length),
                  t >= e.length && (t = e.length),
                  t || (t = 0),
                  r > 0 && r < n && (r = n),
                  r === n)
                )
                  return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (t < 0) throw new RangeError('targetStart out of bounds');
                if (n < 0 || n >= this.length) throw new RangeError('sourceStart out of bounds');
                if (r < 0) throw new RangeError('sourceEnd out of bounds');
                r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
                var o,
                  a = r - n;
                if (this === e && n < t && t < r) for (o = a - 1; o >= 0; --o) e[o + t] = this[o + n];
                else if (a < 1e3 || !i.TYPED_ARRAY_SUPPORT) for (o = 0; o < a; ++o) e[o + t] = this[o + n];
                else Uint8Array.prototype.set.call(e, this.subarray(n, n + a), t);
                return a;
              }),
              (i.prototype.fill = function (e, t, n, r) {
                if ('string' == typeof e) {
                  if (
                    ('string' == typeof t
                      ? ((r = t), (t = 0), (n = this.length))
                      : 'string' == typeof n && ((r = n), (n = this.length)),
                    1 === e.length)
                  ) {
                    var o = e.charCodeAt(0);
                    o < 256 && (e = o);
                  }
                  if (void 0 !== r && 'string' != typeof r) throw new TypeError('encoding must be a string');
                  if ('string' == typeof r && !i.isEncoding(r)) throw new TypeError('Unknown encoding: ' + r);
                } else 'number' == typeof e && (e &= 255);
                if (t < 0 || this.length < t || this.length < n) throw new RangeError('Out of range index');
                if (n <= t) return this;
                var a;
                if (((t >>>= 0), (n = void 0 === n ? this.length : n >>> 0), e || (e = 0), 'number' == typeof e))
                  for (a = t; a < n; ++a) this[a] = e;
                else {
                  var c = i.isBuffer(e) ? e : j(new i(e, r).toString()),
                    u = c.length;
                  for (a = 0; a < n - t; ++a) this[a + t] = c[a % u];
                }
                return this;
              });
            var W = /[^+\/0-9A-Za-z-_]/g;
          }.call(this, n(3)));
        },
        function (e, t, n) {
          'use strict';
          function r(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
            var n = e.indexOf('=');
            return -1 === n && (n = t), [n, n === t ? 0 : 4 - (n % 4)];
          }
          function o(e, t, n) {
            for (var r, o, a = [], c = t; c < n; c += 3)
              (r = ((e[c] << 16) & 16711680) + ((e[c + 1] << 8) & 65280) + (255 & e[c + 2])),
                a.push(i[((o = r) >> 18) & 63] + i[(o >> 12) & 63] + i[(o >> 6) & 63] + i[63 & o]);
            return a.join('');
          }
          (t.byteLength = function (e) {
            var t = r(e),
              n = t[0],
              o = t[1];
            return (3 * (n + o)) / 4 - o;
          }),
            (t.toByteArray = function (e) {
              for (
                var t,
                  n = r(e),
                  o = n[0],
                  i = n[1],
                  u = new c(
                    (function (e, t, n) {
                      return (3 * (t + n)) / 4 - n;
                    })(0, o, i)
                  ),
                  s = 0,
                  f = i > 0 ? o - 4 : o,
                  l = 0;
                l < f;
                l += 4
              )
                (t =
                  (a[e.charCodeAt(l)] << 18) |
                  (a[e.charCodeAt(l + 1)] << 12) |
                  (a[e.charCodeAt(l + 2)] << 6) |
                  a[e.charCodeAt(l + 3)]),
                  (u[s++] = (t >> 16) & 255),
                  (u[s++] = (t >> 8) & 255),
                  (u[s++] = 255 & t);
              return (
                2 === i && ((t = (a[e.charCodeAt(l)] << 2) | (a[e.charCodeAt(l + 1)] >> 4)), (u[s++] = 255 & t)),
                1 === i &&
                  ((t = (a[e.charCodeAt(l)] << 10) | (a[e.charCodeAt(l + 1)] << 4) | (a[e.charCodeAt(l + 2)] >> 2)),
                  (u[s++] = (t >> 8) & 255),
                  (u[s++] = 255 & t)),
                u
              );
            }),
            (t.fromByteArray = function (e) {
              for (var t, n = e.length, r = n % 3, a = [], c = 0, u = n - r; c < u; c += 16383)
                a.push(o(e, c, c + 16383 > u ? u : c + 16383));
              return (
                1 === r
                  ? ((t = e[n - 1]), a.push(i[t >> 2] + i[(t << 4) & 63] + '=='))
                  : 2 === r &&
                    ((t = (e[n - 2] << 8) + e[n - 1]), a.push(i[t >> 10] + i[(t >> 4) & 63] + i[(t << 2) & 63] + '=')),
                a.join('')
              );
            });
          for (
            var i = [],
              a = [],
              c = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
              u = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
              s = 0,
              f = u.length;
            s < f;
            ++s
          )
            (i[s] = u[s]), (a[u.charCodeAt(s)] = s);
          (a['-'.charCodeAt(0)] = 62), (a['_'.charCodeAt(0)] = 63);
        },
        function (e, t) {
          (t.read = function (e, t, n, r, o) {
            var i,
              a,
              c = 8 * o - r - 1,
              u = (1 << c) - 1,
              s = u >> 1,
              f = -7,
              l = n ? o - 1 : 0,
              d = n ? -1 : 1,
              p = e[t + l];
            for (l += d, i = p & ((1 << -f) - 1), p >>= -f, f += c; f > 0; i = 256 * i + e[t + l], l += d, f -= 8);
            for (a = i & ((1 << -f) - 1), i >>= -f, f += r; f > 0; a = 256 * a + e[t + l], l += d, f -= 8);
            if (0 === i) i = 1 - s;
            else {
              if (i === u) return a ? NaN : (1 / 0) * (p ? -1 : 1);
              (a += Math.pow(2, r)), (i -= s);
            }
            return (p ? -1 : 1) * a * Math.pow(2, i - r);
          }),
            (t.write = function (e, t, n, r, o, i) {
              var a,
                c,
                u,
                s = 8 * i - o - 1,
                f = (1 << s) - 1,
                l = f >> 1,
                d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                p = r ? 0 : i - 1,
                h = r ? 1 : -1,
                v = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
              for (
                t = Math.abs(t),
                  isNaN(t) || t === 1 / 0
                    ? ((c = isNaN(t) ? 1 : 0), (a = f))
                    : ((a = Math.floor(Math.log(t) / Math.LN2)),
                      t * (u = Math.pow(2, -a)) < 1 && (a--, (u *= 2)),
                      (t += a + l >= 1 ? d / u : d * Math.pow(2, 1 - l)) * u >= 2 && (a++, (u /= 2)),
                      a + l >= f
                        ? ((c = 0), (a = f))
                        : a + l >= 1
                        ? ((c = (t * u - 1) * Math.pow(2, o)), (a += l))
                        : ((c = t * Math.pow(2, l - 1) * Math.pow(2, o)), (a = 0)));
                o >= 8;
                e[n + p] = 255 & c, p += h, c /= 256, o -= 8
              );
              for (a = (a << o) | c, s += o; s > 0; e[n + p] = 255 & a, p += h, a /= 256, s -= 8);
              e[n + p - h] |= 128 * v;
            });
        },
        function (e, t) {
          var n = {}.toString;
          e.exports =
            Array.isArray ||
            function (e) {
              return '[object Array]' == n.call(e);
            };
        },
      ]);
    });
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t = e.id,
        n = e.sessionID,
        r = e.scheme;
      if (!Object(i.a)({ scheme: r }) || !o.a.get(t + ':' + n + ':shoppingBrowser:handshakeResponse')) return null;
      var a = o.a.get(t + ':' + n + ':shoppingBrowser:handshakeResponse');
      return { appSchema: a.appSchema, appVersion: a.appVersion, currentUrl: a.currentUrl };
    }
    t.a = r;
    var o = n(3),
      i = n(140);
  },
  function (e, t, n) {
    'use strict';
    var r = n(2),
      o = n.n(r),
      i = n(9),
      a = n(3),
      c = n(20),
      u = n(7),
      s = n(21),
      f = n(71),
      l = n(73),
      d = n(53),
      p = n(74),
      h = ['US', 'GB'],
      v = function (e, t) {
        return function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {},
            r = Object(s.a)(),
            v = a.a.get(e + ':clientToken') || {},
            y = v.experiments,
            g = void 0 === y ? {} : y,
            _ = v.purchaseCountry,
            m = v.sessionID,
            E = Object(u.b)(e + ':' + m, { api: e, oid: r }),
            b = Object(d.a)(),
            w = function (e) {
              return e && E.event(u.c.LOAD_PAYMENT_REVIEW_FAILED, { error: e }), n({ show_form: !1 });
            };
          if (!a.a.get(e + ':initialized')) throw (w(), new c.a());
          E.event(u.c.LOAD_PAYMENT_REVIEW_CALLED);
          var A = t.container;
          if (-1 === h.indexOf(_))
            throw (
              (w('OperationNotSupportedError'),
              new c.i(null, 'The operation is not supported for the current purchase country.'))
            );
          if ('string' != typeof A) {
            if (!(A instanceof HTMLElement))
              throw (
                (w('TypeError(options.container)'),
                new TypeError('Property `options.container` must be a string (CSS selector) or HTMLElement'))
              );
          } else if (!(A = document.querySelector(A))) throw (w('InvalidContainerSelectorError'), new c.g());
          var O = Object(f.a)({ id: e }),
            S = function (t) {
              t.call(
                'loadPaymentReview',
                o()(
                  {
                    isOnPgwThirdPartyChallengeRequestedSupported: Object(p.a)({ experiments: g, id: e, sessionID: m }),
                    operationID: r,
                    resetApplication: O,
                  },
                  b ? { inAppSdkParams: b } : {},
                  v
                ),
                function () {
                  E.event(u.c.LOAD_PAYMENT_REVIEW_COMPLETED), n.apply(void 0, arguments);
                }
              );
            },
            R = { main: o()({}, i.a.app.main, { style: o()({}, i.a.app.main.style, { height: '80px' }) }) },
            I = a.a.get(e + ':rawClientToken');
          Object(l.a)({
            id: e,
            clientToken: v,
            rawClientToken: I,
            container: A,
            options: t,
            tracker: E,
            appConfig: R,
            iframeName: 'payment-review',
            renderFullscreen: !1,
          })
            .then(S)
            .catch(function () {
              return w('bootstrap_failed');
            });
        };
      };
    t.a = v;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t, n) {
      if ('function' == typeof t) {
        var r = [t, {}];
        (n = r[0]), (t = r[1]);
      } else if ('function' == typeof e) {
        var o = [e, {}, {}];
        (n = o[0]), (e = o[1]), (t = o[2]);
      } else n = n || function () {};
      return [e || {}, t || {}, n];
    }
    var o = n(2),
      i = n.n(o),
      a = n(18),
      c = n.n(a),
      u = n(15),
      s = n.n(u),
      f = n(3),
      l = n(9),
      d = n(41),
      p = n(20),
      h = n(7),
      v = n(54),
      y = n(21),
      g = n(52),
      _ = n(152),
      m = n(328),
      E = n(12),
      b = n(48),
      w = n(70),
      A = n(53),
      O = n(137),
      S = n(153),
      R = n(149),
      I = n(329),
      T = n(72),
      k = n(105),
      L = {},
      P = function (e) {
        return function (t, n, o) {
          var a = void 0,
            u = void 0,
            P = void 0;
          if ('payments' === e) {
            var C = r(t, n, o),
              x = s()(C, 3);
            if (
              ((a = x[0]),
              (u = x[1]),
              (o = x[2]),
              (P = 'payments'),
              -1 !== c()(u).indexOf('payment_method_category') || -1 !== c()(u).indexOf('instance_id'))
            ) {
              var N = [a, u];
              (u = N[0]), (a = N[1]), (P = 'payments_legacy');
            }
          } else {
            var D = r(t, n, o),
              j = s()(D, 3);
            (u = j[0]), (a = j[1]), (o = j[2]), (P = 'non_payments');
          }
          var M = Object(y.a)(),
            F = f.a.get(e + ':clientToken') || {},
            U = F.experiments,
            H = void 0 === U ? {} : U,
            B = F.region,
            K = F.sessionID,
            W = F.sessionType,
            G = Object(h.b)(e + ':' + K, { api: e, oid: M }),
            V = a.payment_method_category,
            Y = a.instance_id,
            z = a.auto_finalize,
            J = Object(A.a)(),
            q = Y || V || W || e,
            Z = f.a.get(q + ':' + K + ':paymentMethodCategories'),
            Q = { payment_method_category: V, instance_id: Y, auto_finalize: z },
            X = !!f.a.get(e + ':popupExperimentEnabled'),
            $ = f.a.get(e + ':' + K + ':isUtopiaFlowEnabled');
          if ((G.event(h.c.AUTHORIZE_CALLED, i()({}, Q, { signature: P })), (!X && !$) || !L[q])) {
            var ee = function (e) {
              return e && G.event(h.c.AUTHORIZE_FAILED, i()({}, Q, { error: e })), o({ show_form: !1, approved: !1 });
            };
            if ('payments' === W) {
              if (V && !Object(T.b)(V)) throw (ee('PaymentMethodCategoryNotSupportedError'), new p.j(V));
              if (Y && !/^[\w-]+$/.test(Y)) throw (ee('InvalidInstanceIDError'), new p.h());
            }
            Object(S.a)({ id: e, clientToken: F, iframeName: q, options: a, tracker: G });
            var te = function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                  n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                  r = n.mdid;
                r && (E.b.isSupported() ? E.b.putData('klarna-mdid', r) : g.a.set('_klarna_mdid', r));
                try {
                  if (b.a.isSupported('production')) {
                    var i = f.a.get(e + ':' + K + ':shoppingBrowser:sessionInitiated'),
                      a = f.a.get(e + ':' + K + ':shoppingBrowser:sessionApproved');
                    i &&
                      !a &&
                      (b.a.sendSessionApprovedEvent({ region: B, sessionID: K }),
                      f.a.set(e + ':' + K + ':shoppingBrowser:sessionApproved', !0));
                  }
                } catch (e) {
                  G.event(h.c.SHOPPING_BROWSER_NATIVE_API_ERROR, { error: e.message });
                }
                try {
                  G.event(h.c.AUTHORIZE_COMPLETED, t), (L[q] = !1), o(t);
                } catch (e) {
                  G.event(h.c.AUTHORIZE_UNEXPECTED_ERROR, { error: e.message });
                }
              },
              ne = l.a.app.main.id(q),
              re = Object(d.a)(ne);
            if (f.a.get(e + ':' + K + ':isUtopiaStaticWidgetEnabled')) {
              if (!Object(R.a)(V, Z)) throw (ee('ApplicationNotLoadedError'), new p.b());
            } else if (!re) throw (ee('ApplicationNotLoadedError'), new p.b());
            if ($) {
              var oe =
                  f.a.get(e + ':' + K + ':loadApfPromise') ||
                  Object(O.a)({ id: e, sessionID: K, tracker: G, isOpf: Object(k.a)(H) }),
                ie = f.a.get(e + ':rawClientToken'),
                ae = Object(m.a)(f.a.get(q + ':' + K + ':updateFromLoad') || {}, u),
                ce = f.a.get(e + ':integratingProduct'),
                ue = f.a.get(e + ':' + K + ':loadOptions') || {},
                se = ue.on_show_external_document,
                fe = Object(_.a)(),
                le = Object(w.a)(),
                de = function (e) {
                  f.a
                    .get(q + ':createStaticPaymentMethod')(e)
                    .catch(function () {
                      ee('create_static_payment_method_failed');
                    });
                };
              return (
                f.a.delete(q + ':' + K + ':updateFromLoad'),
                (L[q] = !0),
                void oe.then(function () {
                  if (!window.klarnaAcquiringPurchaseFlowLibrary)
                    return G.event(h.c.APF_LIB_UNAVAILABLE), void te({ show_form: !1, approved: !1 });
                  window.klarnaAcquiringPurchaseFlowLibrary
                    .render({
                      token: ie,
                      merchantOptions: { mdid: fe, upstreamData: le },
                      merchantUpdate: ae,
                      integratingProduct: ce,
                      paymentMethodCategory: V,
                      onUpdate: f.a.get(e + ':' + K + ':isUtopiaStaticWidgetEnabled') ? de : void 0,
                      onShowExternalDocument: se,
                    })
                    .then(function (e) {
                      G.event(h.c.APF_COMPLETED, e && { approved: e.approved, show_form: e.show_form });
                      var t = { show_form: !0, approved: !1, finalize_required: !1 };
                      te(i()({}, t, e || {}));
                    })
                    .catch(function (e) {
                      var t = window.klarnaAcquiringPurchaseFlowLibrary.errors.AbortedError;
                      if (t && e instanceof t)
                        return G.event(h.c.APF_ABORTED), void te({ show_form: !0, approved: !1 });
                      G.event(h.c.APF_UNHANDLED_ERROR, { name: e.name, message: e.message }),
                        te({ show_form: !1, approved: !1 });
                    }),
                    G.event(h.c.APF_TRIGGERED);
                })
              );
            }
            L[q] = !0;
            var pe = i()(
                { api: e, autoFinalize: z, operationID: M, paymentMethodCategory: V },
                Object(I.a)(l.a.app.deviceRecognition, F),
                J ? { inAppSdkParams: J } : {},
                F
              ),
              he = function () {
                Object(v.a)(re, ne).apply('authorize', [u, pe, te]);
              };
            if (X) {
              var ve = function (e) {
                  var t = function (t, n) {
                    te(t, n), e && 'function' == typeof e.close && e.close();
                  };
                  Object(v.a)(re, ne).apply('authorize', [u, pe, t]);
                },
                ye = f.a.get(e + ':renderPopupFn');
              if ('function' == typeof ye) {
                try {
                  ye()
                    .then(ve)
                    .catch(function () {
                      he();
                    });
                } catch (e) {
                  he();
                }
                return;
              }
            }
            he();
          }
        };
      };
    t.a = P;
  },
  function (e, t, n) {
    'use strict';
    function r() {
      for (
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length,
          n = Array(t > 1 ? t - 1 : 0),
          o = 1;
        o < t;
        o++
      )
        n[o - 1] = arguments[o];
      return n.reduce(function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return i()(t).reduce(function (e, n) {
          return (e[n] = a(t[n]) ? r({}, e[n], t[n]) : t[n]), e;
        }, e);
      }, e);
    }
    t.a = r;
    var o = n(18),
      i = n.n(o),
      a = function (e) {
        return '[object Object]' === {}.toString.call(e);
      };
  },
  function (e, t, n) {
    'use strict';
    var r = n(36),
      o = n.n(r),
      i = n(153),
      a = function (e, t) {
        if (!Object(i.b)(e, t)) return {};
        var n = void 0;
        if (Object(i.c)(e, t)) n = 'type2';
        else {
          if (!Object(i.d)(e, t)) return {};
          n = 'type3';
        }
        return { deviceRecognition: o()({}, n, { reference: t.sessionID }) };
      };
    t.a = a;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t, n) {
      if ('function' == typeof t) {
        var r = [t, {}];
        (n = r[0]), (t = r[1]);
      } else if ('function' == typeof e) {
        var o = [e, {}, {}];
        (n = o[0]), (e = o[1]), (t = o[2]);
      } else n = n || function () {};
      return [e || {}, t || {}, n];
    }
    var o = n(2),
      i = n.n(o),
      a = n(18),
      c = n.n(a),
      u = n(15),
      s = n.n(u),
      f = n(9),
      l = n(3),
      d = n(20),
      p = n(7),
      h = n(21),
      v = n(70),
      y = n(71),
      g = n(72),
      _ = n(73),
      m = n(52),
      E = n(12),
      b = n(53),
      w = n(74),
      A = n(111),
      O = function (e, t) {
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
        return function (t, n, o) {
          var a = void 0,
            u = void 0,
            O = void 0;
          if ('payments' === e) {
            var S = r(t, n, o),
              R = s()(S, 3);
            if (
              ((a = R[0]), (u = R[1]), (o = R[2]), (O = 'payments'), -1 !== c()(u).indexOf('payment_method_category'))
            ) {
              var I = [a, u];
              (u = I[0]), (a = I[1]), (O = 'payments_legacy');
            }
          } else {
            var T = r(t, n, o),
              k = s()(T, 3);
            (u = k[0]), (a = k[1]), (o = k[2]), (O = 'non_payments');
          }
          var L = Object(h.a)(),
            P = l.a.get(e + ':clientToken'),
            C = P.experiments,
            x = void 0 === C ? {} : C,
            N = P.scheme,
            D = P.sessionType,
            j = P.sessionID,
            M = Object(p.b)(e + ':' + j, { api: e, oid: L }),
            F = Object(b.a)(),
            U = a.payment_method_category,
            H = a.payment_method_categories,
            B = a.instance_id,
            K = { payment_method_category: U, payment_method_categories: H, instance_id: B };
          M.event(p.c.REAUTHORIZE_CALLED, i()({}, K, { signature: O }));
          var W = function (e) {
            return e && M.event(p.c.REAUTHORIZE_FAILED, i()({}, K, { error: e })), o({ show_form: !1, approved: !1 });
          };
          if (!l.a.get(e + ':initialized')) throw (W('ApplicationNotInitializedError'), new d.a());
          var G = document.body;
          Object(g.a)({ scheme: N, sessionType: D, options: a, onError: W });
          var V = Object(v.a)(),
            Y = Object(y.a)({ id: e, instanceID: B, paymentMethodCategory: U }),
            z = function (t) {
              t.call(
                'reauthorize',
                i()(
                  {
                    api: e,
                    integratorHostname: Object(A.a)(),
                    isOnPgwThirdPartyChallengeRequestedSupported: Object(w.a)({ experiments: x, id: e, sessionID: j }),
                    operationID: L,
                    paymentMethodCategories: H,
                    paymentMethodCategory: U,
                    resetApplication: Y,
                    upstreamData: V,
                  },
                  F ? { inAppSdkParams: F } : {},
                  P
                ),
                u,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = t.mdid;
                  n && (E.b.isSupported() ? E.b.putData('klarna-mdid', n) : m.a.set('_klarna_mdid', n)),
                    M.event(p.c.REAUTHORIZE_COMPLETED, e),
                    o(e);
                }
              );
            },
            J = l.a.get(e + ':rawClientToken');
          Object(_.a)({
            id: e,
            clientToken: P,
            rawClientToken: J,
            container: G,
            tracker: M,
            options: a,
            appConfig: { main: i()({}, f.a.app.main, { style: { display: 'none' } }) },
          })
            .then(z)
            .catch(function () {
              return W('bootstrap_failed');
            });
        };
      };
    t.a = O;
  },
  function (e, t, n) {
    'use strict';
    function r(e, t, n) {
      if ('function' == typeof t) {
        var r = [t, {}];
        (n = r[0]), (t = r[1]);
      } else if ('function' == typeof e) {
        var o = [e, {}, {}];
        (n = o[0]), (e = o[1]), (t = o[2]);
      } else n = n || function () {};
      return [e || {}, t || {}, n];
    }
    var o = n(2),
      i = n.n(o),
      a = n(18),
      c = n.n(a),
      u = n(15),
      s = n.n(u),
      f = n(9),
      l = n(3),
      d = n(20),
      p = n(7),
      h = n(21),
      v = n(70),
      y = n(71),
      g = n(72),
      _ = n(73),
      m = n(52),
      E = n(12),
      b = n(53),
      w = n(74),
      A = n(111),
      O = function (e, t) {
        arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : window;
        return function (t, n, o) {
          var a = void 0,
            u = void 0,
            O = void 0;
          if ('payments' === e) {
            var S = r(t, n, o),
              R = s()(S, 3);
            if (
              ((a = R[0]), (u = R[1]), (o = R[2]), (O = 'payments'), -1 !== c()(u).indexOf('payment_method_category'))
            ) {
              var I = [a, u];
              (u = I[0]), (a = I[1]), (O = 'payments_legacy');
            }
          } else {
            var T = r(t, n, o),
              k = s()(T, 3);
            (u = k[0]), (a = k[1]), (o = k[2]), (O = 'non_payments');
          }
          var L = Object(h.a)(),
            P = l.a.get(e + ':clientToken'),
            C = P.experiments,
            x = void 0 === C ? {} : C,
            N = P.scheme,
            D = P.sessionType,
            j = P.sessionID,
            M = Object(p.b)(e + ':' + j, { api: e, oid: L }),
            F = a.payment_method_category,
            U = a.payment_method_categories,
            H = a.instance_id,
            B = Object(b.a)(),
            K = { payment_method_category: F, payment_method_categories: U, instance_id: H };
          M.event(p.c.FINALIZE_CALLED, i()({}, K, { signature: O }));
          var W = function (e) {
            return e && M.event(p.c.FINALIZE_FAILED, i()({}, K, { error: e })), o({ show_form: !1, approved: !1 });
          };
          if (!l.a.get(e + ':initialized')) throw (W('ApplicationNotInitializedError'), new d.a());
          var G = document.body;
          Object(g.a)({ scheme: N, sessionType: D, options: a, onError: W });
          var V = Object(v.a)(),
            Y = Object(y.a)({ id: e, instanceID: H, paymentMethodCategory: F }),
            z = function (t) {
              t.call(
                'finalize',
                i()(
                  {
                    api: e,
                    integratorHostname: Object(A.a)(),
                    isOnPgwThirdPartyChallengeRequestedSupported: Object(w.a)({ experiments: x, id: e, sessionID: j }),
                    operationID: L,
                    paymentMethodCategories: U,
                    paymentMethodCategory: F,
                    resetApplication: Y,
                    upstreamData: V,
                  },
                  B ? { inAppSdkParams: B } : {},
                  P
                ),
                u,
                function () {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    n = t.mdid;
                  n && (E.b.isSupported() ? E.b.putData('klarna-mdid', n) : m.a.set('_klarna_mdid', n)),
                    M.event(p.c.FINALIZE_COMPLETED, e),
                    o(e);
                }
              );
            },
            J = l.a.get(e + ':rawClientToken');
          Object(_.a)({
            id: e,
            clientToken: P,
            rawClientToken: J,
            container: G,
            options: a,
            tracker: M,
            appConfig: { main: i()({}, f.a.app.main, { style: { display: 'none' } }) },
          })
            .then(z)
            .catch(function () {
              return W('bootstrap_failed');
            });
        };
      };
    t.a = O;
  },
  function (e, t, n) {
    'use strict';
    var r = n(20),
      o = n(108),
      i = n(143),
      a = n(32),
      c = function (e) {
        return function (t, n) {
          switch (t) {
            case i.c:
            case i.b:
            case i.a:
              return Object(o.c)(e + ':' + t, n);
            case i.d:
            case i.g:
            case i.f:
            case i.e:
              if (Object(a.a)()) return Object(o.c)(e + ':' + t, n);
              throw new r.c(t);
            default:
              throw new r.c(t);
          }
        };
      };
    t.a = c;
  },
  function (e, t, n) {
    'use strict';
    var r = n(108),
      o = function (e) {
        return function (t, n) {
          return Object(r.b)(e + ':' + t, n);
        };
      };
    t.a = o;
  },
  function (e, t, n) {
    'use strict';
    var r = n(9),
      o = n(41),
      i = n(54),
      a = function (e) {
        return function () {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments[1],
            a = t.instance_id || e,
            c = r.a.app.main.id(a),
            u = Object(o.a)(c),
            s = { api: e };
          Object(i.a)(u, c).apply('validateCard', [{}, s, n]);
        };
      };
    t.a = a;
  },
]);
