import { FileInfo } from '../domain/models/FileInfo';
import { PaginatedList } from '../domain/models/paginated-result';

export interface FileSystemGateway {
  getFilesFromPath(path: string, options: { page: number; pageSize: number }): Promise<PaginatedList<FileInfo>>;
}
