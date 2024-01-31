/**
 * Represents an item stored in the storage.
 */
type StorageItem = {
  data: any;
  expireTime: number;
};

/**
 * Sets the value for the specified key in the storage.
 * @param key - The key to set the value for.
 * @param data - The data to be stored.
 * @param expireTime - Optional. The expiration time for the data in milliseconds.
 */
const set = (key: string, data: any, expireTime?: number) => {
  const item: StorageItem = {
    data,
    expireTime: expireTime ? Date.now() + expireTime : 0,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

/**
 * Retrieves the value for the specified key from the storage.
 * @param key - The key to retrieve the value for.
 * @returns The stored data if it exists and has not expired, otherwise null.
 */
const get = (key: string): any => {
  const json = localStorage.getItem(key);
  if (json) {
    const item: StorageItem = JSON.parse(json);
    if (item.expireTime > Date.now()) {
      return item.data;
    } else {
      localStorage.removeItem(key);
    }
  }
  return null;
};

/**
 * Removes the value for the specified key from the storage.
 * @param key - The key to remove the value for.
 */
const remove = (key: string) => {
  localStorage.removeItem(key);
};

export default { set, get, remove };
