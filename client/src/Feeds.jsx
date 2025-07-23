import React from "react";
import InstaMainImg from './assets/images/feed.jpg';

const Feeds = () => {
    return (
        <>
            <div className="col-md-12">
            <div className="feed row  flex items-center bg-blue-500 px-4 py-3 text-white hover:bg-blue-400">
                <div className="feedflex ">
                    <div className="feedbox">
                        <img src={InstaMainImg} alt="inst"/>
                        <p>Hey!!!!</p>
                    </div>
                </div>
                <div className="feedflex">
                    <div className="feedbox">
                        <img src={InstaMainImg} alt="inst"/>
                        <p>Hey!!!!</p>
                    </div>
                </div>
                <div className="feedflex">
                    <div className="feedbox">
                        <img src={InstaMainImg} alt="inst"/>
                        <p>Hey!!!!</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default Feeds;