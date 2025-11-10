
import { Link } from 'react-router';
import ErrorImg from '../assets/error-404.png'

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center flex-col py-10 space-y-5">
      <img src={ErrorImg} alt="" />
      <h1 className="text-5xl font-bold text-green-600">⚠️Page Not Found</h1>
      <p>The page you are looking for is not available.</p>
      <Link>
        <div className="flex bg-linear-to-r from-green-600 to-green-500 px-3 py-2 rounded-md text-[#ffff]">
          <Link to={'/'}>
            <button className="ml-2">Go Back!</button>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default ErrorPage;
