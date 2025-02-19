import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <section className="flex w-full flex-col">
      {user ? (
        <>
          <div className="bg-transparent-blue w-full sm:w-4/5 sm:h-100 md:w-3/5 md:max-w-170 m-auto p-2 h-80 my-6 shadow-lg text-darkgreen z-10 relative flex flex-row gap-3">
            <div className="flex flex-col w-1/2">
              <p className="bg-offwhite p-1 m-1 w-full font-bold md:py-1.5">
                {user.username}
              </p>
              <img
                className="w-full bg-offwhite m-1"
                src={user.profile_picture || undefined}
                alt="profile picture"
              />
            </div>
            <div className="flex flex-col w-1/2 my-1 relative">
              <ul className="flex flex-row justify-between mx-1 gap-2 items-center">
                <li className="py-1.5 p-1 px-1 h-full rounded-lg shadow-lg bg-blue text-center w-full font-bold text-sm md:text-base transform-all duration-300 ease-in-out hover:bg-lightblue">
                  Followers
                </li>
                <li className="py-1.5 p-1 px-1 h-full rounded-lg shadow-lg bg-blue text-center w-full font-bold text-sm md:text-base transform-all duration-300 ease-in-out hover:bg-lightblue">
                  Following
                </li>
              </ul>
              <section className="flex flex-col bg-offwhite p-1 m-1 rounded-lg shadow-lg my-2">
                <p className="text-center">{user.profile_info}</p>
              </section>
              <button
                type="button"
                className="bg-blue p-1 px-2 rounded-lg shadow-lg absolute bottom-0 right-0 mx-1 transform-all duration-300 ease-in-out hover:bg-lightblue"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className='flex flex-row w-full gap-1 md:w-3/5 md:max-w-170 justify-center m-auto'>
            <button type='button' className='bg-lightblue text-darkgreen p-1 rounded-lg shadow-lg m-1 transform-all duration-300 ease-in-out hover:bg-darkgreen hover:text-lightblue active:bg-darkergreen active:text-offwhite w-full'>
              Your posts
            </button>
            <button type='button' className='bg-lightblue text-darkgreen p-1 rounded-lg shadow-lg m-1 transform-all duration-300 ease-in-out hover:bg-darkgreen hover:text-lightblue active:bg-darkergreen active:text-offwhite w-full'>
              New post
            </button>
            <button type='button' className='bg-lightblue text-darkgreen p-1 rounded-lg shadow-lg m-1 transform-all duration-300 ease-in-out hover:bg-darkgreen hover:text-lightblue active:bg-darkergreen active:text-offwhite w-full'>
              Likes
            </button>

          </div>

        </>
      ) : (
        <p className="text-center">No user information available.</p>
      )}
    </section>
  );
};

export default Profile;
