import useForm from '../hooks/formHooks';
import {Credentials} from '../types/LocalTypes';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = (props: {toggleRegister: () => void}) => {
  const {toggleRegister} = props;
  const {handleLogin} = useUserContext();
  const initValues: Credentials = {
    username: '',
    password_hash: '',
  };

  const doLogin = async () => {
    try {
      handleLogin(inputs as Credentials);
    } catch (error) {
      console.error((error as Error).message);
      // Display error to user here(?)
    }
  };

  const {handleSubmit, handleInputChange, inputs} = useForm(
    doLogin,
    initValues,
  );

  return (
    <>
      <div className="bg-transparent-blue w-80 md:w-100 m-auto h-145 my-6 rounded-xl shadow-lg text-darkblue">
        <div className="bg-blue w-70 md:w-90 h-135 rounded-xl shadow-lg absolute my-5 mx-5">
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
              className="my-6 block w-20 rounded-4xl bg-green text-offwhite py-1 transition-all duration-500 ease-in-out hover:bg-darkblue shadow-xl font-bold"
              type="submit"
            >
              Log in
            </button>
          </form>
          <div className="text-center m-2 my-2">
            <p>Want to create an account?</p>
            <p>Register here:</p>
            <button
              type="button"
              onClick={toggleRegister}
              className="my-6 w-25 rounded-4xl bg-lightgreen text-offwhite py-1 transition-all duration-500 ease-in-out hover:bg-darkblue shadow-lg font-bold"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
