import { v4 as uuidv4 } from 'uuid';

import { FileSystemGateway } from '../../gateways/file-system.gateway';
import { GetFilesInAFolderUseCase } from './get-files-in-a-folder.use-case';
import { LocalFileSystemAdapter } from '../../../adapters/driven/file-system/local-file-system/local-file-system.adapter';
import { ConsoleLogger } from '../../../adapters/driven/logger/console/console-logger';
import { PaginatedList } from '../../domain/models/paginated-result';
import { FileInfo } from '../../domain/models/FileInfo';
import { Pagination } from '../../domain/models/pagination';
import { FileTypeEnum } from '../../domain/models/file-type.enum';
import { FileInfoAttributes } from '../../domain/models/FileInfoAttributes';

describe('Get files in a folder use case', () => {
  let fileSystemAdapter: FileSystemGateway;
  let getFilesInAFolderUseCase: GetFilesInAFolderUseCase;

  beforeEach(() => {
    fileSystemAdapter = new LocalFileSystemAdapter('/');
    getFilesInAFolderUseCase = new GetFilesInAFolderUseCase({
      logger: new ConsoleLogger(),
      fileSystemAdapter,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when file system returns the files successfully', () => {
    beforeEach(async () => {
      const files = [
        FileInfo.create({
          fullPath: '/my-source-folder/my-file.txt',
          fileType: FileTypeEnum.FILE,
          fileSize: 1000,
          fileName: 'my-file.txt',
          id: '/my-source-folder/my-file.txt',
          attributes: FileInfoAttributes.create({
            uid: 1,
            gid: 2,
            mode: 3,
            mtimeMs: 1000,
            ctimeMs: 2000,
            atimeMs: 3000,
          }),
        }),
      ];
      fileSystemAdapter.getFilesFromPath = jest.fn().mockResolvedValue(new PaginatedList<FileInfo>(files, new Pagination(10, 1, files.length)));
    });
    it('should return the formatted files response', async () => {
      const outputDto = await getFilesInAFolderUseCase.execute({
        context: {
          correlationId: uuidv4(),
        },
        data: {
          pageSize: 10,
          page: 1,
          rootPath: '/my-source-folder',
        },
      });

      expect(outputDto).toEqual({
        paginationInfo: {
          count: 1,
          total: 1,
          page: 1,
          pageSize: 10,
        },
        results: [
          {
            id: '/my-source-folder/my-file.txt',
            fileName: 'my-file.txt',
            fileSize: 1000,
            fileType: 'FILE',
            fullPath: '/my-source-folder/my-file.txt',
            attributes: {
              uid: 1,
              gid: 2,
              mode: 3,
              atimeMs: 3000,
              mtimeMs: 1000,
              ctimeMs: 2000,
            },
          },
        ],
      });
    });
  });

  describe('when file system throws an error', () => {
    beforeEach(async () => {
      fileSystemAdapter.getFilesFromPath = jest.fn().mockRejectedValue(new Error('folder does not exist!'));
    });
    it('should fail listing files in a folder', async () => {
      await expect(
        getFilesInAFolderUseCase.execute({
          context: {
            correlationId: uuidv4(),
          },
          data: {
            pageSize: 10,
            page: 1,
            rootPath: '/my-source-folder',
          },
        }),
      ).rejects.toThrow(new Error('folder does not exist!'));
    });
  });
});
