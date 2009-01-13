// Copyright 2008 Google Inc.  All Rights Reserved.

/**
 * @fileoverview Creates a browser "shell" to test what CSS selectors become.
 * It works by taking some raw text, inserting a dynamic STYLE element
 * into the HEAD with that raw text as its content, and then reading the
 * CSSOM to see what the browser has parsed it into.
 * @author elsigh@google.com (Lindsey Simon)
 */

/**
 * A class for managing the Selector Shell test application.
 * @constructor
 */
var SelectorShell = function() {
  dojo.connect(window, 'onload', this, 'createShell_');
};


/**
 * Creates the DOM elements needed for the application.
 * @private
 */
SelectorShell.prototype.createShell_ = function() {

  /**
   * @type {Element}
   * @private
   */
  this.shell_ = dojo.byId('cssh-shell');

  /**
   * @type {string}
   * @private
   */
  this.tryMeCssText_ = dojo.byId('cssh-tryme-text').value.
      replace(/^[\r\n]*/, '');

  /**
   * @type {Element}
   * @private
   */
  this.translateBtn_ = dojo.byId('cssh-translate');
  dojo.connect(this.translateBtn_, 'click', this, 'translateCss_');

  /**
   * @type {Element}
   * @private
   */
  this.result_ = dojo.byId('cssh-translation');
  this.result_.value = '';

  var tryMe = dojo.byId('cssh-tryme');
  dojo.connect(tryMe, 'click', this, 'setTryMeCss_');

  window.setTimeout(dojo.hitch(this, 'focusAndSelect_'), 10);
};


/**
 * Shows some "Try Me" css for an example.
 * @param {Event} e The browser event.
 * @private
 */
SelectorShell.prototype.setTryMeCss_ = function(e) {
  this.shell_.value = this.tryMeCssText_;
};


/**
 * Focuses and selects the shell.
 * @param {Event} e The browser event.
 * @private
 */
SelectorShell.prototype.focusAndSelect_ = function(e) {
  this.shell_.focus();
  this.shell_.select();
};


/**
 * Adds CSS text to the DOM
 * @param {string} cssText The css text to add.
 * @return {Element} cssNode the added css DOM node.
 * @private
 */
SelectorShell.prototype.addCssText_ = function(cssText) {
  var cssNode = document.createElement('style');
  cssNode.type = 'text/css';
  cssNode.id = 'cssh-sheet-' + document.styleSheets.length;

  var headEl = document.getElementsByTagName('head')[0];
  headEl.appendChild(cssNode);

  // IE
  if (cssNode.styleSheet) {
    cssNode.styleSheet.cssText = cssText;
  // W3C
  } else {
    var cssText = document.createTextNode(cssText);
    cssNode.appendChild(cssText);
  }

  return cssNode;
};


/**
 * Reads the cssText from a CSS DOM node added via addCssText_.
 * @param {Element} cssNode A style element.
 * @return {string} cssText The resulting css text.
 * @private
 */
SelectorShell.prototype.getCssText_ = function(cssNode) {
  var cssRules = cssNode.sheet ?
      cssNode.sheet.cssRules : // W3C
      document.styleSheets[cssNode.id].rules; // IE

  var cssText = [];
  for (var i = 0, n = cssRules.length; i < n; i++) {
    var cssRule = cssRules[i];
    // W3C
    if (cssRule.cssText) {
      cssText.push(cssRule.cssText);
    // IE
    } else if (cssRule.style && cssRule.style.cssText && cssRule.selectorText) {
      // The spacing here is intended to make the result consistent with
      // FF and Webkit.
      var styleCssText = cssRule.style.cssText;
      var thisCssText = cssRule.selectorText + ' { ' + styleCssText + ' }';
      cssText.push(thisCssText);
    }
  }
  // Get it out of the DOM in case they added any CSS that might
  // screw up the page.
  //cssNode.parentNode.removeChild(cssNode);
  return cssText;
};


/**
 * Inserts some CSS into the DOM, reads its value, and sets the results.
 * @param {Event} e The browser event.
 * @private
 */
SelectorShell.prototype.translateCss_ = function(e) {
  this.result_.value = '';
  var value = this.shell_.value;
  var cssNode = this.addCssText_(value);
  var cssText = this.getCssText_(cssNode);
  cssText = cssText.join('').
    replace(/;\s*/g, ';\r\n  ').
    replace(/\{\s*/g, '{\r\n  ').
    replace(/\s*\}\s*/g, '\r\n}\r\n').
    replace(/\r\n$/, '');
  this.result_.value = cssText;
};

