import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  payrollId: "",
  facultyId: "",
  month: "",
  year: "",
  basicSalary: "",
  allowances: 0,
  deductions: 0,
  netSalary: "",
  paymentStatus: "Pending",
  paymentDate: "",
};

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [editingPayroll, setEditingPayroll] =
    useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchPayrolls = async () => {
    try {
      const response = await api.get("/payrolls");
      setPayrolls(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch payrolls:",
        error
      );
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingPayroll(null);
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
          : undefined,
      };

      if (editingPayroll) {
        await api.put(
          `/payrolls/${editingPayroll._id}`,
          data
        );

        alert("Payroll updated successfully");
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
        : "",
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
    <main className="dashboard payroll-page">
      <div className="payroll-container">

        <div className="payroll-header">
          <div>
            <h2>Payroll Management</h2>
            <p>
              Manage faculty salaries, allowances,
              deductions, and payment records.
            </p>
          </div>

          <div className="payroll-count">
            <strong>{payrolls.length}</strong>
            <span>Total Payrolls</span>
          </div>
        </div>

        <div className="payroll-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingPayroll
                  ? "Edit Payroll"
                  : "Add Payroll"}
              </h3>

              <p>
                {editingPayroll
                  ? "Update the payroll details below."
                  : "Enter the salary and payment details."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="payroll-form-grid">

              <div className="form-group">
                <label htmlFor="payrollId">
                  Payroll ID
                </label>

                <input
                  id="payrollId"
                  name="payrollId"
                  placeholder="Enter payroll ID"
                  value={formData.payrollId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="facultyId">
                  Faculty ID
                </label>

                <input
                  id="facultyId"
                  name="facultyId"
                  placeholder="Enter faculty ID"
                  value={formData.facultyId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="month">
                  Month
                </label>

                <input
                  id="month"
                  name="month"
                  placeholder="Enter month"
                  value={formData.month}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">
                  Year
                </label>

                <input
                  id="year"
                  name="year"
                  type="number"
                  placeholder="Enter year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="basicSalary">
                  Basic Salary
                </label>

                <input
                  id="basicSalary"
                  name="basicSalary"
                  type="number"
                  min="0"
                  placeholder="Enter basic salary"
                  value={formData.basicSalary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="allowances">
                  Allowances
                </label>

                <input
                  id="allowances"
                  name="allowances"
                  type="number"
                  min="0"
                  placeholder="Enter allowances"
                  value={formData.allowances}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="deductions">
                  Deductions
                </label>

                <input
                  id="deductions"
                  name="deductions"
                  type="number"
                  min="0"
                  placeholder="Enter deductions"
                  value={formData.deductions}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="netSalary">
                  Net Salary
                </label>

                <input
                  id="netSalary"
                  name="netSalary"
                  type="number"
                  min="0"
                  placeholder="Enter net salary"
                  value={formData.netSalary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentStatus">
                  Payment Status
                </label>

                <select
                  id="paymentStatus"
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Paid">
                    Paid
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="paymentDate">
                  Payment Date
                </label>

                <input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="payroll-form-actions">

              {editingPayroll && (
                <button
                  type="button"
                  className="secondary-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="primary-button"
              >
                {editingPayroll
                  ? "Update Payroll"
                  : "Add Payroll"}
              </button>

            </div>

          </form>
        </div>

        <div className="payroll-records-card">

          <div className="section-header">
            <div>
              <h3>Payroll Records</h3>
              <p>
                View and manage all faculty payroll records.
              </p>
            </div>
          </div>

          {payrolls.length === 0 ? (
            <div className="payroll-empty-state">
              <h4>No payroll records found</h4>
              <p>
                Add your first payroll record using the form above.
              </p>
            </div>
          ) : (
            <div className="payroll-table-wrapper">

              <table className="payroll-table">

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

                      <td className="payroll-id">
                        {payroll.payrollId}
                      </td>

                      <td className="payroll-faculty-id">
                        {payroll.facultyId}
                      </td>

                      <td>{payroll.month}</td>

                      <td>{payroll.year}</td>

                      <td className="salary-amount">
                        {payroll.basicSalary}
                      </td>

                      <td className="salary-amount">
                        {payroll.allowances}
                      </td>

                      <td className="salary-amount">
                        {payroll.deductions}
                      </td>

                      <td className="net-salary">
                        {payroll.netSalary}
                      </td>

                      <td>
                        <span
                          className={`payroll-status-badge payroll-${payroll.paymentStatus?.toLowerCase()}`}
                        >
                          {payroll.paymentStatus}
                        </span>
                      </td>

                      <td>
                        {payroll.paymentDate
                          ? payroll.paymentDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <div className="payroll-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(payroll)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(payroll._id)
                            }
                          >
                            Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </main>
  );
};

export default Payroll;