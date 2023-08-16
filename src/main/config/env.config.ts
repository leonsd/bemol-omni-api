interface Env {
  port: number | null;
  domain: string;
  mongoUrl: string;
}

export const env: Env = {
  port: Number(process.env.PORT) || 3000,
  domain: process.env.DOMAIN ?? 'localhost',
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/bemol-omni',
};
