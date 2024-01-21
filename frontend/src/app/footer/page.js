// footer


"use client"
import "./footer.css"
import { FaTwitter, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const Footer = () => {
    return ( 
        <div className="footer">
            <div className="top">
                <div className="titles">
                    <p>Subscribe</p>
                    <p>Coffee</p>
                    <p>Cold Brew</p>
                    <p>Gear</p>
                </div>
                <div className="links">
                    <ul className="about">
                        <p>ABOUT</p>
                        <li>Our story</li>
                        <li>Locations</li>
                        <li>Jobs</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                    </ul>
                    <ul className="learn">
                        <p>LEARN</p>
                        <li>Brew Guides</li>
                        <li>Blog</li>
                        <li>Impact</li>
                    </ul>
                    <ul className="wholesale">
                        <p>WHOLEALE</p>
                        <li>Serve</li>
                        <li>Ordering</li>
                    </ul>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <div className="logo">Coffee</div>
                    <div>© 2024 coffee.com</div>
                    <p>Terms & conditions</p>
                    <p>Privacy policy</p>
                    <p>Your privacy policy</p>
                </div>
                <div className="socialMedia">
                <div><FaInstagram /></div>
                <div><FaFacebook /></div>
                <div><FaTwitter /></div>
                <div><FaTiktok /></div>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;

