import { createContext, useContext, useState } from 'react';
import { useJWT } from './useJWT';

const roleInitialState = {
  roles: [],
  policies: [],
  permissions: [],
  loading: false,
  error: null,
}

const RolesContext = createContext({});

export const ProviderRoles = ({ children }) => {
  const roles = useProviderRoles();

  return (
    <RolesContext.Provider value={roles}>
      {children}
    </RolesContext.Provider>
  );
}

export const useRoles = () => useContext(RolesContext);

const useProviderRoles = () => {
  const [roles, setRoles] = useState(roleInitialState);
  const { decode } = useJWT();

  const setUserRoles = (roles) => {
    setRoles((prevState) => ({
      ...prevState,
      roles
    }));
  }

  const setUserPolicies = (policies) => {
    setRoles((prevState) => ({
      ...prevState,
      policies
    }));
  }

  const setUserPermissions = (permissions) => {
    setRoles((prevState) => ({
      ...prevState,
      permissions
    }));
  }

  const setLoading = (loading) => {
    setRoles((prevState) => ({
      ...prevState,
      loading
    }));
  }

  const setError = (error) => {
    setRoles((prevState) => ({
      ...prevState,
      error
    }));
  }

  const decodeRoles = (token) => {
    return new Promise(async (resolve, reject) => {
      try {
        const decoded = await decode(token);
        resolve(decoded);
      } catch (error) {
        reject(error)
      }
    });
  }

  return {
    roles,
    setError,
    setLoading,
    setUserRoles,
    setUserPolicies,
    setUserPermissions,
    decodeRoles
   };
}

