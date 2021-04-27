import fetch from 'node-fetch';

import { Application } from '../../src/application';

describe('Get files in a folder via GraphQL', () => {
  let application: Application;

  beforeAll(async () => {
    application = new Application();
    await application.start();
  });

  afterAll(async () => {
    await application.stop();
  });

  describe('when requested folder exists', () => {
    it('should return 200 response', async () => {
      const response = await fetch('http://localhost:3000/graphql?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query {
        files(params: { rootPath: "/",  pageSize: 10, page: 1}) {
          paginationInfo {
            count,
            total,
            page,
            pageSize
          },
          results {
            id,
            fileName,
            fileType,
            fileSize,
            fullPath,
            attributes {
              uid,
              gid,
              mode,
              atimeMs,
              mtimeMs,
              ctimeMs
            }
          }
        }
      }`,
          variables: null,
        }),
      });

      expect(response.status).toEqual(200);
      const body = await response.json();
      expect(body.data.files.paginationInfo).toEqual({ count: 3, total: 3, page: 1, pageSize: 10 });
      expect(body.data.files.results.length).toEqual(3);
    });
  });

  describe('when requested folder does not exist', () => {
    it('should return an error response with 200 status', async () => {
      const response = await fetch('http://localhost:3000/graphql?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query {
        files(params: { rootPath: "/non-valid-folder",  pageSize: 10, page: 1}) {
          paginationInfo {
            count,
            total,
            page,
            pageSize
          },
          results {
            id,
            fileName,
            fileType,
            fileSize,
            fullPath,
            attributes {
              uid,
              gid,
              mode,
              atimeMs,
              mtimeMs,
              ctimeMs
            }
          }
        }
      }`,
          variables: null,
        }),
      });

      expect(response.status).toEqual(200);
      const body = await response.json();
      expect(body.errors.length).toEqual(1);
    });
  });
});
