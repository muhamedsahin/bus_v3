import Link from "next/link";
import Image from "next/image";

const NavBar = () => (
  <header className='w-full  absolute z-10'>
    <nav className='max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent'>
      <Link href='/' className='flex justify-center items-center'>
        <Image
          src='/logo.svg'
          alt='logo'
          width={118}
          height={18}
          className='object-contain'
        />
      </Link>

      <button className="text-primary-blue rounded-full bg-slate-100 text-blue-600 min-w-[130px]">
        Login
      </button>
    </nav>
  </header>
);

export default NavBar;