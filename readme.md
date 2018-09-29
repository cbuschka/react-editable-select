# react-editable-select

### A select component that can be switched to text input to allow adding new elements.

## Prerequesites
* reactstrap
* bootstrap
* font-awesome
* yarn
* webpack
* es6

## Try it out
* Activate nodejs
```
nvm use
```

* Install yarn
```
npm -g install yarn
```

* Start webpack dev server
```
yarn start
```

* Goto http://localhost:3001/

## How to use

```
import {EditableSelect} from 'react-editable-select';

...

<EditableSelect
    options={options}
    value={selectedOption}
    getOptionValue={(option) => option.id}
    getOptionLabel={(option) => option.name}
    createOption={(text) => { return {id: 1, name: text} }}
    onChange={(ev, option) => ...}
    />
```

| Property | Description |
| --- | --- |
| options | Array of options |
| value | Currently selected option |
| getOptionValue | Callback to convert option into option key |
| getOptionLabel | Callback to convert option into option label |
| createOption | Callback to create a new option |
| onChange | Callback invoked when option is selected or text field changes |

## License
[MIT](./license.txt)
