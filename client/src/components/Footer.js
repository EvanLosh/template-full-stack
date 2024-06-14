import React from "react";


function Footer({ commonProps }) {



    return (
        <div id="footer" className="bg-blue-500 text-white p-4 shadow-lg h-64">
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto">

                    <div className="flex justify-between items-center">

                        <div className="text-white font-bold text-xl">
                            <h3>Footer</h3>
                        </div>

                        <div className="hidden md:flex space-x-4">

                        </div>
                    </div>
                </div>
            </nav>
        </div >
    );
}

export default Footer;
