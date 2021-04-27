import { UseCase } from '../../../core/shared/use-case.interface';
import { GetFilesInAFolderUseCasePort } from '../../../core/use-cases/get-files-in-a-folder/get-files-in-a-folder.use-case';

export interface Context {
  dataLoaders: {
    files: UseCase<GetFilesInAFolderUseCasePort>;
  };
}
