import fs, { Dirent } from 'fs';
import path from 'path';

import { FileSystemGateway } from '../../../../core/gateways/file-system.gateway';
import { FileInfo } from '../../../../core/domain/models/FileInfo';
import { FileTypeEnum } from '../../../../core/domain/models/file-type.enum';
import { FileInfoAttributes } from '../../../../core/domain/models/FileInfoAttributes';
import { PaginatedList } from '../../../../core/domain/models/paginated-result';
import { Pagination } from '../../../../core/domain/models/pagination';

const fsPromises = fs.promises;

export class LocalFileSystemAdapter implements FileSystemGateway {
  constructor(private readonly rootPath: string) {}
  async getFilesFromPath(sourcePath: string, options: { page: number; pageSize: number }): Promise<PaginatedList<FileInfo>> {
    const folderPath = path.join(this.rootPath, sourcePath);
    const files = await fsPromises.readdir(folderPath, { encoding: 'utf8', withFileTypes: true });
    const list = await Promise.all(
      files
        .slice(options.pageSize * (options.page - 1), options.page * options.pageSize)
        .map(async (file: Dirent) => LocalFileSystemAdapter.getFileInfo(folderPath, file)),
    );
    return new PaginatedList<FileInfo>(list, new Pagination(options.pageSize, options.page, files.length));
  }

  private static async getFileInfo(folderPath: string, file: Dirent): Promise<FileInfo> {
    const fullPath = path.join(folderPath, file.name);
    const fileStats = await fsPromises.stat(fullPath);
    return FileInfo.create({
      id: file.name,
      fileName: file.name,
      fileSize: fileStats.size,
      fileType: fileStats.isDirectory() ? FileTypeEnum.FOLDER : FileTypeEnum.FILE,
      fullPath,
      attributes: LocalFileSystemAdapter.getFileAttributes(fileStats),
    });
  }

  private static getFileAttributes(fileStats: fs.Stats): FileInfoAttributes {
    return FileInfoAttributes.create({
      uid: fileStats.uid,
      gid: fileStats.gid,
      mode: fileStats.mode,
      atimeMs: fileStats.atimeMs,
      ctimeMs: fileStats.ctimeMs,
      mtimeMs: fileStats.mtimeMs,
    });
  }
}
