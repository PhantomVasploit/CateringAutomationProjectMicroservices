import { toast } from "react-toastify";

toast.configure()
const Loading = ()=>{
  return(
    <div className="container mt-4">
      <div className="row">
        <div className="d-flex justify-content-center mt-4">
          <div className="bouncer">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
