import CopyToClipboardButton from "./CopyToClipboardButton";

export default function StyledCodeBlock({ code }: {
  code: string,
}) {
  return <pre
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
      margin: '1em 0'
    }}
  >
    <code>
      {code}
    </code>
    <CopyToClipboardButton value={code} />
  </ pre>
}