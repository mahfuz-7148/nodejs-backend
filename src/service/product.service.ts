import path from "path";
import fs from "fs";

export const productService = () => {
 const filePath = path.join(process.cwd(), './src/database/db.json')
  const result = fs.readFileSync(filePath, 'utf-8')
  // console.log(process.cwd());
  // console.log(filePath);
  // console.log(result)
  return JSON.parse(result)
}