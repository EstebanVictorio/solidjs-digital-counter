import { defineConfig } from "vite"
import solidjs from "vite-plugin-solid"
import path from "path"

const root = path.resolve('src')

export default defineConfig({
  resolve: {
    alias: {
      components: `${root}/components`,
    },
    extensions: ['.ts', '.tsx']
  },
  plugins: [solidjs()]
})