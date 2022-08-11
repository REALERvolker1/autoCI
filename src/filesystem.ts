import fs from "fs-extra"
import path from 'node:path'

export default {
  async loadJSON(filePath:string) {
    if (!fs.pathExistsSync(filePath)) throw 'Filepath does not exist!!!'
    return (JSON.parse(fs.readFileSync(filePath).toString()))
  },
  async saveJSON(filePath:string, data:any) {
    fs.ensureFileSync(filePath)
    fs.writeFileSync(filePath, JSON.stringify(data))
  }
}
//how useless is this?!? make it a general utils module