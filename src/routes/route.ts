import {IncomingMessage, ServerResponse} from 'http'
import {productController} from "../controllers/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url
  const method = req.method
  // console.log(method)
  if (url === '/' && method === 'GET') {
    // console.log('this is root route')
    res.writeHead(200, {"Content-Type": "application/json"})
    res.end(JSON.stringify({message: "this is root route"}))
  }
  else if (url?.startsWith('/products')) {
    // console.log('this is product route')
    productController(req, res)
  }
  else {
    // console.log("this route is not defined")
    res.writeHead(404, {"Content-Type": "application/json"})
    res.end(JSON.stringify({message: "this route is not defined"}))
  }
}