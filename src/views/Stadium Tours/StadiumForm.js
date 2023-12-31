import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  TextField,
  FormHelperText,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import uplodimg from "../../imgs/stadium/uplodimg.png";
import { useDispatch } from "react-redux";
import { createStadium } from "../../actions/stadiumActions";
import CancelIcon from "@mui/icons-material/Cancel";
import Cropper from "react-cropper";
import Inputcustom from "../common/fields/Inputcustom";
import TeamSelect from "../common/fields/TeamSelect ";
import Notification from "../common/Notifications";

const style = {
  width: "min(100% - 0px , 400px)",
  margin: "0 auto",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  padding: "10px 30px",
};

const validationSchema = Yup.object().shape({
  team: Yup.number().required("Team is required"),
  stadium: Yup.string().required("Stadium is required"),
  number: Yup.string().required("Inquiry Number is required"),
});

const StadiumForm = ({ activeStadium, handleClose, setactiveStadium }) => {
  console.log(activeStadium);
  const dispatch = useDispatch();
  const cropperRef = useRef(null);

  const [image, setImage] = useState(null);
  const [newImage, setnewImage] = useState(false);
  const [imgBlob, setimgBlob] = useState(null);

  const changeImage = (file) => {
    setnewImage(true);
    setImage(URL.createObjectURL(file));
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        // Ensure the blob is not null
        if (blob) {
          // Create a new File from the Blob
          const croppedFile = new File([blob], "cropped_image.jpg", {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          // Set the File object to your state
          setimgBlob(croppedFile);
        }
      }, "image/jpeg");
    }
  };

  useEffect(() => {
    if (activeStadium && activeStadium.photo) {
      setImage(
        `https://football.jennypoint.com/api/resources/images/${activeStadium.photo}`
      );
    }
    return () => {
      setactiveStadium({
        number: "",
        photo: "",
        stadium: "",
        team: "",
      });
    };
  }, []);

  return (
    <Box sx={style}>
      <Formik
        initialValues={{
          ...activeStadium,
          team: activeStadium.team_id || "",
          stadium: activeStadium.stadium || "",
          number: activeStadium.number || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (imgBlob) values.image = imgBlob;
          const formData = new FormData();

          for (const key in values) {
            if (values.hasOwnProperty(key)) {
              formData.append(key, values[key]);
            }
          }

          if (values.image || values?.photo) {
            dispatch(createStadium(formData));
            handleClose();
            setSubmitting(false);
          } else {
            Notification("error", "Please Fill All the required fields");
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            {console.log({ errors })}
            <Grid container spacing={2}>
              <Grid item lg={12} xs={12} sx={{ position: "relative" }}>
                {newImage ? (
                  <Cropper
                    aspectRatio={2}
                    ref={cropperRef}
                    src={image}
                    guides={true}
                    crop={onCrop}
                  />
                ) : image ? (
                  <>
                    <IconButton
                      aria-label="delete"
                      sx={{
                        position: "absolute",
                        right: 0,
                        marginTop: "12px",
                        color: "#FFFFFF",
                      }}
                      onClick={() => {
                        setImage(null);
                      }}
                    >
                      <CancelIcon sx={{ path: { stroke: "black" } }} />
                    </IconButton>
                    <img
                      src={image}
                      alt=""
                      style={{
                        height: 200,
                        width: "100%",
                        borderRadius: "12px",
                        marginTop: "13px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <IconButton
                      aria-label="delete"
                      sx={{
                        height: "200px",
                        width: "100%",
                        margin: "13px 0",
                        padding: 0,
                      }}
                      component="label"
                      color="primary"
                      variant="filledTonal"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => changeImage(e.target.files[0])}
                      />
                      <img
                        src={uplodimg}
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: 6,
                        }}
                      />
                    </IconButton>
                  </>
                )}
              </Grid>
              {/* Stadium Name Field */}
              <Grid item lg={12} xs={12}>
                <FormControl fullWidth>
                  <Field
                    as={Inputcustom}
                    name="stadium"
                    type="text"
                    label="Stadium Name :"
                    placeholder="Enter Stadium Name"
                    variant="filled"
                    // error={touched.stadium && errors.stadium}
                    // helperText={touched.stadium && errors.stadium}
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage
                    name="stadium"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>
              {/* Team Name Field */}
              <Grid item lg={12} xs={12}>
                <FormControl fullWidth>
                  {/* <TeamSelect />
                  {touched.team && errors.team && (
                    <FormHelperText>{errors.team}</FormHelperText>
                  )} */}
                  <Field
                    name="team"
                    component={TeamSelect}
                    label="Select Team"
                  />
                  <ErrorMessage
                    name="team"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>

              {/* Inquiry Number Field */}
              <Grid item lg={12} xs={12}>
                <FormControl fullWidth>
                  <Field
                    as={Inputcustom}
                    name="number"
                    type="text"
                    label="Inquiry Number :"
                    placeholder="Enter Inquiry Number"
                    variant="filled"
                    // error={touched.number && errors.number}
                    // helperText={touched.number && errors.number}
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage
                    name="number"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>

              {/* Buttons */}
              <Grid item lg={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    my: 2,
                    justifyContent: "end",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      mr: 1,
                      width: "25%",
                      fontSize: "17px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      paddingTop:"9px"
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      width: "25%",
                      fontSize: "17px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                      paddingTop:"9px"
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default StadiumForm;
