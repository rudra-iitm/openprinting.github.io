"use client";
import { DiscussionEmbed } from "disqus-react";

interface Post {
  id: string;
  title: string;
}

const DisqusComments = ({ post }: { post: Post }) => {

  const disqusShortname = "your-disqus-shortname";
  const disqusConfig = {
    url: "https://your-site-url/post-slug",
    identifier: post.id,
    title: post.title,
  };

  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};

export default DisqusComments;
