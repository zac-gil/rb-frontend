import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { genKey } from "../Functions";

/*
    Sibling interaction

    Every child component is passed a "toggle" callback method from parent.
    Parent component handles change events and updates state accordingly.

    Stupidly complicated, but you can't use jQuery ".toggle()" in React
    *rolls eyes*
*/

class ImageInput extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            label: "Choose images"
        }
    }

    handleFileSelect = event => {
        let files = event.target.files;
        this.setState({label: files.length ? event.target.files[0].name : "No images chosen"});
        this.props.onChange(event);
    }

    render() {
        return (
            <div className="custom-file" key={genKey()}>
                <input
                    {...this.props}
                    type="file"
                    accept="image/*"
                    capture="camera"
                    className="custom-file-input"
                    onChange={this.handleFileSelect.bind(this)}
                />
                <div className="custom-file-label" key={genKey()}>
                    {this.state.label}
                </div>
            </div>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            rows: [],
            current: props.fields,
            fields: props.fields 
        };
    }

    change = event => {
        // Executed when a field in the bottom row is changed

        let mod = this.state.current;
        const index = mod.findIndex(field => {
            // Find the right field
            return field.name = event.target.name;
        });

        // Set the new value
        mod[index].value = event.target.value;

        // Set the state
        this.setState({current: mod});
    }

    render() {
        return (
            <Form.Group key={genKey()}>
                {
                    this.state.rows.map((row) => {
                        return React.createElement(
                            Form.Row, {key: genKey()}, 
                            row.map((field) => {
                                return React.createElement(
                                    Col, {key: genKey()}, 
                                    React.createElement(Input, field, null)
                                );
                            })
                        )
                    })
                } 
                {
                    React.createElement(
                        Form.Row, null, 
                        this.state.fields.map((field) => {
                            return React.createElement(
                                Col, {key: genKey()}, 
                                React.createElement(Input, {
                                    ...field,
                                    key: genKey(),
                                    change: this.change.bind(this)
                                }, null)
                            );
                        })
                    )
                }
                <Button variant="secondary"><b>+</b></Button>
            </Form.Group>
        );
    }
}

export default class Input extends React.Component {
    constructor() {
        super();
        this.state = {
            contents: null
        };
    }

    componentDidMount() {
        const inputProps = {
            id: this.props.name,
            name: this.props.name,
            placeholder: this.props.placeholder,
            onChange: (event) => {
                // If toggle controller, use inherited "toggle" function to change sibling
                // state via parent.
                if(this.props.options) {
                    if(this.props.options.toggle) {
                        this.props.toggle(this.props.section, this.props.options.toggle);
                    }
                    if(this.props.change) {
                        this.props.change(event);
                    }
                }
            }
        };

        if(this.props.required) inputProps.required = "required";

        switch(this.props.type) {
            // Multiple cases
            case "text": case "password": case "number": case "tel": case "url": case "email": 
                this.setState({
                    // Use without JSX syntax for neater and more efficient props
                    contents: React.createElement(
                        Form.Control, 
                        {...inputProps, type: this.props.type, key: genKey()}, 
                        null
                    )
                });
                break;
            case "checkbox": case "radio": 
                this.setState({
                    contents: React.createElement(
                        Form.Check,
                        {...inputProps, type: this.props.type, key: genKey()},
                        null
                    )
                });
                break;
            case "select":
                this.setState({
                    contents: React.createElement(
                        Form.Control,
                        {
                            ...inputProps, key: genKey(), 
                            as: "select", 
                            children: this.props.options.options.map((option) => {
                                let optionProps = {
                                    // "United Kingdom" -> "unitedkingdom"
                                    value: option.text.toLowerCase().replace(/ /g, "")
                                };

                                // Even selected='false' registers an option as selected, so
                                // must only add selected attr if necessary
                                if(this.props.options.selected == option.text) optionProps.selected = "selected"; 

                                return React.createElement(
                                    "option", 
                                    optionProps, 
                                    option.text
                                );
                            })
                        },
                        null
                    )
                });
                break;
            case "textarea":
                this.setState({
                    contents: React.createElement(
                        Form.Control,
                        { ...inputProps, as: "textarea", rows: "3", key: genKey() },
                        null
                    )
                });
                break;
            case "image":
                this.setState({
                    contents: React.createElement(
                        ImageInput, 
                        { ...inputProps, key: genKey() },
                        null
                    )
                });
                break;
            case "list":
                this.setState({
                    contents: React.createElement(
                        List,
                        { ...inputProps, fields: this.props.options.fields, key: genKey() },
                        null
                    )
                })
                break;
        }
    }

    render() {
        let style = {};
        if(this.props.options) {
            // The element's display may not be block, so only set
            // display if necessary
            if(this.props.options.hidden) style.display = "none";
        }

        return (
            <Form.Group style={style} key={genKey()}>
                <Form.Label>{this.props.label}</Form.Label>
                <p style={{ marginTop: "-10px" }}>
                    <small><em>{this.props.description}</em></small>
                </p>
                {this.state.contents}
            </Form.Group>
        );
    }
}