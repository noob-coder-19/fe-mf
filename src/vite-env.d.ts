/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_WEBSOCKET_URL: string;
  readonly VITE_INTERVAL: string;
  readonly VITE_CORE_MARKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
