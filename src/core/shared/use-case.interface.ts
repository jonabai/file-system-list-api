export interface UseCaseContext {
  correlationId: string;
}

export interface UseCasePort {
  context: UseCaseContext;
}

export interface UseCase<I extends UseCasePort, O = any> {
  execute(port: I): Promise<O>;
}
