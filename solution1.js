const readline = require('readline');

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function centralPolygonalNumbers(n) {
  const sequence = [];
  for (let i = 0; i <= n; i++) {
    sequence.push((i * (i + 1)) / 2 + 1);
  }
  return sequence;
}

rl.question('Enter the value of n: ', (input) => {
  const n = parseInt(input); 
  const result = centralPolygonalNumbers(n);
  console.log(result.join(', '));
  rl.close(); 
});