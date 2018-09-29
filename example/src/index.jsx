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
                {id: idSeq++, name: 'Item C'}]
        };
    }

    _onChange(ev, option) {
        console.log("onChange(ev,option=%o)", option)
        this.setState({selectedOption: option});
    }

    render() {
        const {selectedOption, options} = this.state;

        return (<Card>
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
        </Card>);
    }
}

render(<App/>, document.getElementById("root"));
