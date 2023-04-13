import { createSignal } from 'solid-js';
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
  // console.log('sep: ', separateList.engList);
  // console.log('german ', getRandom(separateList.germanList, 8));
  return {
    englishWords: separateList.engList,
    germanWords: getRandom(separateList.germanList, 8),
  };
};

function App() {
  const [pairs, setPairs] = createSignal(getNextMatchPairs());
  const [matched, setMatched] = createSignal(0);

  console.log('pairs: ', pairs());

  const onClickNext = () => setPairs(getNextMatchPairs());

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>Tap n Learn</p>
        <sub>Tap matching pairs</sub>

        <div class={styles.pairs}>
          <div>
            <ul>
              {pairs()?.englishWords.map((item) => (
                <li key={item.id + 'eng'}>{item.word}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {pairs()?.germanWords.map((item) => (
                <li key={item.id + 'du'}>{item.word}</li>
              ))}
            </ul>
          </div>
        </div>
        <button
          disabled={matched !== 8}
          class={matched === 8 ? styles.nxtbtn : styles.inactivebtn}
          onClick={onClickNext}
        >
          Next
        </button>
      </header>
    </div>
  );
}

export default App;
