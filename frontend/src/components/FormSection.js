import React from "react";

export default function Section(props) {
    return (
        <section style={{
            margin: "10px 0"
            }}>
            {props.children}
            <hr/>
        </section>
    )
}