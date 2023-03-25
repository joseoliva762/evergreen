import "./styles.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { FiLogOut, FiSliders, FiShield } from "react-icons/fi";
import { useCallback } from "react";

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const handlePolicies = useCallback(() => {
    navigate("/policies");
  }, [navigate]);

  const handleRoles = useCallback(() => {
    navigate("/roles");
  }, [navigate]);

  return (
    <div className="dashboard">
      <header className="header">
        <h2 className="logo">
          <span>Evergreen:</span>Roles
        </h2>
        <nav className="navigation">
          <button className="button" onClick={handleRoles}>
            <FiShield size={"20px"} />
          </button>
          <button className="button" onClick={handlePolicies}>
            <FiSliders size={"20px"} />
          </button>
          <button className="button" onClick={handleLogout}>
            <FiLogOut size={"20px"} />
          </button>
        </nav>
      </header>
      <article className="container">
        <section className="content">
          <Outlet />
        </section>
      </article>
    </div>
  );
};
