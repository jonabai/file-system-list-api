import fetch from 'node-fetch';

import { KoaApplication } from '../../koa-application';
import { createKoaApplication } from '../../../../../../../tests/helpers/koa.helpers';

describe('Health endpoint', () => {
  let koa: KoaApplication;

  beforeEach(async () => {
    koa = createKoaApplication();
    await koa.listen();
  });

  afterEach(async () => {
    await koa.close();
  });

  it('should return 200 response', async () => {
    const response = await fetch('http://localhost:3000/api/health');
    expect(response.status).toEqual(200);
  });
});
