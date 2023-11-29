import React, { useEffect, useState } from "react";
import appwriteservice from "../appwrite/configration";
import { PostCard ,Container } from "../components/index";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {}, []);
  appwriteservice.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
