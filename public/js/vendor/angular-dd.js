  /**
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to
   * deal in the Software without restriction, including without limitation the
   * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
   * sell copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   * IN THE SOFTWARE.
   */

  /**
   * Implementing Drag and Drop functionality in AngularJS is easier than ever.
   * Demo: http://codef0rmer.github.com/angular-dragdrop/
   *
   * @version 1.0.12
   *
   * (c) 2013 Amit Gharat a.k.a codef0rmer <amit.2006.it@gmail.com> - amitgharat.wordpress.com
   */
  ! function(e, t, a, n) {
    "use strict";
    var i = t.module("ngDragDrop", []).service("ngDragDropService", ["$timeout",
      "$parse", "$q",
      function(r, l, o) {
        this.draggableScope = null, this.droppableScope = null, a("head").prepend(
          '<style type="text/css">@charset "UTF-8";.angular-dragdrop-hide{display: none !important;}</style>'
        ), this.callEventCallback = function(e, t, n, i) {
          function r(t) {
            var n = -1 !== t.indexOf("(") ? t.indexOf("(") : t.length,
              i = -1 !== t.lastIndexOf(")") ? t.lastIndexOf(")") : t.length,
              r = t.substring(n + 1, i),
              o = -1 !== t.indexOf(".") ? t.substr(0, t.indexOf(".")) :
              null;
            return o = e[o] && "function" == typeof e[o].constructor ? o :
              null, {
                callback: t.substring(o && o.length + 1 || 0, n),
                args: a.map(r && r.split(",") || [], function(t) {
                  return [l(t)(e)]
                }),
                constructor: o
              }
          }
          if (t) {
            var o = r(t),
              s = o.callback,
              d = o.constructor,
              p = [n, i].concat(o.args);
            return (e[s] || e[d][s]).apply(e, p)
          }
        }, this.invokeDrop = function(e, l, s, d) {
          var p, c, u, g = "",
            f = "",
            b = {},
            h = {},
            v = null,
            y = {},
            x = {},
            m = null,
            D = this.droppableScope,
            q = this.draggableScope,
            j = null,
            k = [];
          g = e.ngattr("ng-model"), f = l.ngattr("ng-model"), p = q.$eval(
              g), c = D.$eval(f), m = l.find(
              "[jqyoui-draggable]:last,[data-jqyoui-draggable]:last"), h =
            D.$eval(l.attr("jqyoui-droppable") || l.attr(
              "data-jqyoui-droppable")) || [], b = q.$eval(e.attr(
              "jqyoui-draggable") || e.attr("data-jqyoui-draggable")) || [],
            b.index = this.fixIndex(q, b, p), h.index = this.fixIndex(D,
              h, c), v = t.isArray(p) ? b.index : null, y = t.isArray(p) ?
            p[v] : p, b.deepCopy && (y = t.copy(y)), x = t.isArray(c) &&
            h && h.index !== n ? c[h.index] : t.isArray(c) ? {} : c, h.deepCopy &&
            (x = t.copy(x)), b.beforeDrop && k.push(this.callEventCallback(
              q, b.beforeDrop, s, d)), o.all(k).then(t.bind(this,
              function() {
                if (b.insertInline && g === f) {
                  if (b.index > h.index) {
                    u = p[b.index];
                    for (var n = b.index; n > h.index; n--) c[n] = t.copy(
                        c[n - 1]), c[n - 1] = {}, c[n][b.direction] =
                      "left";
                    c[h.index] = u
                  } else {
                    u = p[b.index];
                    for (var n = b.index; n < h.index; n++) c[n] = t.copy(
                        c[n + 1]), c[n + 1] = {}, c[n][b.direction] =
                      "right";
                    c[h.index] = u
                  }
                  this.callEventCallback(D, h.onDrop, s, d)
                } else b.animate === !0 ? (j = e.clone(), j.css({
                  position: "absolute"
                }).css(e.offset()), a("body").append(j), e.addClass(
                  "angular-dragdrop-hide"), this.move(j, m.length >
                  0 ? m : l, null, "fast", h,
                  function() {
                    j.remove()
                  }), this.move(m.length > 0 && !h.multiple ? m : [],
                  e.parent(
                    "[jqyoui-droppable],[data-jqyoui-droppable]"),
                  i.startXY, "fast", h, t.bind(this, function() {
                    r(t.bind(this, function() {
                      e.css({
                        position: "relative",
                        left: "",
                        top: ""
                      }).removeClass(
                        "angular-dragdrop-hide"), m.css({
                        position: "relative",
                        left: "",
                        top: "",
                        display: "none" === m.css(
                          "display") ? "" : m.css(
                          "display")
                      }), this.mutateDraggable(q, h, b, g,
                        f, x, e), this.mutateDroppable(D,
                        h, b, f, y, v), this.callEventCallback(
                        D, h.onDrop, s, d)
                    }))
                  }))) : r(t.bind(this, function() {
                  this.mutateDraggable(q, h, b, g, f, x, e), this
                    .mutateDroppable(D, h, b, f, y, v), this.callEventCallback(
                      D, h.onDrop, s, d)
                }))
              }))["finally"](t.bind(this, function() {
              this.restore(e)
            }))
        }, this.move = function(t, a, i, r, l, o) {
          if (0 === t.length) return o && e.setTimeout(function() {
            o()
          }, 300), !1;
          var s = t.css("z-index"),
            d = t[l.containment || "offset"](),
            p = a.css("display"),
            c = a.hasClass("ng-hide");
          null === i && a.length > 0 && ((a.attr("jqyoui-draggable") || a
              .attr("data-jqyoui-draggable")) !== n && a.ngattr(
              "ng-model") !== n && a.is(":visible") && l && l.multiple ?
            (i = a[l.containment || "offset"](), l.stack === !1 ? i.left +=
              a.outerWidth(!0) : i.top += a.outerHeight(!0)) : (c && a.removeClass(
              "ng-hide"), i = a.css({
              visibility: "hidden",
              display: "block"
            })[l.containment || "offset"](), a.css({
              visibility: "",
              display: p
            }))), t.css({
            position: "absolute",
            "z-index": 9999
          }).css(d).animate(i, r, function() {
            c && a.addClass("ng-hide"), t.css("z-index", s), o && o()
          })
        }, this.mutateDroppable = function(e, a, n, i, r, o) {
          var s = e.$eval(i);
          e.dndDragItem = r, t.isArray(s) ? (a && a.index >= 0 ? s[a.index] =
            r : s.push(r), n && n.placeholder === !0 && (s[s.length - 1]
              .jqyoui_pos = o)) : (l(i + " = dndDragItem")(e), n && n.placeholder ===
            !0 && (s.jqyoui_pos = o))
        }, this.mutateDraggable = function(e, a, i, r, o, s, d) {
          var p = t.equals(s, {}) || !s,
            c = e.$eval(r);
          e.dndDropItem = s, i && i.placeholder ? "keep" != i.placeholder &&
            (t.isArray(c) && i.index !== n ? c[i.index] = s : l(r +
              " = dndDropItem")(e)) : t.isArray(c) ? p ? i && i.placeholder !==
            !0 && "keep" !== i.placeholder && c.splice(i.index, 1) : c[i.index] =
            s : (l(r + " = dndDropItem")(e), e.$parent && l(r +
              " = dndDropItem")(e.$parent)), this.restore(d)
        }, this.restore = function(e) {
          e.css({
            "z-index": "",
            left: "",
            top: ""
          })
        }, this.fixIndex = function(e, a, i) {
          if (a.applyFilter && t.isArray(i) && i.length > 0) {
            var r = e[a.applyFilter](),
              l = r[a.index],
              o = n;
            return i.forEach(function(e, a) {
              t.equals(e, l) && (o = a)
            }), o
          }
          return a.index
        }
      }
    ]).directive("jqyouiDraggable", ["ngDragDropService", function(e) {
      return {
        require: "?jqyouiDroppable",
        restrict: "A",
        link: function(n, r, l) {
          var o, s, d, p, c = a(r),
            u = function(r) {
              r ? (o = n.$eval(c.attr("jqyoui-draggable") || c.attr(
                  "data-jqyoui-draggable")) || {}, s = n.$eval(l.jqyouiOptions) || {},
                c.draggable({
                  disabled: !1
                }).draggable(s).draggable({
                  start: function(t, r) {
                    e.draggableScope = n, d = a(s.helper ? r.helper :
                      this).css("z-index"), a(s.helper ? r.helper :
                      this).css("z-index", 9999), i.startXY = a(
                      this)[o.containment || "offset"](), e.callEventCallback(
                      n, o.onStart, t, r)
                  },
                  stop: function(t, i) {
                    a(s.helper ? i.helper : this).css("z-index",
                      d), e.callEventCallback(n, o.onStop, t, i)
                  },
                  drag: function(t, a) {
                    e.callEventCallback(n, o.onDrag, t, a)
                  }
                })) : c.draggable({
                disabled: !0
              }), p && t.isDefined(r) && (t.equals(l.drag, "true") ||
                t.equals(l.drag, "false")) && (p(), p = null)
            };
          p = n.$watch(function() {
            return n.$eval(l.drag)
          }, u), u(), c.on("$destroy", function() {
            c.draggable({
              disabled: !0
            }).draggable("destroy")
          })
        }
      }
    }]).directive("jqyouiDroppable", ["ngDragDropService", "$q", function(e,
      n) {
      return {
        restrict: "A",
        priority: 1,
        link: function(i, r, l) {
          var o, s, d = a(r),
            p = function(r) {
              r ? (o = i.$eval(a(d).attr("jqyoui-droppable") || a(d).attr(
                "data-jqyoui-droppable")) || {}, d.droppable({
                disabled: !1
              }).droppable(i.$eval(l.jqyouiOptions) || {}).droppable({
                over: function(t, a) {
                  e.callEventCallback(i, o.onOver, t, a)
                },
                out: function(t, a) {
                  e.callEventCallback(i, o.onOut, t, a)
                },
                drop: function(r, s) {
                  var d = null;
                  d = o.beforeDrop ? e.callEventCallback(i, o.beforeDrop,
                    r, s) : function() {
                    var e = n.defer();
                    return e.resolve(), e.promise
                  }(), d.then(t.bind(this, function() {
                    a(s.draggable).ngattr("ng-model") &&
                      l.ngModel ? (e.droppableScope = i,
                        e.invokeDrop(a(s.draggable), a(
                          this), r, s)) : e.callEventCallback(
                        i, o.onDrop, r, s)
                  }), function() {
                    s.draggable.css({
                      left: "",
                      top: ""
                    })
                  })
                }
              })) : d.droppable({
                disabled: !0
              }), s && t.isDefined(r) && (t.equals(l.drop, "true") ||
                t.equals(l.drop, "false")) && (s(), s = null)
            };
          s = i.$watch(function() {
            return i.$eval(l.drop)
          }, p), p(), d.on("$destroy", function() {
            d.droppable({
              disabled: !0
            }).droppable("destroy")
          })
        }
      }
    }]);
    a.fn.ngattr = function(e) {
      var t = this[0];
      return t.getAttribute(e) || t.getAttribute("data-" + e)
    }
  }(window, window.angular, window.jQuery);
