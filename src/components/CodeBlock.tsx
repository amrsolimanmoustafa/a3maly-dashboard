import { Snackbar } from "@mui/material";
import React from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";

export default function StyledCodeBlock({ code }: {
  code: string,
}) {
  const [open, setOpen] = React.useState(false)
  return <pre
    onClick={() => {
      navigator.clipboard.writeText(code)
      setOpen(true)
    }}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      padding: '1em',
      overflow: 'auto',
      borderRadius: '5px',
      fontSize: '.8em',
      lineHeight: '1.5em',
      fontFamily: 'monospace',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      margin: '1em 0',
      cursor: 'pointer',
    }}
  >
    <code>
      {code}
    </code>
    <CopyToClipboardButton value={code} />
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={2000}
      message="Copied to clipboard"
    />
  </ pre>
}