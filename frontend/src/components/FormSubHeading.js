import React from "react";

export default function SubHeading(props) {
    return (
        <section style={{margin: "10px 0", fontWeight: "300", fontStyle: "italic", color: "grey"}}>
            <h6>{props.children}</h6>
        </section>
    );
}