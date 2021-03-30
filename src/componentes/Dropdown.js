import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const Dropdown = props => {

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }

    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (



        <div className="col-lg-12 form-group row">

            <FormControl required className={classes.formControl}>
                <InputLabel id="demo-simple-select-required-label">{props.label}</InputLabel>
                <Select value={props.selectedValue} onChange={dropdownChanged}
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required">
                    
                    <MenuItem key={0}>
                        <em>Select...</em>
                    </MenuItem>
                    {props.options.map((item, idx) => <MenuItem key={idx + 1} value={item.id}>{item.name}</MenuItem>)}
                </Select>
                <FormHelperText>Seleccionar...</FormHelperText>
            </FormControl>
        </div>

    );
}

export default Dropdown;