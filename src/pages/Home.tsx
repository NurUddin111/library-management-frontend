import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="flex-grow mt-24">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
