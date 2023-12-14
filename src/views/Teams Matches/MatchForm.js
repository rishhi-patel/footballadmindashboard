import React from "react"
import { Box, Button, FormControl, Grid } from "@mui/material"
import Inputcustom from "../common/fields/Inputcustom"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import TeamSelect from "../common/fields/TeamSelect "
import { useDispatch } from "react-redux"
import { createMatch } from "../../actions/matchActions"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(100% - 0px , 600px)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  padding: "40px 30px",
}

const validationSchema = Yup.object().shape({
  league: Yup.string().required("League Name is required"),
  whatsapp: Yup.string().required("Inquiry Number is required"),
  date: Yup.date().required("Date is required").nullable(),
  time: Yup.string().required("Time is required"),
  host: Yup.string().required("Team selection is required"),
  opponent: Yup.string().required("Team selection is required"),
})

const MatchForm = ({ handleClose }) => {
  const dispatch = useDispatch()
  return (
    <Formik
      initialValues={{
        league: "",
        whatsapp: "",
        date: "",
        time: "",
        host: "",
        opponent: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values)
        dispatch(createMatch(values))
        setSubmitting(false)
        handleClose()
        // Handle form submission here
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Field name="host" component={TeamSelect} label="Select Host" />
                <ErrorMessage
                  name="host"
                  component="div"
                  style={{ color: "#d32f2f" }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Field
                  name="opponent"
                  component={TeamSelect}
                  label="Select Team Opponent"
                />
                <ErrorMessage
                  name="opponent"
                  component="div"
                  style={{ color: "#d32f2f" }}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Field
                    as={Inputcustom}
                    type="text"
                    name="league"
                    label="League Name :"
                    variant="filled"
                    placeholder="Enter League Name"
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage
                    name="league"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Field
                    as={Inputcustom}
                    type="text"
                    name="whatsapp"
                    label="Inquiry Number :"
                    placeholder="Enter Inquiry Number"
                    variant="filled"
                    InputLabelProps={{ shrink: true }}
                  />
                  <ErrorMessage
                    name="whatsapp"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Field
                    as={Inputcustom}
                    type="date"
                    name="date"
                    label="Date :"
                    variant="filled"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Field
                    as={Inputcustom}
                    type="time"
                    name="time"
                    label="Time :"
                    variant="filled"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    style={{ color: "#d32f2f" }}
                  />
                </FormControl>
              </Grid>
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
                      width: "15%",
                      fontSize: "17px",
                      fontWeight: "600",
                      textTransform: "capitalize",
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
                      width: "15%",
                      fontSize: "17px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

export default MatchForm
