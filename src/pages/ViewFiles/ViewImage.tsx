import { useViewFile } from "../../hooks/useViewFile";
import { useParams } from "react-router-dom";

export function ViewImage() {
  const { fileId } = useParams<{ fileId: string }>();
  const { fileUrl, loading, error } = useViewFile(fileId!);

  if (loading) return <div className="create-campaign-message-successful">Loading image...</div>;
  if (error) return <div className="create-campaign-message-unsuccessful">{error}</div>;
  if (!fileUrl) return <div className="create-campaign-message-unsuccessful">No image to display</div>;

  const handleDownload = () => {
    if(!fileUrl) return
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "image"
    link.click()
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Contenedor flex para botón y contenido */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button
          className="create-campaign-button"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      {/* Imagen */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={fileUrl}
          alt="Selected file"
          style={{
            maxWidth: "100%",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}
