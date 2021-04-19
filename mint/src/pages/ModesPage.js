import { useSelector } from 'react-redux';

import ControlCard from '../components/ControlCard';
import sun from '../assets/img/svg/sun.svg';
import moon from '../assets/img/svg/moon.svg';
import security from '../assets/img/svg/security.svg';


function ModesPage() {

    const modes = useSelector((state) => state.firestore.data.modes);
    return (
        <section className="spad-2">
            <div className="container">
                <div className="mt-3">
                    <div className="row">
                    <div className="col-12">
                        <section className='spad-2 iconText'>
                            <div className="card card-holder">
                                <div className="row">
                                    <div className="col-12">
                                        <h4 className="p-3">Modes</h4>
                                    </div>
                                </div>
                                <div className="container mt-3">
                                    <div className="row text-center">
                                        <div className="col-12">
                                            <div className="row">
                                                {
                                                    modes ?
                                                    <>
                                                    <ControlCard 
                                                        id={modes["Day mode"].id} 
                                                        name={modes["Day mode"].name} 
                                                        value={modes["Day mode"].value} 
                                                        docName="modes"
                                                        imgName={sun}
                                                    />
                                                    <ControlCard 
                                                        id={modes["Night mode"].id} 
                                                        name={modes["Night mode"].name} 
                                                        value={modes["Night mode"].value} 
                                                        docName="modes"
                                                        imgName={moon}
                                                    />
                                                    <ControlCard 
                                                        id={modes["Security mode"].id} 
                                                        name={modes["Security mode"].name} 
                                                        value={modes["Security mode"].value} 
                                                        docName="modes"
                                                        imgName={security}
                                                    />
                                                    </> : <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ModesPage;