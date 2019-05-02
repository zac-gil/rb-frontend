import React from "react";
import Form from "react-bootstrap/Form";
import Custom from "./Custom";

/*
Each child has ability to change its "mode" in parent's state

*/

export default class FieldGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: props.data };
    }

    toggle = (section, name) => {
        // State is immutable so make copies (you just have to, I don't know why)
        let data = this.state.data, fields = this.state.data.sections[section].fields;
        const index = fields.findIndex(field => field.name == name);

        if(fields[index]) {
            fields[index].options.hidden = !fields[index].options.hidden;
            data.sections[section].fields = fields;

            // Update, and viola!
            this.setState({ data: data });
        }
    }

    renderData() {
        const data = this.state.data;

        // Should probably find out a cleaner way of doing this...
        const sections = data.sections.map((section, sectionIndex) => {
            return (
                <Custom.Section key={sectionIndex}>
                    <Custom.Heading>{section.title}</Custom.Heading>
                    <Custom.SubHeading>{section.description}</Custom.SubHeading>
                    {
                        section.fields.map((field, fieldIndex) => {
                            // Bypass manual input by not using JSX. Clean.
                            return React.createElement(Custom.Input, {...field, toggle: this.toggle, section: sectionIndex, key: fieldIndex}, null);
                        })
                    }
                </Custom.Section>
            );
        });

        return (
            <Form>
                <Custom.Title>{ data.title }</Custom.Title>
                { sections }
            </Form>
        );
    }

    render() {
        return (
            <Form.Group>
                { this.renderData() }
            </Form.Group>
        );
    }
}