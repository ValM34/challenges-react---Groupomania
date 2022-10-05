import React from 'react';

const Likes = ({ likesNumber }) => {


    return (
        <>
            <div className="likePublication">{likesNumber}</div>
        </>
    );
}

export default Likes;