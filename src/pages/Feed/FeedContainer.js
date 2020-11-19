import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { SEE_POSTS } from "./post";
import FeedPresenter from "./FeedPresenter";
import { DecodeToken } from "../../libs/decodeToken";

const FeedContainer = props => {
    const { user: userData } = DecodeToken(localStorage.getItem("token"));

    //게시물 리스트
    const [posts, setPosts] = useState({});
    const { data: post, refetch } = useQuery(SEE_POSTS, {
        variables: {
            itemNum: 3,
            departmentId: 0
        },
        onCompleted: () => setPosts({ ...post })
    });

    //스크롤 데이터 패칭
    const handleScroll = useCallback(async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            try {
                const data = await refetch({ itemNum: posts?.seePosts?.rows?.length + 3, departmentId: 0 });
                setPosts(prev => {
                    return {
                        prevPosts: prev.seePosts,
                        seePosts: {
                            rows: [...data.data.seePosts.rows]
                        }
                    };
                });
            } catch (e) {
                console.warn(e);
            }
        }
    }, [posts?.seePosts?.rows?.length]);

    //스크롤 랜더링
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    useEffect(() => {
        return () => {
            console.log("feedsclean up");
            setPosts({});
        };
    }, []);

    return <FeedPresenter postData={posts} refetch={refetch} userData={userData} setPosts={setPosts} />;
};

export default FeedContainer;
