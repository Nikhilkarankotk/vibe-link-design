import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserCard } from "./UserCard";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RequestCardProps {
  id: number;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  requestedDetails: string[];
  status: "pending" | "accepted" | "declined";
  time: string;
  onAccept?: (id: number) => void;
  onDecline?: (id: number) => void;
}

export const RequestCard = ({
  id,
  user,
  requestedDetails,
  status,
  time,
  onAccept,
  onDecline,
}: RequestCardProps) => {
  const isPending = status === "pending";

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-300",
        isPending
          ? "shadow-card hover:shadow-elevated animate-slide-up"
          : "opacity-60 shadow-sm"
      )}
    >
      <UserCard
        name={user.name}
        username={user.username}
        avatar={user.avatar}
        time={time}
        size="md"
        className="mb-3"
      />

      {isPending && (
        <div className="bg-muted rounded-lg p-3 mb-3">
          <p className="text-sm text-foreground mb-2 font-medium">Requesting access to:</p>
          <div className="flex flex-wrap gap-2">
            {requestedDetails.map((detail, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full bg-background text-xs font-medium text-foreground shadow-sm"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
      )}

      {isPending ? (
        <div className="flex gap-2">
          <Button
            onClick={() => onAccept?.(id)}
            className="flex-1 rounded-xl bg-secondary hover:bg-secondary/90 transition-all duration-200 active:scale-95"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept
          </Button>
          <Button
            onClick={() => onDecline?.(id)}
            variant="outline"
            className="flex-1 rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-white transition-all duration-200 active:scale-95"
          >
            <X className="w-4 h-4 mr-2" />
            Decline
          </Button>
        </div>
      ) : (
        <span
          className={cn(
            "inline-flex items-center px-4 py-2 rounded-full text-xs font-medium",
            status === "accepted"
              ? "bg-secondary/20 text-secondary"
              : "bg-destructive/20 text-destructive"
          )}
        >
          {status === "accepted" ? "✓ Connection Established" : "✗ Request Declined"}
        </span>
      )}
    </Card>
  );
};
