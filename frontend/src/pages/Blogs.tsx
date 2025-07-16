import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Spinner } from "../components/Spinner";
import { useBlogs } from "../hooks"

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
        return <div>
            <AppBar /> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl">
          {blogs.map(blog => 
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2 jab 1 2019"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Blogs;
