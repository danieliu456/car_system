import React, { Component } from 'react';
import '../Styles/Vehicles.css';
import {makeCarOrder} from '../_helpers/posts';

import { strings, setLanguage } from '../_helpers/localization';
import {LanguageContext} from "../LanguageContext";

class OrderCar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: false,
            carid: 1,
            destination: "",
            orderCar:true,
            carlist: [],
            freeCarsList:[],
            destinationCordinates:[],
            select:0,
            selectCarSet: 1,
        };
        //EVENT BINDINGS HERE
        this.handleChange = this.handleChange.bind(this)
        this.ordersubmit = this.ordersubmit.bind(this)

        this.getCarrList();
        this.getFreeCars();
    }

    componentDidMount = async () => {
        //STEPS BEFORE COMPONENT MOUNTS ITSELF
        
        
    }

    ordersubmit(event){
        const {carid, selectCarSet, select, freeCarsList} = this.state;
        let items = [];   
        for (let i = 1; i <= selectCarSet; i++) {             
             items.push(freeCarsList[i-1]);
             console.log(i);  
        }
        console.log('freeCarsList:', items); 
       // const array = freeCarsList[selectCarSet];
        event.preventDefault();

        switch(this.state.select) {
            case 0:
                this.orderCar(carid);
                console.log("choosed 1 car");
                break;
            case 1:
                console.log("number of cars" +selectCarSet);
                console.log("choosed set of cars", items);
                items.map(option => this.orderCar(option.car_id));
                break;
            default:
                console.log("Failed to choose in order submit" + this.state.select);
                break;
        }

        /*
        {
            select == 0 ? 
        (
            this.orderCar(carid),
            console.log("choosed 1 car")
        ) : select == 1 ? (
            console.log("number of cars" +selectCarSet),
            console.log("choosed set of cars", items),
            items.map(option => this.orderCar(option.car_id))
            
        ) : console.log("Failed to choose in order submit"+select)
        }
        */
         
        alert('Your order submited');
    }

    handleChange(event){
        const{value, name} = event.target;
        this.setState({
            [name] : value
        })
        console.log(this.state.select);
    }

    getFreeCars = _ => {
        fetch('http://localhost:4000/freecars')
        .then(response => response.json())
        .then(data => (this.setState({
            freeCarsList : data
        })))
        .catch(err => console.error("Failed to fetch carrlist: "+err))
        console.log("Fetched free Car LIST: ");
    }

    orderCar = (id) => {
        var string = this.props.mouseClick.toString();
        console.log("ORDERED CARSS ------->" + id);
        makeCarOrder(id,string);
    }

    getCarrList = _ => {
        fetch('http://localhost:4000/carlist')
        .then(response => response.json())
        .then(data =>(this.setState({
            carlist : data
        })))
        .catch(err => console.error("Failed to fetch carrlist: "+err))
        console.log("Fetched Car LIST: ");
    }
    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE

    render() {
        
        return (
            <div>
                <Order
                mouseClick={this.props.mouseClick}
                handleChange={this.handleChange}
                data={this.state}
                ordersubmit={this.ordersubmit}
                carlist ={this.state.carlist}
                freeCarsList= {this.state.freeCarsList}
                destinationCordinates={this.state.destinationCordinates}
                handleCloseClick={this.props.handleCloseClick}/>
            </div>
        );
    }
}

export default OrderCar;

class Order extends Component {
    
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        return(
            
            <form className="ordercar" onSubmit={this.props.ordersubmit}>
                    <div className='x' onClick={() => this.props.handleCloseClick('showCarOrder')}>X</div>
                    <div className="header">
                        {strings.carorder}
                    </div>
                    <div align="left">

                        <Purpose
                        handleChange={this.props.handleChange}
                        select={this.props.data.select}/>

                        {
                            this.props.data.select == 0 ?

                            <ChooseVID
                            handleChange={this.props.handleChange}
                            carid={this.props.data.carid}
                            carlist={this.props.carlist}/>

                            : this.props.data.select == 1 ?

                            <ChooseSET
                            handleChange={this.props.handleChange}
                            selectCarSet={this.props.selectCarSet}
                            freeCarsList={this.props.freeCarsList}/>

                            : <div></div>
                        }

                        <label>{strings.choosedestination}</label><br/>
                        <input 
                        className="input"
                        type="text"
                        placeholder="Destination"
                        value={this.props.mouseClick}
                        onChange={this.props.handleChange}
                        name="destination"/>
                    </div>
                        
                        <button className="submitbutton">{strings.submit}</button>

            </form>
        );
    }

}

function GenerateOption(props){
    return <option value={props.id}>{props.id}</option>
}

class Purpose extends Component{
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        return (
            <div>
            <label>{strings.purpose}</label>
            <select 
            className="select"
            value={this.props.select}
            name="select"
            onChange={this.props.handleChange}>
            <option value="0">{strings.single}</option>
            <option value="1">{strings.set}</option>
            </select> <br/>
            </div>
            );
    }
}


class ChooseVID extends Component {
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        const optionComponents = this.props.carlist.map(option => <GenerateOption key={option.car_id} id={option.car_id}/>)
        return (
            <div>
                <label>{strings.choosevehicleid}</label><br/>
                        <select className="select"
                        value={this.props.carid}
                        name="carid" 
                        onChange={this.props.handleChange}>
                        
                        {optionComponents}
                        </select> <br/>
            </div>
        )
    }
}

class ChooseSET extends Component {
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        const optionComponents = <GenerateSets freeCarsList={this.props.freeCarsList}/>
        return(
        <div>
                <label>{strings.chooseset}</label><br/>
                        <select className="select"
                        value={this.props.selectCarSet}
                        name="selectCarSet" 
                        onChange={this.props.handleChange}>
                        {optionComponents}
                        
                        </select> <br/>
        </div>
        )}
}
function GenerateSets(props){
        let items = [];   
        for (let i = 1; i <= props.freeCarsList.length; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
        }
        return items; 
}

