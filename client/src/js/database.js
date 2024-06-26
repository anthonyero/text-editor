import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ id: 1, content }); // We only expect one instance of the text content, so I assigned it to a value of `id`: 1 to continually update
    const result = await request;
    return result;
  } catch (err) {
    console.error(err);
  }
};

export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1); // get(id), we pass 1 because we are only storing one item and continually updating it
    const result = await request;
    return result.content; // I am parsing the result to return the content that will be passed to the editor
  } catch (err) {
    console.error(err);
  }
}

initdb();
