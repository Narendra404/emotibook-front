import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LikeButton({ likes, id }) {
    const [likeCount, setLikeCount] = useState(likes);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`http://localhost:8080/post/${id}`);
                setLikeCount(response.data.likes);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }

        fetchPost();
    }, [id]);

    const handleLikeClick = async () => {
        if (!isLiked) {
            setLikeCount(prevCount => prevCount + 1); // Increment likeCount locally
            setIsLiked(true); // Disable the like button
            try {
                await axios.put(`http://localhost:8080/post/${id}`, {
                    likes: likeCount + 1 // Send the updated like count to the server
                });
            } catch (error) {
                console.error("Error updating likes:", error);
                // If there's an error, roll back the local like count and enable the button
                setLikeCount(prevCount => prevCount - 1);
                setIsLiked(false);
            }
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleLikeClick} disabled={isLiked}>
            {likeCount} Likes
        </button>
    );
}
