import React      from 'react'
import View       from 'reapp-ui/views/View'
import Button     from 'reapp-ui/components/Button'
import Input      from 'reapp-ui/components/Input'
import Gallery    from 'reapp-ui/components/Gallery'
import Superagent from 'superagent'

const key  = 'key'
const base = 'https://api.flickr.com/services/rest/?api_key=${key}&format=rest&format=json&nojsoncallback=1'

export default React.createClass({

  getInitialState(){
    return {
      photos []
    }
  },

  getFlickrPhotoUrl(image){
   return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
  },

 handleSearch(){
    let searchText = this.refs.search.getDomeNode().value
    Superagent
    .get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`, res => {
      if(res.status === 200 && res.body.photos){
        this.setState({
          photos : res.body.photos.photo.map(this.getFlickrPhotoUrl)
        })
      }
    })
  },

  render(){
    var {photos} = this.state

    return (
      <View
        title="flickr search"
        styles={{inner: {{padding: 20}}}}>
        <Input
          ref="search img-responsive"
          placeholder="search"
          styles={{
            input : {
              margin: '0 0 10px 0'
            , boreder: '1px solid #ddd'
            }
          }}
        />
        <Button onTap={this.handleSearch}>search</Button>
        <div className="verticalCenter">
          {!photos.length && <span>no photos</span>}
          {!!photos.length &&
            <Gallery
              images={photos}
              width={window.innerWidth}
              height={window.innerHeight - 44}
              onclose={() => this.setState({photos : []})}
            />
          }
        </div>
      </View>
    )
  }
})

