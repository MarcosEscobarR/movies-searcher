import { Role } from "@prisma/client";

type HttpHeaders =
  | "accept"
  | "content-type"
  | "authorization"
  | "cache-control"
  | "user-agent"
  | "referer"
  | "origin"
  | "cookie"
  | "set-cookie";

export type HttpOptions = {
  protected?: boolean;
  roles?: Role[];
};
