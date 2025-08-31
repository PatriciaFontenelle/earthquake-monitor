import { Outlet } from "react-router";
import { User, Menu, Moon, Sun } from "react-feather";
import { useNav } from "../../contexts/NavContext";

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
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost flex items-center justify-end gap-1 pr-0 md:p-4"
            >
              <User />
              <span className="hidden text-[.75rem] md:block">Username</span>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Manage Profiles</a>
              </li>
              <li>
                <div>
                  <label className="toggle text-base-content">
                    <input type="checkbox" />
                    {/* <Sun size={10} aria-label="enabled" />
                    <Moon aria-label="disabled" /> */}
                  </label>
                </div>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
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
