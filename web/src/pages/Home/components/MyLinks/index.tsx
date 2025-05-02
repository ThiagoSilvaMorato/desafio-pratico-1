import { Download } from "lucide-react";
import { Card } from "./components/Card";
import { NoShortUrlFound } from "./components/NoShortUrlFound";
import { useEffect, useState } from "react";
import { services } from "../../services";

interface IShortUrlModel {
  shortUrl: string;
  fullUrl: string;
  accessCount: number;
}

const MyLinks = () => {
  const [shortUrlArr, setShortUrlArr] = useState<IShortUrlModel[]>([]);

  useEffect(() => {
    services.getAllShortUrls().then((response) => {
      setShortUrlArr(response.data.shortUrls);
    });
  }, []);

  return (
    <div className='flex flex-col gap-4 bg-white rounded-xl w-[60%] p-8'>
      <button onClick={() => console.log(shortUrlArr)}>teste</button>
      <div className='flex flex-row align-center justify-between'>
        <h2 className='text-2xl font-semibold mb-4'>Meus links</h2>
        <button
          className='cursor-pointer flex flex-row align-center justify-between bg-[#e4e6ec] p-3 rounded-lg'
          onClick={() => alert("Implementar lógica de download")}
        >
          <Download color='#4d505c' />{" "}
          <span className='ml-1.5 font-semibold text-[#4d505c]'>Baixar CSV</span>
        </button>
      </div>
      {shortUrlArr.length > 0 ? (
        shortUrlArr.map((item) => (
          <Card
            key={item.shortUrl}
            shortUrl={item.shortUrl}
            fullUrl={item.fullUrl}
            accessCount={item.accessCount}
          />
        ))
      ) : (
        <NoShortUrlFound />
      )}
    </div>
  );
};

export default MyLinks;
