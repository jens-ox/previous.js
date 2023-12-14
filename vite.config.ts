import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vite'
import { BASEPATH_PLACEHOLDER } from './constants'

const plugins = [viteReact(), tsconfigPaths()]

export default {
  root: join(dirname(fileURLToPath(new URL(import.meta.url))), 'frontend'),
  plugins,
  build: {
    outDir: 'dist/frontend'
  },
  // In dev mode, just set the basepath explicitly. In production, we use the
  // placeholder so we can inject the basepath at runtime.
  base: process.env.NODE_ENV !== 'production' ? process.env.BASEPATH : BASEPATH_PLACEHOLDER
} satisfies UserConfig
