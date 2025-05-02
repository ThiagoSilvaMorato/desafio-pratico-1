import { Link } from "lucide-react";

export const NoShortUrlFound = () => {
  return (
    <>
      <div id='divider' className='w-full bg-gray-200 h-[2px] rounded-full' />
      <div className='flex flex-col gap-4 w-full items-center justify-center h-[200px]'>
        <Link size={"32px"} color='#74798b' />
        <span className='text-[#74798b]'>AINDA NÃO EXISTEM LINKS CADASTRADOS</span>
      </div>
    </>
  );
};
