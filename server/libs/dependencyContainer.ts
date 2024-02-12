// dependencyContainer.ts

import { Request } from "express";

interface paramsBinder {
  method: string;
  route: string;
  handler: Function;
}
class DependencyContainer {
  private static instance: DependencyContainer;
  private request: Request | null = null;
  private paramsBinder: paramsBinder[] = [];

  private constructor() {
    // El constructor es privado para evitar instanciación directa.
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  setPropertyBinder(paramsBinder: paramsBinder): void {
    this.paramsBinder.push(paramsBinder);
  }

  getParamsBinder(): paramsBinder[] {
    return this.paramsBinder;
  }

  setRequest(request: Request): void {
    this.request = request;
  }

  getRequest(): Request | null {
    return this.request;
  }
}

export default DependencyContainer;
