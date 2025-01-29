import { BiLogoGmail, BiPhoneCall } from "react-icons/bi";
import { WavyBackground } from "../ui/wavy-background";
import "./profile_style.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { LampDemo } from "../ui/lamp";
import LogoCam from "../newLogo";
import ImageLoader from "../ImageLoader";
import toast from "react-hot-toast";

const Profile = () => {
  const copyToClipboard = (e: any) => {
    navigator.clipboard.writeText(e.target.innerText);
    toast.success("Copied!");
  };

  const goTo = (e: any) => {
    const input = e.target.innerHTML;
    const url = input.startsWith("http") ? input : `https://${input}`;
    window.location.href = url;
  };
  const socials = [
    {
      icon: BiPhoneCall,
      text: `(+63) 939-835-1262`,
      fn: copyToClipboard,
    },
    {
      icon: FaGithub,
      text: `github.com/daddypeeg`,
      fn: goTo,
    },
    {
      icon: FaLinkedin,
      text: "linkedin.com/in/davidrt1262",
      fn: goTo,
    },
    {
      icon: BiLogoGmail,
      text: "david.estrelloso.tribugenia@gmail.com",
      fn: copyToClipboard,
    },
  ];
  return (
    <div className="profile_containment h-full xl:w-[40%] z-50s xl:fixed left-0 md:pr-[0.1rem] overflow-hidden">
      <span
        onClick={() => window.location.replace("/portfolio/")}
        className="fixed cursor-pointer top-6 left-6 p-2 md:p-3 z-50 bg-gradient rounded-full"
      >
        <LogoCam className="md:translate-x-1 translate-x-[2px] size-8 md:size-12" />
      </span>

      <div className="w-full h-full relative bg-neutral-950 isolate flex flex-col items-center">
        <WavyBackground
          className="top-14 md:top-32 h-52 md:h-42"
          blur={5}
          waveOpacity={50}
        />
        <div className="profile_containment rounded-full z-50 overflow-hidden size-32 md:size-64 mt-24 flex items-center justify-center">
          <ImageLoader
            pic={"profile/pp.jpg"}
            className="rounded-full"
            profile
          />
          {/* <img
            src="profile/pp.jpg"
            alt="profile-picture"
            className="size-[98%] rounded-full"
          /> */}
        </div>
        <TypewriterEffectSmooth
          className="text-white"
          words={[
            {
              text: "You",
            },
            {
              text: "can",
            },
            {
              text: "call",
            },
            {
              text: "me",
            },
            {
              text: "David.",
              className: "text-blue-500 dark:text-blue-500",
            },
          ]}
        />
        <div className="flex gap-1 md:gap-4 flex-wrap mx-auto w-full max-w-xl items-center justify-center">
          {socials.map((item, index) => {
            const Icon = item.icon;
            return (
              <span
                key={`social-${index}`}
                className="flex items-center cursor-pointer bg-neutral-950/50 w-52 rounded-md px-2 py-2"
                onClick={item.fn}
              >
                <Icon className="size-4 md:size-6 shrink-0" />
                <p className="text-xs md:text-sm ml-2 truncate">{item.text}</p>
              </span>
            );
          })}
        </div>
        <LampDemo />
        <div className="mt-4 w-full p-4 max-[1280px]:max-w-[32rem]  pb-8 xl:pb-0 min-[1280px]:max-w-[38rem]">
          <h1 className="font-bold text-sm md:text-xl">Summary:</h1>
          <p className="md:text-lg text-sm mt-1 md:mt-2 text-justify">
            I am a Senior Frontend Engineer with deep expertise in React,
            TypeScript, and cutting-edge frameworks like Next.js. In a recent
            high-impact project, I spearheaded the integration of AI into a
            Healthcare Insurance SaaS platform using Vercel's AI SDK. This
            powerful multitenant system empowers agents to seamlessly gather
            patient data and recommend the most efficient, cost-effective
            insurance plans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
