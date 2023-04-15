import { createSignal, createEffect } from 'solid-js';
import styles from './App.module.css';
import { wordsArray } from '../data.js';

const generateSeparateLists = (array) => {
  const engList = [],
    germanList = [];
  if (!array) return null;
  array.forEach((item) => {
    engList.push({ word: item.english, id: item.id, list: 'eng' });
    germanList.push({ word: item.german, id: item.id, list: 'deu' });
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
  //console.log('sep: ', separateList.engList);
  // console.log('german ', getRandom(separateList.germanList, 8));
  return {
    englishWords: separateList.engList,
    germanWords: getRandom(separateList.germanList, 8),
  };
};

function App() {
  const [pairsList, setPairsList] = createSignal(getNextMatchPairs());
  const [matched, setMatched] = createSignal([]); //array of macthed words ids
  const [clickedWord, setClickedWord] = createSignal(null); // clicked word id

  createEffect(() => console.log(matched(), clickedWord()));

  const onWordClick = (id, list) => {
    if (clickedWord()) {
      if (clickedWord().id === id && clickedWord().list !== list) {
        setMatched([...matched(), id]);
        setClickedWord(null);
      } else if (clickedWord().id !== id) {
        setClickedWord({ id, list });
      }
    } else {
      setClickedWord({ id, list });
    }
  };

  const onClickNext = () => setPairsList(getNextMatchPairs());

  const getItemStyleClass = (id) => {
    if (matched().includes(id)) {
      return { ...styles.inactivelist };
    }
    if (clickedWord().id === id) {
      return { ...styles.currentword };
    }
    return null;
  };

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p>Tap n Learn</p>
        <sub>Tap matching pairs</sub>

        <div class={styles.pairs}>
          <div>
            <ul>
              {pairsList()?.englishWords.map((item) => (
                <li
                  key={item.id + 'eng'}
                  class={
                    clickedWord().id === id
                      ? styles.currentword
                      : matched().includes(id)
                      ? styles.inactivelist
                      : null
                  }
                  onClick={() => onWordClick(item.id, item.list)}
                >
                  {item.word}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {pairsList()?.germanWords.map((item) => (
                <li
                  key={item.id + 'du'}
                  class={
                    matched().includes(item.id) ? styles.inactivelist : null
                  }
                  onClick={() => onWordClick(item.id, item.list)}
                >
                  {item.word}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          disabled={matched().length !== 8}
          class={matched().length === 8 ? styles.nxtbtn : styles.inactivebtn}
          onClick={onClickNext}
        >
          Next
        </button>
      </header>
    </div>
  );
}

export default App;
