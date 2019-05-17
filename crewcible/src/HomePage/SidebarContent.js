import React, { Component } from 'react';
import './App.css';
import '../Styles/SideBarContent.css'
//import option from './img/option1.jpg'
import SideBarData from "../Data/SideBarData.js"
import {strings, setLanguage} from '../_helpers/localization';
import {LanguageContext} from '../LanguageContext';

class SidebarContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: false,
            lastClicked: ""

        };
        
        //EVENT BINDINGS HERE
        this.buttonClick = this.buttonClick.bind(this);
    }

    componentDidMount = async () => {
        //STEPS BEFORE COMPONENT MOUNTS ITSELF
       
    }
    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE

    buttonClick = async (event) => {
        switch (event.target.id) {
            case "button_livemap":
                this.props.handleWindowSelect("LiveMap");
                break;
            case "button_learning":
                this.props.handleWindowSelect("Learning");
                break;
            case "button_add_car":
                this.props.handleWindowSelect("AddCar");
                break;
            case "ordercar":
                this.props.handleButtonSelect(1);
                break;
            case "addcar":
                this.props.handleButtonSelect(2);
                break;
            case "simspeed":
                this.props.handleButtonSelect(3);
                break;
            default:
                this.props.handleWindowSelect(event.target.id);
        }
    }

    render() {
       
        return (
            <div className = "side" style={{display: 'inline'}}>
                
                <DropDownbuttons buttonClick={this.buttonClick} />
            </div>
        );
    }
}

export default SidebarContent;

class DropDownbuttons extends Component{
    static contextType = LanguageContext;
    render () {
        
        const buttonComponents = SideBarData.map(data => <Buttons id={data.id} key={data.id} name={data[this.context]} submenu={data.submenu} buttonClick={this.props.buttonClick}/> )
        return (
            <div className="dropdown"> 
                {buttonComponents}
            </div>
        );
    }
}

class Buttons extends Component{
    constructor(props) {
        super(props);
        this.state = { };
    }

    expandButton() {
        document.getElementById(this.props.id).classList.toggle("show");
    }
    static contextType = LanguageContext;
    render(){
        const buttonContent = this.props.submenu.map(array => <BtnContent id={array.id} key={array.id} name={array[this.context]} buttonClick={this.props.buttonClick}/>);
        return(
            <div>
                <button className= "dropbtn" onClick={this.expandButton.bind(this, this.props.id)} >{this.props.name}</button>
                    <div className="dropdown-content" id={this.props.id} >
                     {buttonContent}
                    </div>
            </div>
        );
    }
}

class BtnContent extends Component{

    constructor(props) {
        super(props);
        this.state = { };
    }

    render(){
        return (
            <button onClick={this.props.buttonClick} id={this.props.id}>{this.props.name}</button>
        );
    }
}

/*<div>
<img className='pic' src={option} alt="my_img" align="right" onClick={this.props.toggleSidebar}/>
</div>*/

