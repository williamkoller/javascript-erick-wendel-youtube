const log = (msg) => console.log(`[${process.pid}] - ${msg}`);

const UNKNOWN_ERROR = 1;

const knownErrors = [
  {
    event: 'uncaughtException',
    exitCode: UNKNOWN_ERROR,
  },
  {
    event: 'unhandledRejection',
    exitCode: UNKNOWN_ERROR,
  },
];

process.on('exit', (code) => {
  // Fecha a porta de novas requests
  // e aguarda os usuarios conectados encerrarem os requests
  // daria db.stop, server.stop, etc

  log(`Server closed with success`);
  log(`DB closed with success`);
  process.emit(code);
});

knownErrors.forEach(({ event, exitCode }) => {
  process.on(event, (err) => {
    log(`Process exiting due to ${event}`, err.message);
    if (exitCode === UNKNOWN_ERROR) {
      // process.abort();
      process.exit(exitCode);
    }

    process.exit(exitCode);
  });
});

log('Process started');

let counter = 0;

const connectToDB = async () => {
  const random = Math.random();

  if (random < 0.5) {
    return Promise.reject('Could not connect to DB');
  }

  log('DB connected with success');

  if (++counter === 3) process.exit(0);
};

setInterval(() => {
  connectToDB();
}, 200);
