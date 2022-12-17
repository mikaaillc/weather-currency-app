import { format } from "date-fns";
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [saat,setSaat] = useState();
    const [sicaklik,setSicaklik] = useState();
    const [sehir,setSehir] = useState();
    const [hava,setHava] = useState();


  const MINUTE_MS = 1000;
    let i = 0;
  useEffect(() => {
    const interval = setInterval(() => {
        i=new Date();
        var formattedDate = format(i, "MMMM do, yyyy H:mm:s a");
        var config = {
            method: 'get',
            url: 'https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=ankara',
            headers: {
                'content-type': 'application/json',
                'authorization': 'apikey 5w8MvlXiPcCL1epdg7AGMX:39hAxQoAEUHDlK3UxT27E5'
            }
        };
        axios(config)
            .then(function (response) {
                setSicaklik(response.data.result[0].degree.toString()+ ' °')
                setHava(response.data.result[0].icon)
                setSehir(response.data.city)
            })
            .catch(function (error) {
                console.log(error);
            });

        setSaat(formattedDate)
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
        >   {saat}
            <br/>
            {sicaklik.toString()+ ' '}
            <img src={hava}  style={{width:"50px",height:"50px" }} alt="logo" />
            {' '+ sehir.toString()+ ' '}
        </a>
      </header>
    </div>
  );
}

export default App;
