import Profile from "@/components/Profile";
import { TimelineComponent } from "@/components/Timeline";

const Resume = () => {
  return (
    <main className="w-full bg-neutral-900 text-white flex flex-col xl:flex-row">
      <Profile />
      <TimelineComponent />
    </main>
  );
};

export default Resume;
