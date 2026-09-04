import UserList from "../components/UserList";


function Users() {
  const users = [
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@email.com",
      estado: false,
    },
    {
      id: 2,
      name: "María Gómez",
      email: "maria@email.com",
      estado: true,
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos@email.com",
      estado: true,
    },
    {
      id: 4,
      name: "Ana Fernández",
      email: "ana@email.com",
      estado: false,
    },
  ];


  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Users</h1>
      <p>Listado estático de usuarios.</p>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "30px",
        }}
      >
        {users.map((user) => (
          <UserList key={user.id} user={user}/>
        ))}
      </div>
    </div>
  );
}


export default Users;
