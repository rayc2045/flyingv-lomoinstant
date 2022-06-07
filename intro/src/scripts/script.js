'use strict';

import { createApp } from '/src/libraries/petite-vue.es.min.js';
import { ContextMenu } from '/src/scripts/components.js';
import {
  fetchData,
  copyText,
  toggleClasses,
  getScrollProgress,
} from '/src/scripts/utils.js';

ContextMenu.lists = [
  { content: 'Features', link: '#features' },
  { content: 'Pre-packed', link: '#pre-packed' },
  { content: 'Ways of quick start', link: '#ways-of-quick-start' },
  { content: 'Usage', link: '#usage' },
  { content: 'Petite-Vue syntax', link: '#petite-vue-template-syntax' },
  { content: 'MDBootstrap examples', link: '#mdbootstrap-examples' },
  { content: 'Animate.css animations', link: '#animate-css-animations' },
];

const petiteVueExample = `
  <script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module'

    function Counter(props) {
      return {
        count: props.initialCount,
        inc() {
          this.count++
        },
        mounted() {
          console.log("I'm mounted!")
        }
      }
    }

    createApp({
      Counter
    }).mount()
  </script>

  <div v-scope="Counter({ initialCount: 1 })" @vue:mounted="mounted">
    <p>{{ count }}</p>
    <button @click="inc">increment</button>
  </div>

  <div v-scope="Counter({ initialCount: 2 })">
    <p>{{ count }}</p>
    <button @click="inc">increment</button>
  </div>
`.trim();

const App = {
  ContextMenu,
  isPrefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)')
    .matches,
  isLoading: true,
  scrollProgress: '0%',
  petiteVueExample,
  animations: [],
  async init() {
    this.animations = await fetchData('https://raw.githubusercontent.com/rayc2045/create-petite-app/main/intro/src/data/animations.json');
    this.isLoading = false;
  },
  updateScrollProgress() {
    this.scrollProgress = getScrollProgress();
  },
  copyText,
  removeStyleAttr(str) {
    return str.replace(/style="[^"]*"/g, '').replace(/" >/g, '">');
  },
  toggleAnimation(el, animation) {
    toggleClasses(
      el,
      `animate__animated animate__${animation} animate__infinite`
    );
  },
};

createApp(App).mount();
window.onresize = () => (ContextMenu.isShow = false);

window.onscroll = () => {
  App.updateScrollProgress();
  ContextMenu.isShow = false;
};
