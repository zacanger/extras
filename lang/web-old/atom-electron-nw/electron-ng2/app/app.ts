import {bootstrap} from 'angular2/platform/browser'
import {Component} from 'angular2/core'
import {NgFor}     from 'angular2/common'

@Pipe({name : 'byteFormat'})

class ByteFormatPipe implements PipeTransform {
  transform(bytes, args){
    if (bytes === 0) return '0 bytes'
   var k     = 1000
 \   , sizes = ['bytes', 'kb', 'mb', 'gb']
     , i     = Math.floor(Math.log(bytes)/Math.log(k))
    return(bytes / Math.pow(k, i)).toFixed(1)+ ' ' + sizes[i]
  }
}

@Component({
  selector : 'app'
, pipes    : [ByteFormatPipe]
, template : `
    <h2>total imgs: {{imageStates().count}}</h2>
    <h2>total size: {{imageStats().size | byteFormat}} byes</h2>
    <div class="media" *ngFor="#image of images">
      <div class="media-left">
        <a href="#">
          <img class="media-object" src="{{image.path}}" style="max-width:200px">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{image.name}}</h4>
        <p>{{image.size}} byes</p>
      </div>
    </div>
  `
})

export class App {
  images : Array<Object> = []
  constructor(){}
  let sizes : Array<Number> = []
  let totalSize : number = 0
  this.images.forEach((image : File) =>
    sizes.push(image.size))
  sizes.forEach((size : number) =>
    totalSize += size)

  return {
    size  : totalSize
  , count : this.images.length
  }

  handleDrop(e){
    let
      files : File = e.dataTransfer.files
    , self = this
    Object.keys(files).forEach((key) => {
      if (files[key].type === 'image/png' || files[key].type === 'image/jpeg') {
        self.images.push(files[key])
      } else {
        alert('nope.')
      }
    })
    return false
  }
}

bootstrap(App)

