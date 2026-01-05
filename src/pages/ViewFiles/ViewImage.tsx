import { useViewFile } from "../../hooks/useViewFile";
import { useParams } from "react-router-dom";

export function ViewImage() {
  const { fileId } = useParams<{ fileId: string }>();
  const { fileUrl, loading, error } = useViewFile(fileId!);

  if (loading) return <div>Loading image...</div>;
  if (error) return <div>{error}</div>;
  if (!fileUrl) return <div>No image to display</div>;

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
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
  );
}
