import { reactive } from '/src/libraries/petite-vue.es.min.js';

export const ContextMenu = reactive({
  isShow: false,
  lists: [
    // { content: 'Features', link: '#features' },
  ],
  showMenu(e) {
    if (!this.lists.length) return;
    this.isShow = true;
    const menuEl = document.querySelector('#context-menu');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const menuWidth = menuEl.getBoundingClientRect().width;
    const menuHeight = menuEl.getBoundingClientRect().height;

    const offset = 5;

    let menuPosX = `${e.clientX + offset}px`;
    let menuPosY = `${e.clientY + offset}px`;

    if (e.clientX + offset + menuWidth > windowWidth)
      menuPosX = `${e.clientX - offset - menuWidth}px`;

    if (e.clientY + offset + menuHeight > windowHeight)
      menuPosY = `${e.clientY - offset - menuHeight}px`;

    menuEl.style.left = menuPosX;
    menuEl.style.top = menuPosY;
  },
});
