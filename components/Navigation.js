import { Navbar } from "flowbite-react";
import Image from "next/image";
import Logo from "../assets/logo.png";
import LogoNext from "../assets/next.png"

const Navigation = () => {
  const menu = ["home", "peserta", "data"];

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="#">
        <Image src={Logo} width={100} height={50} className="mr-3 h-6 sm:h-9" alt="Sanbercode Logo" />
        <Image src={LogoNext} width={60} height={30} className="mr-3 h-6 sm:h-9" alt="Sanbercode Logo" />
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span> */}
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {menu.map((item, index) => {
          return (
            <Navbar.Link key={index} href={item === "home" ? "/" : item}>
              {item}
            </Navbar.Link>
          );
        })}
        {/* <Navbar.Link href="/" active={true}>
          home
        </Navbar.Link>
        <Navbar.Link href="/peserta">peserta</Navbar.Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
