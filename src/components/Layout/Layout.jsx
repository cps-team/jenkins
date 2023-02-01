import Navbar from "./NavBar";

export default function Layout({ children, except }) {

    if (except.includes(window.location.pathname)) {
        return <>{children}</>;
    }

    return <>
        <Navbar />
        {children}
    </>
}