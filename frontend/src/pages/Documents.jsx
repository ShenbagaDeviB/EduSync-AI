import { useEffect, useState } from "react";
import api from "../api/api";

const initialForm = {
  documentId: "",
  ownerId: "",
  documentType: "ID Proof",
  documentName: "",
  fileUrl: "",
  status: "Active",
};

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [editingDocument, setEditingDocument] = useState(null);
  const [formData, setFormData] = useState(initialForm);

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
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingDocument(null);
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
      status: document.status,
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
    <main className="dashboard documents-page">
      <div className="documents-container">

        {/* Header */}

        <div className="documents-header">
          <div>
            <h2>Documents</h2>
            <p>
              Manage institutional and student documents.
            </p>
          </div>

          <div className="documents-count">
            <strong>{documents.length}</strong>
            <span>Total Documents</span>
          </div>
        </div>

        {/* Form */}

        <div className="document-form-card">

          <div className="section-header">
            <div>
              <h3>
                {editingDocument
                  ? "Edit Document"
                  : "Add Document"}
              </h3>

              <p>
                {editingDocument
                  ? "Update the document details below."
                  : "Enter the details to add a new document."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="document-form-grid">

              <div className="form-group">
                <label htmlFor="documentId">
                  Document ID
                </label>

                <input
                  id="documentId"
                  name="documentId"
                  placeholder="Enter document ID"
                  value={formData.documentId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="ownerId">
                  Owner ID
                </label>

                <input
                  id="ownerId"
                  name="ownerId"
                  placeholder="Enter owner ID"
                  value={formData.ownerId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="documentType">
                  Document Type
                </label>

                <select
                  id="documentType"
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleChange}
                  required
                >
                  <option value="ID Proof">ID Proof</option>
                  <option value="Certificate">
                    Certificate
                  </option>
                  <option value="Marksheet">
                    Marksheet
                  </option>
                  <option value="Resume">Resume</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="documentName">
                  Document Name
                </label>

                <input
                  id="documentName"
                  name="documentName"
                  placeholder="Enter document name"
                  value={formData.documentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group form-group-full">
                <label htmlFor="fileUrl">
                  File URL
                </label>

                <input
                  id="fileUrl"
                  name="fileUrl"
                  type="url"
                  placeholder="Enter file URL"
                  value={formData.fileUrl}
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
                  <option value="Active">Active</option>
                  <option value="Archived">
                    Archived
                  </option>
                </select>
              </div>

            </div>

            <div className="document-form-actions">

              {editingDocument && (
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
                {editingDocument
                  ? "Update Document"
                  : "Add Document"}
              </button>

            </div>

          </form>
        </div>

        {/* Records */}

        <div className="document-records-card">

          <div className="section-header">
            <div>
              <h3>Document Records</h3>
              <p>
                View and manage all uploaded documents.
              </p>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="document-empty-state">
              <h4>No documents found</h4>
              <p>
                Add your first document using the form above.
              </p>
            </div>
          ) : (
            <div className="document-table-wrapper">

              <table className="document-table">

                <thead>
                  <tr>
                    <th>Document ID</th>
                    <th>Owner ID</th>
                    <th>Type</th>
                    <th>Document Name</th>
                    <th>File</th>
                    <th>Uploaded At</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {documents.map((document) => (
                    <tr key={document._id}>

                      <td className="document-id">
                        {document.documentId}
                      </td>

                      <td>
                        {document.ownerId}
                      </td>

                      <td>
                        <span className="document-type-badge">
                          {document.documentType}
                        </span>
                      </td>

                      <td className="document-name">
                        {document.documentName}
                      </td>

                      <td>
                        <a
                          href={document.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="document-file-link"
                        >
                          Open File
                        </a>
                      </td>

                      <td>
                        {document.uploadedAt
                          ? document.uploadedAt.split("T")[0]
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={`document-status-badge ${
                            document.status === "Active"
                              ? "document-active"
                              : "document-archived"
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>

                      <td>
                        <div className="document-actions">

                          <button
                            type="button"
                            className="edit-button"
                            onClick={() =>
                              handleEdit(document)
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(document._id)
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

export default Documents;