
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Favorites() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Star className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Favorites Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your favorite courses and materials will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
