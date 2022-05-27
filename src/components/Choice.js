import React from "react";

export default function Choice(props) {
    var choiceClass
    React.useEffect(() => {props.revealed
        ?   (choiceClass = "choice"
                .concat(props.correct
                    ? "--correct"
                    : (props.selected ? "--incorrect" : "")))
        :   choiceClass = "choice"
                .concat(props.selected ? "--selected" : "--unselected")
    }, [props.selected, props.revealed])
    
    return (
        <button
            className={
                props.revealed
                ? "choice"
                    .concat(props.correct
                        ? "--correct"
                        : (props.selected ? "--incorrect" : ""))
                : "choice"
                    .concat(props.selected ? "--selected" : "--unselected")
            }
            style={{
                color: !props.selected && props.revealed ? "gray" : "#293264"
            }}
            onClick={props.selectChoice}
            disabled={props.revealed || props.selected}
        >{props.text}</button>
    )
}