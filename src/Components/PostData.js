import React, { useState } from 'react'
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

    const {relativehumidity_2m, temperature_2m, cloudcover_mid, windspeed_120m} = hourly;


    //humidity
    const humids = relativehumidity_2m.map(item =>{
      return (
        <div>
          {item}%
        </div>
      )
    })

    //Temperature
    const temp = temperature_2m.map(item =>{
      return (
        <div>
          {item}°C
        </div>
      )
    })

    //Windspeed
    const wind = windspeed_120m.map(item =>{
      return (
        <div>
          {item}km/h
        </div>
      )
    })

    //CloudCover
    const cloud = cloudcover_mid.map(item =>{
      return (
        <div>
          {item}%
        </div>
      )
    })

    return(
      <div>
        <div className="container">
          <div className="col-md-9">
            <div className="row">
              <table className={"table table-success table-bordered"}>
                <tr style={{fontSize: "large"}}>
                  <th>Temperature</th>
                  <th>Wind Speed</th>
                  <th>Humidity</th>
                  <th>Cloud Cover</th>
                </tr>
                <tr style={{fontSize: "large"}}>
                  <td>{temp}</td>
                  <td>{wind}</td>
                  <td>{humids}</td>
                  <td>{cloud}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    )

    
  }

  // const weather_data = data

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

  const mystyle = {
    border: "2px solid blue",
    borderRadius: "5px",
    width: "30%"
  };

  const mybutton = {
    background: "grey",
    width: "10%",
    marginTop: "20px",
    borderRadius: "5px"
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input style={mystyle}
              type="number" 
              value={longitude} 
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <br/>
          <div>
            <input style={mystyle}
              type="number" 
              value={latitude} 
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
               
          <button type="submit" style={mybutton}>Weather</button>

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
