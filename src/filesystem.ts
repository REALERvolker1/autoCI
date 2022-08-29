import fs from "fs-extra"
import {readFile, writeFile} from 'node:fs/promises'
import path from "node:path"



async function loadJSON(filePath:string) {
  if (!fs.pathExistsSync(filePath)) throw 'Filepath does not exist!!!'
  return (JSON.parse(readFile(filePath).toString()))
}

async function saveJSON(filePath:string, data:any) {
  fs.ensureFileSync(filePath)
  await writeFile(filePath, JSON.stringify(data))
}