//externals
import ReactDOM from 'react-dom';
import React from 'react';

// OpenLayer
import {Map, View, Feature} from 'ol';
// TileLayer is the OSM, VectorLayer is for features (Markers)
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer/';
import {Cluster, OSM, Vector as VectorSource} from 'ol/source/';
import * as Proj from 'ol/proj';

// Geometry and Style
import Point from 'ol/geom/Point'
import {Fill, Stroke, RegularShape, Style} from 'ol/style/'

// Interaction
import {Modify, Select, defaults as defaultInteractions} from 'ol/interaction'

// OpenLayer Mouse Pos 
import MousePosition from 'ol/control/MousePosition.js';
import {defaults} from 'ol/control.js'
import {createStringXY} from 'ol/coordinate.js';

import OrderCar from './OrderCar';
import AddCar from './AddCar';
import ShowSimSpeed from './ShowSimSpeed';
import CarsInfo from '../_components/CarsInfo';
import {simIP,simPORT} from '../config/config';
import {load} from '../_helpers/posts';

// Style
import '../Styles/mapcssbyzxc.css';

// Requests
import {getCars} from '../_helpers/posts.js';

//Language
import {LanguageContext} from '../LanguageContext'
import {strings, getLanguage} from '../_helpers/localization'

class MapView extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			cars: [],
			cluster: "",
			selection: "",
			vectorSource : "",
			mouseCoords: "",
			mouseClick: [0,0],
			change: false,
			clickedCar:0,
			showCarInfo: false,
		}
	}
	
  componentDidMount = async () => {
		
		// Creates mouse tracker
		this.state.mouseCoords = "";
		var mousePositionControl = new MousePosition({
			coordinateFormat: createStringXY(4),
			projection: 'EPSG:4326',
			// comment the following two lines to have the mouse position
			// be placed within the map.
			className: 'custom-mouse-position',
			target: this.state.mouseCoords,
			undefinedHTML: '&nbsp;'
		});

		// Creates map with centration to Vilnius
		const vilniusLonLat = [25.2639, 54.6987]
		const vilniusWebMercator = Proj.fromLonLat(vilniusLonLat);

		this.state.vectorSource = new VectorSource({});
		var vectorLayer = new VectorLayer({
			source: this.state.vectorSource
		})

		// Cluster for possible future clustering
		this.state.cluster = new Cluster({
			distance: 50,
			source: this.state.vectorSource
		});

  	const map = new Map({
			controls: defaults().extend([mousePositionControl]), // Adds additional mouse control
			target: 'map',
			layers: [
				// Map itself
				new TileLayer({
					source: new OSM()
				}),
					vectorLayer
				],
			
			view: new View({
				center: vilniusWebMercator,
				zoom: 12,
			})
		});

		/* Drawing features, at the moment a bit useless
		var draw = new Draw({
			source: this.state.vectorSource,
			type: "Point"
		})

		map.addInteraction(draw)
		*/

		// Mouse click event
		map.on('click', (evt) => {
			const {coordinate} = evt;
			console.log(coordinate);
			var array = Proj.transform(coordinate, 'EPSG:3857', 'EPSG:4326');
			console.log("Tinkamas" +array);
			this.setState({
				mouseClick : array,
				change : true
			})
			
		});

		// select interaction working on "singleclick"
		this.state.selection = new Select();
		map.addInteraction(this.state.selection);
		this.state.selection.on('select', (e) => {
			console.log(e.selected[0].id);

			e.selected[0].id === parseInt(e.selected[0].id) ?
			this.setState({
				clickedCar : e.selected[0].id,
				showCarInfo : true
			}) :
			console.log("Try one more time :DDDDD");

		});


		// Interval for 5 secs
		this.interval = setInterval(() => {
			this.getCars()
			}, 5000);
  }

  componentWillUnmount= async () => {
    clearInterval(this.interval);
  }
	//h-kd3dz+t9WCqkD%!_?5^wzCD6rA74gx
	//Api-Key
	getCars= async _ =>{
		
		// http://193.219.91.103:3264/sim/vehicle
		fetch(`http://${simIP}:${simPORT}/sim/vehicle`, {
			method: 'GET',
			headers: {
				'API-Key': "h-kd3dz+t9WCqkD%!_?5^wzCD6rA74gx"
			}
		})
		.then(response => response.json())
		.then(data => this.setState({
			cars : data
		}))
		.then(this.makeCars)
		.catch(err => console.error("Failed to fetch Cars: "+err))
		
		
	}	

	// Loads cars from array to the map after clearing the map
	makeCars= async _ => {

		this.state.vectorSource.clear();
		this.state.cars.forEach((item,index,array) => {

			var coords = item.position.split(",");
			var id = item.id;
			console.log('cars data-------')
			console.log(this.state.cars);
			coords = [Number(coords[1]),Number(coords[0])]
			console.log(coords);

			this.addCar(coords, id);
      })
	}

	addCar = async (position, id) =>{
		var stroke = new Stroke({color: 'black', width: 2});
		var fill = new Fill({color: 'red'});
  
		var style = new Style({
			image: new RegularShape({
			  fill: fill,
			  stroke: stroke,
			  points: 5,
			  radius: 10,
			  radius2: 4,
			  angle: 0
			})})
  
		var coordinates = Proj.fromLonLat(position);
		var feature = new Feature(new Point(coordinates));
		feature.setStyle(style);
		feature.id = id

		this.state.vectorSource.addFeature(feature);
	};

	handleXClick = _ => {
		this.setState({showCarInfo : false});
	}
	

  render () {
    return (
	<div>
		<div id="map" ref="mapContainer"> </div>

		{this.props.showCarOrder &&
		 <OrderCar
		 mouseClick={this.state.mouseClick}
		 handleCloseClick={this.props.handleCloseClick}
		 lang={this.props.lang}/>}

		{this.props.showAddCar && 
		<AddCar
		 mouseClick={this.state.mouseClick}
		 handleCloseClick={this.props.handleCloseClick}
		 lang={this.props.lang}/>}

		{this.props.showSimSpeed &&
		<ShowSimSpeed
		handleCloseClick={this.props.handleCloseClick}
		lang={this.props.lang}/>}

		{this.state.showCarInfo && 
		<CarsInfo
		id={this.state.clickedCar}
		handleXClick={this.handleXClick}
		mouseClick={this.state.mouseClick}
		lang={this.props.lang}/>}
	</div>	
      
	  

    );
  }

	empty(){

	};
}


export default MapView;

/*function GenerateCars(props) {
	var feature = new Feature({
		labelPoint: new Point(props.position),
	})
	console.log('asdasd');
	props.vectorSource.addFeature(feature);
		
}*/