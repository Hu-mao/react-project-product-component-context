import {NavLink} from "react-router";
const Menu = () => {
    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `transition-colors ${
            isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
        }`;

    return (
        <>
            <nav className="mb-6 flex justify-end gap-8 border-b pb-4 text-lg font-medium">

                <NavLink to="/" className={linkStyle}>
                    Categories
                </NavLink>

                <NavLink to="/Products" className={linkStyle}>
                    Products
                </NavLink>

                <NavLink to="/Contacts" className={linkStyle}>
                    Contacts
                </NavLink>
            </nav>


        </>
    );
}
export default Menu;