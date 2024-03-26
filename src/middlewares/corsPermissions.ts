import { NextFunction, Request, Response } from "express";

const allowedOrigins = ["https://geocoderdev.github.io/"];

export function corsPermissionsIsRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const origin = req.headers.origin as string;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    // Si el origen no está en la lista permitida, puedes optar por no incluir el encabezado Access-Control-Allow-Origin
    // O podrías manejarlo de alguna otra manera, como devolver un código de estado 403 Forbidden
    // res.status(403).send("Forbidden");
  }

  res.header("Access-Control-Allow-Methods", "GET, POST");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  next();
}

export function corsPermissionsIsNotRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }
  next();
}
