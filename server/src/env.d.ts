declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    ETHEREAL_USERNAME: string;
    ETHEREAL_PASWORD: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}
