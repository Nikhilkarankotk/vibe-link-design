import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  type?: "feed" | "profile" | "request" | "link";
  count?: number;
  className?: string;
}

export const LoadingState = ({ type = "feed", count = 3, className }: LoadingStateProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case "feed":
        return (
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="bg-muted rounded-xl p-4 mb-3">
              <div className="flex gap-3">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </Card>
        );

      case "profile":
        return (
          <Card className="p-4 shadow-card">
            <div className="flex gap-3">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </Card>
        );

      case "request":
        return (
          <Card className="p-4 shadow-card">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="bg-muted rounded-lg p-3 mb-3">
              <Skeleton className="h-3 w-32 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-xl" />
              <Skeleton className="h-10 flex-1 rounded-xl" />
            </div>
          </Card>
        );

      case "link":
        return (
          <div className="bg-muted rounded-xl p-4">
            <div className="flex gap-3">
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-1">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-32 mb-2" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4 animate-pulse", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};
