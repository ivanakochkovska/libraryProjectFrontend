import React, {Component} from "react";
import axios from "../../custom-axios/axios";
class Editcomponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {ime: '', prezime: '', korisnickoime: '', lozinka: '', idbaza: ''};

        this.onHandleChange = this.onHandleChange.bind(this);
        this.saveMethod=this.saveMethod.bind(this);

    }

    onHandleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    refresh(){
        window.location.reload(true)
    }
    componentDidUpdate(prevProps){
        if(prevProps.currentEmp != this.props.currentEmp){
            this.setState({
                ime: this.props.currentEmp.ime,
                prezime: this.props.currentEmp.prezime,
                korisnickoime: this.props.currentEmp.korisnickoIme,
                lozinka: this.props.currentEmp.lozinka,
                idbaza: this.props.currentEmp.id,
            });
        }
    }

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
    render(){
        return(

                <form>
                <label>
                    Име:
                </label>
                <input onChange={this.onHandleChange} value={this.state.ime} className="form-control" type="text" name="ime" ></input>

                <label>
                    Презиме:
                </label>
                <input  onChange={this.onHandleChange} value={this.state.prezime} name="prezime" className="form-control" type="text" ></input>

                <label>
                    Корисничко име:
                </label>
                <input onChange={this.onHandleChange} value={this.state.korisnickoime} name="korisnickoime" className="form-control" type="text" ></input>

                <label>
                    Шифра во база:
                </label>
                <input onChange={this.onHandleChange} value={this.state.idbaza} name="idbaza" className="form-control" type="text" ></input>

                <label>
                    Лозинка:
                </label>
                <input onChange={this.onHandleChange} value={this.state.lozinka} name="lozinka" className="form-control" type="text" ></input>
                <button type="button" onClick={()=>{this.saveMethod(this.state.ime, this.state.prezime, this.state.korisnickoime,this.state.idbaza, this.state.lozinka);this.refresh()}}>Save</button>
                </form>


        )
    }
}
export default Editcomponent;
