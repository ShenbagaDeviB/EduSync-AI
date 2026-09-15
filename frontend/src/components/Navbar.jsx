const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <h1>Educational ERP</h1>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Navbar;