import React, { useState } from "react";
import { IoIosAddCircleOutline, IoIosRemoveCircle } from "react-icons/io";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding: 1rem 1rem 1rem 0.3rem;
    position: relative;
    > span {
        font-size: 0.85rem;
        margin-left: 1rem;
    }
    svg {
        right: 20px;
        position: absolute;
        font-size: 1.5rem;
        top: 33%;
    }
`;
const FriendList = ({ data, invite, toggleInvite }) => {
    const [selected, setSelected] = useState(false);
    return (
        <Wrapper
            onClick={() => {
                toggleInvite(data.id);
                setSelected(!selected);
            }}
        >
            <Avatar src={data.avatar} size={2.3} radius={30} />
            <span className="name"> {data.fullName}</span>
            {selected ? (
                <div>
                    <IoIosRemoveCircle />
                </div>
            ) : (
                <div>
                    <IoIosAddCircleOutline />
                </div>
            )}
        </Wrapper>
    );
};

export default FriendList;
