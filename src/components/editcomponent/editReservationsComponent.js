import React, {Component} from "react";
import axios from "../../custom-axios/axios";
class EditRes extends React.Component{

    constructor(props) {
        super(props);
        this.state = {sifraRez: '', sifraKor: '', sifraKniga: '',imeKniga:'', avtorKniga: '', startt: '', endd: ''};

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
                sifraRez: this.props.currentEmp.id,
                sifraKor: this.props.currentEmp.id_korisnik,
                sifraKniga: this.props.currentEmp.id_kniga,
                imeKniga: this.props.currentEmp.imeKniga,
                avtorKniga: this.props.currentEmp.avtor,
                startt: this.props.currentEmp.pocetenDatum,
                endd: this.props.currentEmp.kraenDatum,
            });
        }
    }

    saveMethod(sifraRez1, sifraKor1,sifraKniga1,imeKniga1,avtorKniga1,start1,end1){

        axios.get('/updateReservationAdmin', {
            params: {
                sifraRez: sifraRez1,
                sifraKor: sifraKor1,
                sifraKniga: sifraKniga1,
                imeKniga: imeKniga1,
                avtorKniga: avtorKniga1,
                startt: start1,
                endd: end1

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
                    Шифра на резервација:
                </label>
                <input onChange={this.onHandleChange} value={this.state.sifraRez} className="form-control" type="text" name="sifraRez" ></input>

                <label>
                    Шифра на корисник:
                </label>
                <input  onChange={this.onHandleChange} value={this.state.sifraKor} name="sifraKor" className="form-control" type="text" ></input>

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
                    Почетен датум:
                </label>
                <input onChange={this.onHandleChange} value={this.state.startt} name="startt" className="form-control" type="text" ></input>

                <label>
                    Краен датум:
                </label>
                <input onChange={this.onHandleChange} value={this.state.endd} name="endd" className="form-control" type="text" ></input>
                <button type="button" onClick={()=>{this.saveMethod(this.state.sifraRez, this.state.sifraKor, this.state.sifraKniga,this.state.imeKniga, this.state.avtorKniga, this.state.startt, this.state.endd);this.refresh()}}>Save</button>
            </form>


        )
    }
}
export default EditRes;
