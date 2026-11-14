import path from "path";
import fs from "fs";
import type {IProduct} from "../types/product";

const filePath = path.join(process.cwd(), './src/database/db.json')

export const productService = (): IProduct[] => {
  const result = fs.readFileSync(filePath, 'utf-8')
  // console.log(process.cwd());
  // console.log(filePath);
  // console.log(result)
  return JSON.parse(result)
}

export const createProduct = (payload: IProduct[]) => {
 fs.writeFileSync(filePath, JSON.stringify(payload))
}