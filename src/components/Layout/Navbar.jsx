import { Outlet } from "react-router";
import { Menu } from "react-feather";
import { useNav } from "@/contexts/NavContext";

const Navbar = () => {
  const { setListOpened } = useNav();

  return (
    <div className="max-h-[100dvh] overflow-hidden">
      <div className="navbar bg-base-200 shadow-sm z-10">
        <div
          id="nav-left"
          className="w-15 flex items-center px-2 md:flex-1 md:px-4"
        >
          <button
            className="icon-btn md:hidden"
            onClick={() => setListOpened((prev) => !prev)}
          >
            <Menu />
          </button>
          <NavLogo className="hidden md:block" />
        </div>
        <div id="nav-middle" className="md:hidden flex-1 flex justify-center">
          <NavLogo />
        </div>
        <div
          id="nav-right"
          className="w-15 px-2 flex justify-end items-center md:w-fit md:px-4"
        >
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;

const NavLogo = ({ className = "" }) => {
  return (
    <div id="nav-logo" className={`w-30 ${className}`}>
      <img
        className="dark:hidden object-contain"
        src="/assets/logo/DarkLogo.png"
        alt="Dark logo with a map marker and the words earthquake monitor written aside."
      />
      <img
        className="hidden dark:block object-contain"
        src="/assets/logo/LightLogo.png"
        alt="Dark logo with a map marker and the words earthquake monitor written aside."
      />
    </div>
  );
};
