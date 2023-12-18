import { spawn } from 'node:child_process';

const prepareLog = (pid) => (msg) => console.log(`[${pid}] - ${msg}`);

const INSTANCES = 3;

function spinUpInstance() {
  const cp = spawn('node', ['server-let-it-crash.js']);

  const log = prepareLog(cp.pid);
  log('starting...');

  cp.stdout.on('data', (message) => {
    console.log(message.toString().trim());
  });
  cp.on('exit', (code) => {
    // 0 significa que o processo terminou com sucesso
    // 1 significa que o processo terminou com erro
    log(`exited with code ${code}`);
    if (code === 0) {
      return;
    }

    spinUpInstance();
  });
}

for (let i = 1; i <= INSTANCES; i++) {
  spinUpInstance();
}
