import React from 'react';
import { useFirestore } from "react-redux-firebase";

import bulbOn from '../assets/img/svg/bulb.svg';
import bulbOff from '../assets/img/svg/bulb-off.svg';

function ControlCard({id, name, value, docName, imgName}) {
    const firestore = useFirestore();

    const handleChange = (event) => {
        if (event) {
            firestore.collection(docName).doc(event.target.name).update({
                value: event.target.checked
            });
        }
    };
    
    return(
        <div className="col-sm-12 col-md-4 col-lg-4 p-3 text-center">
            <div className="card h-100 ">
                {
                    imgName ? <img src={imgName} alt={"control"} height="100" className="mb-3" /> :
                            value ? 
                                (<img src={bulbOn} alt={name} height="100" className="mb-3" />) : 
                                (<img src={bulbOff} alt={name} height="100" className="mb-3" />)
                }
                <h5 className="font-weight-bold my-3 ">{name}</h5>
                <div className="d-flex justify-content-center">
                    <label className="switch">
                        <input 
                            type="checkbox"
                            name={name}
                            id={id}
                            onChange={handleChange}
                            checked={value} 
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default ControlCard;