import React from "react";
import "./Header.css"


function Header({ commonProps }) {



    return <div id="header" className="bg-blue-500 text-white p-4 shadow-lg">

        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">

                <div className="flex justify-between items-center">

                    <div className="text-white font-bold text-xl">
                        <a href='/' className="text-white no-underline">Template Web Application</a>
                    </div>

                    <div className="hidden md:flex space-x-4">
                        <a href='/' className="text-white hover:text-gray-300"><p>Home</p></a>
                        <a href='/about' className="text-white hover:text-gray-300"><p>About</p></a>
                        {/* {
                            commonProps.user.id > 0 ?
                                <p onClick={commonProps.logout} className="text-white hover:text-gray-300 clickable">Logout</p>
                                :
                                <a href='/login' className="text-white hover:text-gray-300"><p>Login</p></a>
                        } */}
                        {commonProps.user.id
                            ?
                            <div className="dropdown clickable text-white" id="header-user-menu">
                                <p className="dropbtn">{commonProps.user.username}</p>
                                <span className="dropdown-content">
                                    <a href="/login"><p>Account</p></a>
                                    <p onClick={commonProps.logout}>Logout</p>
                                </span>
                            </div>
                            :
                            <a href='/login' className="text-white hover:text-gray-300"><p>Login or sign up</p></a>
                        }
                    </div>
                </div>
            </div>
        </nav >
    </div >;
}

export default Header;