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
import { SchoolDetail, SchoolSummary } from "./components/Schools";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import "./App.css";

const MainContainer = styled.div`
  padding: 0.5rem;
`;

function App() {
  const initialInput = {
    year: "2023",
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

  const [hwansan, setHwansan] = useState({});

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
    setHwansan({
      SEOUL: Calculator({
        year: year,
        school: "SEOUL",
        data: hwansanData,
      }),
      YONSEI: Calculator({
        year: year,
        school: "YONSEI",
        data: hwansanData,
      }),
      KOREA: Calculator({
        year: year,
        school: "KOREA",
        data: hwansanData,
      }),
    });
  }, [eonN, chuN, gpa, year]);
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
                <h1 style={{ margin: 0, userSelect: "none", color: "#333333" }}>
                  Pre-Pre-LAW
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>학교별 환산 결과</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <SchoolSummary
                    year={year}
                    school="SEOUL"
                    score={hwansan.SEOUL}
                  ></SchoolSummary>
                  <SchoolSummary
                    year={year}
                    school="YONSEI"
                    score={hwansan.YONSEI}
                  ></SchoolSummary>
                  <SchoolSummary
                    year={year}
                    school="KOREA"
                    score={hwansan.KOREA}
                  ></SchoolSummary>
                  <Grid item xs={12}>
                    <p style={{ fontSize: "0.7rem" }}>※ 일반전형 기준</p>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>학교별 환산 결과 상세</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <SchoolDetail
                    score={hwansan.SEOUL}
                    year={year}
                    school="SEOUL"
                  ></SchoolDetail>
                  <SchoolDetail
                    score={hwansan.YONSEI}
                    year={year}
                    school="YONSEI"
                  ></SchoolDetail>
                  <SchoolDetail
                    score={hwansan.KOREA}
                    year={year}
                    school="KOREA"
                  ></SchoolDetail>
                </Grid>
              </AccordionDetails>
            </Accordion>
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
