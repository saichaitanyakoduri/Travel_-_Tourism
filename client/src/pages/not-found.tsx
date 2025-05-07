import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <Clock className="h-12 w-12 text-blue-500 mb-2" />
            <h1 className="text-2xl font-bold text-gray-900">Coming Soon</h1>
          </div>

          <p className="mt-4 text-md text-gray-600">
            This feature is under development and will be available soon.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Please check back later for updates.
          </p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Return to Home
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
