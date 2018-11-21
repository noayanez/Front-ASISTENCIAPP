import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state={
            hostname : "127.0.0.1:5000",// 165.227.168.49:5000
            dataUsuario : [],
            horaactual : null,
            logueado : false,
            codigoUsuario : "72928871",
            numAsistencias : 10,
            numTardanzas : 2,
            numFaltas : 1,
            alerta : "",
            asistido : false,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.cambiarcodigo = this.cambiarcodigo.bind(this);
        this.fetchUsuario = this.fetchUsuario.bind(this);
        this.marcarAsistencia = this.marcarAsistencia.bind(this);
        this.marcarAsistencia2 = this.marcarAsistencia2.bind(this);
        this.cerrarAlerta = this.cerrarAlerta.bind(this);
    }

    login(){
        this.setState({ logueado : true });
    }

    logout(){
        this.setState({ logueado : false , alerta : "", asistido : false });
    }

    cambiarcodigo(event){
        this.setState({ codigoUsuario : event.target.value });
    }

    cerrarAlerta(){
        this.setState({ alerta : ""});
    }

    marcarAsistencia(){
        this.setState({
            asistido : true,
            alerta : "¡Asistencia marcada axitosamente a las "+this.state.horaactual
        })
    }

    marcarAsistencia2(){
        const data = {
            dni : this.state.dataUsuario.UsuarioTrabajador.dni
        };
        fetch("http://"+this.state.hostname+":5000/usuariotrabajador/"+this.state.codigoUsuario,{
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body : JSON.stringify(data)
        })
        .then((response) =>{
            return response.json();
        })
        .then((result) => {
            console.log(result);
            if(result.UsuarioTrabajador.dni===null){
                console.log("datos nulo");
                this.setState({ alerta : "Código invalido, Intente nuevamente."});
            }else{
                this.setState({
                    dataUsuario : result,
                    logueado : true
                });
            }
        })
    }

    fetchUsuario(){
        this.setState({
            logueado : false
        });
        fetch("http://"+this.state.hostname+"/usuariotrabajador/"+this.state.codigoUsuario)
        .then((response) =>{
            return response.json();
        })
        .then((result) => {
            console.log(result);
            if(result.UsuarioTrabajador.dni===null){
                console.log("datos nulo");
                this.setState({ alerta : "Código invalido, Intente nuevamente."});
            }else{
                this.setState({
                    dataUsuario : result,
                    logueado : true
                });
            }
        })
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentDidMount(){
        this.interval = setInterval(() => this.tick(), 1000);
        this.setState({
            horaactual : new Date().toLocaleTimeString()
        });
    }

    componentDidUpdate(){
        var horanueva = new Date().toLocaleTimeString();
        if(this.state.horaactual !== horanueva){
            this.setState({
                horaactual : horanueva
            });
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {this.state.logueado === true ?
                        (
                            <div className="MiCaja">
                                <div className="Caja">
                                    <div className="image"></div>
                                    <h1>{this.state.horaactual}</h1>
                                </div>
                                <div className="Caja">
                                    <h2>¡Buenos días {this.state.dataUsuario.UsuarioTrabajador.nombre}!</h2>
                                    <div>
                                        {!this.state.asistido?(<button className="mybtn" onClick={this.marcarAsistencia}>MARCAR ASISTENCIA
                                        </button>):(<button className="mybtn" onClick={this.logout}>SALIR DE SESION
                                        </button>)}
                                    </div>
                                    {this.state.alerta !== "" ?
                                        (<div className="row">
                                            <div className="col-12">
                                                <br/><div className="alert alert-success alert-dismissible fade show"
                                                     role="alert">
                                                    {this.state.alerta}
                                                    <button onClick={this.cerrarAlerta} type="button" className="close"
                                                            data-dismiss="alert" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>) : (null)
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="login">
                                <div className="col-sm-6 col-sm-offset-3 myform-cont">
                                    <div className="myform-top">
                                        <div className="col-sm-12 my-sesion">
                                            <h1> Inicio de sesion </h1>
                                        </div>
                                        <div className="myform-top-left">
                                            <p>Ingresa tu codigo o DNI </p>
                                        </div>
                                    </div>
                                    <div className="myform-bottom">
                                        <div>
                                            <div className="form-group">
                                                <input className="form-control" id="campodni" type="text"
                                                       value={this.state.codigoUsuario} onChange={this.cambiarcodigo}/>
                                            </div>
                                            <br/>
                                            <button className="mybtn" onClick={this.fetchUsuario}>ENTRAR</button>

                                        </div>
                                        {this.state.alerta !== "" ?
                                            (<div className="row">
                                                <div className="col-12">
                                                    <br/><div className="alert alert-primary alert-dismissible fade show"
                                                         role="alert">
                                                        {this.state.alerta}
                                                        <button onClick={this.cerrarAlerta} type="button" className="close"
                                                                data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>) : (null)
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </header>
            </div>
        );
    }


}

export default App;
