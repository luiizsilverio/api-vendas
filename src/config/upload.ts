import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const uplFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uplFolder,

  storage: multer.diskStorage({
    destination: uplFolder,
    filename(request, file, callback) {
      const hash = crypto.randomBytes(10).toString('hex')
      const fileName = `${hash}-${file.originalname}`
      return callback(null, fileName)
    }
  })
}
