import { dictionary, TranslatedWord } from "@/configs/i18next";
import { AddPhotoAlternate } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
  SvgIcon,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { MRT_ColumnDef } from "material-react-table";
import { useState } from "react";
import ReactImageUploading from "react-images-uploading";

export type ModalCreateEditColumnsSchema<T extends Record<string, any>> = MRT_ColumnDef<T> & {
  formElementType?: "switch" | "date" | "text" | "image" | "autocomplete";
  prevValue?: any;
  header: TranslatedWord;
  options?: Readonly<{ title: string; value: string } | undefined>[];
  multiple?: boolean;
};

interface ModalCreate<T extends Record<string, any> = {}> {
  columns: ModalCreateEditColumnsSchema<T>[];
  onClose: () => void;
  onSubmit: (values: any) => void;
  open: boolean;
  title: TranslatedWord;
}

export const ModalCreate = <T extends Record<any, any> = {}>({
  open,
  columns,
  onClose,
  onSubmit,
  title,
}: ModalCreate<T>) => {
  const [values, setValues] = useState<any>({});
  const [images, setImages] = useState([]);
  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle marginY={1} textAlign="center">
        {dictionary(title)}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            {columns.map((column) => {
              const { accessorKey, header } = column;
              const value = values[accessorKey ?? ""];

              return (
                <>
                  {column.formElementType === "autocomplete" && (
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        multiple={column.multiple ?? false}
                        onChange={(e, value) =>
                          setValues({
                            ...values,
                            [column.accessorKey as string]: convertFromAutoCompleteOptions(
                              value as AutocompleteOption[],
                            ),
                          })
                        }
                        id="multiple-limit-tags"
                        options={column.options ?? []}
                        getOptionLabel={(option) => option?.title ?? ""}
                        defaultValue={
                          column.prevValue
                            ? convertToAutocompleteValue(column.prevValue, column.multiple)
                            : []
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={dictionary(header)}
                            placeholder={dictionary(header)}
                          />
                        )}
                      />
                    </Grid>
                  )}
                  {column.formElementType === "switch" && (
                    <>
                      <Grid item xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2">{dictionary(header)}</Typography>
                          <Switch
                            defaultChecked={column?.prevValue}
                            key={column!.accessorKey as string}
                            name={column!.accessorKey as string}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [e.target.name]: e.target.checked,
                              })
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Box>
                      </Grid>
                    </>
                  )}
                  {column.formElementType === "text" && (
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        key={column!.accessorKey as string}
                        label={dictionary(column.header)}
                        name={column!.accessorKey as string}
                        defaultValue={column?.prevValue}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  )}
                  {column.formElementType === "image" && (
                    <ReactImageUploading
                      value={images}
                      // maxNumber={10}
                      dataURLKey="data_url"
                      onChange={(imageList, addUpdateIndex) => {
                        setImages(imageList as any);
                        setValues({
                          ...values,
                          [column!.accessorKey as string]: imageList[0]?.data_url,
                        });
                      }}
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <ImageUploadComponent
                          label={column.header}
                          name={column!.accessorKey as string}
                          key={column!.accessorKey as string}
                          onClick={onImageUpload}
                          onChange={onImageUpload}
                          {...dragProps}
                          isDragging={isDragging}
                          previewImg={imageList}
                          prevImageSrc={column?.prevValue}
                        />
                      )}
                    </ReactImageUploading>
                  )}
                </>
              );
            })}
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ p: "1.25rem" }}>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          {dictionary("Add")}
        </Button>
        <Button onClick={onClose}>{dictionary("Cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export const SelectorComponent = (
  props: ExtractProps<typeof Select> & {
    label: TranslatedWord;
  } & {
    options: ExtractProps<typeof MenuItem>[];
  },
) => {
  const placeholder = dictionary("hello") + " " + dictionary(props.label);
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="body1" paddingBottom={1}>
        {dictionary(props.label)}
      </Typography>
      <Select
        placeholder="select"
        fullWidth
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          "& .MuiSelect-select .notranslate::after": placeholder
            ? {
              content: `"${placeholder}"`,
              opacity: 0.42,
            }
            : {},
        }}
        {...props}
      >
        {props.options.map((option, index) => (
          <MenuItem key={index} {...option}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </Grid>
  );
};

export const DatePickerComponent = (
  props: ExtractProps<typeof DatePicker> & {
    label: TranslatedWord;
  },
) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="body1" paddingBottom={1}>
        {dictionary(props.label)}
      </Typography>
      <DatePicker
        {...props}
        renderInput={(props) => (
          <TextField
            fullWidth
            {...props}
            InputLabelProps={{
              shrink: false,
            }}
            label={false}
          />
        )} // TODO: Fix label
      />
    </Grid>
  );
};

export const TextFieldComponent = (
  props: Omit<ExtractProps<typeof TextField>, "label"> & {
    label: TranslatedWord;
  },
) => {
  return (
    <Grid item xs={12} md={6}>
      <Typography variant="body1" paddingBottom={1}>
        {dictionary(props.label)}
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={3}
        InputLabelProps={{
          shrink: false,
          sx: {
            display: "none",
          },
        }}
        {...props}
        label={false}
      />
    </Grid>
  );
};

export const GridBreak = <Grid item xs={12} />;

const ImageUploadComponent = (
  props: Omit<ButtonProps, "onChange"> & {
    label: TranslatedWord;
    isDragging?: boolean;
    previewImg?: any[];
    onChange: (...props: any) => any;
    prevImageSrc?: string;
  },
) => {
  return (
    <Grid item xs={12}>
      <Typography variant="body1" paddingBottom={1}>
        {dictionary(props.label)}
      </Typography>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 3,
          overflowX: "auto",
        }}
      >
        {props?.previewImg?.length === 0 && !props?.prevImageSrc && (
          <Button
            variant="outlined"
            // @ts-ignore
            sx={{
              p: 3,
              bgcolor: "#EDEDED",
              color: props.isDragging ? "#6366F1" : "darkgray",
              ":hover": {
                color: "#6366F1",
              },
              borderColor: props.isDragging ? "#6366F1" : "darkgray",
              flex: true,
              flexDirection: "column",
              justifyContent: "center",
              height: 100,
              minWidth: 100,
            }}
            {...props}
          >
            <SvgIcon>
              <AddPhotoAlternate />
            </SvgIcon>

            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                pt: 1,
              }}
            >
              Click or Drop
            </Typography>
          </Button>
        )}
        {props?.previewImg?.map((image, index) => {
          return (
            <Button
              variant="outlined"
              key={index}
              // @ts-ignore
              sx={{
                color: "darkgray",
                p: 0,
                minWidth: 100,
                overflow: "hidden",
                ":hover": {
                  color: "#6366F1",
                },
                borderColor: "darkgray",
              }}
              {...props}
            >
              <img
                src={image["data_url"]}
                style={{
                  objectFit: "contain",
                  height: 100,
                }}
              />
            </Button>
          );
        })}
        {props?.prevImageSrc && props.previewImg?.length == 0 && (
          <Button
            variant="outlined"
            key={1}
            // @ts-ignore
            sx={{
              color: "darkgray",
              p: 0,
              minWidth: 100,
              overflow: "hidden",
              ":hover": {
                color: "#6366F1",
              },
              borderColor: "darkgray",
            }}
            {...props}
          >
            <img
              src={props?.prevImageSrc}
              style={{
                objectFit: "contain",
                height: 100,
              }}
            />
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

type AutocompleteOption = { title: string; value: string };

function convertToAutoCompleteOptions(option: string): AutocompleteOption;
function convertToAutoCompleteOptions(options: string[]): AutocompleteOption[];

function convertToAutoCompleteOptions(
  arg: string | string[],
): AutocompleteOption | AutocompleteOption[] {
  if (Array.isArray(arg)) {
    return arg.map((option) => ({ title: option, value: option })); // Return the array of values
  } else {
    return { title: arg, value: arg }; // Return the value as a string
  }
}

function convertFromAutoCompleteOptions(options: AutocompleteOption[]): string[];

function convertFromAutoCompleteOptions(option: AutocompleteOption): string;

function convertFromAutoCompleteOptions(
  arg: AutocompleteOption[] | AutocompleteOption,
): string | string[] {
  if (Array.isArray(arg)) {
    return arg.map((option) => option.value); // Return the array of values
  } else {
    return arg.value; // Return the value as a string
  }
}

// Helper function to convert values to AutocompleteOption or an array of options
function convertToAutocompleteValue(
  value: string | string[],
  multiple: boolean | undefined,
): AutocompleteOption[] | AutocompleteOption {
  const options = convertToAutoCompleteOptions(value as any); // TODO: Fix any
  if (multiple) {
    return options;
  } else {
    return Array.isArray(options) ? options[0] : options;
  }
}

export type ExtractProps<TComponentOrTProps> = TComponentOrTProps extends React.ComponentType<
  infer TProps
>
  ? TProps
  : TComponentOrTProps;