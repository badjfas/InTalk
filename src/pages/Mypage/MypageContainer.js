import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ME } from "../../libs/SharedQuery";
import MypagePresenter from "./MypagePresenter";

const MypageContainer = () => {
    const [getMe, { data, loading }] = useLazyQuery(ME);

    useEffect(() => {
        getMe();
    }, [getMe]);

    return <MypagePresenter data={data} loading={loading} />;
};

export default MypageContainer;
