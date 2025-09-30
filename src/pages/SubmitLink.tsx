import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ExternalLink, Link2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SubmitLink = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<{ title: string; description: string; url: string } | null>(null);
  
  const submittedLinks = [
    { id: 1, title: "My Portfolio Website", url: "johndoe.design", description: "Check out my latest work" },
    { id: 2, title: "GitHub Profile", url: "github.com/johndoe", description: "My open source projects" },
  ];

  const handleUrlChange = (value: string) => {
    setUrl(value);
    if (value.length > 10) {
      setTimeout(() => {
        setPreview({
          title: "Auto-fetched Title",
          description: "This is a preview of the link content that was automatically fetched",
          url: value,
        });
      }, 500);
    } else {
      setPreview(null);
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

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-base font-semibold">
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
                  className="pl-10 rounded-xl h-12"
                />
              </div>
            </div>

            {preview && (
              <div className="bg-muted rounded-xl p-4 animate-scale-in">
                <p className="text-xs text-muted-foreground mb-2">Preview</p>
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                      {preview.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-1">
                      {preview.description}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {preview.url}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              Submit Link
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Previously Submitted</h2>
          {submittedLinks.map((link) => (
            <Card key={link.id} className="p-4 shadow-card">
              <div className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                    {link.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-1 line-clamp-2">
                    {link.description}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {link.url}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive flex-shrink-0">
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
