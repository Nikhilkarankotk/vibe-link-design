import { ExternalLink, Heart, MessageCircle, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
  likes?: number;
  comments?: number;
  showActions?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  className?: string;
  variant?: "default" | "compact";
}

export const LinkCard = ({
  title,
  url,
  description,
  thumbnail,
  likes,
  comments,
  showActions = false,
  onLike,
  onComment,
  className,
  variant = "default",
}: LinkCardProps) => {
  return (
    <div
      className={cn(
        "bg-muted rounded-xl overflow-hidden transition-all duration-300",
        "hover:bg-muted/80 hover:shadow-card cursor-pointer group",
        variant === "compact" ? "p-3" : "p-4",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "bg-gradient-primary rounded-lg flex-shrink-0 relative overflow-hidden",
            "group-hover:scale-105 transition-transform duration-300",
            variant === "compact" ? "w-14 h-14" : "w-16 h-16"
          )}
        >
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-semibold text-foreground mb-1 group-hover:text-primary transition-colors",
              variant === "compact" ? "text-sm line-clamp-1" : "line-clamp-2"
            )}
          >
            {title}
          </h3>
          {description && variant === "default" && (
            <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{description}</p>
          )}
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <ExternalLink className="w-3 h-3" />
            {url}
          </p>
        </div>

        {variant === "default" && (
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        )}
      </div>

      {showActions && (likes !== undefined || comments !== undefined) && (
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          {likes !== undefined && (
            <button
              onClick={onLike}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{likes}</span>
            </button>
          )}
          {comments !== undefined && (
            <button
              onClick={onComment}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{comments}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
