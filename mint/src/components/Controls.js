import React from 'react';

import ControlCard from './ControlCard';

function IconText({info}) {
    
    let itemList = (cards) => Object.keys(cards).map((key, index) => {
        return(
            <ControlCard id={cards[key].id} name={cards[key].name} value={cards[key].value} key={key} docName={cards[key].docName}/>
        );
    })

    return (
        <section className='spad-2 iconText'>
            <div className="card card-holder">
                <div className="row">
                    <div className="col-12">
                        <h4 className="p-3">{info.heading}</h4>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row text-center">
                        <div className="col-12">
                            <div className="row">
                                {/* { info.cards?  itemList : <></>} */}
                                {
                                    info.cards && itemList(info.cards)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default IconText;