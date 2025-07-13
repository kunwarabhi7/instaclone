import React from "react";
import InstaMainImg from './assets/images/feed.jpg';

const Feeds = () => {
    return (
        <>
            <div className="feed row">
                <div className="feedflex col-md-4">
                    <div className="feedbox">
                        <img src={InstaMainImg} alt="inst"/>
                        <p>Hey!!!!</p>
                    </div>
                </div>
                <div className="feedflex col-md-4">
                    <div className="feedbox">
                        <img src={InstaMainImg} alt="inst"/>
                        <p>Hey!!!!</p>
                    </div>
                </div>
                <div className="feedflex col-md-4">
                    <div className="feedbox">
                        <img src={InstaMainImg} alt="inst"/>
                        <p>Hey!!!!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feeds;