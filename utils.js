//const wordsArray = require('./data.js');

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
