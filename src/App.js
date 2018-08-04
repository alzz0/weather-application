import React from "react";
import Title from "./components/Title"
import Form from "./components/Form"
import Weather from "./components/Weather"

const API_KEY="cbd47b4de98d8387c7829b2fe685adb7"



class App extends React.Component{
    state={
        tempature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:undefined
    }
    
    
    getWeather= async (e)=>{
        e.preventDefault()
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    const api_call= await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
    const data = await api_call.json()
    
   if(city && country){
          this.setState({
        tempature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:""
    })
       
   }else{
       this.setState({
        tempature:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error:"Please enter City & Country"
   })
 
}
    }
    
    render(){
        return(
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-5 title-container">
                                <Title />
                                </div>
                                <div className="col-sm-7 form-container">
                                        <Form getWeather={this.getWeather}/>
                                        <Weather 
                                        tempature={this.state.tempature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}    
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
        
            
        
        
        )
    }
}

export default App
