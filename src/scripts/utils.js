export async function fetchData(api) {
  return await fetch(api).then(res => res.json());
}

export async function delay(delay = 0) {
  await new Promise(resolve => {
    setTimeout(resolve, delay * 1000);
  });
}

export function getParamsByUrl(url = window.location.href) {
  const urlSearch = url.split('?')[1];
  const urlSearchParams = new URLSearchParams(urlSearch);
  const entries = Object.fromEntries(urlSearchParams.entries());
  Object.keys(entries).forEach(entry => {
    const split = entries[entry].split(' ');
    if (split.length === 1 && split[0] === '') return (entries[entry] = []);
    entries[entry] = split;
  });
  return entries;
}

export function getWindowWidth() {
  return window.innerWidth;
}

export function getScrollProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (winScroll / height) * 100;
  return Math.round(scrolled) + '%';
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function copyText(text) {
  navigator.clipboard.writeText(text.trim());
}

export function thousandFormat(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function getRepeatedItem(arr) {
  const set = new Set();
  return arr.filter(item =>
    set.has(JSON.stringify(item))
      ? true
      : (set.add(JSON.stringify(item)), false)
  );
}

export function isVisible(el) {
  return el.getBoundingClientRect().bottom > 0;
}

export function toggleClasses(el, cls) {
  cls.split(' ').map(cl => el.classList.toggle(cl));
}

export function playAudio(audio, volume = 1) {
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
}