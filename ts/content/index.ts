import { loadStorage } from '../others/storage-utils';

window.addEventListener('load', async (evt) => {
  const tags = Array.from(document.querySelectorAll('span.tag-box'));

  console.log(tags);
});
