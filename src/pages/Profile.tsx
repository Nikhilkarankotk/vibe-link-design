import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Settings, ExternalLink } from "lucide-react";

const Profile = () => {
  const userLinks = [
    { id: 1, title: "My Portfolio Website", url: "johndoe.design", thumbnail: "" },
    { id: 2, title: "GitHub Profile", url: "github.com/johndoe", thumbnail: "" },
    { id: 3, title: "Blog Article", url: "medium.com/@johndoe", thumbnail: "" },
    { id: 4, title: "Latest Project", url: "project.app", thumbnail: "" },
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
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 animate-fade-in">
        <div className="py-6 text-center border-b border-border">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gradient-primary text-white text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-foreground mb-1">John Doe</h2>
          <p className="text-muted-foreground mb-4">@johndoe</p>
          <p className="text-foreground mb-4 max-w-sm mx-auto">
            Designer & Developer | Sharing cool links 🔗
          </p>

          <div className="flex justify-center gap-8 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{userLinks.length}</p>
              <p className="text-sm text-muted-foreground">Links</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">234</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">189</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <Button className="rounded-xl bg-gradient-primary hover:opacity-90">
            Edit Profile
          </Button>
        </div>

        <Tabs defaultValue="links" className="py-4">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="links">Links Submitted</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="space-y-3">
            {userLinks.map((link) => (
              <Card key={link.id} className="p-4 shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {link.url}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-3">
            {activities.map((activity) => (
              <Card key={activity.id} className="p-4 shadow-card">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-white">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-foreground">
                      {activity.type === "accepted" ? "Accepted request from" : "Sent request to"}{" "}
                      <span className="font-semibold">{activity.user}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
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
