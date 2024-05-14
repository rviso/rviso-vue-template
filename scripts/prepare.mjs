// 修复Error: spawn xxx\node_modules\vite-plugin-mock\node_modules\esbuild\esbuild.exe ENOENT报错问题
// issue: https://github.com/vitejs/vite/issues/1361
import { fileURLToPath } from 'url'
import path from 'path'
import { exec } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mockPath = path.resolve(
  __dirname,
  '../node_modules/vite-plugin-mock/node_modules/esbuild/install.js'
)

export const getPackageManager = () => {
  const userAgent = process.env.npm_config_user_agent ?? ''
  const packageManager = /pnpm/.test(userAgent)
    ? 'pnpm'
    : /yarn/.test(userAgent)
    ? 'yarn'
    : 'npm'
  return packageManager
}
const pm = getPackageManager()
if (pm === 'npm') {
  exec(`node ${mockPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}
