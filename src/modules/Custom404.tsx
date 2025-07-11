import Link from "next/link";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg mt-2">{"Oops! The page you're looking for doesn't exist."}</p>
      <Button variant="outline" className="mt-8" asChild>
        <Link href="/">
          <Home />
          Go back home
        </Link>
      </Button>
    </div>
  );
};

export default Custom404;
