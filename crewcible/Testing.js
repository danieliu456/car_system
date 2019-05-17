       
       //import LoginBox from ('./src/LoginBox');

        const mysql = require('mysql');
        const express = require('express');
        var app = express();
        const bodyParser = require('body-parser');
        const morgan = require('morgan');
        const session = require('express-session');

        const config = require('./src/config/config')

        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());

       var dbConfig = config.db_config;
        

        //var connection = mysql.createConnection(dbConfig);
        var mysqlPool = mysql.createPool(dbConfig);
      /*  app.use(session({
           // name: SESS_NAME,
            resave: false,
            saveUninitialized: false,
            secret: SESS_SECRET,
            cookie: {
                maxAge: SESS_LIFETIME,
                sameSite: true,
               // secure:
            }
        }))*/

       app.use((req,res,next) => {
            res.header("Access-Control-Allow-Origin", "*") // http:// host
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            if(req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'PUT, POST ,PATCH, DELETE, GET,UPDATE');
                return res.status(200).json({})
            }
            next();
        });

        /*connection.connect(function(error){
         error ?
                    (console.log("DB connection failed \n" + JSON.stringify(error,undefined, 10)),
                    console.log("time to wake up"),
                    setTimeout(handleDisconnect,1000),
                    handleDisconnect())
                : 
                    console.log("DB connection succeded")
        });*/

       
        app.get('/',function(req,res){
            res.send('go to /carlist to see carlist')
        })

        app.listen(4000,() => {
            console.log('go to http://localhost:4000/carlist')
            
        })
        
        
        /*app.get('/carlist',function(req,res){
            connection.query(SELECT_ALL_CARS, function(err,rows, fields) {
                if(err) {
                    return res.send([err])
                }
                else {
                    return res.send(rows);
                }
            })
            
        })*/
        
        const SELECT_ALL_CARS = 'select * from Cars;';
        app.get('/carlist', (req,res) => {
            console.log('Starting to get Carlist');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(SELECT_ALL_CARS, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release(); 
            })
        })

        const SELECT_RESERVED = `select Cars.car_id,Cars.plate_number,Cars.model,CarStatus.fuelPercent,CarStatus.velocity from Cars,CarStatus where Cars.car_id=CarStatus.car_id and isReserved=1;`;
       /* app.get('/reservedcars',function(req,res,results){
            
            connection.query(SELECT_RESERVED, (err,rows) => {
                err ? res.send([err]) : res.send(rows);
            })
        }) */

        app.get('/reservedcars', (req,res) => {
            console.log('Starting to get Carlist');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(SELECT_RESERVED, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release();  
            })
        })

        //select x(gps_location),y(gps_location) from CarStatus;
        const SELECT_FREE = `select Cars.car_id,Cars.plate_number,Cars.model,CarStatus.fuelPercent,CarStatus.velocity from Cars,CarStatus where Cars.car_id=CarStatus.car_id and isReserved=0;`;
        
        /*app.get('/freecars',(req,res) => {
            connection.query(SELECT_FREE,(err,rows) => {
                err ? res.send([err]) : res.send(rows);
            })
        })*/

        app.get('/freecars', (req,res) => {
            console.log('Starting to get Carlist');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(SELECT_FREE, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release();  
            })
        })

        const SELECT_CARSTATUS = `select * from CarStatus;`;

        /*
        app.get('/carstatus',(req,res)=>{
            connection.query(SELECT_CARSTATUS, (err,rows) => {
                err ? res.send([err]) : res.send(rows);
            })
        })*/

        app.get('/carstatus', (req,res) => {
            console.log('Starting to get CarStatus');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(SELECT_CARSTATUS, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release();  
            })
        })

        /*app.get('/carlist/add', (req,res,next) => {
            const { id, driver_id, seats, plate, model, fuel, avgfuel, locationx, locationy } = req.query;
            const INSERT_CAR = `insert into Cars values (${id},${driver_id},'${seats}','Simulation','${plate}','${model}','${fuel}','${avgfuel}');insert into CarStatus values((select max(car_id) from Cars),point(${locationx},${locationy}),current_time,100,0,400,0);`
            connection.query(INSERT_CAR,(err,results) =>{
                err ? res.send(err) :
                (   console.log('successfully added to DB ->' + INSERT_CAR),
                    res.send(['Succesfully added car'])
                    //connection.release()
                )
            })
        })*/

        app.get('/carlist/add', (req,res) => {
            const { id, driver_id, seats, plate, model, fuel, avgfuel, locationx, locationy,number } = req.query;
            var SEND="";
            const INSERT_CAR = `insert into Cars values (${id},${driver_id},'${seats}','Simulation','${plate}','${model}','${fuel}','${avgfuel}',default);insert into CarStatus values((select max(car_id) from Cars),point(${locationy},${locationx}),current_time,100,0,400,0);`
            for(var i =0;i< number;i++){
                SEND=SEND+INSERT_CAR;
            }
            console.log('Starting to Add Car');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(SEND, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release();  
            })
        })

        /*app.get('/query', (req,res) => {
            const {query} = req.query;
            const QUERY = `${query}`;

            connection.query(QUERY,(err, rows,results) => {
                err ? res.send([err]) : res.send(rows);
            })
           // http://localhost:4000/query?query=select%20*%20from%20cars;
        })*/

        app.get('/query', (req,res) => {
            const {query} = req.query;
            const QUERY = `${query}`;
            console.log('Starting to get Query');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(QUERY, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release();  
            })
        })


        /*app.get('/carinfo', (req,res) => {
            const {car_id} = req.query;
            select_carinfo = `select model,fuelPercent,passengersInside,isReserved,gps_location from Cars,CarStatus where Cars.car_id = CarStatus.car_id and Cars.car_id = ${car_id};`

            connection.query(select_carinfo,(err,rows) => {
                err ? res.send([err]) : res.send(rows);
            })
        })*/

        app.get('/carinfo', (req,res) => {
            const {car_id} = req.query;
            select_carinfo = `select model,fuelPercent,passengersInside,isReserved,gps_location from Cars,CarStatus where Cars.car_id = CarStatus.car_id and Cars.car_id = ${car_id};`
            console.log('Starting to get carinfo');
            mysqlPool.getConnection((err,connection) => {
                err ? ( connection.release(), console.log('err' + err)) : (
                    connection.query(select_carinfo, (err2, rows, fields) => {
                        err2 ? res.json([err2]) : (
                            res.json(rows)
                        )
                    })
                )
                console.log('realease pool');
                connection.release();  
            })
        })

        function handleDisconnect() {
            console.log("handle  Disconnect");
            connection.destroy();
            connection = mysql.createConnection(db_config);
            connection.connect((err) => {
                err ? (
                    console.log('ERROR when handling connection to db', err),
                    setTimeout(handleDisconnect,1000)
                ) : console.log("Connection handlig successful")
            })
            
        }

        //connection.ping( (err) => {...}


        

