import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  feeId: "",
  studentId: "",
  amount: "",
  dueDate: "",
  status: "Pending",
};

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [editingFee, setEditingFee] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const fetchFees = async () => {
    try {
      const response = await api.get("/fees");
      setFees(response.data);
    } catch (error) {
      console.error("Failed to fetch fees:", error);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingFee(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        amount: Number(formData.amount),
      };

      if (editingFee) {
        await api.put(`/fees/${editingFee._id}`, data);
        alert("Fee updated successfully");
      } else {
        await api.post("/fees", data);
        alert("Fee added successfully");
      }

      resetForm();
      fetchFees();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to save fee"
      );
    }
  };

  const handleEdit = (fee) => {
    setEditingFee(fee);

    setFormData({
      feeId: fee.feeId,
      studentId: fee.studentId,
      amount: fee.amount,
      dueDate: fee.dueDate
        ? fee.dueDate.split("T")[0]
        : "",
      status: fee.status,
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this fee?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/fees/${id}`);

      alert("Fee deleted successfully");

      fetchFees();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete fee"
      );
    }
  };

  return (
    <main className="dashboard fees-page">
      <div className="fees-container">

        <div className="fees-header">
          <div>
            <h2>Fees</h2>
            <p>
              Manage student fees, payments, due dates,
              and payment status.
            </p>
          </div>

          <div className="fees-count">
            <strong>{fees.length}</strong>
            <span>Total Fee Records</span>
          </div>
        </div>

        <div className="fee-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingFee
                  ? "Edit Fee"
                  : "Add Fee"}
              </h3>

              <p>
                {editingFee
                  ? "Update the fee details below."
                  : "Enter the details to create a new fee record."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="fee-form-grid">

              <div className="form-group">
                <label htmlFor="feeId">
                  Fee ID
                </label>

                <input
                  id="feeId"
                  name="feeId"
                  placeholder="Enter fee ID"
                  value={formData.feeId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="studentId">
                  Student ID
                </label>

                <input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="amount">
                  Amount
                </label>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter fee amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dueDate">
                  Due Date
                </label>

                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Overdue">
                    Overdue
                  </option>
                </select>
              </div>

            </div>

            <div className="fee-form-actions">

              {editingFee && (
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
                {editingFee
                  ? "Update Fee"
                  : "Add Fee"}
              </button>

            </div>

          </form>
        </div>

        <div className="fee-records-card">

          <div className="section-header">
            <div>
              <h3>Fee Records</h3>
              <p>
                View and manage all student fee records.
              </p>
            </div>
          </div>

          {fees.length === 0 ? (
            <div className="fee-empty-state">
              <h4>No fees found</h4>
              <p>
                Add your first fee record using the form
                above.
              </p>
            </div>
          ) : (
            <div className="fee-table-wrapper">

              <table className="fee-table">

                <thead>
                  <tr>
                    <th>Fee ID</th>
                    <th>Student ID</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {fees.map((fee) => (
                    <tr key={fee._id}>

                      <td className="fee-id">
                        {fee.feeId}
                      </td>

                      <td className="fee-student-id">
                        {fee.studentId}
                      </td>

                      <td className="fee-amount">
                        {Number(fee.amount).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </td>

                      <td>
                        {fee.dueDate
                          ? fee.dueDate.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`fee-status-badge fee-${fee.status
                            ?.toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {fee.status}
                        </span>
                      </td>

                      <td>
                        <div className="fee-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(fee)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(fee._id)
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

export default Fees;