import React, { Component } from 'react';
import '../Styles/Vehicles.css';
import '../_components/Louder'
import Louder from '../_components/Louder';

import { strings, setLanguage } from '../_helpers/localization';
import {LanguageContext} from "../LanguageContext";

class Vehicles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: false,
            //------------Lists
                carlist: [],
                carStatusList: [],
                freeCarsList: [],
                reservedCarsList: [],
            //------------for queries
                id: "default",
                driverid: "null",
            // ------------ for windows
                tableid : 1,
            //------------for pop up components
                addCar: false,
                orderCar:true,
            //-------------- query
                query: "",
                queryData: [],
            //--------------Loading
                fetchloading:true,
            //--------------Sorting
                sortorder:true,
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this);
        this.querySubmit = this.querySubmit.bind(this);
        this.sortTable = this.sortTable.bind(this);
        //EVENT BINDINGS HERE
        this.getCarrList();
    }

    componentDidMount = async () => {
        //STEPS BEFORE COMPONENT MOUNTS ITSELF
        
    }
//----------------------------------------------------------Handle changes
    handleChange(event){
        const{value, name} = event.target;
        this.setState({
            [name] : value
        })
    }

    handleTableChange(id){
        this.setState({
            tableid:id
        })
        switch(id) {
            case 1:
                this.getCarrList();
                break;
            case 2:
                this.getReservedCars();
                break;
            case 3:
                this.getFreeCars();
                break;
            case 4:
                this.getCarStatus();
                break;
            case 5:
                //this.getCarOrders();
                break;
            case 6:
                console.log("Your query");
                break;
            default:
                console.log(id);
              // code block
          }
    }
//----------------------------------------------------------Get Data
    getCarrList = async _ => {
        this.setState({fetchloading:true})
        console.log("LOADING STATE --->"+ this.state.fetchloading)
        fetch('http://localhost:4000/carlist')
        .then(response => response.json())
        .then(data =>(this.setState({
            fetchloading: false,
            carlist : data,
        })))
        .catch(err => console.error("Failed to fetch carrlist: "+err))
        console.log("Fetched Car LIST: ");
        console.log("LOADING STATE --->"+ this.state.fetchloading)
    }

    getCarStatus = async _ => {
        this.setState({fetchloading:true})
        console.log("LOADING STATE --->"+ this.state.fetchloading)
        fetch('http://localhost:4000/carstatus')
        .then(response => response.json())
        .then(data => (this.setState({
            fetchloading: false,
            carStatusList : data,
        })))
        .catch(err => console.error("Failed to fetch getCarStatus: "+err))
        console.log("Fetched car status list");
        console.log("LOADING STATE --->"+ this.state.fetchloading)
    }

    getFreeCars = async _ => {
        this.setState({fetchloading:true})
        console.log("LOADING STATE --->"+ this.state.fetchloading)
        fetch('http://localhost:4000/freecars')
        .then(response => response.json())
        .then(data => (this.setState({
            fetchloading: false,
            freeCarsList : data,
        })))
        .catch(err => console.error("Failed to fetch getFreeCars: "+err))
        console.log("LOADING STATE --->"+ this.state.fetchloading)
    }

    getReservedCars = async _ => {
        this.setState({fetchloading:true})
        console.log("LOADING STATE --->"+ this.state.fetchloading)
        fetch('http://localhost:4000/reservedcars')
        .then(response => response.json())
        .then(data => (this.setState({
            fetchloading: false,
            reservedCarsList : data,
        })))
        .catch(err => console.error("Failed to fetch getReservedCars: "+err))
        console.log("LOADING STATE --->"+ this.state.fetchloading)
    }

    sortTable(key,list) {
        console.log("KEYY ==" +key + "LIST===" + list )
        this.state.sortorder ?
        this.setState({
            [list] : this.state[list].sort((a,b) => {
                return parseFloat(a[key]) - parseFloat(b[key])
            })
        })
        :
        this.setState({
            [list] : this.state[list].sort((a,b)  => {
                return parseFloat(b[key]) - parseFloat(a[key])
            })
        })

        this.setState({
            sortorder : !this.state.sortorder
        })
    }
//------------------------------------------ Buttons for submit

    querySubmit(event){
        event.preventDefault();
        console.log("send");
        this.makeQuery();
    }
 //------------------------------------------ Insert queries  

    makeQuery = async _ => {
        this.setState({fetchloading:true})
        console.log("LOADING STATE --->"+ this.state.fetchloading)
        fetch(`http://localhost:4000/query?query=${this.state.query}`)
        .then(response => response.json())
        .then(data => (this.setState({
            queryData : data,
            fetchloading: false
            })))
        .catch(err => console.error("failed to make Query" + err));
        console.log("Query successfull");
        console.log("LOADING STATE --->"+ this.state.fetchloading)
    }
 
    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE

    render() {
        const window = 
        (this.state.tableid === 1 ? (

            <CarList
            getCarrList={this.getCarrList}
            carlist={this.state.carlist}
            sortTable={this.sortTable}/>
        ) : this.state.tableid === 2 ? (

            <ReservedCars
            getReservedCars={this.getReservedCars}
            reservedCarsList={this.state.reservedCarsList}
            sortTable={this.sortTable}/>
        ) : this.state.tableid === 3 ? (

            <FreeCars
            getFreeCars={this.getFreeCars}
            freeCarsList={this.state.freeCarsList}
            sortTable={this.sortTable}/>
        ) : this.state.tableid === 4 ? (

            <CarStatus
            getCarStatus={this.getCarStatus}
            carStatusList={this.state.carStatusList}
            sortTable={this.sortTable}/>
        ) : this.state.tableid === 5 ? (

            <CarOrders/>
        ) : this.state.tableid === 6 ? (

            <YourQuery
            query={this.state.query}
            handleChange={this.handleChange}
            querySubmit={this.querySubmit}
            queryData = {this.state.queryData}/>
        ) : <div/> )

        return (
            <div>
                <Navbar handleTableChange= {this.handleTableChange}/>

                {this.state.fetchloading ? 
                <div className="CenterLouder"><Louder/></div> :  window}
                
            </div>
            
        );
    }
}

export default Vehicles;


function GenerateOption(props){
    console.log("bandom ",props.id)
    return <option value={props.id}>{props.id}</option>
}

class CarList extends Component {

 
    render() {
        
        const listComponents =  this.props.carlist.map(data => 
        <GenerateCarList 
        key={data.car_id}
        id={data.car_id}
        seats={data.number_of_seats}
        category={data.car_category}
        plate={data.plate_number}
        model={data.model}
        fuel = {data.fuel_capacity}
        //fuelh= {data.avg_fuel_per_hour}
        />)

        return(
            <table id="t01">
            <tbody>
            <tr>
                    <th>Car id</th>
                    <th>Model</th>
                    <th onClick={() => this.props.sortTable('number_of_seats','carlist')}>Seats Number</th>
                    <th>Category</th>
                    <th>Plate Number</th>
                    <th onClick={() => this.props.sortTable('fuel_capacity','carlist')}>Fuel Capacity</th>
                    {//<th>AVG f/h</th>
                    }
                </tr>
                {listComponents}
            </tbody>
            </table> 
        )
    }
}

function GenerateCarList(props){
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.model}</td>
            <td>{props.seats}</td>
            <td>{props.category}</td>
            <td>{props.plate}</td>
            <td>{props.fuel}</td>
           {/* <td>{props.fuelh}</td>*/}
        </tr>
    )
}

class Navbar extends Component {

    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        return(
            <div className="VehNav">
                <button onClick={() => this.props.handleTableChange(1)}>{strings.cars}</button>
                <button onClick={() => this.props.handleTableChange(2)}>{strings.orderedcars}</button>
                <button onClick={() => this.props.handleTableChange(3)}>{strings.freecars}</button>
                <button onClick={() => this.props.handleTableChange(4)}>{strings.carstatus}</button>
                <button onClick={() => this.props.handleTableChange(5)}>{strings.carorders}</button>
                <button onClick={() => this.props.handleTableChange(6)}>{strings.yourquery}</button>
            </div>  

        );
    }
}

class ReservedCars extends Component {

    render(){
        const listComponents = this.props.reservedCarsList.map(data => 
        <GenerateReservedCarList 
        key = {data.car_id} 
        id= {data.car_id}
        platenumber = {data.plate_number}
        model = {data.model} 
        fuel = {data.fuelPercent} 
        velocity={data.velocity}/> )
        return (
            <table id="t01">
            <tbody>
            <tr>
                    <th>ID</th>
                    <th>Plate Number</th>
                    <th>Model</th>
                    <th onClick={() => this.props.sortTable('fuelPercent','reservedCarsList')}>Fuel Percent </th>
                    <th onClick={() => this.props.sortTable('velocity','reservedCarsList')}>Velocity</th>
                </tr>
                {listComponents}
            </tbody>
            </table> 
        );
    }
}

function GenerateReservedCarList(props) {
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.platenumber}</td>
            <td>{props.model}</td>
            <td>{props.fuel}</td>
            <td>{props.velocity}</td>
        </tr>
    )
    
}

class FreeCars extends Component {
 
    render(){
        const listComponents = this.props.freeCarsList.map(data => 
            <GenerateFreeCarsList
            key = {data.car_id} 
            id  = {data.car_id}
            platenumber = {data.plate_number}
            model = {data.model} 
            fuel = {data.fuelPercent} 
            velocity={data.velocity}/> )
        return (
            <table id="t01">
            <tbody>
            <tr>
                    <th>ID</th>
                    <th>Plate Number</th>
                    <th>Model</th>
                    <th onClick={() => this.props.sortTable('fuelPercent','freeCarsList')}>Fuel Percent</th>
                    <th onClick={() => this.props.sortTable('velocity','freeCarsList')}> Velocity</th>
                </tr>
                {listComponents}
            </tbody>
            </table> 
        );
    }
}

function GenerateFreeCarsList(props) {
    //console.log(key + fuel + velocity);
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.platenumber}</td>
            <td>{props.model}</td>
            <td>{props.fuel}</td>
            <td>{props.velocity}</td>
        </tr>
    )
}

class CarStatus extends Component {

    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        const listComponents = this.props.carStatusList.map(data =>
            <GenerateCarStatusList
            key = {data.car_id}
            id  = {data.car_id}
            locationx = {data.gps_location.x}
            locationy = {data.gps_location.y}
            //locationy={data.gps_location.y}
            time ={data.input_date}
            fuel ={data.fuelPercent}
            passengers = {data.passengersInside}
            velocity ={data.velocity}
            reserved ={data.isReserved}/>)
        return (
            <table id="t01">
            <tbody>
            <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Input Date</th>
                    <th onClick={() => this.props.sortTable('fuelPercent','carStatusList')}>Fuel Percent</th>
                    <th onClick={() => this.props.sortTable('passengersInside','carStatusList')}>Passengers</th>
                    <th onClick={() => this.props.sortTable('velocity','carStatusList')}>Velocity</th>
                    <th>Reserved or Not</th>
                </tr>
                {listComponents}
            </tbody>
            </table> 
        );
    }
}

function GenerateCarStatusList(props){
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.locationx+',' + props.locationy}</td>
            <td>{props.time}</td>
            <td>{props.fuel}</td>
            <td>{props.passengers}</td>
            <td>{props.velocity}</td>
            <td>{props.reserved}</td>
        </tr>
    )
}

class CarOrders extends Component {
    static contextType = LanguageContext
    render(){
        setLanguage(this.context)
        return (
            <div>
                <h1>{strings.inprogress}</h1>
            </div>
        );
    }
}

class YourQuery extends Component {
    static contextType = LanguageContext
    render (){
        setLanguage(this.context)
        return (
            <div>
            <form className="query" onSubmit={this.props.querySubmit}>
                <label>{strings.yourownquery}</label><br/>
                <input 
                        className="input"
                        type="text"
                        placeholder="Query"
                        value={this.props.query}
                        onChange={this.props.handleChange}
                        name="query"/>
                        
            </form>
            <div>
            <RenderQuery data = {this.props.queryData}/>
            </div>
            </div>
        )
    }
}
function RenderQuery(props){
        let check = true;
        let result=props.data;
        let temporarykeys = [];
        let temporary = [];
       
        for(let i of result){
            if(check) {
                temporarykeys = Object.keys(i);
                temporary.push(Object.keys(i).map(key => i[key]));
                check = false;
            } else {
                temporary.push(Object.keys(i).map(key => i[key]));
            }  
        }
        

         return(
            <table id="t01">
            <tbody>
            <tr>
                    {temporarykeys.map(keys => <th key={keys}>{keys}</th>)}
            </tr>
                    {temporary.map(rows => <MakeTable key={rows} data={rows}/>)}
            </tbody>
            </table> 
         )
     
}

function MakeTable(props) {
    let i=0;
    console.log("LEEEEEENGTH_________"+props.length);
    return (
        <tr>
            {props.data.map(element => <td key={i++}>{JSON.stringify(element)}</td>)}
            {props.data.map(element => console.log(JSON.stringify(element)))}
        </tr> 
    )
}