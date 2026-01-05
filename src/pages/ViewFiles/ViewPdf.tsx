import { useViewFile } from "../../hooks/useViewFile";
import { useParams } from "react-router-dom";

export function ViewPdf() {
  const { fileId } = useParams<{ fileId: string }>();
  const { fileUrl, loading, error } = useViewFile(fileId!);

  if (loading) return <div className="create-campaign-message-successful">Loading PDF...</div>;
  if (error) return <div className="create-campaign-message-unsuccessful">{error}</div>;
  if (!fileUrl) return <div className="create-campaign-message-unsuccessful">No file to display</div>;

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src={fileUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
}
