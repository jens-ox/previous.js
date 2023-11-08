import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import viteReact from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { UserConfig } from 'vite'

const plugins = [viteReact(), tsconfigPaths()]

export default {
  root: join(dirname(fileURLToPath(new URL(import.meta.url))), 'frontend'),
  plugins
} satisfies UserConfig
