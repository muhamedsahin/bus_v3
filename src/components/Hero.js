"use client";

import Link from "next/link";
import Image from "next/image";
import Bus from "./Bus";
import { useState } from "react";

function Hero() {

    const [Kayit, SetKayit] = useState("");
    const [Search, SetSearch] = useState("")

    function Ara() {
        SetSearch(Kayit)
        console.log("gönder")
    }

    return (
        <main>
            <div className="hero bg-slate-100 pt-36 padding-x justify-cente h-full flex flex-col md:flex-row">
                <div className="flex-1 pt-36 padding-x justify-center flex items-center">
                    <div className="w-full md:w-1/2 flex flex-col items-center">
                        <h1 className="hero__title">
                            Bursa&apos;da istediğin aracın anlık konumuna bakabilirsin.
                        </h1>
                        <h1 className="text-blue-600">MFS compain</h1>
                    </div>
                </div>
                <div className="flex-1 flex justify-center items-center">
                    <Image
                        src="/bus.png"
                        loading="lazy"
                        alt="hero"
                        width={500}
                        height={300}
                        className="object-contain"
                    />
                </div>
            </div>


            <section id="sorgu" className="dark:bg-slate-100 flex">

                <div className="w-screen space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">

                    <div className="flex items-center justify-between">
                        <h1 className="font-semibold text-slate-900 py-2 pl-3">Ara</h1>
                        <span onClick={Ara} className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-700 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                            <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                            </svg>
                            Ara
                        </span>
                    </div>

                    <form className="group relative">
                        <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                        <input onChange={event => SetKayit(event.target.value)} className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Otobüs ara" />
                    </form>
                </div>
            </section>
            <Bus data={Search} />
        </main>
    );
};

export default Hero;
