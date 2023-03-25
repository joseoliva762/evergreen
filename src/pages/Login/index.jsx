// import { useCallback } from 'react';
import { useCallback } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { useForm } from "./../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import { to } from "../../services/to";
import "./styles.scss";
import { useRoles } from "../../hooks/useRoles";
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { user, setLoading, fetchAuthSignin, setError, setUserToken } =
    useUser();
  const { decodeRoles, setUserRoles, setUserPolicies, setUserPermissions } =
    useRoles();
  const navigate = useNavigate();
  const { form, handleChange } = useForm({
    user: "",
    password: "",
  });

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);
      try {
        const body = {
          action: "signin",
          payload: {
            user: form.user,
            password: form.password,
          },
        };
        const [errSigningin, signedin] = await to(fetchAuthSignin(body));
        if (errSigningin) throw errSigningin;
        const { token } = signedin.payload;
        const [errDecoding, decoded] = await to(decodeRoles(token));
        if (errDecoding) throw errDecoding;
        setUserToken(token);
        const { roles } = decoded.payload;
        const policies = roles.map((role) => role.policies).flat();
        const permissions = [
          ...new Set(policies.map((policy) => policy.permissions).flat()),
        ];
        setUserRoles(roles || []);
        setUserPolicies(policies || []);
        setUserPermissions(permissions || []);
        navigate('/');
        setLoading(false);
        setError(null);

      } catch (error) {
        setError(error);
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.user, form.password, setLoading, fetchAuthSignin, setError]
  );

  return (
    <div className="login">
      <article className="signin">
        <h2 className="title">Evergreen</h2>
        <p className="paragraph">
          Inicia sesión para administrar roles, políticas y permisos
        </p>
        <form className="form" onChange={handleChange} onSubmit={handleLogin}>
          <div className="input__group">
            <Input
              type="text"
              name="user"
              value={form.user}
              placeholder="Correo electrónico o numero de teléfono"
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              value={form.password}
              placeholder="Contraseña"
              onChange={handleChange}
            />
          </div>
          <Button label="Iniciar sesión" type="submit" />
        </form>
      </article>
      {user.loading && <Loading />}
    </div>
  );
};
