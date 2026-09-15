import { useState } from "react";
import { Button } from "../../../components/Button";
import { registerScheme } from "../schemes/registerScheme";
import { useAuth } from "../hooks/useAuth";

export default function RegisterForm() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Errores por campo, para mostrar el mensaje de yup debajo de cada input.
  const [fieldErrors, setFieldErrors] = useState({});
  const { register, loading, error } = useAuth();

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldErrors({});

    try {
      // abortEarly: false -> junta TODOS los errores, no solo el primero
      await registerScheme.validate(form, { abortEarly: false });
    } catch (validationError) {
      const errors = {};
      validationError.inner.forEach((err) => {
        errors[err.path] = err.message;
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await register(form);
      // acá podés redirigir a login o al home, por ejemplo con react-router
    } catch {
      // el mensaje general de error ya queda en "error" (del hook useAuth)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Registrarse</h2>

      <label>
        Nombre
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          autoComplete="name"
          style={styles.input}
        />
        {fieldErrors.nombre && <p style={styles.fieldError}>{fieldErrors.nombre}</p>}
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          style={styles.input}
        />
        {fieldErrors.email && <p style={styles.fieldError}>{fieldErrors.email}</p>}
      </label>

      <label>
        Contraseña
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          style={styles.input}
        />
        {fieldErrors.password && <p style={styles.fieldError}>{fieldErrors.password}</p>}
      </label>

      <label>
        Repetir contraseña
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          style={styles.input}
        />
        {fieldErrors.confirmPassword && (
          <p style={styles.fieldError}>{fieldErrors.confirmPassword}</p>
        )}
      </label>

      {error && <p style={styles.error}>{error}</p>}

      {/* 'loading' se pasa como una prop (true/false)*/}
      {/* 'Registrando/Registrarse' se pasa como un children*/}
      <Button disabled={loading}>{loading ? "Registrando..." : "Registrarse"}</Button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "320px",
  },

  input: {
    display: "block",
    width: "100%",
    marginTop: "4px",
    padding: "8px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },

  fieldError: {
    color: "red",
    margin: "4px 0 0",
    fontSize: "0.85rem",
  },

  error: {
    color: "red",
    margin: 0,
  },
};