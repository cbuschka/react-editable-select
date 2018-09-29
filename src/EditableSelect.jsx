import React from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    Button
} from 'reactstrap';
import './EditableSelect.css';
import 'font-awesome/css/font-awesome.css';

function identityFunc(x) {
    return x;
}

export class EditableSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {editable: false};
    }

    _onSelectChange(ev) {
        const value = ev.target.value;
        const {options} = this.props;
        const optionIndex = this._getOptionIndexByValue(value);
        const createOption = this.props.createOption || identityFunc;
        if (optionIndex === -1) {
            const option = createOption(value);
            this.props.onChange(ev, option);
        } else {
            const option = options[optionIndex];
            this.props.onChange(ev, option);
        }
    }

    _getOptionIndexByOption(option) {
        const getOptionValue = this.props.getOptionValue || identityFunc;
        const value = getOptionValue(option);
        return this._getOptionIndexByValue(value);
    }

    _getOptionIndexByValue(value) {
        const getOptionValue = this.props.getOptionValue || identityFunc;
        const {options} = this.props;
        if (!options) {
            return -1;
        }

        for (let i = 0; i < options.length; ++i) {
            if (value == getOptionValue(options[i])) {
                return i;
            }
        }

        return -1;
    }

    _getOptionIndexByLabel(label) {
        const getOptionLabel = this.props.getOptionLabel || identityFunc;
        const {options} = this.props;
        if (!options) {
            return -1;
        }

        for (let i = 0; i < options.length; ++i) {
            if (label == getOptionLabel(options[i])) {
                return i;
            }
        }

        return -1;
    }

    _onInputBlur(ev) {
        const optionIndex = this._getOptionIndexByLabel(ev.target.value);
        if (optionIndex !== -1) {
            this.setState({editable: false});
        }
    }

    _onEditClicked(ev) {
        this.setState({editable: true});
    }

    _onInputChange(ev) {
        const {options} = this.props;
        const value = ev.target.value;
        const optionIndex = this._getOptionIndexByLabel(value);
        if (optionIndex !== -1) {
            const option = options[optionIndex];
            this.props.onChange(ev, option);
        }
        else {
            const createOption = this.props.createOption || identityFunc;
            const option = createOption(ev.target.value);
            this.props.onChange(ev, option);
        }
    }

    render() {
        const {value, options, name, id} = this.props;
        const getOptionValue = this.props.getOptionValue || identityFunc;
        const getOptionLabel = this.props.getOptionLabel || identityFunc;
        let {editable} = this.state;

        const optionIndex = this._getOptionIndexByOption(value);
        if (!!value && optionIndex === -1) {
            editable = true;
        }

        const toggleEditableButtonHasFocus = (document.activeElement && document.activeElement.classList.contains("Select2__ToggleButton"));

        return <InputGroup>
            {!editable ?
                <Input autoFocus={toggleEditableButtonHasFocus && !editable}
                       type="select"
                       name={name} id={id}
                       onChange={(ev) => this._onSelectChange(ev)}
                       value={getOptionValue(value) || ''}>
                    {options.map((option) => {
                        return <option key={getOptionValue(option)}
                                       value={getOptionValue(option)}>{getOptionLabel(option)}</option>;
                    })}
                </Input>
                : <Input autoFocus={toggleEditableButtonHasFocus && editable}
                         type="text"
                         onBlur={(ev) => this._onInputBlur(ev)}
                         name={name}
                         id={id}
                         onChange={(ev) => this._onInputChange(ev)}
                         value={getOptionLabel(value) || ''}/>}
            <InputGroupAddon addonType="append">
                <Button color="secondary"
                        className="Select2__ToggleButton"
                        disabled={editable}
                        onClick={(ev) => this._onEditClicked(ev)}><i
                    className={!editable ? "fa fa-edit" : "fa fa-list"}></i></Button>
            </InputGroupAddon>
        </InputGroup>;
    }
}
