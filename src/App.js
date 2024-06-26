import React, { useState, useEffect } from "react";
import { NtoPerScore, NMin } from "./utils/Leet";
import { Calculator } from "./utils/Calculator";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Schools from "./components/Schools";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { schoolTheme } from "./components/SchoolSummary";
import { ThemeProvider } from "@mui/material/styles";

import "./App.css";

const MainContainer = styled.div`
  padding: 0.5rem;
`;

function App() {
  // 관리되는 state 3개 : {inputs, hwansan, schoolList}

  // 1. inputs state
  const initialInput = {
    year: "2024",
    eonN: 20,
    eonPer: 0,
    eonScore: 0,
    chuN: 30,
    chuPer: 0,
    chuScore: 0,
    eonNMin: 0,
    chuNMin: 0,
    gpa: 95,
  };
  const [inputs, setInputs] = useState(initialInput);
  const {
    year,
    eonN,
    eonPer,
    eonScore,
    chuN,
    chuPer,
    chuScore,
    eonNMin,
    chuNMin,
    gpa,
  } = inputs;

  // 2. hwansan state
  const [hwansan, setHwansan] = useState({});

  // 3. schoolList state
  const initialSchoolList = [
    { id: 1, name: "SEOUL", visible: true, verboseName: "서울대" },
    { id: 2, name: "YONSEI", visible: true, verboseName: "연세대" },
    { id: 3, name: "KOREA", visible: true, verboseName: "고려대" },
    { id: 4, name: "SKKU", visible: true, verboseName: "성균관대" },
    { id: 5, name: "HYU", visible: true, verboseName: "한양대" },
    { id: 6, name: "EWHA", visible: true, verboseName: "이화여대" },
  ];
  // eslint-disable-next-line
  const [schoolList, setSchoolList] = useState(initialSchoolList);

  useEffect(() => {
    const [_eonPer, _eonScore] = NtoPerScore(year, "eon", eonN);
    const [_chuPer, _chuScore] = NtoPerScore(year, "chu", chuN);

    setInputs((inputs) => ({
      ...inputs,
      eonPer: _eonPer,
      eonScore: _eonScore,
      chuPer: _chuPer,
      chuScore: _chuScore,
      eonNMin: NMin(year, "eon"),
      chuNMin: NMin(year, "chu"),
    }));

    const hwansanData = {
      gpa: gpa,
      eonPer: _eonPer,
      eonScore: _eonScore,
      chuPer: _chuPer,
      chuScore: _chuScore,
    };

    schoolList.map((school) =>
      setHwansan((hw) => ({
        ...hw,
        [school.name]: Calculator({
          year: year,
          school: school.name,
          data: hwansanData,
        }),
      }))
    );
  }, [eonN, chuN, gpa, year, schoolList]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  return (
    <MainContainer>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="flex-end">
              <Grid item xs={9}>
                <h1
                  style={{
                    margin: 0,
                    userSelect: "none",
                    color: "#333333",
                  }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Pre-Pre-LAW
                  </span>
                </h1>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <InputLabel variant="standard" htmlFor="year">
                  연도
                </InputLabel>
                <NativeSelect value={year} name="year" onChange={onChange}>
                  <option value={2024}>2024</option>
                  <option value={2023}>2023</option>
                </NativeSelect>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  LEET : {(eonScore + chuScore).toFixed(1)}점
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="언어이해 백분위"
                      disabled
                      type="number"
                      name="eonPer"
                      step="0.1"
                      value={eonPer}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="언어이해 표준점수"
                      disabled
                      type="number"
                      name="eonScore"
                      step="0.1"
                      value={eonScore}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Slider
                      name="eonN"
                      defaultValue={20}
                      step={1}
                      min={eonNMin}
                      max={30}
                      value={eonN}
                      onChange={onChange}
                      marks={[
                        { value: eonNMin, label: eonNMin },
                        { value: 30, label: 30 },
                      ]}
                      valueLabelDisplay="on"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="추리논증 백분위"
                      disabled
                      type="number"
                      name="chuPer"
                      step="0.1"
                      value={chuPer}
                      onChange={onChange}
                    />
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <TextField
                      label="추리논증 표준점수"
                      disabled
                      type="number"
                      name="chuScore"
                      step="0.1"
                      value={chuScore}
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Slider
                      name="chuN"
                      defaultValue={30}
                      step={1}
                      min={chuNMin}
                      max={40}
                      value={chuN}
                      onChange={onChange}
                      marks={[
                        { value: chuNMin, label: chuNMin },
                        { value: 40, label: 40 },
                      ]}
                      valueLabelDisplay="on"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>학점 : {gpa.toFixed(1)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Slider
                      name="gpa"
                      defaultValue={95}
                      step={0.1}
                      min={85}
                      max={100}
                      value={gpa}
                      onChange={onChange}
                      marks={[
                        { value: 85, label: 85 },
                        { value: 100, label: 100 },
                      ]}
                      valueLabelDisplay="on"
                      color="secondary"
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>학교 선택</Typography>
              </AccordionSummary>
              <ThemeProvider theme={schoolTheme}>
                <AccordionDetails>
                  <Grid container spacing={0}>
                    {schoolList.map((school) => (
                      <Grid item xs={4} id={school.id}>
                        <Checkbox
                          checked={school.visible}
                          color={school.name}
                          onClick={(id) => {
                            setSchoolList(
                              schoolList.map((s) =>
                                s.id === school.id
                                  ? { ...s, visible: !s.visible }
                                  : s
                              )
                            );
                          }}
                        ></Checkbox>
                        {school.verboseName}
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </ThemeProvider>
            </Accordion>
          </Grid>
          <Grid item xs={12} md={6}>
            <Schools year={year} hwansan={hwansan} schoolList={schoolList} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="flex-end">
            <Grid item xs={4}>
              <p style={{ textAlign: "center" }}>
                <Link
                  underline="none"
                  href="https://jinh0park.github.io"
                  target="_blank"
                >
                  만든이
                </Link>
              </p>
            </Grid>
            <Grid item xs={4}>
              <p style={{ textAlign: "center" }}>
                <Link
                  underline="none"
                  href="https://voracious-scilla-b12.notion.site/ABOUT-PrePreLAW-a0157ff8d9d04e479b7ad885ba27fb46"
                  target="_blank"
                >
                  정보
                </Link>
              </p>
            </Grid>
            <Grid item xs={4}>
              <p style={{ textAlign: "center" }}>
                <Link underline="none" href="mailto:jinh0park@naver.com">
                  피드백
                </Link>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MainContainer>
  );
}

export default App;
