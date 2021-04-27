interface FileInfoAttributesProps {
  uid: number;
  gid: number;
  mode: number;
  atimeMs: number;
  mtimeMs: number;
  ctimeMs: number;
}

export class FileInfoAttributes {
  constructor(private props: FileInfoAttributesProps) {}

  get uid(): number {
    return this.props.uid;
  }
  get gid(): number {
    return this.props.gid;
  }
  get mode(): number {
    return this.props.mode;
  }
  get atimeMs(): number {
    return this.props.atimeMs;
  }
  get mtimeMs(): number {
    return this.props.mtimeMs;
  }
  get ctimeMs(): number {
    return this.props.ctimeMs;
  }

  public static create(props: FileInfoAttributesProps): FileInfoAttributes {
    return new FileInfoAttributes(props);
  }
}
