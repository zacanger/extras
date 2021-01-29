import React  from 'react'
import Search from './Search'

export default function Main({children, history}){
  return (
    <div>
      <nav>
        <Search history={history} />
      </nav>
      <div>{children}</div>
    </div>
  )
}

