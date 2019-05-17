import React, { Component } from 'react';
import './App.css';
import testData from "../Data/TestData";
import CarModel from "../Data/CarModel"
import '../Styles/Vehicles.css'



class Learning extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading:true,
            currentWindow: false,
            
        };
        //EVENT BINDINGS HERE
    }

    componentDidMount = async () => {

    }
    
    

    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE


    render() {
        return (
            
            <div>
                
            </div>


        )
         
        
    }
}

export default Learning;


//---------------------------------------------------------------------------------------------------------
/*
car_id: "4",
        seatsNumer: "4",
        model: "Volvo"
*/
class FormPractice extends Component{
    constructor(props){
        super(props)
        this.state = {
            fName: "",
            lName: "",
            age: "",
            gender: "",
            destination: "",
                isVegan: false,
                isNotVegan: false,
                isLactoseFree:false
            
        }

        this.handleChange = this.handleChange.bind(this)
    }

   

    render(){

        return(
            <form>
                <input 
                type="text" 
                placeholder="Name" 
                value={this.state.fName} 
                name="fName"
                onChange={this.handleChange}/>

                <br/>

                <input 
                type="text" 
                placeholder="Last Name" 
                value={this.state.lName} 
                onChange={this.handleChange}
                name="lName"/>

                <br/>

                <input 
                type="text" 
                placeholder="Age" 
                value={this.state.age} 
                onChange={this.handleChange}
                name="age"/>

                <br/>
                
                <label>
                    <input 
                    type="radio"
                    value="male"
                    onChange={this.handleChange}
                    checked={this.state.gender==="male"}
                    name="gender"/>
                </label>

                <br/>
                
                <label>
                    <input 
                    type="radio"
                    value="female"
                    onChange={this.handleChange}
                    name="gender"
                    checked={this.state.gender==="female"}/>
                    
                </label>

                <label>select 
                    <select  value={this.state.destination} name="destination" onChange={this.handleChange}>
                    <option value="Didlaukis">Didlaukis</option>
                    <option value="Krl">Koralai</option>
                    <option value="Lzd">Lzd</option>
                    </select>
                </label>
                <br/>
                <label>
                    <input 
                    type="checkbox"
                    name = "isVegan"
                    checked={this.state.isVegan}
                    onChange={this.handleChange}/> Vegan ?
                </label> 
                <br/>
                <label>
                    <input 
                    type="checkbox"
                    name = "isNotVegan"
                    checked={this.state.isNotVegan}
                    onChange={this.handleChange}/> notVegan ?
                </label> 
                <br/>
                <label>
                    <input 
                    type="checkbox"
                    name = "isLactoseFree"
                    checked={this.state.isLactoseFree}
                    onChange={this.handleChange}/> Lactose ?
                </label> 

                <h1>Name: {this.state.fName} Last name: {this.state.lName} Age : {this.state.age} you gender is : {this.state.gender} select : {this.state.destination}</h1>
                <h2><p>Vegan:{this.state.isVegan ? "yes" : "no"}</p>
                <p>isLactoseFree:{this.state.isLactoseFree ? "yes" : "no"}</p>
               <p> isNotVegan:{this.state.isNotVegan ? "yes" : "no"}</p></h2>
            </form>
        )
    }
}

class Forms extends Component {
    constructor(props){
        super(props)
        this.state = {
            check : true,
            firstName : "",
            lastName : "",
            gender: "",
            favColor: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {

    }
    handleChange(event) {
        const {name, value,type,checked} = event.target
        type === "checkbox" ? this.setState ({[name]: checked})  :  this.setState({[name] : value})
    }

    render() {
        return (
            <form>
                <input 
                type="text" 
                value={this.state.firstName} 
                name="firstName" 
                placeholder = "First Name" 
                onChange={this.handleChange}/>

                <br />

                <input 
                type="text" 
                value={this.state.lastName} 
                name="lastName" 
                placeholder = "LastName" 
                onChange={this.handleChange}/>
                
                <br/>
                <textarea value="default value" name="" id="" cols="30" rows="10"></textarea>

                <br/>

                <input 
                type="checkbox" 
                name="check"
                checked = {this.state.check}
                onChange = {this.handleChange}
                />

                <br/>
                <label>
                <input 
                type="radio" 
                name="gender"
                value="male"
                checked = {this.state.gender === "male"}
                onChange = {this.handleChange}
                />
                Male
                </label>
                
                <label >
                <input 
                type="radio" 
                name="gender"
                value = "female"
                checked = {this.state.gender === "female"}
                onChange = {this.handleChange}
                />Female
                </label>
                
                

                <br/>
                <label> Choose:</label>
                <select value={this.state.favColor} 
                name="favColor" 
                onChange={this.handleChange}>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>

                    <br/>
                <h1>name :{this.state.firstName} lastname:{this.state.lastName}</h1>
                <h2>you are a {this.state.gender}</h2>
                <h3>your favorite is {this.state.favColor}</h3>

            </form>

            
        )
    }
}

class DateFromApi extends Component {
    constructor(props){
        super(props) 
        this.state = {
            loading: false,
            character : {}
        }
    }

    componentDidMount ()  {
        this.setState({loading:true})
        console.log("workwork")
        fetch("https://swapi.co/api/people/1")
        .then(response => response.json())
        .then(data => this.setState({
            loading: false,
            character : data
        }))
    }

    render(){
        const text = this.state.loading ? "Loading ...." : this.state.character.name
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }
}

class Logggg extends Component {
    constructor(props){
        super(props)
        this.state = {
            Logged : false
        }
    }

    componentDidMount = async () => {
        //STEPS BEFORE COMPONENT MOUNTS ITSELF
        setTimeout(() => {
            this.setState({
                isLoading:false
            })  
        },1500)
    }
    clicked(){
       
        this.setState(prevState => {
            return{
                Logged : !prevState.Logged
            } 
        } 
        )}

        render()
        {
        return (
            <div>
                <button onClick={this.clicked.bind(this)}>
                 {this.state.Logged ? <h1>Log in</h1> : <h1>Log Out</h1>}
                </button>
            </div>
        )
        }
}

    


class Conditional extends Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = async () => {

    }
    
    render(){
        return(
        <div>
            {this.props.isLoading ? <h1> Loading...</h1>  : <h1>Loaded</h1>}
        </div>
        )

        
    }
}

class Messages extends Component {
    constructor(props){
        super(props)
        this.state = {
            unmessages : [
                "Call your mom",
                "New spam email"
            ]
        }
    }

    componentDidMount = async () =>{

    }

    render(){
        return (
            <div>
                {
                    this.state.unmessages.length >0 &&
                    <h2>you have {this.state.unmessages.length} unread messages!</h2>
                }
            </div>
        )
    }
}

class Test extends Component {
       
    constructor(props){
        super(props)
        this.state = {
            todos: testData
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(id) {
        //console.log("changed", id)
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                if(todo.id ===id){
                console.log('todo:', todo.id)
                todo.completed  = !todo.completed
                
            }
                return todo;
            })
            return {
                todos: updatedTodos
                
            }
        })
    }


    render(){
        const jokeComponents= this.state.todos.map(joke => <Joke id={joke.id} question={joke.question} joke={joke.joke} handleChange={this.handleChange}/>)
           return (
               <div>
                   {jokeComponents}
               </div>
           )

    }
           
}

function Joke(props){
    console.log(props.id)
    return(
        <div>

            <h1 style={{display: !props.question && " none"}}> Question:{props.question} </h1>
            <h1 style={{color: !props.question && "#888888"}}> Joke:{props.joke} </h1>
            <input 
            type="checkbox" 
            onChange= {() => props.handleChange(props.id)}
            />

        </div>
    )
}

/*
<div>

                <div align="center">
                   <h1>{this.state.count}</h1> 
                   <button onClick={this.handleClick.bind(this)}>Click me</button>
                   <text>{this.state.text} </text>
                    </div>,
            
                 <div align= "center">
                     <Test />
                 </div>

            </div>

*/


/*
function Clicker(){

    skaiciuok() {
        this.setState({
            count: this.state.count +1
        },function(){
            console.log("done")
        });
    }

    return (
    <div className="app">
        <div className="click-count">
            Button presses: {this.state.count}
        </div>
        <button onClick={this.skaiciuok.bind(this)}>ADD</button>
    </div>
    );
}
*/

/* 
function MyInfo() {
    const firstname = "daniel"
    const date = new Date();
    const hours = date.getHours();
    let time;

    const styles = {
        color: "#FF8C00",
        backgroundColor: "#333",
        fontSize: 26
    }

    if(hours > 12){
        time="morning";
    }
    else{
        time="night";
    }
    return (
        <div>
            <h1 style={styles}> hello {firstname} its {hours} and {time} asa</h1>
        </div>
    )
}*/