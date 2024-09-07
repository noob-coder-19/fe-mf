/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_WEBSOCKET_URL: string;
  readonly VITE_INTERVAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
