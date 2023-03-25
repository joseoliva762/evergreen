import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "../../hooks/useForm";
import { useUser } from "../../hooks/useUser";
import { endpoints } from "../../services/endpoints";
import "./styles.scss";

export const Policy = () => {
  const navigate = useNavigate();
  const [policy, setPolicy] = useState({});
  const [permissions, setPermissions] = useState([]);
  const [confirmView, setConfirmView] = useState(false);
  const { user } = useUser();
  const { id } = useParams();
  const { form, handleChange } = useForm({
    name: policy?.name || "",
    description: policy?.description || "",
    permission: "",
  });

  const handleAddPermission = useCallback(
    (e) => {
      e.preventDefault();
      const exists = permissions.find(
        (permission) => permission === form.permission
      );
      if (exists) return;
      setPermissions([...permissions, form.permission]);
    },
    [form.permission, permissions]
  );

  const handleRemovePermission = useCallback(
    (e, index) => {
      e.preventDefault();
      const newPermissions = permissions.filter((permission, i) => i !== index);
      setPermissions(newPermissions);
    },
    [permissions]
  );

  const handleSavePolicy = useCallback(
    (e) => {
      e.preventDefault();
      const api = endpoints.policies();
      const body = {
        action: id ? "update" : "create",
        id: id ? id : "",
        payload: {
          name: form.name || policy.name || "",
          description: form.description || policy.description || "",
          permissions,
        },
      };
      axios
        .post(api, body, {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            Authorization: user.token,
          },
        })
        .then((response) => {
          navigate("/policies");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [
      form.description,
      form.name,
      id,
      navigate,
      permissions,
      user.token,
      policy.name,
      policy.description,
    ]
  );

  const handleDeletePolicy = useCallback( (e) => {
    e.preventDefault();
    const api = endpoints.policies();
    const body = {
      action: "delete",
      id,
    };
    axios
      .post(api, body, {
        headers: {
          "x-api-key": process.env.REACT_APP_API_KEY,
          Authorization: user.token,
        },
      })
      .then((response) => {
        navigate("/policies");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, navigate, user.token]);

  useEffect(() => {
    const runEffect = async () => {
      const api = endpoints.policies();
      const body = { action: "read", id };
      try {
        const response = await axios.post(api, body, {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY,
            Authorization: user.token,
          },
        });
        setPolicy(response?.data?.payload?.Item || {});
        setPermissions(response?.data?.payload?.Item?.permissions || []);
      } catch (error) {
        console.log(error);
      }
    };
    runEffect();
  }, [id, user.token]);

  return (
    <div className="Policy">
      <div className="policy__container">
        <h2 className="title">Política</h2>
        <form
          className="form"
          onSubmit={handleSavePolicy}
          onChange={handleChange}
        >
          <div className="input__group">
            <Input
              label="Name"
              placeholder={"Nombre de la politíca"}
              name="name"
              value={form.name || policy.name || ""}
            />
            <Input
              label="Description"
              placeholder={"Descripción de la politíca"}
              name="description"
              value={form.description || policy.description || ""}
            />
            <div className="add__group">
              <Input
                label="Permission"
                placeholder={"Permisos de la politíca"}
                name="permission"
              />
              <Button type="button" label={"+"} onClick={handleAddPermission} />
            </div>
            <div className="boxes">
              {permissions.map((permission, index) => (
                <div className="box" key={index}>
                  <p>{permission}</p>
                  <button
                    type="button"
                    className="close"
                    onClick={(e) => handleRemovePermission(e, index)}
                  >
                    <FiX size={"12px"} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" label={"Guardar"} />
        </form>
      </div>
      {id && (
        <>
          <button className="outsider" onClick={() => setConfirmView(true)}>
            o si prefieres, puedes eliminar esta politíca
          </button>
          {confirmView && (
            <div className="confirm__container">
              <div className="confirm__box">
                <h2 className="title">Eliminar política</h2>
                <p className="description">
                  ¿Estás seguro de que quieres eliminar esta politíca? Esta acción no se puede deshacer.
                </p>
                <div className="buttons">
                  <Button
                    type="button"
                    label={"Cancelar"}
                    onClick={() => setConfirmView(false)}
                  />
                  <Button
                    type="button"
                    label={"Eliminar"}
                    onClick={handleDeletePolicy}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
