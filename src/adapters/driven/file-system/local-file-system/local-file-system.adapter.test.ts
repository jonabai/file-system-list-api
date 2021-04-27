import { LocalFileSystemAdapter } from './local-file-system.adapter';
import { FileTypeEnum } from '../../../../core/domain/models/file-type.enum';

describe('LocalFileSystemAdapter integration tests', () => {
  let localFileSystemAdapter: LocalFileSystemAdapter;

  beforeEach(() => {
    localFileSystemAdapter = new LocalFileSystemAdapter('./tests');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when path exists and it is accessible', () => {
    it('should return the list of files', async () => {
      const files = await localFileSystemAdapter.getFilesFromPath('/resources', { page: 1, pageSize: 10 });

      expect(files.results.length).toEqual(3);
    });
  });

  describe('when from file is provided', () => {
    it('should return the list of files after that file', async () => {
      const files = await localFileSystemAdapter.getFilesFromPath('/resources', { page: 2, pageSize: 2 });

      expect(files.results.length).toEqual(1);
      expect(files.results[0].fileName).toEqual('test2.txt');
      expect(files.results[0].fileSize).toEqual(7);
      expect(files.results[0].id).toEqual('test2.txt');
      expect(files.results[0].fileType).toEqual(FileTypeEnum.FILE);
    });
  });

  describe('when path does not exist', () => {
    it('should fail returning the list of files', async () => {
      await expect(localFileSystemAdapter.getFilesFromPath('/not-exists', { page: 1, pageSize: 2 })).rejects.toThrow();
    });
  });
});
