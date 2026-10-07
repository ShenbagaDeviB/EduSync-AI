const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <h1>Educational ERP</h1>
        <span>Management System</span>
      </div>

      <button
        type="button"
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;