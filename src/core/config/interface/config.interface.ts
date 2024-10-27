interface RootUser {
  name: string;
  email: string;
  password: string;
}

interface Cache {
  host: string;
  port: number;
  password: string;
  ttl: number;
}

export interface IConfig {
  accessSecret: string;
  port: number;
  root: RootUser;
  cache: Cache;
}
