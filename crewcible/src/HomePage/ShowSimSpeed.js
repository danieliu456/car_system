import React,{Component} from 'react'
import '../Styles/Vehicles.css'
import {speedSet} from '../_helpers/posts';

import { strings, setLanguage } from '../_helpers/localization';
import {LanguageContext} from "../LanguageContext";

class ShowSimSpeed extends Component{
    constructor(props){
        super(props);
        this.state= {
            speed:1,
        }
        this.handleChange = this.handleChange.bind(this);
    }

speedSubmit = (event) => {
    event.preventDefault()
    console.log("SUBMITEd")
    speedSet(this.state.speed);
    alert(this.state.speed+ "Submited");
}

handleChange(event) {
    const {value, name} = event.target;
    this.setState({
        [name] :value
    })
}

    render(){
        return (
            <FormSpeed 
            handleChange={this.handleChange} 
            speedSubmit={this.speedSubmit}
            speed = {this.state.speed}
            handleCloseClick={this.props.handleCloseClick}
            lang={this.props.lang}/>
        )
    }
}
export default ShowSimSpeed;

class FormSpeed extends Component {

    static contextType = LanguageContext;
    render() {
        setLanguage(this.context);
        return (
            
                <form className="Speed" onSubmit = {this.props.speedSubmit}>
                <div className='x' onClick={() => this.props.handleCloseClick('showSimSpeed')}>X</div>
                <label>{strings.simspeed}</label><br/>
                            <input 
                            className="input"
                            type="text"
                            placeholder="Speed"
                            value={this.props.speed}
                            onChange={this.props.handleChange}
                            name="speed"/>
                <button className="submitbutton">{strings.submit}</button>
                </form>
            
        )
    }
}