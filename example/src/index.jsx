import React from 'react';
import {render} from 'react-dom';
import {EditableSelect} from '../../src/index';
import {Card, CardBody, Form, FormGroup, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let idSeq = 1;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            options: [{id: idSeq++, name: 'Item A'},
                {id: idSeq++, name: 'Item B'},
                {id: idSeq++, name: 'Item C'}],
            textOptions: ["", "red", "green", "yellow"],
            textValue: ''
        };
    }

    _onTextOptionChange(ev) {
        const {selectedOption, options, textOptions} = this.state;
        this.setState({selectedOption, options, textOptions, textValue: ev.target.value});
        console.log("new value %o", ev.target.value);
    }

    _onChange(ev, option) {
        const {options, textOptions, textValue} = this.state;
        this.setState({selectedOption: option, options, textOptions, textValue});
        console.log("new value %o", option);
    }

    render() {
        const {selectedOption, options, textOptions, textValue} = this.state;

        return (<React.Fragment><Card>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="input">Input:</Label>
                        <EditableSelect name="input"
                                        value={selectedOption}
                                        options={options}
                                        getOptionValue={(o) => o ? o.id : '__empty'}
                                        getOptionLabel={(o) => o ? o.name : ''}
                                        createOption={(n) => {
                                            return {id: idSeq++, name: n}
                                        }}
                                        onChange={(ev, option) => this._onChange(ev, option)}/>
                    </FormGroup>
                </Form>
            </CardBody>
        </Card>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label for="input2">Input2:</Label>
                            <EditableSelect name="input2"
                                            value={textValue}
                                            options={textOptions}
                                            onChange={(ev, textOption) => this._onTextOptionChange(ev, textOption)}/>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card></React.Fragment>);
    }
}

render(<App/>, document.getElementById("root"));
