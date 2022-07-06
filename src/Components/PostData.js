import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PostData = () => {
  const baseURL = 'https://api.open-meteo.com/v1/forecast'
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [data, setData] = useState('');

  let url = new URL(`${baseURL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,cloudcover_mid,windspeed_120m`)


  async function fetchData(){
    const response = await axios.get(url)
    console.log(response.data)
    setData(response.data)  
    
  }

  if (!data) {
    console.log("no data")
  }
  else{
    const {hourly} = data;

    console.log(data)

    const {relativehumidity_2m, temperature_2m, cloudcover_mid, windspeed_120m,time} = hourly;

    // all gives string type; access directly e.g {temp_unit}
    const temp_unit = hourly.temperature_2m
    const windspeed_unit = hourly.windspeed_120m
    const cloudcover_unit= hourly.cloudcover_mid
    const humidity_unit = hourly.relativehumidity_2m
    const time_unit = hourly.time

    //humidity
    const humids = relativehumidity_2m.map(item =>{
      return (
        <div>
          <h5> Humidity-{item}</h5>
        </div>
      )
    })

    //Temperature
    const temp = temperature_2m.map(item =>{
      return (
        <div>
          <h5> Temperature-{item}</h5>
        </div>
      )
    })

    //Windspeed
    const wind = windspeed_120m.map(item =>{
      return (
        <div>
          <h5> Wind speed-{item}</h5>
        </div>
      )
    })

    //CloudCover
    const cloud = cloudcover_mid.map(item =>{
      return (
        <div>
          <h5> Cloud cover-{item}</h5>
        </div>
      )
    })

    return(
      <div>
        {temp}
        {wind}
        {humids}
        {cloud}
      </div>
    )

    
  }

  const weather_data = data

  //handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(longitude, latitude);
    fetchData()
    // navigate('/weatherforecast')
  };


  //POST with axios
  const addPosts = async (longitude, latitude) => {
    try {

      let response = await fetch(url);
      setData(response.data);
      setLongitude('');
      setLatitude('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="number" 
              value={longitude} 
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <br/>
          <div>
            <input 
              type="number" 
              value={latitude} 
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
               
          <button type="submit">Add Area</button>

        </form>


        {/* <div>
          {Object.entries(weather_data).map(([key, value], i) => (
            <h2 key={i}>
              {key} : {value}
            </h2>
          ))}
        </div>  */}

        <div>
          
        </div>
      

      </div>
      
    </div>
  )
}

export default PostData
