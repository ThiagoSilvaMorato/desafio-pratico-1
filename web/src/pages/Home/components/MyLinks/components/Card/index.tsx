import { Copy, Trash } from "lucide-react";
import { useState } from "react";

interface CardProps {
  shortUrl: string;
  fullUrl: string;
  accessCount: number;
}

export const Card = ({ shortUrl, fullUrl, accessCount }: CardProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Oculta o "Copiado!" após 2 segundos
  };

  return (
    <>
      <div id='divider' className='w-full bg-gray-200 h-[2px] rounded-full' />
      <div className='flex flex-row w-full align-center justify-between h-[72px] relative'>
        <div className='flex flex-col gap-2'>
          <span
            className='cursor-pointer hover:underline text-blue-700 font-semibold text-xl'
            onClick={() => window.open(fullUrl, "_blank")}
          >
            brev.ly/{shortUrl}
          </span>
          <span className='text-[#4d505c]'>{fullUrl}</span>
        </div>
        <div className='flex flex-row align-center items-center justify-between w-[25%] h-full'>
          <span className='text-[#4d505c]'>{accessCount} acessos</span>
          <div className='flex flex-row align-center gap-2'>
            <button
              className='bg-[#e4e6ec] px-3 py-2 rounded-lg cursor-pointer relative'
              onClick={handleCopy}
            >
              <Copy />
              {isCopied && (
                <div className='absolute top-[-30px] left-0 bg-black text-white text-sm px-2 py-1 rounded'>
                  Copiado!
                </div>
              )}
            </button>
            <button
              className='bg-[#e4e6ec] px-3 py-2 rounded-lg cursor-pointer'
              onClick={() => alert(`${shortUrl} excluído`)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
