import React from 'react';
import {render} from 'react-dom';
import {EditableSelect} from '../../src/index';
import {Form, FormGroup, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    _onChange(ev) {
        console.log("ev=%o", ev)
        this.setState({value: ev.target.value});
    }

    render() {
        const {value} = this.state;

        return <Form>
            <FormGroup>
                <Label for="input">Input:</Label>
                <EditableSelect name="input"
                                value={value}
                                options={["", "exists"]}
                                onChange={(ev) => this._onChange(ev)}/>
            </FormGroup>
        </Form>;
    }
}

render(<App/>, document.getElementById("root"));
