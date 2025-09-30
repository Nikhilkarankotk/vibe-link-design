import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: number;
  user: { name: string; avatar: string; username: string };
  requestedDetails: string[];
  status: "pending" | "accepted" | "declined";
  time: string;
}

const Requests = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "", username: "@sarahc" },
      requestedDetails: ["Email", "Phone Number"],
      status: "pending",
      time: "2h ago",
    },
    {
      id: 2,
      user: { name: "Mike Johnson", avatar: "", username: "@mikej" },
      requestedDetails: ["Email"],
      status: "pending",
      time: "5h ago",
    },
    {
      id: 3,
      user: { name: "Emma Wilson", avatar: "", username: "@emmaw" },
      requestedDetails: ["Phone Number"],
      status: "accepted",
      time: "1d ago",
    },
  ]);

  const handleAccept = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "accepted" as const } : req
    ));
    toast({
      title: "Request accepted",
      description: "Connection established successfully",
    });
  };

  const handleDecline = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "declined" as const } : req
    ));
    toast({
      title: "Request declined",
      description: "The request has been declined",
      variant: "destructive",
    });
  };

  const pendingRequests = requests.filter(r => r.status === "pending");
  const processedRequests = requests.filter(r => r.status !== "pending");

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Requests</h1>
          {pendingRequests.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {pendingRequests.length} pending request{pendingRequests.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 animate-fade-in">
        {pendingRequests.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Pending</h2>
            {pendingRequests.map((request) => (
              <Card key={request.id} className="p-4 shadow-card hover:shadow-elevated transition-all duration-200">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.user.avatar} />
                    <AvatarFallback className="bg-primary text-white">
                      {request.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{request.user.name}</p>
                    <p className="text-sm text-muted-foreground">{request.user.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{request.time}</p>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-3 mb-3">
                  <p className="text-sm text-foreground mb-2">
                    Requesting access to:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {request.requestedDetails.map((detail, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-background text-xs font-medium text-foreground"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDecline(request.id)}
                    variant="outline"
                    className="flex-1 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {processedRequests.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            {processedRequests.map((request) => (
              <Card key={request.id} className="p-4 shadow-card opacity-70">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={request.user.avatar} />
                    <AvatarFallback className="bg-primary text-white">
                      {request.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{request.user.name}</p>
                    <p className="text-sm text-muted-foreground">{request.user.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{request.time}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                      request.status === "accepted" 
                        ? "bg-secondary/20 text-secondary" 
                        : "bg-destructive/20 text-destructive"
                    }`}>
                      {request.status === "accepted" ? "Connection Established" : "Request Declined"}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {pendingRequests.length === 0 && processedRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Requests</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Requests;
