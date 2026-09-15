const DashboardStats = () => {
  const stats = [
    {
      title: "Total Students",
      value: 0,
    },
    {
      title: "Total Faculty",
      value: 0,
    },
    {
      title: "Total Courses",
      value: 0,
    },
    {
      title: "Attendance",
      value: "0%",
    },
  ];

  return (
    <div className="dashboard-cards">
      {stats.map((stat) => (
        <div className="dashboard-card" key={stat.title}>
          <h3>{stat.title}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;