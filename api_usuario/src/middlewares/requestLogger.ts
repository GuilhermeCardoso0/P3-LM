import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.originalUrl}`);
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`=> ${res.statusCode} (${elapsed}ms)`);
  });
  next();
}
