// LikeButton.js

import React, { useState } from "react";

export default function LikeButton({ likes }) {
    const [likeCount, setLikeCount] = useState(likes);

    const handleLikeClick = () => {
        setLikeCount(prevCount => prevCount + 1);
        // You can also send an API request here to update the likes count in the database
    };

    return (
        <button className="btn btn-primary" onClick={handleLikeClick}>
            {likeCount} Likes
        </button>
    );
}
