import MyLinks from "./components/MyLinks";
import NewLink from "./components/NewLink";

export const Home = () => {
  return (
    <div className='flex flex-col items-center justify-between h-screen bg-[#e4e6ec] py-[100px] px-[12%]'>
      <div className='mb-8 w-full flex justify-start align-center'>
        <img src='/logo.svg' alt='Logo' className='w-8 h-8' />
        <span className='text-[#2c46b1] font-semibold text-2xl ml-2'>brev.ly</span>
      </div>
      <div className='flex flex-row *:justify-center items-start gap-3 w-full h-full'>
        <NewLink />
        <MyLinks />
      </div>
    </div>
  );
};
