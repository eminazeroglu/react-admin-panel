import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "components/common/header/Header";
import Footer from "components/common/footer/Footer";
import Navbar from "components/common/navbar/Navbar";

function PermissionLayout(props) {
    return (
        <div className="h-full">
            <Header/>
            <Navbar/>
            <div className="lg:h-[calc(100%_-_106px)] h-full overflow-y-auto pb-20">
                <div className="page-container">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default PermissionLayout;
