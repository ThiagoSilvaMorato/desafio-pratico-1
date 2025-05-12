import toastMessages from "@/components/ToastMessages";
import { services } from "@/pages/Home/services";
import { Copy, Trash, Info } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface CardProps {
  shortUrl: string;
  fullUrl: string;
  accessCount: number;
  setRefreshMyLinks: Dispatch<SetStateAction<boolean>>;
}

export const Card = ({ shortUrl, fullUrl, accessCount, setRefreshMyLinks }: CardProps) => {
  const handleCopy = () => {
    const baseUrl = window.location.origin;
    const fullShortUrl = `${baseUrl}/${shortUrl}`;

    navigator.clipboard.writeText(fullShortUrl);
    toastMessages.info(
      "Link copiado com sucesso",
      `O link ${shortUrl} foi copiado para a área de transferência!`,
      { icon: <Info /> }
    );
  };

  const handleDelete = () => {
    const shouldProceed = window.confirm(`Você realmente quer apagar o link ${shortUrl}?`);

    if (shouldProceed) {
      services.deleteShortUrl(shortUrl).then(() => setRefreshMyLinks((prev) => !prev));
    }
  };

  const handleShortUrlClick = () => {
    window.open(`/${shortUrl}`, "_blank");
    services.increaseShortUrlAccessCount(shortUrl).then(() => setRefreshMyLinks((prev) => !prev));
  };

  return (
    <>
      <div id='divider' className='w-full bg-gray-200 h-[2px] rounded-full' />
      <div className='flex flex-row w-full align-center justify-between h-[72px] relative'>
        <div className='flex flex-col gap-2'>
          <span
            className='cursor-pointer hover:underline text-blue-700 font-semibold text-xl'
            onClick={handleShortUrlClick}
          >
            brev.ly/{shortUrl}
          </span>
          <span className='text-[#4d505c]'>{fullUrl}</span>
        </div>
        <div className='flex flex-row align-center items-center justify-between w-[25%] h-full'>
          <span className='text-[#4d505c]'>{accessCount} acessos</span>
          <div className='flex flex-row align-center gap-2 mr-2'>
            <button
              className='bg-[#e4e6ec] px-3 py-2 rounded-lg cursor-pointer relative'
              onClick={handleCopy}
            >
              <Copy />
            </button>
            <button
              className='bg-[#e4e6ec] px-3 py-2 rounded-lg cursor-pointer'
              onClick={handleDelete}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
