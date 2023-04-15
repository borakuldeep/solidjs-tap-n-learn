import { createSignal } from 'solid-js';
import styles from './App.module.css';
import { wordsArray } from '../data.js';

const generateSeparateLists = (array) => {
  const engList = [],
    germanList = [];
  if (!array) return null;
  array.forEach((item) => {
    engList.push({ word: item.english, id: item.id, lang: 'eng' });
    germanList.push({ word: item.german, id: item.id, lang: 'deu' });
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
  const randomSubList = getRandom(wordsArray, 6);
  const separateList = generateSeparateLists(randomSubList);
  return {
    englishWords: separateList.engList,
    germanWords: getRandom(separateList.germanList, 6),
  };
};

function App() {
  const [pairsList, setPairsList] = createSignal(getNextMatchPairs());
  const [matched, setMatched] = createSignal([]); //array of macthed words ids
  const [clickedWord, setClickedWord] = createSignal(null); // clicked word id

  const onWordClick = (id, lang, event) => {
    if (clickedWord()) {
      if (clickedWord().id === id && clickedWord().lang !== lang) {
        setMatched([...matched(), id]);
        setClickedWord(null);
        party.confetti(event, {
          count: party.variation.range(20, 40),
          size: party.variation.range(0.8, 1.2),
        });
      } else if (clickedWord().id !== id) {
        setClickedWord({ id, lang });
      }
    } else {
      setClickedWord({ id, lang });
    }
  };

  const onClickNext = () => setPairsList(getNextMatchPairs());

  // const getItemStyleClass = (id, lang) => {
  //   if (matched().includes(id)) {
  //     return { ...styles.inactivelist };
  //   }
  //   if (
  //     clickedWord() &&
  //     clickedWord().id === id &&
  //     clickedWord().lang === lang
  //   ) {
  //     return { ...styles.currentword };
  //   }
  //   return null;
  // };

  return (
    <div class={styles.App}>
      <sup>1000 German words!</sup>
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
                    clickedWord() &&
                    clickedWord().id === item.id &&
                    clickedWord().lang === item.lang
                      ? styles.currentword
                      : matched().includes(item.id)
                      ? styles.inactivelist
                      : null
                  }
                  onClick={(e) => onWordClick(item.id, item.lang, e)}
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
                    clickedWord() &&
                    clickedWord().id === item.id &&
                    clickedWord().lang === item.lang
                      ? styles.currentword
                      : matched().includes(item.id)
                      ? styles.inactivelist
                      : null
                  }
                  onClick={(e) => onWordClick(item.id, item.lang, e)}
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
      <sup>KB</sup>
    </div>
  );
}

export default App;
