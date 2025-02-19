"use client";

import { Mail as MailIcon } from "lucide-react";
import TextElement from "./TextElement";
export const explain = {
  name: "Letter",
  icon: <MailIcon />,
  description: "Letter is a component that simulates a letter or email document.",
}

export default function LetterSimulation({
  to = "",
  from = "",
  date = new Date().toLocaleDateString(),
  subject = "",
  content = "",
  signature = "",
  fontFamily = "Shadows Into Light",
  fontSize = "20px",
  letterSpacing = "normal",
  lineHeight = "1.5",
  backgroundColor = "#f4ecd8", // Old paper color
  padding = "40px",
}: {
  to?: string;
  from?: string;
  date?: string;
  subject?: string;
  content?: string;
  signature?: string;
  fontFamily?: string;
  fontSize?: string;
  letterSpacing?: string;
  lineHeight?: string;
  backgroundColor?: string;
  padding?: string;
}) {
  return (
    <div
      style={{
        fontFamily,
        fontSize,
        letterSpacing,
        lineHeight,
        backgroundColor,
        padding,
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "8px",
        position: "relative",
        boxShadow: "2px 3px 10px rgba(0,0,0,0.3)",
        background: `linear-gradient(${backgroundColor}, ${backgroundColor}) padding-box,
                    linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.1)) border-box`,
        border: "1px solid transparent",
        transform: "rotate(-0.5deg)",
        textShadow: "0.5px 0.5px 1px rgba(0,0,0,0.05)"
      }}
    >
      {/* Stamp */}
      <div style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "80px",
        height: "100px",
        border: "2px solid #8B4513",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f4e5",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
        transform: "rotate(3deg)"
      }}>
        <div style={{
          fontSize: "10px",
          color: "#8B4513",
          textAlign: "center",
          lineHeight: "1.2"
        }}>
          POSTAGE
          <br />
          PAID
        </div>
        <div style={{
          marginTop: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#8B4513"
        }}>
          $1.00
        </div>
        <div style={{
          position: "absolute",
          top: "-2px",
          left: "-2px",
          right: "-2px",
          bottom: "-2px",
          border: "2px solid #8B4513",
          borderRadius: "4px",
          opacity: 0.3,
          pointerEvents: "none"
        }} />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{ 
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          color: "#374151"
        }}>
          <div>
            <strong>From:</strong> {from}
          </div>
          <div>
            <strong>To:</strong> {to}
          </div>
          <div>
            <strong>Date:</strong> {date}
          </div>
          {subject && (
            <div style={{ 
              marginTop: "8px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(0,0,0,0.1)"
            }}>
              <strong>Subject:</strong> {subject}
            </div>
          )}
        </div>
      </div>

      <div style={{ 
        color: "#374151",
        whiteSpace: "pre-wrap",
        marginBottom: "32px",
        paddingBottom: "32px",
        borderBottom: "1px solid rgba(0,0,0,0.1)"
      }}>
        <TextElement
          text={content}
          fontFamily={fontFamily}
          fontSize={fontSize}
          color="#374151"
        />
      </div>

      {signature && (
        <div style={{
          color: "#374151",
          fontStyle: "italic",
          transform: "rotate(1deg)",
          marginLeft: "40px"
        }}>
          {signature}
        </div>
      )}
    </div>
  );
}
