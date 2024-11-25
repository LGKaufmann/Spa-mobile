import HomeBodyMobile from "./HomeBodyMobile";
import HomeHeadMobile from "./HomeHeadMobile";

export const HomeMobile = () => {
  return (
    <div className="flex flex-col lg:hidden w-full h-auto">
      <HomeHeadMobile />
      <HomeBodyMobile />
    </div>
  );
};

export default HomeMobile;
