'use strict';

import { createApp } from '/src/libraries/petite-vue.es.min.js';
import { getWindowWidth } from '/src/scripts/utils.js';
import { ContextMenu } from '/src/scripts/components.js';

((window, document) => {
  ContextMenu.lists = [
    // { content: 'Features', link: '#features' },
  ];

  const STORAGE_KEY = 'storage-key';
  const localStore = {
    fetch() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    },
    save(id) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(id));
    },
    remove() {
      localStorage.removeItem(STORAGE_KEY);
    },
  };

  const App = {
    ContextMenu,
    windowWidth: getWindowWidth(),
    isPrefersReducedMotion: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches,
    isLoading: true,
    async init() {
      this.isLoading = false;
    },
    updateWindowWidth() {
      this.windowWidth = getWindowWidth();
    },
  };

  createApp(App).mount();
  window.onscroll = () => (ContextMenu.isShow = false);

  window.onresize = () => {
    App.updateWindowWidth();
    ContextMenu.isShow = false;
  };
})(window, document);
