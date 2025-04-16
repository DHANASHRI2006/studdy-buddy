
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked } from "lucide-react";

export default function Saved() {
  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookMarked className="h-5 w-5" />
            Saved Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BookMarked className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No Saved Items Yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Items you save will appear here for quick access.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
