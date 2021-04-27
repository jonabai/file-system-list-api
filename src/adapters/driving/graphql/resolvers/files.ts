import * as uuid from 'uuid';

import { Context } from '../context';
import { GetFilesInAFolderOutputDto } from '../../../../core/use-cases/get-files-in-a-folder/dto/get-files-in-a-folder.output.dto';

export const filesResolver = {
  async files(_: any, { params }: { params: { rootPath: string; page: number; pageSize: number } }, context: Context): Promise<GetFilesInAFolderOutputDto> {
    const res = await context.dataLoaders.files.execute({
      data: params,
      context: {
        correlationId: uuid.v4(),
      },
    });
    return res;
  },
};
