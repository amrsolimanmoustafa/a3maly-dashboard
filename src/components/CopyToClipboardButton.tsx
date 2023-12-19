import { Button, Snackbar, SvgIcon } from '@mui/material'
import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyToClipboardButton = ({
  value
}: {
  value: string
}) => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(true)
    navigator.clipboard.writeText(value)
  }

  return (
    <>
      <Button
        onClick={handleClick}
        size="small"
        sx={{
          p: .5,
          width: 'auto',
          height: 'auto',
          borderRadius: 1,
          minWidth: 'auto',
        }}
      >
        <SvgIcon
          sx={{
            fontSize: '1.2rem',
          }}
        >
          <ContentCopyIcon
          />
        </SvgIcon>
      </Button>

      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copied to clipboard"
      />
    </>
  )
}

export default CopyToClipboardButton