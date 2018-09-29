import React from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    Button
} from 'reactstrap';
import './EditableSelect.css';
import 'font-awesome/css/font-awesome.css';

const NO_OPTIONS = [];

function key(s) {
    return "_" + s.replace(/\W+/g, "_");
}

export class EditableSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {editable: true};
    }

    _onEnableSelectClicked(ev) {
        console.log("ev=%o type=%o", ev, ev.type)
        this.setState({editable: false});
    }

    _onEnableTextClicked(ev) {
        console.log("ev=%o type=%o", ev, ev.type)
        this.setState({editable: true});
    }

    _onSelectBlur(ev) {
        console.log("ev=%o type=%o", ev, ev.type)
        this.setState({editable: true});
    }

    render() {
        const {value, options, onChange, name, id} = this.props;
        const {editable} = this.state;

        if ((!options || options.length === 0) && !editable) {
            console.warn("Mode !editable but no options set.");
        }

        const valueIndex = (options || NO_OPTIONS).indexOf(value);
        if (!!value && valueIndex === -1) {
            // options.unshift(value);
        }

        const toggleEditableButtonHasFocus = (document.activeElement && document.activeElement.classList.contains("Select2__ToggleButton"));

        let input;
        if (!editable) {
            input = <Input autoFocus={toggleEditableButtonHasFocus && !editable}
                           type="select"
                           onBlur={(ev) => this._onSelectBlur(ev)}
                           name={name} id={id}
                           onChange={onChange}
                           value={value}>
                {options.map((option) => {
                    return <option key={key(option)} value={option}>{option}</option>;
                })}
            </Input>
        } else {
            input = <Input autoFocus={toggleEditableButtonHasFocus && editable}
                           type="text"
                           onClick={(ev) => console.log("clicked")}
                           name={name}
                           id={id}
                           onChange={onChange}
                           value={value}/>
        }

        return (<InputGroup>
            {input}
            <InputGroupAddon addonType="append">
                <Button color="secondary"
                        className="Select2__ToggleButton"
                        disabled={!editable}
                        onClick={(ev) => {
                            if (editable)
                                this._onEnableSelectClicked(ev)
                            else {
                                ev.stopPropagation();
                                ev.preventDefault()
                            }
                        }}><i
                    className={!editable ? "fa fa-edit" : "fa fa-list"}></i></Button>
            </InputGroupAddon>
        </InputGroup>);
    }
}

