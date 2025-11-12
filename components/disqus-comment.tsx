"use client";
import { DiscussionEmbed } from "disqus-react";

interface Post {
  id: string;
  title: string;
}

const DisqusComments = ({ post }: { post: Post }) => {
  if (process.env.NODE_ENV !== "production") {
    return (
      <div className="text-gray-400 italic mt-6 text-center">
        Comments are disabled in local mode.
      </div>
    );
  }

  const disqusShortname = "openprinting"; 
  const disqusConfig = {
    url: `https://openprinting.github.io/news/${post.id}`, 
    identifier: post.id,
    title: post.title,
  };

  return (
    <div className="mt-10">
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};

export default DisqusComments;
