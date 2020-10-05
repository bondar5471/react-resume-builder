import { token } from "./HandleEnv"
const { Octokit } = require("@octokit/rest")

const owner = "bondar5471"
const repo = "resume"

const octokit = new Octokit({
  auth: token,
})

const getListFolderRepo = async () => {
  const files = await octokit.repos.getContent({
    owner,
    repo,
    path: "",
  })
  return files.data
}

const getFileFromFolderRepo = async (path) => {
  const result = await octokit.repos.getContent({
    owner,
    repo,
    path: `${path}`,
  })
  return result.data
}

const updateOrCreateFile = async (content) => {
  const sha = localStorage.getItem("currentSha")
  const path = localStorage.getItem("currentPath")
  const response = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `Update ${path}`,
    content,
    sha,
    committer: { name: "Sergey", email: "bondar5471@gmail.com" },
    author: { name: "Sergey", email: "bondar5471@gmail.com" },
  })
  return response
}

export { getFileFromFolderRepo, getListFolderRepo, updateOrCreateFile }
