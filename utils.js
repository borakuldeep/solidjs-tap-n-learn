const wordsArray = require('./data.js');

const createWordObjects = () => {
  let fs = require('fs'),
    readline = require('readline');

  let rd = readline.createInterface({
    input: fs.createReadStream('./data.txt'),
    output: false,
    console: false,
  });

  const objArray = [];
  let count = 0;

  rd.on('line', function (line) {
    const lineArray = line.split('\t');

    objArray.push({
      german: lineArray[0],
      english: lineArray[1],
      id: count++,
    });
  });

  rd.on('close', function () {
    fs.writeFileSync('./data.js', `array = ${JSON.stringify(objArray)}`);
  });
};
//createWordObjects();

// create separate list for german and english words
const generateSeparateLists = () => {
  const engList = [],
    germanList = [];
  wordsArray.forEach((item) => {
    engList.push({ word: item.english, id: item.id });
    germanList.push({ word: item.german, id: item.id });
  });
  console.log(engList[5], germanList[5]);
};

console.log(wordsArray);
//generateSeparateLists();
