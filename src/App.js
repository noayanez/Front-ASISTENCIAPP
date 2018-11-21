import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state={
            dataUsuario : [],
            horaactual : null,
            logueado : false,
            codigoUsuario : "72928871",
            numAsistencias : 10,
            numTardanzas : 2,
            numFaltas : 1,
            alerta : ""
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.cambiarcodigo = this.cambiarcodigo.bind(this);
        this.fetchUsuario = this.fetchUsuario.bind(this);
        this.marcarAsistencia = this.marcarAsistencia.bind(this);
        this.cerrarAlerta = this.cerrarAlerta.bind(this);
    }

    login(){
        this.setState({ logueado : true });
    }

    logout(){
        this.setState({ logueado : false });
    }

    cambiarcodigo(event){
        this.setState({ codigoUsuario : event.target.value });
    }

    cerrarAlerta(){
        this.setState({ alerta : ""});
    }

    marcarAsistencia(){
        const data = {
            dni : this.state.dataUsuario.UsuarioTrabajador.dni
        };
        fetch("http://127.0.0.1:5000/usuariotrabajador/"+this.state.codigoUsuario,{
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
        fetch("http://127.0.0.1:5000/usuariotrabajador/"+this.state.codigoUsuario)
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
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            {this.state.logueado===true?
                                (

                                    <div>
                                        <br/><br/><br/><br/><br/><br/><br/>
                                        <div className="row">
                                            <div className="col-12">
                                                <h1>{this.state.horaactual}</h1>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <h2>¡Buenos días {this.state.dataUsuario.UsuarioTrabajador.nombre}!</h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <br/>
                                                <button className="btn btn-outline-success" onClick={this.marcarAsistencia}>MARCAR ASISTENCIA</button>
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-6">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Ingresa tu codigo o DNI:</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-3"></div>
                                                        <div className="col-6">
                                                            <input className="form-control" id="campodni" type="text" value={this.state.codigoUsuario} onChange={this.cambiarcodigo} maxLength={8}/>
                                                        </div>
                                                        <div className="col-3"></div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <br/>
                                                            <button className="btn btn-outline-success" onClick={this.fetchUsuario}>ENTRAR</button>
                                                        </div>
                                                    </div>
                                                    {this.state.alerta!==""?
                                                        (<div className="row">
                                                            <div className="col-12">
                                                                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                                                    {this.state.alerta}
                                                                    <button onClick={this.cerrarAlerta} type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>):(null)
                                                    }
                                                </div>
                                                <div className="col-3"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
