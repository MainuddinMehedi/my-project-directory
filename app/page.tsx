import LatestProjects from "@/components/LatestProjects";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <h1 className="text-[56px] sm:text-[76px] font-extrabold text-foreground/80 text-center my-10">
          Mainuddin&apos;s Projects Directory
        </h1>

        <div className="space-y-10">
          <div className="sm:max-w-200 mx-auto">
            <Input
              type="text"
              placeholder="Search projects..."
              className="w-full py-5 bg-white/20"
            />
          </div>

          <div>
            <LatestProjects />
          </div>
        </div>
      </div>
    </div>
  );
}
