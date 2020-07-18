import React, {Component} from "react";
import axios from "../../custom-axios/axios";
import Editcomponent from "../editcomponent/editcomponent";
import EditRes from "../editcomponent/editReservationsComponent";
class FormRes extends Component {

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



    refresh(){
        window.location.reload(true)
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
    send(parametar){
        axios.get('/deleteReservationAdmin', {
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
                {this.state.isFormVisible &&
                <EditRes currentEmp={this.state.currentEmp}></EditRes>

                }

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
                                            <td><button type="button" className="btn btn-primary btn-sm" onClick={()=>{ this.send(user.id_korisnik); this.refresh()}} >Delete
                                            </button></td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm" onClick={()=>{this.setIndex(user.id)}}>Edit
                                                </button></td>

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

export default FormRes;
