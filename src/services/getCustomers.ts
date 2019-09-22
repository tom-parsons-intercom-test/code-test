import readline from "readline"
import fs from "fs"
import axios from "axios"

import {Customer} from "./types"

export const getCustomersFromLocal = (filePath: string): Promise<Customer[]> => {
  let resolve: (c: Customer[]) => void
  const promise = new Promise<Customer[]>(_resolve => resolve = _resolve)

  const rl = readline.createInterface({
    input: fs.createReadStream(filePath)
  })

  const customersArr: Customer[] = []

  rl.on("line", (line: string) => customersArr.push(JSON.parse(line)))
  rl.on("close", () => resolve(customersArr))
  return promise
}

export const getCustomersFromWeb = (url: string): Promise<Customer[]> =>
  axios.get(url).then((res: any) => {
    const jsonld = res.data.split("\n")
    return jsonld.map((c: string) => JSON.parse(c))
  })
