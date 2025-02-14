import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {RegisterCredentials} from '../types/LocalTypes';

const RegisterForm = (props: {toggleRegister: () => void}) => {
  const {toggleRegister} = props;
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [emailAvailable, setEmailAvailable] = useState(true);
  const {postRegister, getUsernameAvailable, getEmailAvailable} = useUser();
  const initValues: RegisterCredentials = {
    username: '',
    password_hash: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const registerResult = await postRegister(inputs as RegisterCredentials);
      console.log('doRegister result', registerResult);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doRegister,
    initValues,
  );

  useEffect(() => {
    const main = async () => {
      try {
        if (inputs.username.length > 2) {
          const result = await getUsernameAvailable(inputs.username);
          //setUsernameAvailable(result.available);
          console.log('username check', result.available);
        } else {
          setUsernameAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setUsernameAvailable(true);
      }
    };

    main();
  }, [inputs.username]);

  useEffect(() => {
    const main = async () => {
      try {
        if (inputs.email.length > 5) {
          const result = await getEmailAvailable(inputs.email);
          console.log('email check', result.available);
          //setEmailAvailable(result.available);
        } else {
          setEmailAvailable(true);
        }
      } catch (error) {
        console.error((error as Error).message);
        setEmailAvailable(true);
      }
    };

    main();
  }, [inputs.email]);

  return (
    <>
      <div className="bg-transparent-blue w-80 md:w-100 m-auto h-160 my-6 rounded-xl shadow-lg text-darkblue">
        <div className="bg-blue w-70 md:w-90 h-150 rounded-xl shadow-lg absolute my-5 mx-5">
          <h1 className="p-10 my-2 text-center">TravelTime!</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <div className=" flex w-4/5 flex-col p-1">
              <label htmlFor="registerusername" className="font-bold">
                Username
              </label>
              <input
                className="my-1.5 rounded-md p-1.5 border-0 bg-lightblue focus:bg-offwhite focus:ring-0 focus:outline-none valid:border-validgreen valid:border-1 invalid:border-1 invalid:border-red-700"
                name="username"
                type="text"
                id="registerusername"
                onChange={handleInputChange}
                autoComplete="off"
                required
                minLength={3}
              />
              {!usernameAvailable && (
                <p className="text-right text-red-800">
                  Username not available
                </p>
              )}
            </div>
            <div className="flex w-4/5 flex-col p-1">
              <label htmlFor="registeremail" className="font-bold">
                Email
              </label>
              <input
                className="my-1.5 rounded-md p-1.5 border-0 bg-lightblue focus:bg-offwhite focus:ring-0 focus:outline-none valid:border-validgreen valid:border-1 invalid:border-1 invalid:border-red-700"
                name="email"
                type="email"
                id="registeremail"
                onChange={handleInputChange}
                autoComplete="off"
                required
              />
              {!emailAvailable && (
                <p className="text-right text-red-800">Email not available</p>
              )}
            </div>
            <div className="flex w-4/5 flex-col p-1">
              <label htmlFor="registerpassword" className="font-bold">
                Password
              </label>
              <input
                className="my-1.5 rounded-md p-1.5 border-0 bg-lightblue focus:bg-offwhite focus:ring-0 focus:outline-none valid:border-validgreen valid:border-1 invalid:border-1 invalid:border-red-700"
                name="password_hash"
                type="password"
                id="registerpassword"
                onChange={handleInputChange}
                autoComplete="off"
                required
                minLength={5}
              />
            </div>
            <button
              className="my-6 block w-25 rounded-4xl bg-green text-offwhite py-1 transition-all duration-500 ease-in-out hover:bg-darkblue shadow-xl font-bold"
              type="submit"
            >
              Register
            </button>
          </form>
          <div className="text-center m-2 my-2">
            <p>Already have an account?</p>
            <p>Log in here:</p>
            <button
              type="button"
              onClick={toggleRegister}
              className="my-6 w-20 rounded-4xl bg-lightgreen text-offwhite py-1 transition-all duration-500 ease-in-out hover:bg-darkblue shadow-lg font-bold"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
