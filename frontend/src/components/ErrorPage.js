import { Link } from "react-router-dom";
import '../styling/ErrorPage.css'

export default function ErrorPage() {
    
    return (
      <div className="errorSection">
        <div className="errorContents">
        <i><h1 className="oops">Oops!</h1></i>
          <i><h3 className="errorText">This page doesn't exist</h3></i>
          <Link to='/'>
            <h4>BACK TO HOMEPAGE</h4>
          </Link>
        </div>
      </div>
    );
  }