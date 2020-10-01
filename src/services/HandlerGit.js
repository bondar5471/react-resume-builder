const { Octokit } = require("@octokit/rest")
// eslint-disable-next-line no-undef
const token = process.env.REACT_APP_GIT_TOKEN

const octokit = new Octokit({
  auth: token,
})

const getListFolderRepo = async () => {
  const files = await octokit.repos.getContent({
    owner: "bondar5471",
    repo: "resume",
    path: "",
  })
  return files.data
}

const getFileFromFolderRepo = async (path) => {
  const result = await octokit.repos.getContent({
    owner: "bondar5471",
    repo: "resume",
    path: `${path}`,
  })
  return result.data
}

const getSingleFile = async (path) => {
  const file = await octokit.repos.getContent({
    owner: "bondar5471",
    repo: "resume",
    path: `${path}`,
  })
  return file.data
}

export { getFileFromFolderRepo, getListFolderRepo, getSingleFile }
