// Feed.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LikeButton from "../layout/LikeButton";

export default function Feed() {
    const { userId } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/${userId}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error("Error fetching user posts:", error);
            }
        };

        const fetchAllPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts`);
                setAllPosts(response.data);
            } catch (error) {
                console.error("Error fetching all posts:", error);
            }
        };

        fetchUserPosts();
        fetchAllPosts();
    }, [userId]);

    useEffect(() => {
        // Filter out the posts not done by the user
        const filtered = allPosts.filter(post => !userPosts.some(userPost => userPost.id === post.id));
        setFilteredPosts(filtered);
    }, [userPosts, allPosts]);

    return (
        <div className="container">
            <h2 className="text-center mt-4">Feed</h2>
            <div className="row">
                {filteredPosts.map(post => (
                    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow" key={post.id}>
                        <h5>{post.content}</h5>
                        {/*<p>Likes: {post.likes}</p>*/}
                        <LikeButton likes={post.likes} />
                    </div>
                ))}
            </div>
        </div>
    );
}
