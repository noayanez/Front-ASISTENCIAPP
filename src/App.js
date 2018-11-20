import React, { Component } from 'react';
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state={
            horaactual : null,
            logueado : true,
            codigoUsuario : "72928871",
            nombreUsuario : "Raul",
            numAsistencias : 10,
            numTardanzas : 2,
            numFaltas : 1,
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.cambiarcodigo = this.cambiarcodigo.bind(this);
        this.fetchUsuario = this.fetchUsuario.bind(this);
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

    fetchUsuario(){
        fetch("http://127.0.0.1:5000/usuariotrabajador",{
            method: 'GET',
            mode:'no-cors',
            dataType: 'json'
        })
        .then((response) =>{
            console.log(response);
                return response.blob();
        })
        .then((body) => {
            console.log(body.length);
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
                {this.state.logueado?
                    (
                        <div>
                            <h1>{this.state.horaactual}</h1>
                            <h2>Buenos días {this.state.nombreUsuario} !</h2><hr/>
                            <label>Tienes {this.state.numAsistencias} Asistencias</label><hr/>
                            <label>Tienes {this.state.numTardanzas} Tardanzas</label><hr/>
                            <label>Tienes {this.state.numFaltas} Faltas</label>
                        </div>
                    ):(
                        <div>
                            <label>Insertar tu codigo:</label>
                            <input type="text" value={this.state.codigo} onChange={this.cambiarcodigo} maxLength={9}/>
                            <button onClick={this.fetchUsuario}>ENTRAR</button>
                        </div>
                    )
                }
                </header>
            </div>
        );
    }
}

export default App;
