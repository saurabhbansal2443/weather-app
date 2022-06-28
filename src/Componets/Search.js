import { Component } from "react";
import axios from "axios";


class Search extends Component{
    constructor(){
        super();

        this.state={
            place:"",
            state:"",
            country:"",
            temp:"",
            time:"",
            humi:"",
            weather:"",
            icon:"",
        }
        

    }
    async componentDidMount(){
        let res=await axios.get("http://api.weatherapi.com/v1/current.json?key=377ea6b428f3405ca5a100638222506&q=rajasthan&aqi=no")
        console.log(res.data);
        this.setState({
            state:res.data.location.name,
            country:res.data.location.country,
            temp:res.data.current.temp_c,
            time:res.data.location.localtime,
            humi:res.data.current.humidity,
            weather:res.data.current.condition.text,
            icon:res.data.current.condition.icon,

        })
    }

    cityMangaer=(e)=>{
       

        if(e.key=="Enter"){
            this.handleSearch();
        }
        this.setState({
            place:e.target.value,

        })
    }
  waetherAPI= async ()=>{
        let res=await axios.get(`http://api.weatherapi.com/v1/current.json?key=377ea6b428f3405ca5a100638222506&q=${this.state.place}&aqi=no`)
        console.log(res.data);
        this.setState({
            state:res.data.location.name,
            country:res.data.location.country,
            temp:res.data.current.temp_c,
            time:res.data.location.localtime,
            humi:res.data.current.humidity,
            weather:res.data.current.condition.text,
            icon:res.data.current.condition.icon,

        })
    }
    handleSearch=()=>{
         
       this.waetherAPI()
       this.setState({
        place:""
       })
    }
    keyDown=(e)=>{
        if(e.key=="Enter"){
            this.handleSearch();
        }
    }
    render(){
       
        return(
           <div className="all">
           <div className="Inputs">
            <input placeholder="Search your city" className="searchBar" value={this.state.place} onChange={this.cityMangaer}  onKeyDown={this.keyDown}></input>
            <button  onClick={this.handleSearch} className="search-button">Search</button>
            </div>


            <div className="Main-container">
               <div className="place-time">
               <div className="state">
                <div className="place">{`${this.state.state}`}</div>
                <div className="country">{`${this.state.country}`}</div>
                </div>
                <div className="time">{`${this.state.time} `}</div>
                </div>
                <div className="logo">
                <div className="icon-weather">
                <img className="icon" src={this.state.icon} alt="logo"></img>
                <div className="waether">{`${this.state.weather} `}</div> 
                </div>
                </div>
                
                <div className="temprature-humidity">
                <div className="temprature">{`${this.state.temp} °C`}</div>
               
                 <div className="humidity">{`Humidity-${this.state.humi} %`}</div> 

              
             
                
                </div>
                
            </div>

            

           </div>
        )
    }
}

export default Search