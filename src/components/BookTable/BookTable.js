import React, {Component} from "react";
import st from "../BookTable/padding-style.css"
import axios from "../../custom-axios/axios";
import Editcomponent from "../editcomponent/editcomponent";
import ReactDOM from "react-dom";
import App from "../../App";
import EditBook from "../editcomponent/editBookComponent";
class ListBooks extends Component {

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
    refresh(){
        window.location.reload(true)
    }
    send(parametar){
        axios.get('/deleteBookAdmin', {
            params: {
                sifra: parametar
            }
        })
            .then(function (response) {
                console.log("response");
            })
        //console.log(parametar)
    }

    update(ime1, prezime1, korisnickoime1,id1, lozinka1){
        axios.get('/updateUserAdmin', {
            params: {
                ime: ime1,
                prezime: prezime1,
                korisnickoime: korisnickoime1,
                id: id1,
                lozinka: lozinka1
            }
        })
            .then(function (response) {
                console.log("response");
            })
        //console.log(parametar)
    }
    showUpdate() {

        // eslint-disable-next-line no-undef




    }
    render() {
        return (
            <div className="searchForm" >
                <div className={st.p}>
                <form className={st.p}>
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
                    {this.state.isFormVisible &&
                    <EditBook currentEmp={this.state.currentEmp}></EditBook>

                    }
                </div>


                <div className="container">
                    <h3>Книги</h3>
                    <div className="container">
                        <table className="table">
                            <thead>
                            <tr>

                                <th>Шифра на книга</th>
                                <th>Име на книга</th>
                                <th>Автор</th>
                                <th>Број на примероци</th>
                                <th>Опис</th>
                                <th>Слика</th>



                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.filteredData.map(
                                    user =>
                                        <tr id="one">
                                            <td>{user.id}</td>
                                            <td>{user.ime}</td>
                                            <td>{user.avtor}</td>
                                            <td>{user.kapacitet}</td>

                                            <td>{user.opis}</td>
                                            <td>{user.adresa_slika}</td>

                                            <td>

                                                <button className="btn btn-primary btn-sm" onClick={()=> {this.send(user.ime); this.refresh()}}  >Delete
                                                </button>
                                                </td>
                                            <td>
                                                <button type="button" className="btn btn-secondary btn-sm" onClick={()=>{this.setIndex(user.id)}}>Edit
                                                </button>
                                            </td>


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
export default ListBooks;
