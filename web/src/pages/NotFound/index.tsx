import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between h-screen w-full bg-[#e4e6ec] py-[100px] px-[12%]'>
      <div className='flex flex-col items-center rounded-2xl bg-white w-5xl m-auto p-20'>
        <img src='/notFoundImage.svg' alt='NotFound' className='w-70 h-70 -mt-12' />
        <span className='font-semibold text-4xl -mt-8'>Link não encontrado</span>
        <span className='text-2xl mt-10 text-center text-[#4d505c] font-semibold mb-8'>
          O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
          Saiba mais em{" "}
          <span
            className='text-[#2c46b1] underline cursor-pointer hover:brightness-120'
            onClick={() => navigate("/")}
          >
            brev.ly
          </span>
        </span>
      </div>
    </div>
  );
};

export default NotFound;
