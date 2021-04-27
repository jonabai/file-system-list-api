import fetch from 'node-fetch';

import { Application } from '../../src/application';

describe('Get application health', () => {
  let application: Application;

  beforeAll(async () => {
    application = new Application();
    await application.start();
  });

  afterAll(async () => {
    await application.stop();
  });

  it('should return 200 response', async () => {
    const response = await fetch('http://localhost:3000/api/health');
    expect(response.status).toEqual(200);
  });
});
