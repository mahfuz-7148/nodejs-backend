
import {IncomingMessage, ServerResponse} from 'http'
import {productService} from "../service/product.service";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url
  const method = req.method
  if (url === '/products' && method === 'GET') {
    const products = productService()
    // console.log(products)
  }
  res.writeHead(200, {"Content-Type": "application/json"})
  res.end(JSON.stringify({message: "this is products route"}))
}