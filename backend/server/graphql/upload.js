import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { v4 as uuidv4 } from 'uuid' // Import thư viện UUID

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const typeDef = `
    scalar File

    extend type Mutation {
      upload(file: File!): String!
    }
`

export const resolvers = {
  Mutation: {
    upload: async (_, { file }) => {
      try {
        const fileArrayBuffer = await file.arrayBuffer()
        const fileExtension = path.extname(file.name) // Lấy phần mở rộng của file (.jpg, .png, ...)
        const newFileName = uuidv4() + fileExtension // Tạo tên file mới với UUID
        const fullPath = path.join(__dirname, '/../img/', newFileName)

        await fs.promises.writeFile(fullPath, Buffer.from(fileArrayBuffer))
        return newFileName
      } catch (e) {
        console.log('Cannot save uploaded file, reason: ' + e)
        return false
      }
    },
  },
}
