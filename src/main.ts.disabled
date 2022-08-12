import { Octokit } from "octokit"
import fs from "fs-extra"
import * as path from 'node:path'
import prettyBytes from 'pretty-bytes'
import prettyMs from 'pretty-ms'
import dayjs from 'dayjs'
import fileOps from './filesystem.js'


const userDIR = `/home/vlk/programming/automation/autoci/user/` //make it configurable from path in system

let [config, lockfile] = await Promise.all([
  fileOps.loadJSON(path.join(userDIR, 'config.json')),
  fileOps.loadJSON(path.join(userDIR, 'apps.lock.json'))
])
fs.ensureDir(config.path) //should be used with or without the / at the end

const octo = new Octokit(/*{auth: config.token}*/) //IMPORTANT!! make sure I am not sending passwords over http

class Application {
  public version:string|undefined //unused so far - user-configurable version string ops
  public script:string|undefined //user-configurable scripts
  public owner:string // format: REALERvolker1/Volkerhack
  public repo:string
  public url:string //base URL
  public releases:any //must be initialized with this.fetch()
  constructor(owner:string, repo:string, shellscript?:string) {
    this.owner = owner
    this.repo = repo //url.replace("https://github.com/", "/repos/")
    this.url = `/repos/${owner}/${repo}`
    this.script = shellscript
  }

  public async fetch(feedback:boolean = false) {
    const request = await octo.request(`GET /repos/${this.owner}/${this.repo}/releases`, {
      headers: {
        accept: "application/vnd.github+json"
      }
    })
    const releases = request.data
    this.releases = releases
    if (feedback) console.log(releases)
    return request.status
  }

  public listVersions() { //pretty list. Deprecated
    const data:any[] = []
    for (let release of this.releases) {
      const files = []
      for (let asset of release.assets) {
        files.push({
          name: asset.name,
          label: asset.label,
          date: dayjs(asset.created_at).format('MM/DD/YYYY HH:mm:ss A'),
          size: prettyBytes(asset.size),
          downloads: asset.download_count
        })
      }
      data.push({
        tag: release.tag_name,
        name: release.name,
        id: release.id,
        date: dayjs(release.published_at).format('MM/DD/YYYY HH:mm:ss A'),
        status: {
          prerelease: release.prerelease,
          draft: release.draft,
        },
        url: release.html_url,
        assets: files
      })
    }
    return data
  }

  public async download(asset:any) { //holy shit this spaghetti code
    const fileID = asset.id
    const startTime = new Date().getMilliseconds()
    let assetlink = `${this.url}/releases/assets/${fileID}`
    console.log(`Downloading ${assetlink}`)
    const file = await octo.request(`GET ${assetlink}`, {
      headers: {
        accept: "application/octet-stream"
      }
    })
    const filepath = `${config.path}/${asset.name}`
    if (fs.existsSync(filepath)) fs.removeSync(filepath)
    //fs.writeFileSync(path.join(config.path, filename), file.data)
    fs.appendFileSync(filepath, Buffer.from(file.data))
    console.log(` Done downloading! (${prettyMs(new Date().getMilliseconds() - startTime)})`)
  }

  public async install() { // should install the package for the first time.
    const status = await this.fetch()
    if (status != 200) throw new Error(`Error! Res status is ${status}`)
    console.log(`Adding ${this.repo}...`)
  }

  //reusable install function for repeat installation. make download a private method
}



async function main() { //deprecate
  const app = new Application("JuliaLang","julia")
  await app.fetch()
  const versions = app.listVersions()
  const options = []
  for (let ver of versions) {
    //console.log(ver)
    options.push(`${ver.name} -- ${ver.date} -- ${ver.assets.length} assets`)
  }
  console.log(options)
  const choice = app.releases[0].assets[0]
  await app.download(choice)
}

async function add(authorNAME:string, repoNAME:string) { //deprecate -- move to index
  //if (lockfile.repos.includes(`${authorNAME}/${repoNAME}`)) throw 'Already added! Try updating instead!'
  const e = []
  const app = new Application(authorNAME, repoNAME)
  app.install()
  /*
  const [installStatus, file] = await Promise.all([
    app.install(),
    (async() => {
      lockfile.repos = [...lockfile.repos, `${app.owner}/${app.repo}`]
      await fileOps.saveJSON(path.join(userDIR, 'apps.lock.json'), lockfile)
    })()
  ])
  */

}

export {Application, main, add}