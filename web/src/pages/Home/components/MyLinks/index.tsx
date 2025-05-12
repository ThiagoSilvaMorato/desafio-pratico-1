import { Download } from "lucide-react";
import { Card } from "./components/Card";
import { NoShortUrlFound } from "./components/NoShortUrlFound";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { services } from "../../services";

interface IShortUrlModel {
  shortUrl: string;
  fullUrl: string;
  accessCount: number;
}

interface IMyLinksProps {
  setRefreshMyLinks: Dispatch<SetStateAction<boolean>>;
}

const MyLinks = ({ setRefreshMyLinks }: IMyLinksProps) => {
  const [shortUrlArr, setShortUrlArr] = useState<IShortUrlModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    services.getAllShortUrls().then((response) => {
      setShortUrlArr(response.data.shortUrls);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className='relative flex flex-col gap-4 bg-white rounded-xl w-[60%] p-8 max-h-[80vh]'>
      {isLoading && (
        <div className='absolute top-0 left-0 right-0 h-1 rounded-t-xl overflow-hidden'>
          <div className='h-full w-[10%] bg-blue-500 animate-loading'></div>
        </div>
      )}

      <div className='flex flex-row align-center justify-between sticky top-0 bg-white pb-4 z-10 '>
        <h2 className='text-2xl font-semibold'>Meus links</h2>
        <button
          className='cursor-pointer flex flex-row align-center justify-between bg-[#e4e6ec] p-3 rounded-lg'
          onClick={() => alert("Implementar lógica de download")}
        >
          <Download color='#4d505c' />{" "}
          <span className='ml-1.5 font-semibold text-[#4d505c]'>Baixar CSV</span>
        </button>
      </div>

      <div className='flex flex-col gap-4 overflow-y-auto scroll-custom'>
        {shortUrlArr.length > 0 ? (
          shortUrlArr.map((item) => (
            <Card
              key={item.shortUrl}
              shortUrl={item.shortUrl}
              fullUrl={item.fullUrl}
              accessCount={item.accessCount}
              setRefreshMyLinks={setRefreshMyLinks}
            />
          ))
        ) : (
          <NoShortUrlFound />
        )}
      </div>
    </div>
  );
};

export default MyLinks;
