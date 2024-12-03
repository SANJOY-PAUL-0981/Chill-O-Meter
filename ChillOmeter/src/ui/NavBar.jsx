function NavBar(){
    return(
        <div className="pt-5 pl-10 pb-2 flex justify-between">
            <p className="font-fontChillTwo font-bold text-3xl">
                Chill <span className="font-fontChillOne font-light text-[#ab8261]">O</span> Meter
            </p>
            <ul className="flex gap-10 px-20">
                <li className="text-xl text-yellow-600 cursor-pointer font-semibold font-fontChillOne"><a target="_blank" href="https://x.com/Sanj0yX">X</a></li>
                <li className="text-xl text-yellow-600 cursor-pointer font-semibold font-fontChillOne"><a target="_blank" href="https://sanjoypaul.vercel.app/">Portfolio</a></li>
            </ul>
        </div>
    )
}

export default NavBar;