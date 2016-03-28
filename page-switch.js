'use strict';

class PageSwitch {
  constructor(opt) {
    this.pages = [];

    this._currentPageIndex = -1;
    this._currentPage = null;
    this._duration = 1000 * 10;

    if (opt && opt.nodeType == 1) {
      this.setContainer(opt);
    }

    this.start();
  }

  start() {
    var self = this;
    this._interval = setInterval(function() {
      self.next();
    }, this._duration);
  }

  setContainer(value) {
    if (this.container == value) {
      return;
    }

    this.container = value;
    if (!this.container) {
      return;
    }

    for (var i = 0; i < this.container.children.length; i++) {
      this.pages.push(this.container.children[i]);
    }
  }

  next() {
    if (!(this.pages && this.pages.length)) {
      return;
    }

    var nextPageIndex = this._currentPageIndex + 1;
    if (nextPageIndex >= this.pages.length) {
      nextPageIndex = 0;
    }

    this.currentPageIndex = nextPageIndex;
  }

  set currentPageIndex(value) {
    if (value == this._currentPageIndex) {
      return;
    }

    this._currentPageIndex = value;
    this._showPage(this.pages[this._currentPageIndex]);
  }

  _showPage(page) {
    if (this._currentPage == page) {
      return;
    }

    if (this._currentPage) {
      this._currentPage.style.opacity = 0;
    }

    this._currentPage = page;
    this._currentPage.style.opacity = 1;
  }
}
