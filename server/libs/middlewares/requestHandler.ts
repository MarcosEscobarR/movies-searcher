import { Request, Response, NextFunction } from "express";
import DependencyContainer from "../dependencyContainer";

function requestHandler(req: Request, res: Response, next: NextFunction): void {
  const container = DependencyContainer.getInstance();
  container.setRequest(req);

  // Realiza otras operaciones con req si es necesario.

  next();
}

export default requestHandler;
