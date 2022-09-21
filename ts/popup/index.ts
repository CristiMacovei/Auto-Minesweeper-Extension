import { loadStorage, setStorage } from '../others/storage-utils';

window.addEventListener('load', async (evt: Event) => {
  const result = await setStorage({
    showTags: 'all'
  });

  console.log(result);

  const storage = await loadStorage('local');

  console.log(storage);
});
