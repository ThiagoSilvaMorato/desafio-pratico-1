import { Dispatch, SetStateAction, useState } from "react";
import { services } from "../../services";
import toastMessages from "@/components/ToastMessages";

interface INewLinkProps {
  setRefreshMyLinks: Dispatch<SetStateAction<boolean>>;
}

const NewLink = ({ setRefreshMyLinks }: INewLinkProps) => {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    services
      .postNewShortUrl({
        fullUrl,
        shortUrl,
      })
      .then((response) => {
        console.log({ response });
        setIsLoading(false);
        // setFullUrl("");
        // setShortUrl("");
        setRefreshMyLinks((prev) => !prev);
      })
      .catch((error) => {
        console.log({ error: error.response.data.message });
        toastMessages.error("Erro ao salvar o link", error.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className='flex flex-col gap-4 bg-white rounded-xl w-[40%] p-8'>
      <h2 className='text-2xl font-semibold mb-4'>Novo Link</h2>
      <label htmlFor='original-link' className='text-[#4d505c] text-xsm -mb-2'>
        LINK ORIGINAL
      </label>
      <input
        id='original-link'
        type='text'
        placeholder='www.exemplo.com.br'
        onChange={(e) => setFullUrl(e.target.value)}
        className='border border-gray-300 rounded-lg p-2 h-[60px]'
      />
      <label htmlFor='short-link' className='text-[#4d505c] text-xsm -mb-2 mt-2'>
        LINK ENCURTADO
      </label>
      <div className='relative '>
        <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-'>
          brev.ly/
        </span>
        <input
          id='short-link'
          type='text'
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          className='border border-gray-300 rounded-lg p-2 pl-17 w-full h-[60px]'
        />
      </div>
      <button
        className='bg-[#2c46b1] text-white rounded-lg p-2 disabled:bg-[#939fd6] h-[60px] cursor-pointer disabled:cursor-not-allowed mt-4'
        type='button'
        disabled={(fullUrl.length === 0 && shortUrl.length === 0) || isLoading}
        onClick={handleSubmit}
      >
        {isLoading ? "Salvando..." : "Salvar link"}
      </button>
    </div>
  );
};

export default NewLink;
