import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserCardProps {
  name: string;
  username?: string;
  avatar?: string;
  time?: string;
  bio?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showUsername?: boolean;
}

export const UserCard = ({
  name,
  username,
  avatar,
  time,
  bio,
  className,
  size = "md",
  showUsername = true,
}: UserCardProps) => {
  const avatarSize = {
    sm: "w-10 h-10",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }[size];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={cn(avatarSize, "ring-2 ring-background shadow-sm")}>
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-gradient-primary text-white font-semibold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className={cn("font-semibold text-foreground", size === "sm" && "text-sm")}>{name}</p>
        {showUsername && username && (
          <p className="text-sm text-muted-foreground">{username}</p>
        )}
        {bio && <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{bio}</p>}
        {time && <p className="text-xs text-muted-foreground mt-1">{time}</p>}
      </div>
    </div>
  );
};
