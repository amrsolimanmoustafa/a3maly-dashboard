import { dictionary, TranslatedWord } from "@/configs/i18next";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

const ModalDelete = ({
  open,
  onClose,
  title,
  handleSubmit,
  item,
}: {
  open: boolean;
  onClose: () => void;
  title: TranslatedWord;
  handleSubmit: (arg: any) => void;
  item: string | null;
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle marginY={1} textAlign="center">
        {dictionary(title)}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          {dictionary("Are you sure you want to delete")}
          <Typography variant="body1" component="span" color="error">
            {` ${item} `}
          </Typography>
          {dictionary("?")}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          {dictionary("Delete")}
        </Button>
        <Button onClick={onClose}>{dictionary("Cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;