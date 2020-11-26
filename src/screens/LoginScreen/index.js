import React from "react";
import SessionContext from '../../globals/SessionContext';

export default function LoginScreen() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const context = React.useContext(SessionContext);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Inicia sesión</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          style={{
            fontSize: 19,
            padding: "5px 22px",
          }}
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={{
            fontSize: 19,
            padding: "5px 22px",
            marginTop: 22,
          }}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          style={{
            marginTop: 22,
            backgroundColor: "#008CBA",
            border: "none",
            padding: "15px 32px",
            color: "#fff",
            fontSize: 19,
          }}
          type="button"
          value="Entrar"
          onClick={() => {
            context.signin(username, password);
          }}
        />
      </div>
    </div>
  );
}
