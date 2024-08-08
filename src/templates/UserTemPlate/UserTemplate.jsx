import React from "react";

import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";

const UserTemplate = () => {
  // header, content, footer
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserTemplate;
