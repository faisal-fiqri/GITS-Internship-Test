const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isBalanced(input) {
  const stack = [];

  const isOpening = (char) => ['(', '[', '{'].includes(char);
  const isMatching = (opening, closing) =>
    (opening === '(' && closing === ')') ||
    (opening === '[' && closing === ']') ||
    (opening === '{' && closing === '}');

  for (const char of input) {
    if (isOpening(char)) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (!isMatching(top, char)) {
        return 'NO';
      }
    }
  }

  return stack.length === 0 ? 'YES' : 'NO';
}

function getInputFromUser() {
  return new Promise((resolve, reject) => {
    rl.question('Enter the bracket sequence: ', (input) => {
      const inputArray = input.split(' ');
      resolve(inputArray);
    });
  });
}

(async () => {
  try {
    const inputArray = await getInputFromUser();
    const result = isBalanced(inputArray.join(''));
    console.log('Result:', result);
    rl.close();
  } catch (error) {
    console.error(error);
    rl.close();
  }
})();