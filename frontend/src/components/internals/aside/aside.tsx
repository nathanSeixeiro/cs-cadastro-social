import { useState } from "react";
import Avatar from "@/assets/avatar.svg";
import House from "@/assets/house.svg";
import Box from "@/assets/box.svg";
import Graph from "@/assets/graph.svg";
// import Search from "@/assets/search.svg";
import Notify from "@/assets/notify.svg";
import Exit from "@/assets/exit.svg";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Verifica se o Aside deve ser exibido
  const shouldHideAside =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/signin" ||
    location.pathname.startsWith("/forgot-password");

  if (shouldHideAside) {
    return null; // Não renderiza o Aside nessas rotas
  }

  return (
    <aside
      className={`min-h-full h-full w-[80px] bg-white pb-2 justify- absolute top-0 left-0 border-solid border-r-2 border-[#EFF0F6] pt-2 pl-3 transition-all ${
        isOpen ? "open" : ""
      }`}
    >
      <img onClick={toggleMenu} className="avatar" src={Avatar} alt="Avatar" />

      <nav
        className={`grid gap-2 pt-8 pb-4 ${
          isOpen ? "nav-open" : "w-full"
        } justify-items-center items-end grid-cols-1 grid-rows-[repeat(4,_60px)_1fr]`}
      >
        <a
          className={isOpen ? "nav-opened-link" : "nav-closed-link"}
          href="/home"
        >
          <img src={House} alt="Dashboard" />
          <p>Dashboard</p>
        </a>
        <a
          className={isOpen ? "nav-opened-link" : "nav-closed-link"}
          href="/assist-list"
        >
          <img src={Graph} alt="Assists" />
          <p>Assistidos</p>
        </a>
        <a
          className={isOpen ? "nav-opened-link" : "nav-closed-link"}
          href="/notify"
        >
          <img src={Notify} alt="Notify" />
          <p>Notificações</p>
        </a>
        <a
          className={isOpen ? "nav-opened-link" : "nav-closed-link"}
          href="/advices"
        >
          <img src={Box} alt="Advices" />
          <p>Avisos</p>
        </a>
        <button className="pt-2">
          <img src={Exit} alt="Sair" />
        </button>
      </nav>
    </aside>
  );
};

export default Aside;
