import React from 'react'


const Dropdown = props => {

    const dropdownChanged = e => {
        props.changed(e.target.value);

    }

    return (
        <div className="col-sm-12 form-group row">
            <label className="form-label col-sm-4">{props.label}</label>
            <select value={props.selectedValue} onChange={dropdownChanged} className="form-control form-control-sm col-sm-12">
                <option key={0}>Select...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>
        </div>

    );
}

export default Dropdown;