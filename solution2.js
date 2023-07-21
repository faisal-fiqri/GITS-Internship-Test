const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getArrayFromUser(length, arrayName) {
  return new Promise((resolve, reject) => {
    const array = [];
    const inputPrompt = `Enter ${length} values for ${arrayName} (separated by space): `;
    
    rl.question(inputPrompt, (input) => {
      const values = input.split(' ');
      if (values.length !== length) {
        reject(`You must enter ${length} values.`);
      } else {
        for (const value of values) {
          const numValue = parseInt(value);
          if (isNaN(numValue)) {
            reject('Invalid input. All values must be numbers.');
            return;
          }
          array.push(numValue);
        }
        resolve(array);
      }
    });
  });
}

function climbingLeaderboard(scores, newScores) {
  let result = [];
  let uniqueScores = [...new Set(scores)];
  for (const score of newScores) {
    if (score >= uniqueScores[0]) {
      result.push(1);
    } else if (score < uniqueScores[uniqueScores.length - 1]) {
      result.push(uniqueScores.length + 1);
    } else {
      result.push(rankBinarySearch(score, uniqueScores));
    }
  }
  return result;
}

function rankBinarySearch(score, uniqueScores) {
  let start = 0;
  let end = uniqueScores.length - 1;
  while (true) {
    let mid = Math.floor((start + end) / 2);
    if (uniqueScores[mid] === score) {
      return mid + 1;
    } else if (uniqueScores[mid] > score && uniqueScores[mid + 1] < score) {
      return mid + 2;
    } else if (uniqueScores[mid] < score && uniqueScores[mid - 1] > score) {
      return mid;
    }
    if (score < uniqueScores[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
}

(async () => {
  try {
    const scoresLength = await new Promise((resolve, reject) => {
      rl.question('Enter the length of the scores array: ', (input) => {
        const length = parseInt(input);
        if (isNaN(length) || length <= 0) {
          reject('Invalid input. Length must be a positive number.');
        } else {
          resolve(length);
        }
      });
    });
    const scores = await getArrayFromUser(scoresLength, 'scores');
    const newScoresLength = await new Promise((resolve, reject) => {
      rl.question('Enter the length of the newScores array: ', (input) => {
        const length = parseInt(input);
        if (isNaN(length) || length <= 0) {
          reject('Invalid input. Length must be a positive number.');
        } else {
          resolve(length);
        }
      });
    });

    const newScores = await getArrayFromUser(newScoresLength, 'newScores');
    const result = climbingLeaderboard(scores, newScores);
    console.log('Result:', result);

    rl.close();
  } catch (error) {
    console.error(error);
    rl.close();
  }
})();
