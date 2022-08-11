import * as path from 'node:path'
import { Argument, Command } from "commander"
import * as main from './main.js'
import {platform} from 'node:os'

if (platform() != 'linux') {
  console.log("Non-linux user detected. Shutting down...")
  process.exit(1)
}

const program = new Command("Auto CI")
  .description(`A package manager that manages tarballs`)
  .version("0.1a")

program.command("update")
  .description(`Updates the registry, and installs if you proceed`)
  .option('-y, --confirm', "Will auto confirm if you want to upgrade")
  .action(async(args) => {
    //if (args.confirm)
  })

program.command("debug")
  .description("A debugging mode that does everything")
  .action(async() => {
    main.main()
  })

program.command("add")
  .description("Adds a package using a github link")
  .addArgument(new Argument("repository", `The https url of the github repo. https://github.com/JuliaLang/julia/`))
  .action(async(args) => {
    const formatted = args.replace('https://github.com/', "").split("/")
    try {
      main.add(formatted[0], formatted[1])
    }
    catch(e) {
      console.log(e)
    }
  })

//fuck commander to hell -- use different cli module or parse stdin myself

program.parse()
