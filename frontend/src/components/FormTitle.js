import React from "react";

export default function Title(props) {
    return (
        <section>
            <h1>{props.children}</h1>
        </section>
    );
}