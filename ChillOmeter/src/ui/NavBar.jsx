function NavBar() {
    return (
        <div className="pt-5 px-4 xl:px-20 xl:pb-2 pb-10 flex justify-between items-center sm:items-start">
            <p className="font-fontChillTwo font-bold text-xl sm:text-3xl text-center sm:text-left">
                Chill <span className="font-fontChillOne font-light text-[#ab8261]">O</span> Meter
            </p>
            <ul className="flex sm:flex-row sm:gap-10 gap-2 justify-center items-center">
                <li className="text-base sm:text-xl text-yellow-600 cursor-pointer font-semibold font-fontChillOne">
                    <a target="_blank" href="https://x.com/Sanj0yX" rel="noopener noreferrer">
                        X
                    </a>
                </li>
                <li className="text-base sm:text-xl text-yellow-600 cursor-pointer font-semibold font-fontChillOne">
                    <a target="_blank" href="https://sanjoypaul.vercel.app/" rel="noopener noreferrer">
                        Portfolio
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default NavBar;
