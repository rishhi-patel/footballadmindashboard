import React, { useEffect, useState } from "react"
import { WhitecardBox } from "../Stadium Tours/StadiumTours"
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import vs from "../../imgs/icon/vs-png.webp.png"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { fetchMatches } from "../../actions/matchActions"
import Loader from "../common/loader/Loader"

export const Inputcustom = styled(TextField)`
  input[type="color" i] {
    borderradius: none;
    -webkit-border-radius: 0px;
  }
  & input {
    width: 100%;
    padding: 7px 5px;
    &:focus.MuiFilledInput-root {
      border: 1px solid #172945;
    }
  }
  .MuiFilledInput-root {
    border-radius: 7px;
    background-color: #f8fafc;
    padding: 2px 14px;
    outline: none;
    border: 1px solid #cfcfcf;
    &:hover {
      border: 1px solid #172945;
    }
    &:focus {
      border: 1px solid #172945;
    }
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
  label {
    position: relative;
    transform: none;
    fontsize: 17px;
    fontweight: 600;
    color: #172945;
  }
`
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

const TeamsMatches = () => {
  const dispatch = useDispatch()

  const { matches, loading } = useSelector((state) => state.matches)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    dispatch(fetchMatches())
  }, [dispatch])

  if (loading) return <Loader />

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, my: 10, background: "transparent", height: "100%" }}
    >
      <WhitecardBox>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            py: "10px",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontSize: "25px", fontWeight: "600" }}
          >
            Temas Matches
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<AddIcon />}
          >
            <span style={{ marginTop: "3px" }}>add</span>
          </Button>
        </Box>
        <Divider />

        <Box sx={{ py: 1, my: 2 }}>
          <Grid container spacing={2}>
            {matches.map((curEle, i) => {
              const {
                date,
                host,
                host_logo,
                id,
                league,
                opponent,
                opponent_logo,
                time,
                leagueleague,
              } = curEle
              return (
                <Grid item lg={12} sx={{ my: 1 }} key={i}>
                  <Grid container>
                    <Grid item lg={4} sm={12} xs={12}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item lg={4} sm={3} xs={3}>
                          <Box>
                            <img
                              src={`https://football.jennypoint.com/api/resources/images/${host_logo}`}
                              alt={host}
                              width="100%"
                              height="70px"
                              style={{ objectFit: "contain" }}
                            />
                          </Box>
                          <Typography
                            sx={{ textAlign: "center", fontWeight: "600" }}
                            color="primary"
                          >
                            {host}
                          </Typography>
                        </Grid>
                        <Grid item lg={4} sm={3} xs={3}>
                          <img
                            src={vs}
                            alt="vs"
                            width="100%"
                            height="70px"
                            style={{ objectFit: "contain" }}
                          />
                        </Grid>
                        <Grid item lg={4} sm={3} xs={3}>
                          <Box>
                            <img
                              src={`https://football.jennypoint.com/api/resources/images/${opponent_logo}`}
                              alt={opponent}
                              width="100%"
                              height="70px"
                              style={{ objectFit: "contain" }}
                            />
                          </Box>
                          <Typography
                            sx={{ textAlign: "center", fontWeight: "600" }}
                            color="primary"
                          >
                            {opponent}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      md={10}
                      sm={10}
                      xs={12}
                      sx={{
                        my: "auto",
                        "@media (max-width: 600px)": {
                          my: 1,
                        },
                      }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item lg={6} sm={6} xs={12}>
                          <Typography
                            sx={{ fontWeight: 600, mb: 1 }}
                            color="primary"
                          >
                            League Name : <span>{league}</span>
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, mb: 1 }}
                            color="primary"
                          >
                            Date : <span>{date}</span>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          lg={6}
                          sm={6}
                          xs={12}
                          sx={{
                            "@media(max-width:600px)": { pt: " 0 !important" },
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 600, mb: 1 }}
                            color="primary"
                          >
                            Time : <span>{time}</span>
                          </Typography>
                          <Typography
                            sx={{ fontWeight: 600, mb: 1 }}
                            color="primary"
                          >
                            Inquiry Number : <span>{league}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={12}>
                      <Box
                        sx={{
                          display: "grid",
                          justifyContent: "end",
                          "@media (max-width: 600px)": {
                            display: "flex",
                            justifyContent: "space-around",
                          },
                        }}
                      >
                        <Box sx={{ my: 1 }}>
                          <Button variant="outlined" onClick={handleOpen}>
                            {" "}
                            <EditIcon />
                          </Button>
                        </Box>
                        <Box sx={{ my: 1 }}>
                          <Button variant="outlined">
                            <DeleteOutlineOutlinedIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider sx={{ mt: 2 }} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="team1"
                  options={team1}
                  renderInput={(params) => (
                    <Inputcustom
                      {...params}
                      label="Host :"
                      variant="filled"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      placeholder="Select Host"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  id="team2"
                  options={team2}
                  renderInput={(params) => (
                    <Inputcustom
                      {...params}
                      label="Opponent :"
                      variant="filled"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      placeholder="Select Opponent"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Inputcustom
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    id="League-Name"
                    label="League Name :"
                    variant="filled"
                    placeholder="Enter League Name"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Inputcustom
                    InputLabelProps={{ shrink: true }}
                    type="text"
                    id="Inquiry-Number"
                    label="Inquiry Number :"
                    placeholder="Enter Inquiry Number"
                    variant="filled"
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Inputcustom
                    InputLabelProps={{ shrink: true }}
                    type="date"
                    id="date"
                    label="Date :"
                    variant="filled"
                  />
                </FormControl>
              </Grid>{" "}
              <Grid item lg={6} xs={12}>
                <FormControl fullWidth>
                  <Inputcustom
                    InputLabelProps={{ shrink: true }}
                    type="time"
                    label="Time :"
                    id="time"
                    variant="filled"
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
                    onClick={handleClose}
                    sx={{
                      mr: 1,
                      width: "15%",
                      fontSize: "17px",
                      fontWeight: "600",
                      textTransform: "capitalize",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
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
        </Modal>
      </WhitecardBox>
    </Box>
  )
}

export default TeamsMatches
const team1 = [
  { label: "Chelsea" },
  { label: "ArsenalFC" },
  { label: "Manchester City" },
  { label: "Tottenham Hotspur" },
  { label: "Liverpool" },
]
const team2 = [
  { label: "Chelsea" },
  { label: "ArsenalFC" },
  { label: "Manchester City" },
  { label: "Tottenham Hotspur" },
  { label: "Liverpool" },
]
