/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV?: string
  readonly BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
