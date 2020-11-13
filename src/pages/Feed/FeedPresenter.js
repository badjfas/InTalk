import React from "react";
import Posts from "../../components/Post";

const FeedPresenter = ({ postData, refetch, meData, setOpenDepartMenu, userData }) => {
    return (
        <div className="feed" style={{ display: "flex" }}>
            <div className="feed_container" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Posts postData={postData} refetch={refetch} setOpenDepartMenu={setOpenDepartMenu} />
            </div>
        </div>
    );
};

export default FeedPresenter;
