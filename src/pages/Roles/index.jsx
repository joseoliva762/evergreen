import axios from "axios";
import { useEffect, useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import { useUser } from "../../hooks/useUser";
import { useRoles } from "../../hooks/useRoles";
import { endpoints } from "../../services/endpoints";
import "./styles.scss";

export const Roles = () => {
  const { roles } = useRoles();
  const { crud, setActions } = useCrud();
  const [rolesList, setRolesList] = useState([]);
  const { user } = useUser();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setActions(roles.permissions, "Roles", "List");
    setActions(roles.permissions, "Roles", "Create");
    setActions(roles.permissions, "Roles", "Read");
    setActions(roles.permissions, "Roles", "Update");
    setActions(roles.permissions, "Roles", "Delete");

    const runEffect = async () => {
      if (rolesList.length === 0) {
        const api = endpoints.roles();
        const body = { action: "list" };
        try {
          const response = await axios.post(api, body, {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
              Authorization: user.token,
            },
          });
          setRolesList(response?.data?.payload?.Items || []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    runEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);

  return (
    <div className="roles">
      <h1 className="title">Roles</h1>
      {!crud.list && (
        <h2 className="subtitle">No tienes permisos para ver esta sección</h2>
      )}
      {crud.list && rolesList && (
        <div className="roles__container">
          {rolesList.map((role, index) => (
            <div className="roles__container__item" key={index}>
              <div className="info">
                <h2 className="roles__container__item__title">{role.name}</h2>
                <p className="roles__container__item__description">
                  {role.description}
                </p>
                <p className="roles__container__item__id">{role.id}</p>
              </div>
              <div className="acions">

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
