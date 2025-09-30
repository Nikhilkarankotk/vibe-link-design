import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { RequestCard } from "@/components/RequestCard";
import { LoadingState } from "@/components/LoadingState";
import { Check } from "lucide-react";
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
  const [isLoading] = useState(false);
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
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: "accepted" as const } : req))
    );
    toast({
      title: "Request accepted ✓",
      description: "Connection established successfully",
    });
  };

  const handleDecline = (id: number) => {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: "declined" as const } : req))
    );
    toast({
      title: "Request declined",
      description: "The request has been declined",
      variant: "destructive",
    });
  };

  const pendingRequests = requests.filter((r) => r.status === "pending");
  const processedRequests = requests.filter((r) => r.status !== "pending");

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/80">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Requests</h1>
          {pendingRequests.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {pendingRequests.length} pending request{pendingRequests.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {isLoading ? (
          <LoadingState type="request" count={3} />
        ) : (
          <>
            {pendingRequests.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Pending</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {pendingRequests.length} new
                  </span>
                </div>
                {pendingRequests.map((request, index) => (
                  <div
                    key={request.id}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <RequestCard
                      {...request}
                      onAccept={handleAccept}
                      onDecline={handleDecline}
                    />
                  </div>
                ))}
              </div>
            )}

            {processedRequests.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
                {processedRequests.map((request, index) => (
                  <div
                    key={request.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <RequestCard {...request} />
                  </div>
                ))}
              </div>
            )}

            {pendingRequests.length === 0 && processedRequests.length === 0 && (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <Check className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
                <p className="text-muted-foreground">No pending requests at the moment</p>
              </div>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Requests;
