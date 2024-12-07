// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './index.css';
// function Home() {
//     const [data, setData] = useState({
//         celcius: 10,
//         name: 'London',
//         humidity: 10,
//         speed: 2,
//         image:'cloud.png'
//     })
//     useEffect (()=>{
//         const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=agra&appid=0c36b4a674ee17cb7644417b1deac3c9&&units=metric';
//         axios.get(apiUrl)
//             .then(res =>{
//                 console.log(res.data);
//                 setData({...data,celcius:res.data.main.temp, name:res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed })
//     })
//             .catch(err => console.log(err));  
//     },[])

//     const [name,setName]=useState('');
 
//     const handleClick =()=>{
//         if(name!==""){
//             const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=0c36b4a674ee17cb7644417b1deac3c9&&units=metric`;
//         axios.get(apiUrl)
//             .then(res =>{
//                 let imagePath='';
//                 if(res.data.whether[0].main == "clouds"){
//                     imagePath = "cloud.png"
//                 }
//                 else if(res.data.whether[0].main == 'clear'){
//                     imagePath='sun-26344_1280.png'
//                 }
//                 else if(res.data.whether[0].main == 'Rain'){
//                     imagePath='cloud-rain-sky-transparent-picture-12.png'
//                 }
//                 else if(res.data.whether[0].main == 'Drizzle'){
//                     imagePath='drizzle-weather-7096832-5753008.jpg'
//                 }
//                 else if(res.data.whether[0].main == 'Mist'){
//                     imagePath='Mist-Cloud-PNG-Clipart-Background-420x241.png'
//                 }else{
//                     imagePath='cloud.png'
//                 } 

//                 console.log(res.data);
//                 setData({...data,celcius:res.data.main.temp, name:res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed,image:imagePath})
//     })
//             .catch(err => console.log(err));
//         }
//     }

//     return (
//         <div className='container'>
//             <div className='whether'>
//                 <div className='search'>
//                     <input type='text' placeholder='Enter your Name' onChange={e=>setName(e.target.value)}/>
//                     <button><img src='search.png' onClick={handleClick} alt=""/></button>
//                 </div>
//                 <div className="winfo">
//                     <img src={data.image} alt="" />
//                     <h1 className="heading">{Math.round(data.celcius)}°c</h1>
//                     <h2 className="subheading">{data.name}</h2>
//                     <div className="details">
//                         <div className="col">
//                             <img src="/humidity.webp" />
//                             <div className="humidity">
//                                 <p>{Math.round(data.humidity)}</p>
//                                 <p>Humidity</p>
//                             </div>
//                             <div className="col">
//                                 <img src="/Images/wind.png" />
//                                 <div className="wind">
//                                     <p>{Math.round(data.speed)} km/h</p>
//                                     <p>Wind</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Home;