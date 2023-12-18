import fs from 'node:fs';

try {
  await new Promise((resolve, reject) => {
    fs.readFile('non-existing-file.txt', (err, result) =>
      err ? reject(err) : resolve(result)
    );
  });
} catch (e) {
  console.log('Agora eh chamado', e);
}
