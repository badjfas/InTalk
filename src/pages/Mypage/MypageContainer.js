import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME } from "../../libs/SharedQuery";
import MypagePresenter from "./MypagePresenter";
import queryString from "query-string";

const MypageContainer = props => {
    const [getMe, { data, loading }] = useLazyQuery(ME);

    const [queryData, setQueryData] = useState(queryString.parse(props.location.search));
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);

        const query = queryString.stringify(queryData, {
            arrayFormat: "comma",
            skipEmptyString: true,
            skipNull: true
        });
        if (queryString.stringify(queryString.parse(props.location.search)) === query) {
            return;
        }
        props.history.push(`/mypage?${query}`);
    }, [queryData]);
    console.log(queryData);
    useEffect(() => {
        getMe();
    }, [getMe]);

    return (
        <MypagePresenter
            data={data}
            loading={loading}
            {...props}
            queryData={queryData}
            setQueryData={setQueryData}
            visible={visible}
            setVisible={setVisible}
        />
    );
};

export default MypageContainer;
