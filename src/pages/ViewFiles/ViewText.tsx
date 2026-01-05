import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Hook
import { useViewFile } from "../../hooks/useViewFile";

export function ViewText() {
  const { fileId } = useParams<{ fileId: string }>();
  const { fileUrl, loading, error } = useViewFile(fileId!);

  const [content, setContent] = useState<string>("");

  // Descargar archivo
  const handleDownload = () => {
    if (!fileUrl) return
    const link = document.createElement("a")
    link.href = fileUrl
    link.download = "file.txt"; // podés poner un nombre dinámico si lo recibís del backend
    link.click()
  }

  useEffect(() => {
    if (!fileUrl) return;

    const loadText = async () => {
      try {
        const response = await fetch(fileUrl);
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error(err);
        setContent("Error loading file content");
      }
    };

    loadText();
  }, [fileUrl]);

  if (loading)
    return <div className="create-campaign-message-successful">Loading file...</div>;
  if (error)
    return <div className="create-campaign-message-unsuccessful">{error}</div>;
  if (!fileUrl)
    return <div className="create-campaign-message-unsuccessful">No file to display</div>;

  // Detectamos extensión a partir del fileId o URL
  const extension = fileUrl.split('.').pop()?.toLowerCase() || "txt";

  return (
    <div style={{ padding: "20px" }}>
      {/* Botón de descarga arriba a la derecha */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <button
          className="create-campaign-button"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      {/* Contenido del archivo */}
      {extension === "html" ? (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{
            backgroundColor: "#f5f5f5",
            color: "#111",
            padding: "20px",
            borderRadius: "6px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        />
      ) : (
        <pre
          style={{
            padding: "20px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            backgroundColor: "#f5f5f5",
            color: "#111",
            fontFamily: "monospace",
            fontSize: "16px",
            lineHeight: "1.5",
            borderRadius: "6px",
            maxHeight: "90vh",
            overflowY: "auto",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {content}
        </pre>
      )}
    </div>
  );
}
