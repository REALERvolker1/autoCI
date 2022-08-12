process.removeAllListeners("warning")
import commandConfig from './commands.json' assert{type:"json"}
import * as net from './net.js'

class Command {
  public name:string = "err"
  public description:string = "err"
  public help:string = "err"
  public args:{
    name: string;
    description: string;
    type: string;
    required: boolean;
  }[]
  constructor(public id:number) {
    const data = this.getData(id)
    if (!data) throw "Could not find the specified command!"
    this.name = data.name
    this.description = data.description
    this.help = data.help
    this.args = data.arguments
  }
  public getData(id:number = this.id) {
    return (commandConfig.commands.filter(comm => comm.id == id)[0])
  }
}

const params:string[] = []
const args:string[] = []

const nodeJS = process.argv.shift()
const cwd = process.argv.shift()

process.argv.forEach((arg) => {
  if (arg.startsWith("-")) params.push(arg)
  else args.push(arg)
})

let command = args[0]

const commands:Command[] = []
for (let com of commandConfig.commands) {
  commands.push(new Command(com.id))
}

process.stdin.resume()

process.stdin.on("data", async(data) => {
  process.stdin.pause()
  const input = data.toString().trim().split(" ").filter(arg => arg != "")
  console.log(input)
})