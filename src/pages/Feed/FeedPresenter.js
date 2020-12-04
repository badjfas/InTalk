import React from "react";
import Posts from "../../components/Post";

const FeedPresenter = ({ postData, refetch, setPosts, history, scrollEl, loading, handleScroll }) => {
    return (
        <Posts
            postData={postData}
            refetch={refetch}
            setPosts={setPosts}
            history={history}
            scrollEl={scrollEl}
            loading={loading}
            handleScroll={handleScroll}
        />
    );
};

export default FeedPresenter;
