process.removeAllListeners("warning")
import path from 'node:path'
import {homedir} from 'node:os'
import {readFile, writeFile} from 'node:fs/promises'
import commandConfig from './commands.json' assert{type:"json"}
import * as net from './net.js'

const nodeJS = process.argv.shift()
const cwd = process.argv.shift()
const confDir = path.join(homedir(), `.config/autoci`)
const params:string[] = []
const args:string[] = []
let command = args[0]
const repos = (await readFile(path.join(confDir, "repos.txt"))).toString().split("\n")

process.argv.forEach((arg) => {
  if (arg.startsWith("-")) params.push(arg)
  else args.push(arg)
})
process.stdin.resume()

process.stdin.on("data", async(data) => {
  process.stdin.pause()
  const input = data.toString().trim().split(" ").filter(arg => arg != "")
  console.log(input)
})

export {confDir, cwd, }