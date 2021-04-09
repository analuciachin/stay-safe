import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "./Nav.css";

export default function Nav() {
  let history = useHistory();

  const logout = () => {
    axios.post(`/api/logout`).then((response) => {
      console.log(response);
      history.push(`/`);
    });
  };

  return (
    <Row>
      <Col md={{ span: 4, offset: 8 }}>
        <button className="logout mt-5 float-right mr-5" onClick={logout}>
          Logout
        </button>
      </Col>
    </Row>
  );
}
