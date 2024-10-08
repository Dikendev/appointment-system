export interface ContextStorageServiceInterface {
  setContextId(contextId: string): void;
  getContextId(): string;
  get<T>(key: string): T | undefined;
  set<T>(key: string, value: T): void;
}

export const ContextStorageServiceKey = Symbol();
