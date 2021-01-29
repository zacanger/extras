import React from 'react'

export default function Repos({repos}){
  return (
    <div>
      <h3>repos</h3>
      <ul>
        {repos.map((repo, idx) => {
          return (
            <li key={repo.name}>
              {repo.html_url && <h5><a href={repo.html_url}>{repo.name}</a></h5>}
              {repo.description && <p>{repo.description}</p>}
            </li>
          )
      })}
      </ul>
    </div>
  )
}

Repos.propTypes = {
  username : React.PropTypes.string.isRequired
, repos    : React.PropTypes.array.isRequired
}

