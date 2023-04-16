//const wordsArray = require('./data.js');

const createWordObjects = () => {
  let fs = require('fs'),
    readline = require('readline');

  let rd = readline.createInterface({
    input: fs.createReadStream('./newData.txt'),
    output: false,
    console: false,
  });

  const objArray = [];
  let count = 0;

  rd.on('line', function (line) {
    const lineArray = line.split(' ');

    objArray.push({
      german: lineArray[1],
      english: lineArray[2],
      id: count++,
    });
  });

  rd.on('close', function () {
    fs.writeFileSync(
      './newdata.js',
      `export const wordsArray = ${JSON.stringify(objArray)}`
    );
  });
};

createWordObjects();
