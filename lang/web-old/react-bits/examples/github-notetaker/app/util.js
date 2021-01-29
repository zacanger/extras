import axios from 'axios'

const
  getRepos = username => axios.get(`https://api.github.com/users/${username}/repos`)
, getInfo  = username => axios.get(`https://api.github.com/users/${username}`)

export default function getGh(username){
  return axios.all([getRepos(username), getInfo(username)])
  .then(arr => ({repos : arr[0].data, bio : arr[1].data}))
}

