import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Avatar } from '@mui/material';

const boxStyles = {
  bgcolor: '#F5F5F5',
  width: '80px',
  height: '80px',
  borderRadius: 1,
  border: '2px dashed #CFCFCF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  ":hover": {
    border: '2px dashed #8F8F8F',
  }
}
const iconStyles = {
  fill: '#8F8F8F',
}

const ImagesArrayHandler = (props: any) => {
  const [images, setImages] : any =  useState([null, null, null, null])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const data = [...images]
    data[index] = event.target.files![0]
    setImages(data)
    props.handleChange(data)
  }
  return (
    <>
      <Grid sx={{ py: 3 }} container justifyContent={"space-evenly"}>
        {Array.from({ length: 4 }).map((_, index) => (
          <>
            <label htmlFor={props.input.name + index}>
              <Box key={index} sx={boxStyles}>
                {images[index] ? <Avatar variant="rounded" alt="image" src={URL.createObjectURL(images[index])}/> : <AddToPhotosIcon sx={iconStyles} />}
              </Box>
            </label>
            <input
              accept='image/*'
              id={props.input.name + index}
              type="file"
              hidden
              onChange={(event) => (handleFileChange(event, index))}
              name={props.input.name}
            />
          </>
        ))}
      </Grid>
    </>
  )
}

export default ImagesArrayHandler