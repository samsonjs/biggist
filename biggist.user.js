// ==UserScript==
// @match http://gist.github.com/*
// ==/UserScript==
//
// @_sjs
// isc license

var mapClass = function(klass, fn) {
      var els = document.getElementsByClassName(klass)
      for (var i = 0, n = els.length; i < n; ++i) fn(els[i])
  }
  , hideClass = function(klass) {
      mapClass(klass, function(el) {
          el._previousDisplay = el.style.display
          el.style.display = 'none'
      })
  }
  , showClass = function(klass) {
      mapClass(klass, function(el) {
          el.style.display = el._previousDisplay || 'block'
      })
  }
  , embiggen = function(klass) {
      mapClass(klass, function(el) {
          ['Width', 'Margin', 'Padding'].forEach(function(style) {
              el['_previous' + style] = el.style[style.toLowerCase()]
          })
          el.style.width = 'auto'
          el.style.margin = '0'
          el.style.padding = '0'
      })
  }
  , unembiggen = function(klass) {
      mapClass(klass, function(el) {
          ['Width', 'Margin', 'Padding'].forEach(function(style) {
              el.style[style.toLowerCase()] = el['_previous' + style]
          })
      })
  }
  , embiggenClassByHidingClass = function(classToAttach, classToHide) {
      mapClass(classToAttach, function(el) {
          el.onmouseover = function() {
              hideClass(classToHide)
              embiggen(classToAttach)
          }
          el.onmouseout  = function() {
              showClass(classToHide)
              unembiggen(classToAttach)
          }
      })
  }

embiggenClassByHidingClass('main', 'secondary')
