import Link from "next/link";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

const Custom404 = () => {
  return (
    <div className="min-h-[calc(100vh_-_205px)] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-[7rem] md:text-[12rem] xl:text-[14rem] font-rubik text-primary">404</h1>
      <h2 className="text-2xl font-rubik text-primary -mt-7">Not Found</h2>
      <p className="text-sm md:text-lg mt-12 px-8">{"Oops! The page you're looking for doesn't exist."}</p>
      <Button variant="outline" className="mt-4" asChild>
        <Link href="/">
          <Home />
          Go back home
        </Link>
      </Button>
    </div>
  );
};

export default Custom404;
