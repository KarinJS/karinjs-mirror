import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cpSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface MirrorEntry {
  path: string
  url: string
  pollingInterval: number
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'copy-mirror-data',
      closeBundle () {
        const root = resolve(import.meta.dirname)
        const mirrorDir = resolve(root, 'mirror')
        const distDir = resolve(root, 'dist')
        const configPath = resolve(root, 'mirror.json')

        // 复制 mirror.json 到 dist 供页面读取
        cpSync(configPath, resolve(distDir, 'mirror.json'))

        // 根据配置复制对应的镜像文件
        const config: MirrorEntry[] = JSON.parse(readFileSync(configPath, 'utf-8'))
        for (const entry of config) {
          const src = resolve(mirrorDir, entry.path)
          const dest = resolve(distDir, entry.path)
          try {
            cpSync(src, dest, { recursive: true })
            console.log(`  ✅ mirror/${entry.path} → dist/${entry.path}`)
          } catch {
            console.warn(`  ⚠️ mirror/${entry.path} 不存在，跳过`)
          }
        }
      },
    },
  ],
})
