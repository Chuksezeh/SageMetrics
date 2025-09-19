// import "404page.css";
import React, { use } from "react";
import "./noFoundPage.css";
import Navbar from "../Navbar/navBar";
import { useNavigate } from "react-router-dom";
// import { Nav } from "reactstrap";
import Footer from "../Footer/footer";

const NotFoundPage = () => {


const navigate = useNavigate();

const handleGoHome = () => {
    navigate('/');
}


    return(

        <>
    <section className="page_404">
	   <div className="container_404">
		<div className="row">	
		<div className="col-sm-12 ">
		<div className=" text-center">
		<div className="four_zero_four_bg">
		<h1 className="text-center-5 ">Page Not Found!</h1>
	</div>
		
		<div className="contant_box_404">
		<h3 className="h2"> 
		Look like you're lost
		</h3>
		
		<p>The page you are looking for is not avaible!</p>
		
		<a onClick={handleGoHome } style={{cursor:'pointer'}} className="link_404">Go to Home</a>
	</div>
		</div>
		</div>
		</div>
	</div>
</section>

<Footer />

{/* <section className="footer_section_404 mt-5">
    
</section> */}


        
        </>
    )
}
export default NotFoundPage;