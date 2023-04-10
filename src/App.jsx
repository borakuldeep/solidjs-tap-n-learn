import { createSignal } from 'solid-js';
//import logo from './logo.svg';
import styles from './App.module.css';
import { wordsArray } from '../data.js';

const generateSeparateLists = (array) => {
  const engList = [],
    germanList = [];
  if (!array) return null;
  array.forEach((item) => {
    engList.push({ word: item.english, id: item.id });
    germanList.push({ word: item.german, id: item.id });
  });
  return {
    engList,
    germanList,
  };
};

function getRandom(arr, n) {
  let result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
const getNextMatchPairs = () => {
  const randomSubList = getRandom(wordsArray, 8);
  const separateList = generateSeparateLists(randomSubList);
  console.log('sep: ', separateList.engList);
  console.log('german ', getRandom(separateList.germanList, 8));
  return {
    englishWords: separateList.engList,
    germanWords: getRandom(separateList.germanList, 8),
  };
};

function App() {
  const [pairs, setPairs] = createSignal(getNextMatchPairs());

  const onClickNext = () => setPairs(getNextMatchPairs());

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        {/* <img src={logo} class={styles.logo} alt="logo" /> */}
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
