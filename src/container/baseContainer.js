import Form from "../components/UserTable/UserTable";
import FormRes from "../components/UserReservations/UserReservations";
import ListBooks from "../components/BookTable/BookTable";
import React from "react";
import H from "../components/Header/header"
class BaseContainer extends React.Component{
    render() {
        return (
            <div>
                <H></H>
                <H></H>
                <H></H>
                <Form></Form>
                <FormRes></FormRes>
                <ListBooks/>
            </div>
        );
    }
}

export default BaseContainer;
