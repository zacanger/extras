import React from 'react'

export default function User({bio}){
  return (
    <div>
      {bio.avatar_url   && <li><img src={bio.avatar_url} /></li>}
      {bio.name         && <li>{bio.name}</li>}
      {bio.login        && <li>{bio.login}</li>}
      {bio.email        && <li>{bio.email}</li>}
      {bio.location     && <li>{bio.location}</li>}
      {bio.company      && <li>{bio.company}</li>}
      {bio.followers    && <li>{bio.followers}</li>}
      {bio.following    && <li>{bio.following}</li>}
      {bio.public_repos && <li>{bio.public_repos}</li>}
      {bio.blog         && <li><a href={bio.blog}>{bio.blog}</a></li>}
    </div>
  )
}

UserProfile.propTypes = {
  username : React.PropTypes.string.isRequired
, bio      : React.PropTypes.object.isRequired
}

