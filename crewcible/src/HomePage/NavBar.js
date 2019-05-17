import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../Styles/NavBar.css';
import {userService} from '../_services';

import option from '../img/option1.jpg';
import en from '../img/gb.png';
import lt from '../img/lt.png';

import {strings, setLanguage} from '../_helpers/localization';
import {LanguageContext} from '../LanguageContext'

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: false
            
        };
        //EVENT BINDINGS HERE
    }

    componentDidMount = async () => {
        //STEPS BEFORE COMPONENT MOUNTS ITSELF
    }

    pictureFunction() {
        console.log("Clicked");
    }

    logout(){
        userService.logout();
        //location.href='http://google.com'
        window.location.href='http://localhost:8080/login'
    }

    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE
    
    static contextType = LanguageContext
    render() {
        setLanguage(this.context)
        return (
                
                <nav className="navigation">
                    <span>
                            <img className='pic' src={option} alt="my_img" onClick={this.props.toggleSidebar}/>    
                    </span>
                    <span>
                    
                    <button className='logout-btn' onClick={this.logout.bind(this)}> {strings.logout} </button>
                    <img className='lang' src={en} alt="my_img" onClick={() => this.changeLanguage("en")}/>
                    <img className='lang' src={lt} alt="my_img" onClick={() => this.changeLanguage("lt")}/>
            
                        
                    </span>
                </nav>
           
        );
    }

    changeLanguage(code){
        localStorage.setItem("languageCode",code)
        window.location.reload();
    }
}

export default NavBar;

/* <button className='picture'>
                            <img className='pic' src={icon} alt="my_img"  onClick={this.pictureFunction}/>
                        </button> */