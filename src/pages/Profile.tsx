import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinkCard } from "@/components/LinkCard";
import { UserCard } from "@/components/UserCard";
import { Card } from "@/components/ui/card";
import { LoadingState } from "@/components/LoadingState";
import { Settings, Grid3X3, Activity } from "lucide-react";

const Profile = () => {
  const [isLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("links");

  const userLinks = [
    {
      id: 1,
      title: "My Portfolio Website",
      url: "johndoe.design",
      description: "Check out my latest design work and projects",
      thumbnail: "",
    },
    {
      id: 2,
      title: "GitHub Profile",
      url: "github.com/johndoe",
      description: "Open source projects and contributions",
      thumbnail: "",
    },
    {
      id: 3,
      title: "Blog Article",
      url: "medium.com/@johndoe",
      description: "Thoughts on design and development",
      thumbnail: "",
    },
    {
      id: 4,
      title: "Latest Project",
      url: "project.app",
      description: "My newest side project launch",
      thumbnail: "",
    },
  ];

  const activities = [
    { id: 1, type: "accepted", user: "Sarah Chen", time: "2h ago" },
    { id: 2, type: "sent", user: "Mike Johnson", time: "5h ago" },
    { id: 3, type: "accepted", user: "Emma Wilson", time: "1d ago" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted transition-colors"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4">
        <div className="py-6 text-center border-b border-border animate-fade-in">
          <div className="relative inline-block mb-4">
            <Avatar className="w-24 h-24 ring-4 ring-background shadow-elevated">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-secondary rounded-full border-4 border-background flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
          <p className="text-muted-foreground mb-4">@johndoe</p>
          <p className="text-foreground mb-6 max-w-sm mx-auto leading-relaxed">
            Designer & Developer | Sharing cool links 🔗
          </p>

          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userLinks.length}</p>
              <p className="text-sm text-muted-foreground">Links</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">234</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">189</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <Button className="rounded-xl bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95 px-8">
            Edit Profile
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="py-4">
          <TabsList className="w-full grid grid-cols-2 mb-6 h-auto p-1 bg-muted">
            <TabsTrigger
              value="links"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all py-2.5"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Links
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all py-2.5"
            >
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="space-y-3">
            {isLoading ? (
              <LoadingState type="profile" count={4} />
            ) : (
              <>
                {userLinks.map((link, index) => (
                  <div
                    key={link.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <LinkCard
                      title={link.title}
                      url={link.url}
                      description={link.description}
                      thumbnail={link.thumbnail}
                      variant="default"
                    />
                  </div>
                ))}
              </>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-3">
            {activities.map((activity, index) => (
              <Card
                key={activity.id}
                className="p-4 shadow-card animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <UserCard
                  name={activity.user}
                  username=""
                  avatar=""
                  time={activity.time}
                  showUsername={false}
                />
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium mt-3 ${
                    activity.type === "accepted"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  {activity.type === "accepted" ? "✓ Connection accepted" : "→ Request sent"}
                </span>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
