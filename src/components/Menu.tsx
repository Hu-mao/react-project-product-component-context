import {NavLink} from "react-router";

type MenuProps = {
    title: string;
};
const Menu = ({ title }: MenuProps) => {
    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `transition-colors ${
            isActive
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
        }`;

    return (
        <>
            <h1 className="mb-6 text-3xl font-bold">{title}</h1>
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