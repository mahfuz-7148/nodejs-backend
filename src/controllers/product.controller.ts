
import {IncomingMessage, ServerResponse} from 'http'
import {createProduct, productService} from "../service/product.service";
import {sendResponse} from "../utils/send.response";
import type {IProduct} from "../types/product";
import {bodyParser} from "../utils/body.parser";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url
  const method = req.method
  // console.log(url)
  const urlParams = url?.split('/')
  const id = urlParams && urlParams[1] === 'products' ? Number(urlParams[2]) : null
  // console.log(id)
  if (url === '/products' && method === 'GET') {
    // console.log(products)
    try {
      const products = productService()
      sendResponse(res, true, 200, 'products retrieved successfully', products)
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === 'GET' && id !== null) {
    try {
      const products = productService()
      const product = products.find((p: IProduct) => p.id === id)
      // console.log(product)
      if (!product) {
        return sendResponse(res, false, 404, "Product not found!");
      }
      sendResponse(res, true, 200, "Product retrived successfully!", product);
    } catch (error) {
      sendResponse(res, false, 500, "Internal server error");
    }
  } else if (method === 'POST' && url === '/products') {
    const body = await bodyParser(req)
    // console.log(body)
    const newProduct = {
      id: Date.now(),
      ...body
    }
    // console.log(newProduct)
    const products = productService()
    products.push(newProduct)
    createProduct(products)
    sendResponse(res, true, 201, 'product created successfully', products)
  } else if (method === 'PUT' && id !== null) {
    const body = await bodyParser(req)
    const products = productService()
    const index = products.findIndex((p: IProduct) => p.id === id)
    // console.log(index)
    if (index < 0) {
      sendResponse(res, false, 404, "Product not found!");
    }
    // console.log(products[index])
    products[index] = {id: products[index]?.id, ...body}
    createProduct(products)
    sendResponse(res, true, 200, "Product updated successfully!", products[index])
  }
  else if (method === 'DELETE' && id !== null) {
    const products = productService()
    const index = products.findIndex((p: IProduct) => p.id === id)
    // console.log(index)
    if (index < 0) {
      sendResponse(res, false, 404, "Product not found!");
    }
    // console.log(products[index])
    products.splice(index, 1);
    createProduct(products)
    sendResponse(res, true, 200, "Product deleted successfully!")
  }
}