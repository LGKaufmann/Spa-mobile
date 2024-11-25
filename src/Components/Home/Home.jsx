import { HomeDesktop } from "./HomeDesktop/HomeDesktop";
import HomeMobile from "./HomeMobile/HomeMobile";

const Home = () => {
  return (
    <div className="flex flex-col">
      <HomeMobile />
      <HomeDesktop />
    </div>
  );
};

export default Home;
