
import Menu from "@/components/Menu.tsx";
import {Outlet} from "react-router";
import Footer from "@/components/Footer.tsx";

const Layout = ()=>{
    return (<>
        <Menu/>
        <Outlet />
        <Footer/>
    </>)
}
export default Layout