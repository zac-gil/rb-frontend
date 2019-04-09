import React from "react";

export default function Heading(props) {
    return (
        <section style={{margin: "10px 0"}}>
            <h4>{props.children}</h4>
        </section>
    );
}

{/* <h6 style={{
    color: "grey",
    fontSize: "14px",
    fontWeight: "500",
    fontFamily: "Gill Sans",
    textTransform: "uppercase", 
    backgroundColor: "white",
    zIndex: "10",
    display: "inline-block",
    position: "relative",
    margin: "0 auto",
    padding: "0 5px",
    boxSizing: "border-box",
    left: "0", right: "0", top: "-30px",
    lineHeight: "30px",
    }}>
    {props.children}
</h6> */}