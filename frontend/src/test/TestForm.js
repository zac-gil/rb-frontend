import React from "react";
import Form from "react-bootstrap/Form";
import $ from "jquery";

export default class TestForm extends React.Component {
    componentDidMount() {
        $.get("http://localhost:4000/form/1")
        .done((resp) => {
            console.info(resp);
        })
        .fail((err) => {
            console.error(err);
        });
    }

    render() {
        return (
            <Form>
                <h1>Hello</h1>
            </Form>
        );
    }
}