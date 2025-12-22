function User({ firstname, lastname }) {
  return (
    <div className="header">
      <h1>Welcome back<br />{firstname} {lastname}!</h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default User;