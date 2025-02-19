import {UserWithNoPassword, Tag, TravelPost} from 'hybrid-types/DBTypes';
import {fetchData} from '../lib/functions';
import {Credentials, RegisterCredentials} from '../types/LocalTypes';
import {
  AvailableResponse,
  LoginResponse,
  UserResponse,
} from 'hybrid-types/MessageTypes';

const useAuthentication = () => {
  const postLogin = async (credentials: Credentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'},
    };
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string) => {
    const options = {
      headers: {Authorization: 'Bearer ' + token},
    };
    try {
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users/token',
        options,
      );
    } catch (error) {
      throw error as Error;
    }
  };

  const postRegister = async (credentials: RegisterCredentials) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {'Content-Type': 'application/json'},
    };
    try {
      return await fetchData<UserResponse>(
        import.meta.env.VITE_AUTH_API + '/users',
        options,
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const getUsernameAvailable = async (username: string) => {
    return await fetchData<AvailableResponse>(
      import.meta.env.VITE_AUTH_API + '/users/username/' + username,
    );
  };

  const getEmailAvailable = async (email: string) => {
    return await fetchData<AvailableResponse>(
      import.meta.env.VITE_AUTH_API + '/users/email/' + email,
    );
  };

  const getUserById = async (user_id: number) => {
    return await fetchData<UserWithNoPassword>(
      import.meta.env.VITE_AUTH_API + '/users/' + user_id,
    );
  };

  return {
    getUserByToken,
    postRegister,
    getUsernameAvailable,
    getEmailAvailable,
    getUserById,
  };
};

const useTags = () => {
  const getTags = async () => {
    return await fetchData<Tag[]>(import.meta.env.VITE_POST_API + '/tags');
  };

  return {getTags};
};

const useTravelPosts = () => {
  const getPosts = async () => {
    return await fetchData<TravelPost[]>(
      import.meta.env.VITE_POST_API + '/posts',
    );
  };
  return {getPosts};
};

export {useAuthentication, useUser, useTags, useTravelPosts};
