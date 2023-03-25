import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useRoles } from "../../hooks/useRoles";
import { endpoints } from "../../services/endpoints";
import { FiArrowRight } from "react-icons/fi";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export const Policies = () => {
  const [policies, setPolicies] = useState([]);
  const { roles } = useRoles();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleOpenPolicy = useCallback((id) => {
    navigate(`/policies/${id}`);
  }, [navigate]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const runEffect = async () => {
      if (policies.length === 0) {
        const api = endpoints.policies();
        const body = { action: "list" };
        try {
          const response = await axios.post(api, body, {
            headers: {
              "x-api-key": process.env.REACT_APP_API_KEY,
              Authorization: user.token,
            },
          });
          setPolicies(response?.data?.payload?.Items || []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    runEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);

  console.log(policies);

  return (
    <div className="Policies">
      <header className="heading">
        <h1 className="title">Políticas</h1>
        <Button type={"button"} onClick={() => navigate("/policies/create")} label={"Crear política"} />
      </header>
      {policies && (
        <div className="Policies__container">
          {policies.map((policy, index) => (
            <div className="Policies__container__item" key={index}>
              <div className="info">
                <h2 className="Policies__container__item__title">{policy.name}</h2>
                <p className="Policies__container__item__description">
                  {policy.description}
                </p>
                <p className="Policies__container__item__id">{policy.id}</p>
              </div>
              <div className="actions">
                <button className="open" onClick={() => handleOpenPolicy(policy.id)}>
                  <FiArrowRight size={"20px"} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
