import React, {Component} from 'react';
import '../Styles/Vehicles.css'
import Louder from '../_components/Louder';
import {makeCarOrder} from '../_helpers/posts';

import { strings, setLanguage } from '../_helpers/localization';
import {LanguageContext} from "../LanguageContext";

class CarsInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            position:[],
            destination:"",
            loader:false
        }

        this.handleChange=this.handleChange.bind(this);
    }

    componentDidMount = async () => {
        this.getCarInfo();
    }
    //
    getCarInfo = () => {
        this.setState({loader:true});
        fetch(`http://localhost:4000/carinfo?car_id=${this.props.id}`)
        .then(response => response.json())
        .then(data =>(this.setState({
            data : data,
            position : data[0].gps_location
        })))
        .catch(err => console.error("Failed to fetch carrlist: "+err))
        console.log("Fetched Car info: ");
        this.setState({loader:false});
    }

    handleChange(event) {
        const{value, name} = event.target;
        this.setState({
            [name] : value
        })
        console.log(this.state.select);
    }
    handleSubmit = (event) => {
        event.preventDefault()
        console.log("ORDERED CARSS ------->" + this.props.id);
        var string = this.props.mouseClick.toString();
        makeCarOrder(this.props.id,string);
        alert('Submited' + this.props.id);
    }
    
    static contextType = LanguageContext
    render() {
        setLanguage(this.context)
        const genInfo = this.state.data.map(option =>
        <Generate
        key={this.props.id}
        model={option.model} 
        fuelPercent={option.fuelPercent} 
        passengersInside={option.passengersInside} 
        isReserved={option.isReserved}/> )
        console.log(this.state.position)
        console.log("x   " + this.state.position.x +"   y   " + this.state.position.y );
        console.log("propsai" )
        console.log(this.props.mouseClick)
        const string =`${this.state.position.x},${this.state.position.y}`;
        
        const window =
            <div>
                {genInfo}
        
                {/*<label>Cords: {string}</label>*/}
                <label>{strings.destination}</label>
                <br/>
                <input 
                    className="input"
                    type="text"
                    placeholder="Destination"
                    value={this.props.mouseClick}
                    onChange={this.handleChange}
                    name="destination"/>
        
        
                <button className="submitbutton" >{strings.order}</button>
            </div>

        return(
            <div>
            <form className="CarsInfo" onSubmit={this.handleSubmit}>
                <div className='x' onClick={this.props.handleXClick}>X</div>
                <label>{strings.id} {this.props.id}</label>
                <br/>
                
            
                {this.state.loader ? 
                    <div className="CenterLouder"><Louder/></div> :  window}
                </form>
            </div>
        );
    }
}
export default CarsInfo;


class Generate extends Component {
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
    return (
            <div>
                <label> {this.props.model}</label>
                <br/>
                <label>{strings.fuel} {this.props.fuelPercent}</label>
                <br/>
                <label>{strings.passengers} {this.props.passengersInside}</label>
                <br/>
                <label>{strings.reserved} {this.props.isReserved}</label>
            </div>
    )
    }
}