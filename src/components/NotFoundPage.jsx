import {Link} from "react-router-dom";

const NotFoundPage = () =>{
    return(
        <div>
            <h1>Not Found Page </h1>

            <Link to={"/login"}/>
            <Link to={"/"}>

            <button> Regresa a Casa </button>
            </Link>
        </div>
    );
};

export default NotFoundPage;