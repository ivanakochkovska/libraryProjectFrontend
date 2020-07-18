import React, {Component} from "react";
import axios from "../../custom-axios/axios";
class EditBook extends React.Component{

    constructor(props) {
        super(props);
        this.state = { sifraKniga: '',imeKniga:'', avtorKniga: '', kapacitet: '', opis: '', slika:''};

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

                sifraKniga: this.props.currentEmp.id,
                imeKniga: this.props.currentEmp.ime,
                avtorKniga: this.props.currentEmp.avtor,
                kapacitet: this.props.currentEmp.kapacitet,
                opis: this.props.currentEmp.opis,
                slika: this.props.currentEmp.adresa_slika,
            });
        }
    }

    saveMethod(sifraKniga1,imeKniga1,avtorKniga1,kapacitet1,opis1,slika1){

        axios.get('/updateBookAdmin', {
            params: {

                sifraKniga: sifraKniga1,
                imeKniga: imeKniga1,
                avtorKniga: avtorKniga1,
                kapacitet: kapacitet1,
                opis: opis1,
                slika: slika1

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
                    Шифра на книга:
                </label>
                <input onChange={this.onHandleChange} value={this.state.sifraKniga} name="sifraKniga" className="form-control" type="text" ></input>

                <label>
                    Име на книга:
                </label>
                <input onChange={this.onHandleChange} value={this.state.imeKniga} name="imeKniga" className="form-control" type="text" ></input>

                <label>
                    Автор:
                </label>
                <input onChange={this.onHandleChange} value={this.state.avtorKniga} name="avtorKniga" className="form-control" type="text" ></input>


                <label>
                    Капацитет:
                </label>
                <input onChange={this.onHandleChange} value={this.state.kapacitet} name="kapacitet" className="form-control" type="text" ></input>

                <label>
                    Опис:
                </label>
                <input onChange={this.onHandleChange} value={this.state.opis} name="opis" className="form-control" type="text" ></input>

                <label>
                    Слика:
                </label>
                <input onChange={this.onHandleChange} value={this.state.slika} name="slika" className="form-control" type="text" ></input>
                <button type="button" onClick={()=>{this.saveMethod(this.state.sifraKniga,this.state.imeKniga, this.state.avtorKniga, this.state.kapacitet, this.state.opis, this.state.slika);this.refresh()}}>Save</button>
            </form>


        )
    }
}
export default EditBook;
