import type { Storage, StorageType } from '../t';

function getStorageArea(type: StorageType): chrome.storage.StorageArea {
  if (type === 'local') {
    return chrome.storage.local;
  } else if (type === 'sync') {
    return chrome.storage.sync;
  } else {
    return null;
  }
}

export async function loadStorage(
  type: StorageType = 'local'
): Promise<Storage | null> {
  let storageArea = getStorageArea(type);

  if (!storageArea) {
    return null;
  }

  return (await storageArea.get()) as Storage;
}

export async function setStorage(data: Storage, type: StorageType = 'local') {
  let storageArea = getStorageArea(type);

  if (!storageArea) {
    return null;
  }

  try {
    await storageArea.set(data);

    return true;
  } catch (e) {
    console.log(e);

    return false;
  }
}
