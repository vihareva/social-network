import React from 'react';
import preloader from "../../assets/svg_transp.png";

let Preloader = () => {
    return <div  style={ { backgroundColor: 'white' } }>
        <img src={preloader} />
    </div>
}

export default Preloader;