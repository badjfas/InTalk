import React from "react";
import Posts from "../../components/Post";

const FeedPresenter = ({ postData, refetch, setPosts, history }) => {
    return (
        <div className="feed" style={{ display: "flex", paddingTop: "3rem" }}>
            <div className="feed_container" style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Posts postData={postData} refetch={refetch} setPosts={setPosts} history={history} />
            </div>
        </div>
    );
};

export default FeedPresenter;
