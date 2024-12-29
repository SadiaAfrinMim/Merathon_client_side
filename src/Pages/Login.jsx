import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Authprovider/AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success('Signin Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  // Email Password Signin
  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const pass = form.password.value;
    try {
      await signIn(email, pass);
      toast.success('Signin Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <div className="w-full border-white border max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
        <div className="px-6 py-8">
          <h2 className="text-xl text-center text-gray-600">Welcome back!</h2>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center w-full justify-center mt-4 border rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            <span className="ml-3 font-bold">Sign in with Google</span>
          </button>

          <form onSubmit={handleSignIn} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                className="block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Donot have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
