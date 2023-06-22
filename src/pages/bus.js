import { Bus, NavBar, Map } from '@/components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const fetchData = async (kod, url) => {
  try {
    const response = await axios.post(url, {
      keyword: kod
    });

    return response.data.result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function BusPage() {
  const router = useRouter();
  let { kod } = router.query;

  const [responseData, setResponseData] = useState(null);
  const [durakData, setDurakData] = useState(null);
  const [poindData, setPointData] = useState({});

  useEffect(() => {

    let fetchApiDataBus = async (kod) => {
      const data = await fetchData(kod, 'https://bursakartapi.abys-web.com/api/static/realtimedata');
      setResponseData(data);
    };
    const fetchApiDataDurak = async (kod) => {
      const data = await fetchData(kod, 'https://bursakartapi.abys-web.com/api/static/routeandstation');
      setDurakData(data);
    };

    if (kod) {
      fetchApiDataBus(kod);
      fetchApiDataDurak(kod);
    }
    /*https://bursakartapi.abys-web.com/api/static/routeandstation
    
    {keyword: "101"}
    keyword:"101"
    */
  }, [kod]);

  useEffect(() => {

    const fetchApiDataBus = async (kod) => {
      const data = await fetchData(kod, 'https://bursakartapi.abys-web.com/api/static/realtimedata');
      setResponseData(data);
    };

    const interval = setInterval(() => {
      if (kod) {
        fetchApiDataBus(kod);
      }
    }, 2500);

    // Komponent temizlendiğinde setInterval'i durdur
    return () => {
      clearInterval(interval);
    };
  }, [kod]);
  // onDataReceived işlevi, alınan veriyi state'e atar
  const PointData = (pointData) => {
    // pointData'ya göre işlemleri gerçekleştirin
    setPointData(pointData)
  };

  const yenile = () => {
    const fetchApiData = async (kod) => {
      const data = await fetchData(kod);
      setResponseData(data);
    };

    if (kod) {

      fetchApiData(kod);
    }
  }

  return (
    <main className='min-h-screen bg-slate-100'>
      <Head>
        <title>MFŞ Burulaş Hizmet</title>
      </Head>
      <NavBar />
      <div className="hero bg-slate-100 h-screen w-screen flex">
        <div className="flex-1 pt-36 padding-x justify-center flex flex-col md:flex-row">
          <div className="w-full md:w-2/6 flex flex-col text-center">
            <h1 onClick={yenile} className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              {kod} aracının özellikleri
            </h1>
            <p className="text-2xl font-semibold text-gray-900">Sürücü: {poindData.surucu}</p>
            <p className="text-2xl font-semibold text-gray-900">Engeli Uyumlumu {poindData.engelliUygunMu}:</p>
            <p className="text-2xl font-semibold text-gray-900">Günlük Yolcu: {poindData.gunlukYolcu}</p>
            <p className="text-2xl font-semibold text-gray-900">Hız: {poindData.hiz}</p>
            <p className="text-2xl font-semibold text-gray-900">Kılima Varmı: {poindData.klimaVarMi}</p>
            <p className="text-2xl font-semibold text-gray-900">Max Hızı: {poindData.maxHiz}</p>
            <p className="text-2xl font-semibold text-gray-900">Mesafe: {poindData.mesafe}</p>
            <p className="text-2xl font-semibold text-gray-900">Plaka: {poindData.plaka}</p>
            <p className="text-2xl font-semibold text-gray-900">Renk: {poindData.renk}</p>
            <p className="text-2xl font-semibold text-gray-900">Yön: {poindData.yon}</p>
            <h1 className="text-blue-600">MFS compain</h1>
          </div>
          <div className="w-full h-full md:w-2/3 flex justify-center items-center p-5">
            <Map lat="40.206364" lon="28.9888171" PointData={PointData} classes="w-full h-full rounded-lg" data={responseData} duraklar={durakData} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default BusPage;