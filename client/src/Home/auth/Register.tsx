import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useLogIN} from "../../../ContextLog";
const Register = () => {
  const {setProfile, setLoading, setlogPatient, dark, setdark} = useLogIN();

  const navigate = useNavigate();


  const [error, setError] = useState(null);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const HandelLogin = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register-user",
        {
          email,
          password,
        }
      );
      setLoading(false);
      navigate("/RegisterPatient");
      console.log("====================================");
      console.log(
        "🚀 ~ file: RegisterAdmin.tsx ~ line 48 ~ HandelLogin ~ response",
        response
      );
     console.log("====================================");
    } catch (error) {   

      console.log('====================================');
      console.log(
        "🚀 ~ file: RegisterAdmin.tsx ~ line 48 ~ HandelLogin ~ error",
        error
      );
      console.log('====================================');



      setLoading(false);
      setError(error.response);

    }



  };

  return (
    <div className="relative">
      <img
        src="https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2
                // dark mode

                className="max-w-lg mb-6 font-sans
                text-white
                 text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none"
              >
                Emergency Department <br className="hidden md:block" />
                Ambulance Service{" "}
              </h2>
              <p
                className="max-w-xl mb-4 text-base
           text-sky-50
               md:text-lg"
              >
                The Emergency Department of the Hippocrates Private Hospital is
                currently not in operation due to its restructuring. From 8:00
                until 20:00
              </p>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center
                bg-cyan-400
                rounded-full
                h-9 px-4
                tracking-wide
                text-white
                transition
                duration-200
                transform
                hover:bg-cyan-500
                focus:shadow-outline
                focus:outline-none
                "
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-10 xl:w-5/12">
              <div className=" rounded-2xl shadow-2xl drop-shadow-2xl shadow-sky-300 p-7 sm:p-12">
                <h3 className="mb-4 text-xl text-white font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Log in
                </h3>
                <form>
               
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="Email"
                      className="inline-block text-sky-300 mb-1 font-black"
                    >
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={e => {
                        setemail(e.target.value);
                      }}
                      placeholder="

                      Enter your Email
                      "
                      required
                      type="email"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="Email"
                      name="
                    Email
                      "
                    />
                  </div>

                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="Password"
                      className="inline-block text-sky-300 mb-1 font-black"
                    >
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={e => {
                        setpassword(e.target.value);
                      }}
                      placeholder="
                      Enter your Password
                      "
                      required
                      type="Password"
                      className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                      id="Password"
                      name="Password"
                    />
                  </div>
                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      //HandelLogin
                      onClick={HandelLogin}
                      type="submit"
                      className="inline-flex bg-cyan-400 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline 
                      hover:bg-orange-400
                      hover:text-black
                      "
                    >
                      Log in
                    </button>
                  </div>
                  {
                    // error
                  }
                  {error && (
                    <div className="text-red-500 text-center">
                      <p>{error}</p>
                    </div>
                  )}

                  <p className="text-xs  text-white sm:text-sm">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
