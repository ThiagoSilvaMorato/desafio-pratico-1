import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { services } from "./services";

const Redirecting = () => {
  const navigate = useNavigate();

  const pathname = useLocation().pathname;

  useEffect(() => {
    const shortUrl = pathname.split("/")[1];
    services
      .getShortUrlByShortUrl(shortUrl)
      .then((response) => (window.location.href = response.data.shortUrl.fullUrl))
      .catch(() => {
        navigate("/url/not-found");
      });
  }, [pathname, navigate]);

  return (
    <div className='flex items-center justify-between h-screen w-full bg-[#e4e6ec] py-[100px] px-[12%]'>
      <div className='flex flex-col items-center rounded-2xl bg-white w-4xl m-auto p-20'>
        <img src='/logo.svg' alt='Logo' className='w-16 h-16' />
        <span className='font-semibold text-4xl mt-10'>Redirecionando...</span>
        <span className='text-2xl mt-10 text-center text-[#4d505c] font-semibold mb-8'>
          O link será aberto automaticamente em alguns instantes. Não foi redirecionado?{" "}
          <span
            className='text-[#2c46b1] underline cursor-pointer hover:brightness-120'
            onClick={() => navigate("/")}
          >
            Acesse aqui
          </span>
        </span>
      </div>
    </div>
  );
};

export default Redirecting;
