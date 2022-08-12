import axios from "axios"

class Repository {
  default: string
  constructor(owner:string, name:string) {this.default = `${owner}/${name}`}
}

async function getRelease(repo:Repository) {
  const request = await axios.default.get(`https://api.github.com/repos/${repo.default}/releases`, {
    headers: {
      accept: "application/vnd.github+json"
    }
  })
  return request.data
}

async function getAsset(repo:Repository, assetID:string) {  
  const request = await axios.default.get(`https://api.github.com/repos/${repo.default}/releases/assets/${assetID}`, {
    headers: {
      accept: "application/octet-stream"
    }
  })
  return request.data
}

export {Repository, getRelease, getAsset}