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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactImageUploading from "react-images-uploading";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
// @ts-ignore
import CurrencyTextField from '@lupus-ai/mui-currency-textfield'

export interface ModalCreateEditColumnsSchema<T extends Record<string, any>> {
  accessorKey: MRT_ColumnDef<T["data"]>["accessorKey"];
  formElementType?: "switch" | "date" | "text" | "image" | "autocomplete" | "password" | "phone" | "email" | "price" | "number"
  prevValue?: any;
  header: TranslatedWord;
  options?: Readonly<{ title: string; value: string } | undefined>[];
  multiple?: boolean;
  imageBlob?: boolean;
  multiline?: boolean;
  optional?: boolean;
  disableEdit?: boolean;
  customFormElement?: (column: ModalCreateEditColumnsSchema<T>) => React.ReactNode;
};

interface ModalCreate<T extends Record<string, any> = {}> {
  mode: "add" | "edit";
  columns: ModalCreateEditColumnsSchema<T>[];
  onClose: () => void;
  onSubmit: (values: any) => void;
  open: boolean;
  title: TranslatedWord;
  formData?: boolean;
}

export const ModalCreate = <T extends Record<any, any> = {}>({
  open,
  columns,
  onClose,
  onSubmit,
  title,
  mode,
  // formData = false,
}: ModalCreate<T>) => {

  if (mode === "edit") columns = columns.filter((column) => !column.disableEdit);
  const { unregister, handleSubmit, formState: { errors }, control } = useForm({
    // resolver: zodResolver(zodValidationSchema),
  });

  const [values, setValues] = useState<any>({});
  const [images, setImages] = useState([]);
  const [prevValues, setPrevValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (mode === "edit") setPrevValues(columns.reduce((acc, column) => {
      acc[column.accessorKey as string] = column.prevValue;
      return acc;
    }, {} as Record<string, any>));


    return () => {
      setValues({});
      setImages([]);
      columns.forEach((column) => {
        unregister(column.accessorKey as string);
      });
    };
  }, [open]);

  const handleFormSubmit = (data: any) => {
    if (mode === 'add') onSubmit(data);
    else {
      const differentValues = getDifferentValues(prevValues, data);
      onSubmit(differentValues);
    }
  };

  function getDifferentValues(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in obj1) {
      if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
        result[key] = obj2[key];
      }
    }
    return result;
  }

  return (
    <Dialog fullWidth open={open}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogTitle marginY={1} textAlign="center">
          {dictionary(title)}
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {columns.map((column) => {
              const { accessorKey, header } = column;
              const value = values[accessorKey ?? ""];
              console.log("value", value);
              return (
                <>
                  {column.customFormElement && column.customFormElement(column)}
                  {column.formElementType === "autocomplete" && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name={column.accessorKey as string}
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            options={column.options || []}
                            getOptionLabel={(option) => option.title}
                            onChange={(_, value) => {
                              field.onChange(value?.value || ""); // Set the 'value' on selection
                            }}
                            defaultValue={column.prevValue ?
                              convertToAutocompleteValue(column.prevValue, column.multiple)
                              : column.multiple ? [] : null}
                            renderInput={(params) => (
                              <TextField {...params}
                                label={dictionary(column.header)}
                                required={!column.optional}
                                error={errors[column.accessorKey as string] ? true : false}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  )}
                  {column.formElementType === "switch" && (
                    <>
                      <Grid item xs={12} md={12}>
                        <Controller
                          name={column.accessorKey as string}
                          control={control}
                          key={column!.accessorKey as string}
                          defaultValue={column?.prevValue || 0}
                          render={({ field, fieldState }) => (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography variant="body2">{dictionary(header)}</Typography>
                              <Switch
                                defaultChecked={column?.prevValue || false}
                                inputProps={{ "aria-label": "controlled" }}
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e.target.checked ? 1 : 0); // Handle onChange separately
                                }}
                              />
                            </Box>
                          )}
                        />
                      </Grid>
                    </>
                  )}
                  {(column.formElementType === "text" || column.formElementType === "password" || column.formElementType === "number") && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name={column.accessorKey as string}
                        control={control}
                        rules={{
                          required: !column.optional,
                          minLength: column.formElementType === "number" ? 0 : 8,
                          maxLength: column.formElementType === "password" ? 32 : undefined,
                        }}
                        defaultValue={column?.prevValue}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            fullWidth
                            error={fieldState.invalid}
                            helperText={
                              fieldState.invalid
                                ? dictionary("Minimum 8 characters")
                                : ""
                            }
                            required={!column.optional}
                            type={column.formElementType}
                            key={column!.accessorKey as string}
                            label={dictionary(column.header)}
                            defaultValue={column?.prevValue}
                            multiline={column.multiline}
                            minRows={3}
                          />
                        )}
                      />
                    </Grid>
                  )}

                  {(column.formElementType === "phone") && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name={column.accessorKey as string}
                        control={control}
                        rules={{
                          validate: matchIsValidTel,
                          required: !column.optional,
                        }}
                        defaultValue={column?.prevValue}
                        render={({ field, fieldState }) => (
                          <MuiTelInput
                            {...field}
                            defaultCountry="SA"

                            helperText={fieldState.invalid ? dictionary("Telephone is invalid") : ""}
                            error={fieldState.invalid}
                            label={dictionary(column.header)}
                            required={!column.optional}
                            fullWidth
                          />
                        )}
                      />

                    </Grid>
                  )}
                  {column.formElementType === "email" && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name={column.accessorKey as string}
                        control={control}
                        rules={{
                          required: !column.optional,
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: dictionary("Email is invalid"),
                          },
                        }}
                        defaultValue={column?.prevValue}
                        render={({ field, fieldState }) => (
                          <TextField
                            {...field}
                            helperText={fieldState.invalid ? dictionary("Email is invalid") : ""}
                            error={fieldState.invalid}
                            label={dictionary(column.header)}
                            required={!column.optional}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  )}
                  {column.formElementType === "price" && (
                    <Grid item xs={12} md={6}>
                      <Controller
                        name={column.accessorKey as string}
                        control={control}
                        rules={{
                          required: !column.optional,
                        }}
                        defaultValue={column?.prevValue}
                        render={({ field, fieldState }) => (
                          <CurrencyTextField
                            {...field}
                            variant="outlined"
                            currencySymbol="SAR"
                            outputFormat="string"
                            decimalCharacter="."
                            digitGroupSeparator=","
                            label={dictionary(column.header)}
                            required={!column.optional}
                            fullWidth
                          />
                        )}
                      />
                    </Grid>
                  )}
                  {column.formElementType === "image" && (
                    <Controller
                      name={column.accessorKey as string}
                      control={control}
                      rules={{
                        required: !column.optional,
                      }}
                      defaultValue={column?.prevValue}
                      render={({ field, fieldState }) => (
                        <ReactImageUploading
                          value={images}
                          // maxNumber={10}
                          dataURLKey="data_url"
                          onChange={async (imageList, addUpdateIndex) => {
                            setImages(imageList as any);
                            const blob = await (await fetch(imageList[0].data_url)).blob();
                            const file = new File([blob], "avatar.png", { type: blob.type });
                            field.onChange(column.imageBlob ? file : imageList[0].data_url);
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
                              aria-required={!column.optional}
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
                      )
                      }
                    />
                  )}
                </>
              );
            })}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: "1.25rem" }}>
          <Button color="primary" type="submit" variant="contained">
            {dictionary("Add")}
          </Button>
          <Button type="reset" onClick={onClose}>{dictionary("Cancel")}</Button>
        </DialogActions>
      </form>
    </Dialog >
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
    return arg.value // Return the value as a string
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

function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}