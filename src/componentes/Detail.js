import React from 'react';

const Detail = ({album, artists, name}) => {

    return (
        <div className="row d-flex justify-content-between offset-md-1 col-sm-12" >
            <div className="col-sm-8 px-0">
                <img 
                    src={album.images[0].url}
                    alt={name}>                    
                </img>
            </div>
            <div className="col-sm-12 px-0">
                <label htmlFor={name} className="form-label col-sm-12">
                    {name}
                </label>
            </div>
            <div className="col-sm-12 px-0">
                <label htmlFor={artists[0].name} className="form-label col-sm-12">
                    {artists[0].name}
                </label>
            </div>
        </div>
    );
}

export default Detail;