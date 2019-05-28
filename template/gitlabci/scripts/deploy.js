process.env.NODE_ENV = 'production'
const path = require('path')
const walkSync = require('klaw-sync')
const azureStorage = require('azure-storage')
const rootPath = path.resolve(__dirname, '..')

// See https://docs.microsoft.com/en-us/azure/storage/common/storage-account-manage#access-keys
const azureAccountName = ''
const azureAccountKey = ''

if(!azureAccountName || !azureAccountKey) {
  throw new Error('Please specify Azure account credentials in scripts/deploy.js')
}

async function deploy() {
  const blobSvc = azureStorage.createBlobService(
    `DefaultEndpointsProtocol=https;AccountName=${azureAccountName};AccountKey=${azureAccountKey};EndpointSuffix=core.windows.net`,
  )
  await new Promise((resolve, reject) => {
    blobSvc.createContainerIfNotExists('$web', (err, result) => {
      if (err) reject(err)
      else resolve(result)
    })
  })

  const distPath = path.resolve(rootPath, 'dist')
  const files = walkSync(distPath, { nodir: true }).map(f => path.relative(distPath, f.path))
  let counter = 0
  for (const f of files) {
    await new Promise((resolve, reject) => {
      blobSvc.createBlockBlobFromLocalFile('$web', f, path.resolve(distPath, f), (err, result) => {
        if (err) reject(err)
        else resolve(result)
      })
    })
    counter++
  }
  console.log(`${counter} files uploaded.`)
}

deploy()
