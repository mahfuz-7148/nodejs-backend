
import {IncomingMessage, ServerResponse} from 'http'

export const productController = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, {"Content-Type": "application/json"})
  res.end(JSON.stringify({message: "this is products route"}))
}