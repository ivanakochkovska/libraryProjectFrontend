import React, {Component} from "react";
import axios from "../../custom-axios/axios";
import Editcomponent from "../editcomponent/editcomponent";

class Form extends Component {
        constructor(props) {
            super(props);
            this.state={
                query: "",
                    data: [],
                    filteredData: [],
                    isFormVisible: false,
                currentEmp: {},
            }
            this.setIndex=this.setIndex.bind(this);
        }
    // state = {
    //     query: "",
    //     data: [],
    //     filteredData: [],
    //     isFormVisible: false
    // };

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

        saveMethod(name, surname, username,idd,password){
            axios.get('/updateUserAdmin', {
                params: {
                    ime: name,
                    prezime: surname,
                    korisnickoime: username,
                    id: idd,
                    lozinka: password

                }
            })
                .then(function (response) {
                    console.log("response");
                })
            //console.log(parametar)
        }


    setIndex(index){
         // var emp = this.state.data.filter(element => {
         //   return element.prezime.includes(index);
         // });

        var emp;
        for(var i=0;i<this.state.data.length;i++){
            if(this.state.data[i].id==index){
                emp=this.state.data[i];
            }
        }
         //alert(index)
         //alert(index);
        //var emp = this.state.data[0];
         //emp.index = index;
        this.setState({
            isFormVisible: true
        }, () => this.setState({
            currentEmp: emp,
            query: "",
            data: [],
            filteredData: [],
            index,


        }));
    }

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

    send(parametar){
        axios.get('/deleteUserAdmin', {
            params: {
                sifra: parametar
            }
        })
            .then(function (response) {
                console.log("response");
            })
        //console.log(parametar)
    }

    refresh(){
        window.location.reload(true)
    }

    display(){
        alert(<Editcomponent></Editcomponent>)
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
                {this.state.isFormVisible &&
                <Editcomponent currentEmp={this.state.currentEmp}></Editcomponent>

                }

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
                                <th>Лозинка</th>

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
                                            <td>{user.lozinka}</td>
                                            <td>
                                            <button type="button" className="btn btn-primary btn-sm" onClick={()=> {this.send(user.korisnickoIme); this.refresh()}} >Delete
                                            </button>
                                            </td>

                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm" onClick={()=>{this.setIndex(user.id)}}>Edit
                                                </button></td>
                                            <td></td>
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

export default Form;
