import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Heart, MessageCircle } from "lucide-react";

const Home = () => {
  const feedItems = [
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "", username: "@sarahc" },
      link: { title: "Amazing Portfolio Website", url: "portfolio.design", thumbnail: "" },
      likes: 24,
      comments: 5,
      time: "2h ago",
    },
    {
      id: 2,
      user: { name: "Mike Johnson", avatar: "", username: "@mikej" },
      link: { title: "New Design Resources", url: "resources.dev", thumbnail: "" },
      likes: 18,
      comments: 3,
      time: "5h ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">LinkConnect</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-4 space-y-4 animate-fade-in">
        {feedItems.map((item) => (
          <Card key={item.id} className="p-4 shadow-card hover:shadow-elevated transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.user.avatar} />
                <AvatarFallback className="bg-primary text-white">
                  {item.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{item.user.name}</p>
                <p className="text-sm text-muted-foreground">{item.user.username} · {item.time}</p>
              </div>
            </div>

            <div className="bg-muted rounded-xl p-4 mb-3 hover:bg-muted/80 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                    {item.link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {item.link.url}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{item.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{item.comments}</span>
              </button>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Home;
