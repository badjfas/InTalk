import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SEE_POSTS } from "./post";
import FeedPresenter from "./FeedPresenter";
import queryString from "query-string";
import { DecodeToken } from "../../libs/decodeToken";
import { ME } from "../../libs/SharedQuery";

const FeedContainer = props => {
    const {
        location: { search }
    } = props;
    const [queryData, setQueryData] = useState();

    const { user: userData } = DecodeToken(localStorage.getItem("token"));
    //게시물 리스트
    const { data: posts, fetchMore, refetch } = useQuery(SEE_POSTS, {
        variables: {
            itemNum: 3,
            departmentId: queryData?.depart ? parseInt(queryData?.depart) : 0
        }
    });
    const { data: me } = useQuery(ME);
    //스크롤 데이터 패칭
    const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            fetchMore({
                variables: {
                    itemNum: posts?.seePosts?.rows?.length + 3,
                    departmentId: queryData?.depart ? parseInt(queryData?.depart) : 0
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                        return {
                            seePosts: { ...prev.seePosts }
                        };
                    }

                    return {
                        ...posts,
                        seePosts: Object.assign(
                            {},
                            { ...prev.seePosts },
                            {
                                ...fetchMoreResult.seePosts
                            }
                        )
                    };
                }
            });
        }
    };
    //스크롤 랜더링
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    // 학부 쿼리 스트릥
    useEffect(() => {
        const query = queryString.stringify(queryData, {
            arrayFormat: "comma",
            skipEmptyString: true,
            skipNull: true
        });

        if (queryString.stringify(queryString.parse(search)) === query) {
            return;
        }

        props.history.push(`/?${query}`);
    }, [props.history, queryData, search]);

    return (
        <FeedPresenter
            postData={posts}
            meData={me}
            refetch={refetch}
            queryData={queryData}
            setQueryData={setQueryData}
            userData={userData}
        />
    );
};

export default FeedContainer;
