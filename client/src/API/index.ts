export type apiFunc<R> = (user: string | null, ...args: any) => Promise<R>;
