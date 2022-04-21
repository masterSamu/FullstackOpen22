import React from 'react'

export default function Weather({capitalCity, weather}) {
    console.log(weather)
    const temperature = weather?.main.temp;
    const icon = weather?.weather[0].icon;
    const description = weather?.weather[0].description;
    const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
    const wind = weather?.wind.speed;
    console.log(temperature)

  return (
    <div>
        <h2>Weather in {capitalCity}</h2>
        <p>Temperature: {temperature} Celcius</p>
        <img src={iconURL} alt={`${description} icon`} />
        <p>Wind {wind} m/s</p>
    </div>
  )
}
