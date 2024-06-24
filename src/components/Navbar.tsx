import { useEffect } from "react";
import LogoCam from "./newLogo";
import anime from "animejs";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

interface PropsSet {
  setSection: (e: number) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  section: number;
}

const Navbar = ({
  setSection,
  isMenuOpen,
  setIsMenuOpen,
  section,
}: PropsSet) => {
  const animateIn = async () => {
    anime({
      targets: "#vectorLetter path",
      strokeDashoffset: [anime.setDashoffset, 0],
      fill: (el: any, i: number) => {
        return i === 0 ? "#001C32" : "#CADCE0";
      },
      easing: "linear",
      delay(el: any, i: number) {
        return i * 500;
      },
      duration: 1000,
      loop: true,
      endDelay: 5000,
    });
    anime({
      targets: "#camBtn1",
      fill: "#fff",
      easing: "linear",
      delay: 3000,
      duration: 1000,
      loop: true,
      endDelay: 4500,
    });
    anime({
      targets: "#camBtn2",
      fill: "#fff",
      easing: "linear",
      delay: 3500,
      duration: 1000,
      loop: true,
      endDelay: 4000,
    });
    anime({
      targets: "#lensCircs",
      keyframes: [
        { delay: 2000, translateX: 30 },
        { translateY: 30, translateX: 20 },
        { translateY: -30, translateX: 20 },
        { translateY: 25, translateX: -15 },
        { translateY: 20, translateX: 0 },
        { translateY: 0, translateX: -25 },
        { translateY: 20, translateX: 20 },
        { translateY: -20, translateX: -20 },
        { translateY: 0, translateX: 0 },
      ],
      elasticity: 200,
      duration: 2000,
      loop: true,
      endDelay: 4500,
      easing: "easeOutElastic",
    });
  };

  useEffect(() => {
    animateIn();
  }, []);
  return (
    <>
      <div className="flex z-10 w-full fixed flex-col justify-center pointer-events-none">
        <div className="py-8 justify-between flex items-center z-10 max-w-screen-2xl w-screen px-8 pointer-events-none mx-auto ">
          <div
            className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient p-2 backdrop-blur-md rounded-md z-20 pointer-events-auto cursor-pointer"
            onClick={() => {
              if (section !== 0) {
                setSection(0);
              }
            }}
          >
            <LogoCam />
          </div>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="sm:p-3 p-2 bg-indigo-600 w-8 h-8 sm:w-11 sm:h-11 rounded-md z-20 pointer-events-auto"
          >
            <div
              className={`bg-white h-0.5 rounded-md w-full transition-all ${
                isMenuOpen ? "rotate-45 translate-y-0.5" : ""
              }`}
            />
            <div
              className={`bg-white h-0.5 rounded-md w-full my-1 ${
                isMenuOpen ? "hidden" : ""
              }`}
            />
            <div
              className={`bg-white h-0.5 rounded-md w-full transition-all ${
                isMenuOpen ? "-rotate-45" : ""
              }`}
            />
          </button>

          <nav
            className={`z-10 fixed top-0 right-0 bottom-0 sm:bg-white bg-black/80 backdrop-blur-md transition-all overflow-hidden flex flex-col ${
              isMenuOpen ? "sm:w-80 w-full" : "w-0"
            }`}
          >
            <div className="flex-1 flex items-start justify-center flex-col p-8 pointer-events-auto ">
              <div className="flex flex-col w-full items-center sm:items-start gap-6 h-full justify-center ">
                <Menubutton
                  label="About"
                  onClick={() => {
                    setSection(0);
                    setIsMenuOpen(false);
                  }}
                />
                <Menubutton
                  label="Skills"
                  onClick={() => {
                    setSection(1);
                    setIsMenuOpen(false);
                  }}
                />
                <Menubutton
                  label="Projects"
                  onClick={() => {
                    setSection(2);
                    setIsMenuOpen(false);
                  }}
                />
                <Menubutton
                  label="Contact"
                  onClick={() => {
                    setSection(3);
                    setIsMenuOpen(false);
                  }}
                />
              </div>
              <div className="w-full flex mt-auto justify-center">
                <ul className="flex gap-4 text-sm sm:text-black text-white">
                  <a href="https://web.facebook.com/profile.php?id=100069614290627">
                    <li className="cursor-pointer">
                      <FaFacebook className="h-4 w-4" />
                    </li>
                  </a>

                  <a href="https://github.com/DaddyPeeg">
                    <li className="cursor-pointer">
                      <FaGithub className="h-4 w-4" />
                    </li>
                  </a>

                  <a href="https://mail.google.com/mail/u/0/?fs=1&to=david.estrelloso.tribugenia@gmail.com&tf=cm">
                    <li className="cursor-pointer">
                      <SiGmail className="h-4 w-4" />
                    </li>
                  </a>

                  <a href="https://www.linkedin.com/in/davidrt1262/">
                    <li className="cursor-pointer">
                      <FaLinkedin className="h-4 w-4" />
                    </li>
                  </a>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

interface MenuButtonProps {
  label: string;
  onClick: () => void;
}

const Menubutton = ({ label, onClick }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="text-2xl font-bold cursor-pointer text-white sm:text-black hover:text-indigo-600 transition-colors"
    >
      {label}
    </button>
  );
};

export default Navbar;
