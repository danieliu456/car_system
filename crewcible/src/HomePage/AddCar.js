import React, { Component } from 'react';
import './App.css';
import {updateSim} from '../_helpers/posts'
import { LanguageContext } from '../LanguageContext';
import { setLanguage, strings } from '../_helpers/localization';
import { strict } from 'assert';
import { stringify } from 'querystring';

class EmptyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: false,
                location:"",
                model:"",
                plateNumber:"",
                seats:"4",
                fuelCapacity:"80",
                avgfuel:"8",
                id: "default",
                driverid: "null",
                select: 0,
                numberOfCars:1,
                maxId:""
        };
        //EVENT BINDINGS HERE
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(event){
        const{value, name} = event.target;
        this.setState({
            [name] : value
        })
    }

    addsubmit = (event) => {
        event.preventDefault();
        const {seats,plateNumber,model,fuelCapacity,avgfuel}= this.state;
        alert('Your car added');
        console.log("Car addition submited");
        // switch broken :()
        /*switch(this.state.select) {
            case 0:
                this.addCar(seats,plateNumber,model,fuelCapacity,avgfuel,1);
                setTimeout(() =>{
                    console.log("20 Sec");
                    updateSim();
                }, 20 * 1000);
                console.log("choosed 1 car");
                break;
            case 1:
                console.log("number of cars" );
                console.log("choosed set of cars");
                this.createCars();
                setTimeout(() =>{
                    console.log("20 Sec");
                    updateSim();
                }, 20 * 1000);
                break;
            default:
                console.log("Failed to choose in order submit"+ this.state.select);
        }*/
        
        {
            this.state.select == 0 ? 
            (
                this.addCar(seats,plateNumber,model,fuelCapacity,avgfuel,1),
                setTimeout(() =>{
                    console.log("20 Sec");
                    updateSim();
                 }, 20 * 1000),
                console.log("choosed 1 car")
            ) : this.state.select == 1 ? (
                console.log("number of cars" ),
                console.log("choosed set of cars"),
               // items.map(option => this.orderCar(option.car_id))
                this.createCars(),
                setTimeout(() =>{
                    console.log("20 Sec");
                    updateSim();
                 }, 20 * 1000)
            ) : console.log("Failed to choose in order submit"+select)
        }
        
    }


    createCars = _ => {
        const {numberOfCars,seats,fuelCapacity,avgfuel} = this.state
        console.log(numberOfCars);
        
        this.addCar(seats,'SimLA','ZXCrew',fuelCapacity,avgfuel,numberOfCars);
        console.log("Creating" + numberOfCars);
    }


    addCar = (seats,plateNumber,model,fuelCapacity,avgfuel,number) => {
        fetch(`http://localhost:4000/carlist/add?id=${this.state.id}&driver_id=${this.state.driverid}&seats=${seats}&plate=${plateNumber}&model=${model}&fuel=${fuelCapacity}&avgfuel=${avgfuel}&locationx=${this.props.mouseClick[0]}&locationy=${this.props.mouseClick[1]}&number=${number}`)
        .then(console.log("done"))
        .catch(err => console.error("Failed to add car: "+err));
       
    }

    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE

    static contextType = LanguageContext
    render() {
        setLanguage(this.context)
        return (
            <div>
                <AddCar 
                handleChange={this.handleChange} 
                data={this.state}
                addsubmit={this.addsubmit}
                select={this.state.select}
                mouseClick={this.props.mouseClick}
                handleCloseClick={this.props.handleCloseClick}/>
            </div>
        );
    }
}

export default EmptyComponent;

class AddCar extends Component {
    
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        return(
            <form className="addcar" onSubmit={this.props.addsubmit}>
                <div className='x' onClick={() => this.props.handleCloseClick('showAddCar')}>X</div>
                <div className="header">
                    {strings.addcar}
                </div>
                <Purpose
                        handleChange={this.props.handleChange}
                        select={this.props.select}/>
                {
                            this.props.data.select == 0 ?

                            <AddOneCarBody
                            handleChange={this.props.handleChange}
                            data={this.props.data}
                            addsubmit={this.addsubmit}
                            mouseClick={this.props.mouseClick}/>

                            : this.props.data.select == 1 ?

                            <AddSetOfCarsBody
                            number={this.props.data.numberOfCars}
                            handleChange={this.props.handleChange}
                            mouseClick={this.props.mouseClick}/>

                            : <div></div>
                        }
                <button className="submitbutton" >{strings.submit}</button>

            </form>
        );
    }
}

class AddOneCarBody extends Component {
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        return(
            <div align="left">
                        <label>{strings.carmodel}</label><br/>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Model"
                        value={this.props.data.model}
                        onChange={this.props.handleChange}
                        name="model"/>
                    <br/>
                        <label>{strings.carstartlocation}</label>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Location"
                        value={this.props.mouseClick}
                        onChange={this.props.handleChange}
                        name="location"/>
                    <br/>
                    <label>{strings.carplatenum}</label>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Plate Number"
                        value={this.props.data.plateNumber}
                        onChange={this.props.handleChange}
                        name="plateNumber"/>
                    <br/>
                    <label>{strings.carseats}</label>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Seats"
                        value={this.props.data.seats}
                        onChange={this.props.handleChange}
                        name="seats"/>
                    <br/>
                    <label>{strings.carfuelcapacity}</label>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Fuel Capacity"
                        value={this.props.data.fuelCapacity}
                        onChange={this.props.handleChange}
                        name="fuelCapacity"/>
                    <br/>
                    <label>{strings.caravgfuel}</label>
                        <input 
                        className="input"
                        type="text"
                        placeholder="AVG fuel/h"
                        value={this.props.data.avgfuel}
                        onChange={this.props.handleChange}
                        name="avgfuel"/>
                    <br/>
                    
                </div>
                
        )
    }
        
}

class AddSetOfCarsBody extends Component{
    render(){
        return(
            <div>
                 <label>Cars number:</label><br/>
                        <input 
                        className="input"
                        type="text"
                        placeholder="numberOfCars"
                        value={this.props.numberOfCars}
                        onChange={this.props.handleChange}
                        name="numberOfCars"/>
                        <br/>
                        <label>{strings.numberOfCars}</label>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Start Location"
                        value={this.props.mouseClick}
                        name="startlocation"/>
                    <br/>
            </div>)
    }
}

class Purpose extends Component{
    render(){
        return (
            <div>
            <label>{strings.chooseselection}</label>
            <select 
            className="select"
            value={this.props.select}
            name="select"
            onChange={this.props.handleChange}>
            <option value="0">Create custom car</option>
            <option value="1">Create set of cars</option>
            </select> <br/>
            </div>
            );
    }
}
