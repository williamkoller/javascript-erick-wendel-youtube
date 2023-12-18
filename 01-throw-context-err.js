import fs from 'node:fs';

try {
  fs.readFile('non-existing-file.txt', (err, result) => {
    if (err) {
      throw err;
    }
  });
} catch (e) {
  console.log('Nunca eh chamado', e);
}
