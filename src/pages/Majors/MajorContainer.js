import { useQuery } from "@apollo/client";
import React from "react";
import { SEE_MAJORS } from "./major";
import MajorPresenter from "./MajorPresenter";

const MajorContainer = () => {
    const { data, loading } = useQuery(SEE_MAJORS);
    console.log(data);
    return <MajorPresenter />;
};

export default MajorContainer;
