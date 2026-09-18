import { useEffect, useState } from "react";
import api from "../api/api";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [editingFee, setEditingFee] = useState(null);

  const [formData, setFormData] = useState({
    feeId: "",
    studentId: "",
    amount: "",
    dueDate: "",
    status: "Pending"
  });

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
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...formData,
        amount: Number(formData.amount)
      };

      if (editingFee) {
        await api.put(`/fees/${editingFee._id}`, data);
        alert("Fee updated successfully");
        setEditingFee(null);
      } else {
        await api.post("/fees", data);
        alert("Fee added successfully");
      }

      setFormData({
        feeId: "",
        studentId: "",
        amount: "",
        dueDate: "",
        status: "Pending"
      });

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
      dueDate: fee.dueDate.split("T")[0],
      status: fee.status
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fee?")) {
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
    <main className="dashboard">
      <h2>Fees</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="feeId"
          placeholder="Fee ID"
          value={formData.feeId}
          onChange={handleChange}
          required
        />

        <input
          name="studentId"
          placeholder="Student ID"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>

        <button type="submit">
          {editingFee ? "Update Fee" : "Add Fee"}
        </button>
      </form>

      <hr />

      <h3>Fee Records</h3>

      {fees.length === 0 ? (
        <p>No fees found.</p>
      ) : (
        <table>
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
                <td>{fee.feeId}</td>
                <td>{fee.studentId}</td>
                <td>{fee.amount}</td>
                <td>{fee.dueDate.split("T")[0]}</td>
                <td>{fee.status}</td>

                <td>
                  <button onClick={() => handleEdit(fee)}>
                    Edit
                  </button>

                  <button onClick={() => handleDelete(fee._id)}>
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

export default Fees;