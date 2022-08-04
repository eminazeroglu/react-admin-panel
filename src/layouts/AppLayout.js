import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "components/common/header/Header";
import Footer from "components/common/footer/Footer";
import Navbar from "components/common/navbar/Navbar";

function AppLayout(props) {
    return (
        <>
            <Header/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default AppLayout;