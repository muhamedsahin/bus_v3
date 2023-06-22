"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link'

function Bus(props) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (props.data.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.post("https://bursakartapi.abys-web.com/api/static/routeandstation", { keyword: String(props.data) });
          setData(response.data.result);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [props.data]);
  return (
    <div className="w-screen space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <div className="flex flex-wrap">

        {Data.map((item, index) => (


          <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <div className="bg-white shadow-md p-6 rounded">

              {item.type === "R" && (
                <Link href={'/bus?kod='+item.kod}>
                <h2 className="text-lg font-semibold">Otobüs</h2>
                <p>Kod: {item.kod}</p>
                <p>Aciklama: {item.aciklama}</p>
                <p>Hat No: {item.hatNo}</p>
                </Link>
                /* Diğer içerik */
              )}
              {item.type === "S" && (
                <>
                <h2 className="text-lg font-semibold">İstasyon</h2>
                <p>stationName: {item.stationName}</p>
                </>
              )}
              
              
            </div>
          </div>

        ))}

      </div>
    </div>
  );
}

export default Bus;