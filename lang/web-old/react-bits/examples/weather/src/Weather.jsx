import React                               from 'react'
import {getLocationCoords, getWeatherData} from 'api'

export default class WeatherApp extends React.Component {
  constructor() {
    super()
    this.state = {
      city               : 'loading'
    , country            : 'loading'
    , currentWeather     : 'loading'
    , currentTemperature : 0
    , currentUnit        : 'C'
    , availableUnit      : 'F'
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.fetchWeather(this.state.currentUnit)
  }

  fetchWeather(units) {
    getLocationCoords().then(
      (coords) => {
        getWeatherData(units, coords).then(
          (weatherData) => {
            this.setState({
            city               : weatherData.body.name
            , country            : weatherData.body.sys.country
            , currentTemperature : weatherData.body.main.temp
            , currentWeather     : weatherData.body.weather[0].main
            , currentUnit        : units
            , availableUnit      : units === 'C' ? 'F' : 'C'
          })
          document.querySelector('body').className = getWeatherClass(weatherData.body.weather[0].id)
        }, (error) => {
          console.error(error)
        })
      }, (error) => {
        console.error(error)
      }
    )

    function getWeatherClass(code){
      if(code >= 200 && code < 300){
        return 'thunderstorm';
      } else if(code >= 300 && code < 400){
        return 'drizzle';
      } else if(code >= 500 && code < 600){
        return 'rain';
      } else if(code >= 600 && code < 700){
        return 'snow';
      } else if(code >= 700 && code < 800){
        return 'atmosphere';
      } else if(code  === 800){
        return 'clear';
      } else if(code >= 801 && code < 900){
        return 'clouds';
      } else if(code >= 900 && code < 907){
        return 'extreme';
      } else if(code >= 907 && code < 1000){
        return 'additional';
      } else {
        return 'unknown';
      }
    }
  }

  render() {
    return (
      <div className="main-wrapper overlay">
        <div className="forecast-box">
          <h1 className="city-name">{this.state.city}</h1>
          <h2 className="country">{this.state.country}</h2>
          <h3
            className="temperature">
            {this.state.currentTemperature}
            &#176;{this.state.currentUnit}
            <span
              className="super-small"
              onClick={this.fetchWeather.bind(this, this.state.availableUnit)}>
              / {this.state.availableUnit}
            </span>
            </h3>
          <h2>{this.state.currentWeather}</h2>
        </div>
      </div>
    )
  }
}
