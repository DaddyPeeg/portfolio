import { Timeline } from "@/components/ui/timeline";
import ImageLoader from "./ImageLoader";

export function TimelineComponent() {
  const data = [
    {
      title: "2024",
      content: (
        <div className="space-y-14">
          <div>
            <h1 className="text-4xl font-bold">Codebility</h1>
            <h3 className="text-lg text-neutral-400 font-thin italic">
              Client: Volatility
            </h3>
            <div className="space-y-2 mt-4">
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Addressed and resolved multiple UI bugs based on valuable
                user feedback to improve the overall experience.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Designed and developed an aesthetically appealing new landing
                page, improving user engagement.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Integrated the CMS with the frontend to create a dynamic blog
                page, managed seamlessly from the CMS.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Created a robust video platform to host and manage webinars,
                streamlining online events.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "work/volatility-1.webp",
                "work/volatility-2.webp",
                "work/volatility-3.webp",
                "work/volatility-4.webp",
              ].map((pic, index) => (
                <ImageLoader pic={pic} key={`pic-volatility-${index}`} />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">Codebility</h1>
            <h3 className="text-lg text-neutral-400 font-thin italic">
              Client: Agentsly
            </h3>
            <div className="space-y-2 mt-4">
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Spearheaded the planning and development of the user
                interface, leveraging ShadCN and component-based libraries to
                create sleek, functional designs.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Integrated ChatGPT seamlessly using Vercel’s AI SDK and
                OpenAI API, enhancing the platform's AI-driven capabilities.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Assisted in setting up KeystoneJS as the CMS and managing
                smooth deployments on AWS infrastructure.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Utilized a range of AWS services to host and maintain the
                live website, ensuring reliability and scalability.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "work/agentsly-1.webp",
                "work/agentsly-2.webp",
                "work/agentsly-3.webp",
                "work/agentsly-4.webp",
              ].map((pic, index) => (
                <ImageLoader pic={pic} key={`pic-agentsly-${index}`} />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Late 2023",
      content: (
        <div className="space-y-14">
          <div>
            <h1 className="text-4xl font-bold">Codebility</h1>
            <h3 className="text-lg text-neutral-400 font-thin italic">
              Internship Phase
            </h3>
            <div className="space-y-2 mt-4">
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Harnessed the optimization capabilities of Next.js, including
                advanced rendering methods, to significantly enhance user
                experience and application performance.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Leveraged various libraries and UI frameworks to craft
                visually stunning, intuitive, and user-friendly components.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Diagnosed and resolved a range of technical issues,
                consistently meeting deadlines for feature rollouts and bug
                fixes.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Collaborated with cross-functional teams to gather
                requirements, ensuring the delivery of user-centric and
                impactful web solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "work/intern (1).webp",
                "work/intern (2).webp",
                "work/intern (3).webp",
                "work/intern (4).webp",
                "work/intern (5).webp",
                "work/intern (6).webp",
                "work/intern (7).webp",
                "work/intern (8).webp",
              ].map((pic, index) => (
                <ImageLoader pic={pic} key={`pic-intern-${index}`} />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="space-y-14">
          <div>
            <h1 className="text-4xl font-bold">Commission on Elections</h1>
            <h3 className="text-lg text-neutral-400 font-thin italic">
              Government Employee
            </h3>
            <div className="space-y-2 mt-4">
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Managed administrative and clerical tasks, ensuring the
                validity and authenticity of legal documents with meticulous
                attention to detail.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Led and trained municipal election volunteers, providing
                guidance on operating equipment and optimizing the use of the
                Comelec System for efficient election processes.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Educated voters across various barangays on effectively using
                the online platform to view and update their personal data.
              </p>
              <p className="text-neutral-200 text-sm md:text-lg font-normal ">
                ✅ Served as a System Administrator in the field office,
                responsible for applying system updates, identifying and
                reporting bugs, and performing routine maintenance and cleanup
                on the system database.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "work/comelec (1).webp",
                "work/comelec (2).webp",
                "work/comelec (3).webp",
                "work/comelec (4).webp",
                "work/comelec (5).webp",
                "work/comelec (6).webp",
                "work/comelec (7).webp",
                "work/comelec (8).webp",
                "work/comelec (9).webp",
                "work/comelec (10).webp",
              ].map((pic, index) => (
                <ImageLoader pic={pic} key={`pic-comelec-${index}`} />
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full xl:max-w-[60%] place-self-end ml-auto">
      <Timeline data={data} />
    </div>
  );
}
