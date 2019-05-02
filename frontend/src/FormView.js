import React from "react";
import Form from "react-bootstrap/Form";
import $ from "jquery";

import Custom from "./components/Custom";

export default class FormView extends React.Component {
    constructor() {
        super();

        this.state = {data: null};
    }

    componentDidMount() {
        $.ajax({
            url: `/api/v1/form/${this.props.params.id}`,
            method: "GET", 
            dataType: "json"
        })
        .done((resp) => {
            this.setState({data: resp});
        })
        .fail((err) => {
            console.error("There was an error", err);
        });
    }

    render() {
        console.log("JSON", this.state.data);
        return (
           <Form>
               {/* Only load the FieldGroup when JSON is recieved */}
               {this.state.data ? <Custom.FieldGroup data={this.state.data} /> : "Loading..."}
           </Form>
        );
    }
}