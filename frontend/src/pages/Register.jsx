import { useState } from 'react';
import {Button} from '../components/Button'

export default function RegisterForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Registrarse</h2>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          style={styles.input}
        />
      </label>

      <label>
        Contraseña
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          style={styles.input}
        />
      </label>

      <label>
        Repetir contraseña
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          style={styles.input}
        />
      </label>

      {error && <p style={styles.error}>{error}</p>}

     {/* 'loading' se pasa como una prop (true/false)*/}
     {/* 'Registrando/Registrarse' se pasa como un children*/}
      <Button disabled = {loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '320px',
  },

  input: {
    display: 'block',
    width: '100%',
    marginTop: '4px',
    padding: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },

  error: {
    color: 'red',
    margin: 0,
  }
};
