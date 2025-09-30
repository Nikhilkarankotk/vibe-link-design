import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { LinkCard } from "@/components/LinkCard";
import { Link2, Sparkles, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubmitLink = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<{
    title: string;
    description: string;
    url: string;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const submittedLinks = [
    {
      id: 1,
      title: "My Portfolio Website",
      url: "johndoe.design",
      description: "Check out my latest work",
    },
    {
      id: 2,
      title: "GitHub Profile",
      url: "github.com/johndoe",
      description: "My open source projects",
    },
  ];

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value.length > 10) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setPreview({
          title: "Auto-fetched Title from URL",
          description: "This is a preview of the link content that was automatically fetched from the URL metadata",
          url: value,
        });
        setIsAnalyzing(false);
      }, 800);
    } else {
      setPreview(null);
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = () => {
    if (!url) {
      toast({
        title: "Missing URL",
        description: "Please enter a URL to submit",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Link submitted!",
      description: "Your link has been added successfully",
    });

    setUrl("");
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-foreground">Submit Link</h1>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <Card className="p-6 shadow-elevated animate-fade-in">
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Paste URL
              </Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="url"
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className="pl-10 rounded-xl h-12 transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We'll automatically fetch the page details
              </p>
            </div>

            {isAnalyzing && (
              <div className="bg-muted rounded-xl p-4 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-full" />
                    <div className="h-3 bg-muted-foreground/20 rounded w-1/2" />
                  </div>
                </div>
              </div>
            )}

            {preview && !isAnalyzing && (
              <div className="animate-scale-in">
                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Preview
                </p>
                <LinkCard
                  title={preview.title}
                  url={preview.url}
                  description={preview.description}
                  variant="default"
                />
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!url || isAnalyzing}
              className="w-full rounded-xl h-12 bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-card hover:shadow-elevated active:scale-95 disabled:opacity-50"
            >
              {isAnalyzing ? "Analyzing..." : "Submit Link"}
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Your Links</h2>
            <span className="text-sm text-muted-foreground">{submittedLinks.length} total</span>
          </div>
          {submittedLinks.map((link, index) => (
            <Card
              key={link.id}
              className="p-4 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <LinkCard
                    title={link.title}
                    url={link.url}
                    description={link.description}
                    variant="compact"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default SubmitLink;
