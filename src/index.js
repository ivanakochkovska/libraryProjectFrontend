import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Calendar from "react-calendar";
import './index.css';
import axiosLibraRepository from "./custom-axios/axiosLibraRepository";
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "./custom-axios/axios";
import qs from 'qs'
import Flex from "react-calendar/dist/umd/Flex";
class H extends React.Component{
    render(){
        return <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
            <a className="navbar-brand" href="#"/>

        </nav>


    }
}
class B extends React.Component{
    render(){
        return <div><button type="submit" className="btn btn-primary btn-block">Одјави се</button><button type="submit" className="btn btn-primary btn-block">Одјави се</button></div>
            ;
    }
}
class LogoutButton extends React.Component{
    render(){
        return  <button type="button" className="btn btn-primary">Одјави се</button>;
    }
}

// class SearchUser extends React.Component{
//     render(){
//         return (<form method="POST">
//             <h3>Корисник</h3>
//             <p>Корисничко име:</p>
//             <input name={"korisnickoime"}
//                 type="text"
//             />
//             <p>Име:</p>
//             <input name={"ime"}
//                 type="text"
//             />
//             <p>Презиме:</p>
//             <input name={"prezime"}
//                 type="text"
//             />
//             <p>
//                 <br>
//                 </br>
//                 <button type="button" className="btn btn-primary" onClick={ListUsers.render}>Пребарувај</button>
//             </p>
//         </form>);
//
//     }
// }
class ShowAllUsers extends React.Component{
    show() {
        ReactDOM.render(<ListUsers/>, document.getElementById("users"))
    }
    render(){
         return(  <div>
        <h7>Прикажи ги сите корисници регистрирани во базата</h7><br/><br/>
             <button type="button" className="btn btn-primary" onClick={this.show}>Прикажи</button>
         </div>);

    }

}
class ShowAllReservations extends React.Component{
    show1(){
        ReactDOM.render(<ListReservations/>, document.getElementById("reservations"))
    }
    render(){
        return(  <div>
            <h7>Прикажи ги сите направени резервации</h7><br/><br/>
            <button type="button" className="btn btn-primary" onClick={this.show1}>Прикажи</button>
        </div>);

    }
}

const adresa="adminPanelSearch"
const baseUrl="http://localhost:9090"
const allUrl='http://localhost:9090/adminPanelSearch'



class ListReservations extends Component{
    retreiveAllUsers() {
        return axios.get('http://localhost:9090/adminPanelSearchReservation');
    }
    constructor(props) {
        super(props);
        this.state={

            users:[]
        }
        this.render=this.render.bind(this)
        this.refreshUsers=this.refreshUsers.bind(this);

    }
    componentDidMount(){
        this.refreshUsers();
    }
    refreshUsers(){
        this.retreiveAllUsers()
            .then(response=>{console.log(response);
            this.setState({users: response.data})

            })
    }
    render(){

        return (<div>

            <div className="container">
                <h3>Корисници и направени резервации</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Шифра на резервација</th>
                            <th>Шифра на корисник</th>
                            <th>Шифра на книга</th>
                            <th>Име на книга</th>
                            <th>Автор на книга</th>
                            <th>Почетен датум</th>
                            <th>Краен датум</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.users.map(
                                user =>
                                    <tr >
                                        <td>{user.id}</td>
                                        <td>{user.id_korisnik}</td>
                                        <td>{user.id_kniga}</td>
                                        <td>{user.imeKniga}</td>
                                        <td>{user.avtor}</td>
                                        <td>{user.pocetenDatum}</td>
                                        <td>{user.kraenDatum}</td>

                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        )

    }
}


class ListUsers extends Component{
    retreiveAllUsers() {
        return axios.get('http://localhost:9090/adminPanelSearch');
    }
    constructor(props) {
        super(props);
        this.state={

            users:[]
        }
        this.render=this.render.bind(this)
        this.refreshUsers=this.refreshUsers.bind(this);

    }
    componentDidMount(){
        this.refreshUsers();
    }
    refreshUsers(){
        this.retreiveAllUsers()
            .then(response=>{console.log(response);
                this.setState({users: response.data})

            })
    }
    render(){

        return (<div>

                <div className="container">
                    <h3>Корисници</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Име</th>
                                <th>Презиме</th>
                                <th>Корисничко Име</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                        <tr key={user.ime}>
                                            <td>{user.ime}</td>
                                            <td>{user.prezime}</td>
                                            <td>{user.korisnickoIme}</td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )

    }

}


class Form extends Component {

    state = {
        query: "",
        data: [],
        filteredData: []
    };

    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.prezime.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
    };

    getData = () => {
        fetch(`http://localhost:9090/adminPanelSearch`)
            .then(response => response.json())
            .then(data => {
                const { query } = this.state;
                const filteredData = data.filter(element => {
                    return element.prezime.toLowerCase().includes(query.toLowerCase());
                });

                this.setState({
                    data,
                    filteredData
                });
            });
    };

    componentWillMount() {
        this.getData();
    }

    render() {
        return (
            <div className="searchForm">
                <h7>Пребарајте ја листата на корисници според презиме</h7>
                <br></br><br></br>
                <form>
                    <input
                        placeholder="Пребарај Корисници"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    <br></br>
                    <br></br>
                </form>
                <div className="container">
                    <h3>Корисници</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Име</th>
                                <th>Презиме</th>
                                <th>Корисничко Име</th>
                                <th>Шифра во база</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.filteredData.map(
                                    user =>
                                        <tr key={user.ime}>
                                            <td>{user.ime}</td>
                                            <td>{user.prezime}</td>
                                            <td>{user.korisnickoIme}</td>
                                            <td>{user.id}</td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }



}

class FormRes extends Component {

    state = {
        query: "",
        data: [],
        filteredData: []
    };

    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.imeKniga.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
    };

    getData = () => {
        fetch(`http://localhost:9090/adminPanelSearchReservation`)
            .then(response => response.json())
            .then(data => {
                const { query } = this.state;
                const filteredData = data.filter(element => {
                    return element.imeKniga.toLowerCase().includes(query.toLowerCase());;
                });

                this.setState({
                    data,
                    filteredData
                });
            });
    };

    componentWillMount() {
        this.getData();
    }


    render() {
        return (
            <div className="searchForm">
                <form>
                    <h7>Пребарајте ја листата на резервации според име на книга</h7>
                    <br></br><br></br>
                    <input
                        placeholder="Пребарај резервации"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    <br></br>
                    <br></br>
                </form>
                <div className="container">
                    <h3>Корисници и резервации</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Шифра на резервација</th>
                                <th>Шифра на корисник</th>
                                <th>Шифра на книга</th>
                                <th>Име на книга</th>
                                <th>Автор на книга</th>
                                <th>Почетен датум</th>
                                <th>Краен датум</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.filteredData.map(
                                    user =>
                                        <tr id="one"key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.id_korisnik}</td>
                                            <td>{user.id_kniga}</td>
                                            <td>{user.imeKniga}</td>
                                            <td>{user.avtor}</td>
                                            <td>{user.pocetenDatum}</td>
                                            <td>{user.kraenDatum}</td>

                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }



}


class ListBooks extends Component {

    state = {
        query: "",
        data: [],
        filteredData: []
    };

    handleInputChange = event => {
        const query = event.target.value;

        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.ime.toLowerCase().includes(query.toLowerCase());
            });

            return {
                query,
                filteredData
            };
        });
    };

    getData = () => {
        fetch(`http://localhost:9090/adminPanelBooks`)
            .then(response => response.json())
            .then(data => {
                const { query } = this.state;
                const filteredData = data.filter(element => {
                    return element.ime.toLowerCase().includes(query.toLowerCase());
                });

                this.setState({
                    data,
                    filteredData
                });
            });
    };

    componentWillMount() {
        this.getData();
    }


    render() {
        return (
            <div className="searchForm">
                <form>
                    <h7>Пребарајте ја листата на книги според име на книга</h7>
                    <br></br><br></br>
                    <input
                        placeholder="Пребарај книги"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    <br></br>
                    <br></br>
                </form>
                <div className="container">
                    <h3>Корисници и резервации</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>

                                <th>Шифра на книга</th>
                                <th>Име на книга</th>
                                <th>Автор</th>
                                <th>Број на примероци</th>
                                

                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.filteredData.map(
                                    user =>
                                        <tr id="one"key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.ime}</td>
                                            <td>{user.avtor}</td>
                                            <td>{user.kapacitet}</td>
                                            <td>{user.status}</td>

                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }



}






ReactDOM.render(<H/>, document.getElementById("header"))
ReactDOM.render(<H/>, document.getElementById("root"))
//ReactDOM.render(<LogoutButton/>, document.getElementById("r"))
//ReactDOM.render(<SearchUser/>, document.getElementById("s"))
//ReactDOM.render(<SearchUser/>, document.getElementById("s"))
//ReactDOM.render(<ListUsers/>,document.getElementById("users"))
ReactDOM.render(<ShowAllUsers/>, document.getElementById("usersButton"))
ReactDOM.render(<ShowAllReservations></ShowAllReservations>, document.getElementById("reservationsButton"))
ReactDOM.render(<Form></Form>,document.getElementById("s"))
ReactDOM.render(<FormRes></FormRes>,document.getElementById("oneUser"))
//ReactDOM.render(<OneUser></OneUser>, document.getElementById("oneUser"))
ReactDOM.render(<ListBooks/>, document.getElementById("books"))
serviceWorker.unregister();

