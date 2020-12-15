import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SEE_POSTS } from "./post";
import FeedPresenter from "./FeedPresenter";
import { DecodeToken } from "../../libs/decodeToken";
const FeedContainer = props => {
    const { user: userData } = DecodeToken(localStorage.getItem("token"));
    const scrollEl = useRef(null);
    //게시물 리스트
    const [posts, setPosts] = useState([]);
    const { data: post, refetch, loading } = useQuery(SEE_POSTS, {
        variables: {
            itemNum: 3,
            departmentId: 0
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: () => setPosts({ ...post })
    });
    //스크롤 데이터 패칭
    const handleScroll = useCallback(async () => {
        const scrollHeight = scrollEl.current.scrollHeight;
        const scrollTop = scrollEl.current.scrollTop;
        const clientHeight = scrollEl.current.clientHeight;
        if (scrollEl.current !== undefined && scrollTop + clientHeight + 100 >= scrollHeight) {
            try {
                if (posts?.seePosts?.count !== post?.seePosts?.rows?.length) {
                    const data = await refetch({ itemNum: posts?.seePosts?.rows?.length + 3, departmentId: 0 });
                    setPosts(prev => {
                        return {
                            prevPosts: prev.seePosts,
                            seePosts: {
                                rows: [...data.data.seePosts.rows]
                            }
                        };
                    });
                }
            } catch (e) {
                console.warn(e);
            }
        }
    }, [post?.seePosts?.rows?.length, refetch, posts?.seePosts?.count, posts?.seePosts?.rows?.length]);
    useEffect(() => {
        if (loading) {
            scrollEl.current.style.cssText = "overflow : hidden;";
        } else {
            scrollEl.current.style.cssText = "overflow : scroll;";
        }
    }, [loading]);
    useEffect(() => {
        return () => {
            setPosts({});
        };
    }, []);
    return (
        <FeedPresenter
            postData={posts}
            refetch={refetch}
            userData={userData}
            setPosts={setPosts}
            {...props}
            loading={loading}
            scrollEl={scrollEl}
            handleScroll={handleScroll}
        />
    );
};

export default FeedContainer;
