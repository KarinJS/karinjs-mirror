import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createHash } from 'node:crypto'

interface MirrorEntry {
  path: string
  url: string
  pollingInterval: number
}

const ROOT = resolve(import.meta.dirname, '..')
const MIRROR_DIR = resolve(ROOT, 'mirror')
const CONFIG_PATH = resolve(ROOT, 'mirror.json')

function sha256 (data: Buffer): string {
  return createHash('sha256').update(data).digest('hex')
}

async function main (): Promise<void> {
  const config: MirrorEntry[] = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
  let changed = false

  for (const entry of config) {
    const localFile = resolve(MIRROR_DIR, entry.path)
    const localDir = dirname(localFile)

    console.log('─'.repeat(40))
    console.log(`📦 ${entry.path}`)
    console.log(`   URL: ${entry.url}`)

    let remoteData: Buffer
    try {
      const res = await fetch(entry.url)
      if (!res.ok) {
        console.log(`   ❌ HTTP ${res.status}，跳过`)
        continue
      }
      remoteData = Buffer.from(await res.arrayBuffer())
    } catch (err) {
      console.log(`   ❌ 下载失败: ${err}，跳过`)
      continue
    }

    const remoteHash = sha256(remoteData)
    let localHash = ''

    if (existsSync(localFile)) {
      localHash = sha256(readFileSync(localFile))
    }

    if (remoteHash !== localHash) {
      mkdirSync(localDir, { recursive: true })
      writeFileSync(localFile, remoteData)
      console.log(`   ✅ 已更新 (hash: ${remoteHash.slice(0, 12)}...)`)
      changed = true
    } else {
      console.log(`   ⏭️ 无变更`)
    }
  }

  console.log('─'.repeat(40))

  if (changed) {
    console.log('\n🔄 检测到变更')
    process.exit(0)
  } else {
    console.log('\n✨ 所有条目均无变更')
    process.exit(1)
  }
}

main()
