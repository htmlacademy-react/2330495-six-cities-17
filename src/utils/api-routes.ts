export const buildApiRoute = (route: string, ...params: string[]): string => `${route}/${params.join('/')}`;
