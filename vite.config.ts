import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import viteReact from '@vitejs/plugin-react'
import type { UserConfig } from 'vite'

const root = './frontend'

const plugins = [viteReact()]

export default {
  root,
  plugins,
  build: {
    outDir: resolve(dirname(fileURLToPath(import.meta.url)), './dist/frontend/dist')
  }
} satisfies UserConfig
