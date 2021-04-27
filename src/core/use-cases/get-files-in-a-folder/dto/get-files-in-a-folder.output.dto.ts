import { FileTypeEnum } from '../../../domain/models/file-type.enum';

export class FileAttributesDto {
  uid!: number;
  gid!: number;
  mode!: number;
  atimeMs!: number;
  mtimeMs!: number;
  ctimeMs!: number;
}

export class FileInfoDto {
  id!: string;
  fileName!: string;
  fileType!: FileTypeEnum;
  fileSize!: number;
  fullPath!: string;
  attributes!: FileAttributesDto;
}

export class PaginationInfoDto {
  page!: number;
  pageSize!: number;
  total!: number;
  count!: number;
}

export class GetFilesInAFolderOutputDto {
  results!: FileInfoDto[];
  paginationInfo!: PaginationInfoDto;
}
