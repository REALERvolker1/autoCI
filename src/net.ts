import axios from "axios"


async function getRelease(repo:string) {
  const request = await axios.default.get(`https://api.github.com/repos/${repo}/releases`, {
    headers: {
      accept: "application/vnd.github+json"
    }
  })
  return request.data
}

async function getAsset(repo:string, assetID:string) {  
  const request = await axios.default.get(`https://api.github.com/repos/${repo}/releases/assets/${assetID}`, {
    headers: {
      accept: "application/octet-stream"
    }
  })
  return request.data
}

export {getRelease, getAsset, }