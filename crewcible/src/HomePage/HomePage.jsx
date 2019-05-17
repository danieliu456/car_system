import React, { Component } from 'react';
import './App.css';
//import Sidebar from 'react-sidebar';
import Sidebar from './react-sidebar.cjs';
//import LoginBox from '../LoginPage/LoginPage.jsx';
import SidebarContent from './SidebarContent';
import MapView from './MapView';
import NavBar from './NavBar';
import Learning from './Learning';
import Vehicles from './Vehicles';
import OrderCar from './OrderCar';

//import { userService } from '../_services';


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWindow: "LiveMap",
            showSidebar: true,
            showLogin: false,
            showNavBar:false,
            showCarOrder:false,
            showAddCar:false,
            showSimSpeed:false,
            lang:"",
            user: {},
            
        };

        //EVENT BINDINGS HERE
        this.handleWindowSelect = this.handleWindowSelect.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleButtonSelect = this.handleButtonSelect.bind(this);
        this.submitLanguage = this.submitLanguage.bind(this);
    }

    //EVENT LISTENERS AND OTHER FUNCTIONS GO HERE

    handleWindowSelect(windowid) {
        this.setState({ currentWindow: windowid });
        console.log(window);
    }

    toggleSidebar = async () => {
        this.setState({ showSidebar: !this.state.showSidebar });
    }

    submitLanguage(code) {
        console.log(code);
        this.setState({
            lang: code
        })
    }

    handleButtonSelect(id) {
        id===1 ? this.setState({showCarOrder : !this.state.showCarOrder}) :  
        id === 2 ? this.setState({showAddCar : !this.state.showAddCar}) :
        id === 3 ? this.setState({showSimSpeed : !this.state.showSimSpeed}) :
        console.log(id);
    }

    handleCloseClick = (name) => {
        console.log(name);
		this.setState({[name] : false});
	}

    render() {
        
        return (
            <div>
                <header>    
                    <NavBar 
                    toggleSidebar = {this.toggleSidebar} 
                    submitLanguage={this.submitLanguage} 
                    lang={this.state.lang}/>
                </header>
                
                <Sidebar
                    sidebar={ 
                    <SidebarContent 
                    handleWindowSelect = {this.handleWindowSelect} 
                    toggleSidebar = {this.toggleSidebar}
                    handleButtonSelect = {this.handleButtonSelect}
                    /> }

                    open={this.state.showSidebar}
                    docked={this.state.showSidebar}
                    >
                    <div>
                        <div>
                            {
                                this.state.currentWindow === "LiveMap" ? (
                                    <MapView 
                                    showCarOrder={this.state.showCarOrder}
                                    showAddCar={this.state.showAddCar}
                                    showSimSpeed={this.state.showSimSpeed}
                                    handleCloseClick={this.handleCloseClick}
                                    lang={this.state.lang}/>
                                ) : this.state.currentWindow === "Learning" ? (
                                    <Learning />
                                ) : this.state.currentWindow === "AddCar" ? (
                                    <Vehicles lang={this.state.lang}/>
                                ) : ( <div /> )
                            }
                        </div>
                    </div>
                </Sidebar> 
            </div>
        );
    }
}

export {HomePage};

