import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { LinkCard } from "@/components/LinkCard";
import { UserCard } from "@/components/UserCard";
import { Card } from "@/components/ui/card";
import { LoadingState } from "@/components/LoadingState";

const Home = () => {
  const [isLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const feedItems = [
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "", username: "@sarahc" },
      link: {
        title: "Amazing Portfolio Website Design Inspiration",
        url: "portfolio.design",
        description: "A collection of beautiful portfolio designs from top designers",
        thumbnail: "",
      },
      likes: 24,
      comments: 5,
      time: "2h ago",
    },
    {
      id: 2,
      user: { name: "Mike Johnson", avatar: "", username: "@mikej" },
      link: {
        title: "New Design Resources for 2024",
        url: "resources.dev",
        description: "Essential design tools and resources every designer should know",
        thumbnail: "",
      },
      likes: 18,
      comments: 3,
      time: "5h ago",
    },
    {
      id: 3,
      user: { name: "Emma Wilson", avatar: "", username: "@emmaw" },
      link: {
        title: "React Best Practices Guide",
        url: "react-guide.com",
        description: "Learn the best practices for building React applications",
        thumbnail: "",
      },
      likes: 32,
      comments: 8,
      time: "1d ago",
    },
  ];

  const handleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/80">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            LinkConnect
          </h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {isLoading ? (
          <LoadingState type="feed" count={3} />
        ) : (
          feedItems.map((item, index) => (
            <Card
              key={item.id}
              className="p-4 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <UserCard
                name={item.user.name}
                username={item.user.username}
                avatar={item.user.avatar}
                time={item.time}
                className="mb-3"
              />

              <LinkCard
                title={item.link.title}
                url={item.link.url}
                description={item.link.description}
                thumbnail={item.link.thumbnail}
                likes={item.likes + (likedPosts.includes(item.id) ? 1 : 0)}
                comments={item.comments}
                showActions
                onLike={() => handleLike(item.id)}
              />
            </Card>
          ))
        )}

        {!isLoading && feedItems.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
              <span className="text-3xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Links Yet</h3>
            <p className="text-muted-foreground">Follow users to see their shared links</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
