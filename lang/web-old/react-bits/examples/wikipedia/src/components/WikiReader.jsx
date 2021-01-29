import React  from 'react'
import Search from './Search'
import superagent from 'superagent'
import jsonp from 'superagent-jsonp'
import Results from './Results'

export default class WikiReader extends React.Component {
  constructor(){
    super()
    this.state = {
      results : [
        '', [], [], []
      ]
    }
  }

  handleSearch(searchTerm){
    superagent.get('https://en.wikipedia.org/w/api.php')
      .query({
        search : searchTerm
      , action : 'opensearch'
      , format : 'json'
      })
      .use(jsonp)
      .end((error, response) => {
        if(error){
          console.error(error)
        } else {
          this.setState({results : response.body})
        }
      })

  }
  render(){
    return(
      <div className="wrapper">
        <Search onSearch={this.handleSearch.bind(this)} />
        <Results results={this.state.results} />
      </div>
    )
  }
}
