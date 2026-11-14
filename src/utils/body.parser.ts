import type {IncomingMessage} from 'http'

export const bodyParser = (req: IncomingMessage): Promise<any> => {
  let body = ''
  return new Promise<any>((resolve, reject) => {
      req.on('data', chunk => {
        body += chunk
      })
      req.on('end', () => {
       try {
         resolve(JSON.parse(body))
       } catch (err) {
         reject(err)
       }
      })
  })
}