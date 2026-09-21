import { useEffect, useState } from "react";
import api from "../api/api";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [editingPayroll, setEditingPayroll] = useState(null);

  const [formData, setFormData] = useState({
    payrollId: "",
    facultyId: "",
    month: "",
    year: "",
    basicSalary: "",
    allowances: 0,
    deductions: 0,
    netSalary: "",
    paymentStatus: "Pending",
    paymentDate: ""
  });

  const fetchPayrolls = async () => {
    try {
      const response = await api.get("/payrolls");
      setPayrolls(response.data);
    } catch (error) {
      console.error("Failed to fetch payrolls:", error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      payrollId: "",
      facultyId: "",
      month: "",
      year: "",
      basicSalary: "",
      allowances: 0,
      deductions: 0,
      netSalary: "",
      paymentStatus: "Pending",
      paymentDate: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        year: Number(formData.year),
        basicSalary: Number(formData.basicSalary),
        allowances: Number(formData.allowances),
        deductions: Number(formData.deductions),
        netSalary: Number(formData.netSalary),
        paymentDate: formData.paymentDate
          ? new Date(formData.paymentDate)
          : undefined
      };

      if (editingPayroll) {
        await api.put(
          `/payrolls/${editingPayroll._id}`,
          data
        );

        alert("Payroll updated successfully");
        setEditingPayroll(null);
      } else {
        await api.post("/payrolls", data);
        alert("Payroll added successfully");
      }

      resetForm();
      fetchPayrolls();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save payroll"
      );
    }
  };

  const handleEdit = (payroll) => {
    setEditingPayroll(payroll);

    setFormData({
      payrollId: payroll.payrollId,
      facultyId: payroll.facultyId,
      month: payroll.month,
      year: payroll.year,
      basicSalary: payroll.basicSalary,
      allowances: payroll.allowances,
      deductions: payroll.deductions,
      netSalary: payroll.netSalary,
      paymentStatus: payroll.paymentStatus,
      paymentDate: payroll.paymentDate
        ? payroll.paymentDate.split("T")[0]
        : ""
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this payroll?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/payrolls/${id}`);

      alert("Payroll deleted successfully");

      fetchPayrolls();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete payroll"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Payroll Management</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="payrollId"
          placeholder="Payroll ID"
          value={formData.payrollId}
          onChange={handleChange}
          required
        />

        <input
          name="facultyId"
          placeholder="Faculty ID"
          value={formData.facultyId}
          onChange={handleChange}
          required
        />

        <input
          name="month"
          placeholder="Month"
          value={formData.month}
          onChange={handleChange}
          required
        />

        <input
          name="year"
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />

        <input
          name="basicSalary"
          type="number"
          placeholder="Basic Salary"
          value={formData.basicSalary}
          onChange={handleChange}
          required
        />

        <input
          name="allowances"
          type="number"
          placeholder="Allowances"
          value={formData.allowances}
          onChange={handleChange}
        />

        <input
          name="deductions"
          type="number"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleChange}
        />

        <input
          name="netSalary"
          type="number"
          placeholder="Net Salary"
          value={formData.netSalary}
          onChange={handleChange}
          required
        />

        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <input
          name="paymentDate"
          type="date"
          value={formData.paymentDate}
          onChange={handleChange}
        />

        <button type="submit">
          {editingPayroll
            ? "Update Payroll"
            : "Add Payroll"}
        </button>
      </form>

      <hr />

      <h3>Payroll Records</h3>

      {payrolls.length === 0 ? (
        <p>No payroll records found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payroll ID</th>
              <th>Faculty ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll._id}>
                <td>{payroll.payrollId}</td>
                <td>{payroll.facultyId}</td>
                <td>{payroll.month}</td>
                <td>{payroll.year}</td>
                <td>{payroll.basicSalary}</td>
                <td>{payroll.allowances}</td>
                <td>{payroll.deductions}</td>
                <td>{payroll.netSalary}</td>
                <td>{payroll.paymentStatus}</td>

                <td>
                  {payroll.paymentDate
                    ? payroll.paymentDate.split("T")[0]
                    : "-"}
                </td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(payroll)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(payroll._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default Payroll;