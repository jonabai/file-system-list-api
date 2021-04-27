import { FileTypeEnum } from './file-type.enum';
import { FileInfoAttributes } from './FileInfoAttributes';

interface FileInfoProps {
  id: string;
  fileName: string;
  fileType: FileTypeEnum;
  fileSize: number;
  fullPath: string;
  attributes: FileInfoAttributes;
}

export class FileInfo {
  constructor(private props: FileInfoProps) {}

  get id(): string {
    return this.props.id;
  }
  get fileName(): string {
    return this.props.fileName;
  }
  get fileType(): FileTypeEnum {
    return this.props.fileType;
  }
  get fileSize(): number {
    return this.props.fileSize;
  }
  get fullPath(): string {
    return this.props.fullPath;
  }
  get attributes(): FileInfoAttributes {
    return this.props.attributes;
  }

  public static create(props: FileInfoProps): FileInfo {
    return new FileInfo(props);
  }
}
