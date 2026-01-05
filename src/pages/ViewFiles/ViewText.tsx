import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Hook
import { useViewFile } from "../../hooks/useViewFile";

export function ViewText() {
  const { fileId } = useParams<{ fileId: string }>();
  const { fileUrl, loading, error } = useViewFile(fileId!);

  const [content, setContent] = useState<string>("");

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

  if (loading) return <div>Loading file...</div>;
  if (error) return <div>{error}</div>;
  if (!fileUrl) return <div>No file to display</div>;

  // Detectamos extensión a partir del fileId o URL
  const extension = fileUrl.split('.').pop()?.toLowerCase() || "txt";

  // Si es HTML, renderizamos como HTML
  if (extension === "html") {
    return (
      <div
        style={{ padding: "20px" }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Default: txt
  return (
    <pre
        style={{
            padding: "20px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            backgroundColor: "#f5f5f5",
            color: "#111", // más oscuro
            fontFamily: "monospace", // fuente monoespaciada
            fontSize: "16px", // tamaño legible
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
  );
}
