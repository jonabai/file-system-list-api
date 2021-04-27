import { Application } from '../src/application';

let application: Application;
let closing = false;

process.on('SIGINT', async () => {
  console.log('SIGINT signal received');
  if (!closing) {
    closing = true;
    await application.stop();
    process.exit(0);
  }
});

(async (): Promise<void> => {
  application = new Application();
  await application.start().catch((error) => {
    console.error(error);
  });
})();
