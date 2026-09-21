import { useEffect, useState } from "react";
import api from "../api/api";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [editingDocument, setEditingDocument] = useState(null);

  const [formData, setFormData] = useState({
    documentId: "",
    ownerId: "",
    documentType: "ID Proof",
    documentName: "",
    fileUrl: "",
    status: "Active"
  });

  const fetchDocuments = async () => {
    try {
      const response = await api.get("/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      documentId: "",
      ownerId: "",
      documentType: "ID Proof",
      documentName: "",
      fileUrl: "",
      status: "Active"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDocument) {
        await api.put(
          `/documents/${editingDocument._id}`,
          formData
        );

        alert("Document updated successfully");
        setEditingDocument(null);
      } else {
        await api.post("/documents", formData);
        alert("Document added successfully");
      }

      resetForm();
      fetchDocuments();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to save document"
      );
    }
  };

  const handleEdit = (document) => {
    setEditingDocument(document);

    setFormData({
      documentId: document.documentId,
      ownerId: document.ownerId,
      documentType: document.documentType,
      documentName: document.documentName,
      fileUrl: document.fileUrl,
      status: document.status
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this document?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/documents/${id}`);

      alert("Document deleted successfully");

      fetchDocuments();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to delete document"
      );
    }
  };

  return (
    <main className="dashboard">
      <h2>Documents</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="documentId"
          placeholder="Document ID"
          value={formData.documentId}
          onChange={handleChange}
          required
        />

        <input
          name="ownerId"
          placeholder="Owner ID"
          value={formData.ownerId}
          onChange={handleChange}
          required
        />

        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          required
        >
          <option value="ID Proof">ID Proof</option>
          <option value="Certificate">Certificate</option>
          <option value="Marksheet">Marksheet</option>
          <option value="Resume">Resume</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="documentName"
          placeholder="Document Name"
          value={formData.documentName}
          onChange={handleChange}
          required
        />

        <input
          name="fileUrl"
          placeholder="File URL"
          value={formData.fileUrl}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Archived">Archived</option>
        </select>

        <button type="submit">
          {editingDocument
            ? "Update Document"
            : "Add Document"}
        </button>
      </form>

      <hr />

      <h3>Document Records</h3>

      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Document ID</th>
              <th>Owner ID</th>
              <th>Type</th>
              <th>Document Name</th>
              <th>File URL</th>
              <th>Uploaded At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {documents.map((document) => (
              <tr key={document._id}>
                <td>{document.documentId}</td>
                <td>{document.ownerId}</td>
                <td>{document.documentType}</td>
                <td>{document.documentName}</td>

                <td>
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open File
                  </a>
                </td>

                <td>
                  {document.uploadedAt
                    ? document.uploadedAt.split("T")[0]
                    : ""}
                </td>

                <td>{document.status}</td>

                <td>
                  <button
                    onClick={() =>
                      handleEdit(document)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(document._id)
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

export default Documents;