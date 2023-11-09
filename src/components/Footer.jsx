import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="footer footer-center p-10 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <Link to='/' className="link link-hover">Home</Link> 
                    <Link to='/assignments'>Assignments</Link>
                </nav> 
                <p>Email us: <a href="mailto:rntprince@gmail.com">rntprince@gmail.com</a></p>
                <aside>
                    <p>Copyright © 2023 - All right reserved by Online Group Study</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;