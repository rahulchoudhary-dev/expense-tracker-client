export function replaceParams(path: string, params: Record<string, any>) {
  for (const key in params) {
    path = path.replace(`:${key}`, params[key]);
  }
  return path;
}
