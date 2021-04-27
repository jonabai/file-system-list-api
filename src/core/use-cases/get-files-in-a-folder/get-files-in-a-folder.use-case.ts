import { UseCase, UseCasePort } from '../../shared/use-case.interface';
import { GetFilesInAFolderInputDto } from './dto/get-files-in-a-folder.input.dto';
import { Logger } from '../../gateways/logger.gateway';
import { FileSystemGateway } from '../../gateways/file-system.gateway';
import { GetFilesInAFolderOutputDto } from './dto/get-files-in-a-folder.output.dto';

export interface GetFilesInAFolderUseCasePort extends UseCasePort {
  readonly data: GetFilesInAFolderInputDto;
}

export interface GetFilesInAFolderUseCaseGateway {
  fileSystemAdapter: FileSystemGateway;
  logger: Logger;
}

export class GetFilesInAFolderUseCase implements UseCase<GetFilesInAFolderUseCasePort> {
  constructor(private gateway: GetFilesInAFolderUseCaseGateway) {}

  async execute(port: GetFilesInAFolderUseCasePort): Promise<GetFilesInAFolderOutputDto> {
    const paginatedResult = await this.gateway.fileSystemAdapter.getFilesFromPath(port.data.rootPath, { page: port.data.page, pageSize: port.data.pageSize });

    return {
      paginationInfo: {
        count: paginatedResult.results.length,
        total: paginatedResult.pagination.total,
        page: paginatedResult.pagination.page,
        pageSize: paginatedResult.pagination.pageSize,
      },
      results: paginatedResult.results.map((fileInfo) => ({
        id: fileInfo.id,
        fileName: fileInfo.fileName,
        fileSize: fileInfo.fileSize,
        fileType: fileInfo.fileType,
        fullPath: fileInfo.fullPath,
        attributes: {
          uid: fileInfo.attributes.uid,
          gid: fileInfo.attributes.gid,
          mode: fileInfo.attributes.mode,
          atimeMs: fileInfo.attributes.atimeMs,
          mtimeMs: fileInfo.attributes.mtimeMs,
          ctimeMs: fileInfo.attributes.ctimeMs,
        },
      })),
    };
  }
}
