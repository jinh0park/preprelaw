import Grid from "@mui/material/Grid";
import { SchoolScore } from "../utils/SchoolScore";
import Slider from "@mui/material/Slider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const schoolTheme = createTheme({
  palette: {
    SEOUL: {
      main: "#0f0f70",
    },
    YONSEI: {
      main: "#003876",
    },
    KOREA: {
      main: "#8B0028",
    },
    SKKU: {
      main: "#8DC53F",
    },
    HYU: {
      main: "#124B84",
    },
    EWHA: {
      main: "#00664F",
    },

    tonalOffset: 0.5,
  },
});

const scaleQ = (x, data, index) => {
  if (x < data.q1[index]) {
    return (0.25 * (x - data.q0[index])) / (data.q1[index] - data.q0[index]);
  } else if (x < data.q2[index]) {
    return (
      0.25 + (0.25 * (x - data.q1[index])) / (data.q2[index] - data.q1[index])
    );
  } else if (x < data.q3[index]) {
    return (
      0.5 + (0.25 * (x - data.q2[index])) / (data.q3[index] - data.q2[index])
    );
  } else if (x < data.q4[index]) {
    return (
      0.75 + (0.25 * (x - data.q3[index])) / (data.q4[index] - data.q3[index])
    );
  } else return 1;
};

const reverseScaleQ = (q, data, index) => {
  if (q < 0.25) {
    return (q * (data.q1[index] - data.q0[index])) / 0.25 + data.q0[index];
  } else if (q < 0.5) {
    return (
      ((q - 0.25) * (data.q2[index] - data.q1[index])) / 0.25 + data.q1[index]
    );
  } else if (q < 0.75) {
    return (
      ((q - 0.5) * (data.q3[index] - data.q2[index])) / 0.25 + data.q2[index]
    );
  } else {
    return (
      ((q - 0.75) * (data.q4[index] - data.q3[index])) / 0.25 + data.q3[index]
    );
  }
};

const SchoolSummary = ({ year, school, score }) => {
  const data = SchoolScore(year, school);
  if (!score) return;

  return (
    <ThemeProvider theme={schoolTheme}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {data.verboseName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              LEET {score.leet.toFixed(2)}{" "}
              {data.leet === "SPLIT" &&
                `(${score.eon.toFixed(2)}+${score.chu.toFixed(2)})`}{" "}
              + 학점 {score.gpa.toFixed(2)} =&nbsp;
              {(Number(score.gpa) + Number(score.leet)).toFixed(2)}
            </Typography>
            {data.status !== "OK" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {year}년도 사분위 자료는 준비 중입니다.
                </Grid>
              </Grid>
            )}
            {data.status === "OK" && (
              <Grid container spacing={2}>
                {data.leet !== "SPLIT" && (
                  <>
                    <Grid item xs={12}>
                      <Slider
                        step={0.01}
                        min={0}
                        max={1}
                        value={scaleQ(score.leet, data, 1)}
                        marks={[
                          { value: 0, label: "" },
                          { value: 0.25, label: `Q1:${data.q1[1]}` },
                          { value: 0.5, label: `Q2: ${data.q2[1]}` },
                          { value: 0.75, label: `Q3: ${data.q3[1]}` },
                          { value: 1, label: `` },
                        ]}
                        valueLabelDisplay="auto"
                        color={school}
                        scale={() =>
                          "LEET 환산: " +
                          reverseScaleQ(
                            scaleQ(score.leet, data, 1),
                            data,
                            1
                          ).toFixed(2)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Slider
                        step={0.01}
                        min={0}
                        max={1}
                        value={scaleQ(score.gpa, data, 4)}
                        marks={[
                          { value: 0, label: "" },
                          { value: 0.25, label: `Q1:${data.q1[4]}` },
                          { value: 0.5, label: `Q2:${data.q2[4]}` },
                          { value: 0.75, label: `Q3:${data.q3[4]}` },
                          { value: 1, label: `` },
                        ]}
                        valueLabelDisplay="auto"
                        color={school}
                        scale={() =>
                          "학점 환산: " +
                          reverseScaleQ(
                            scaleQ(score.gpa, data, 4),
                            data,
                            4
                          ).toFixed(2)
                        }
                      />
                    </Grid>
                  </>
                )}
                {data.leet === "SPLIT" && (
                  <>
                    <Grid item xs={12}>
                      <Slider
                        step={0.01}
                        min={0}
                        max={1}
                        value={scaleQ(score.eon, data, 1)}
                        marks={[
                          { value: 0, label: "" },
                          { value: 0.25, label: `Q1:${data.q1[1]}` },
                          { value: 0.5, label: `Q2: ${data.q2[1]}` },
                          { value: 0.75, label: `Q3: ${data.q3[1]}` },
                          { value: 1, label: `` },
                        ]}
                        valueLabelDisplay="auto"
                        color={school}
                        scale={() =>
                          "LEET 환산(언어): " +
                          reverseScaleQ(
                            scaleQ(score.eon, data, 1),
                            data,
                            1
                          ).toFixed(2)
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Slider
                        step={0.01}
                        min={0}
                        max={1}
                        value={scaleQ(score.chu, data, 4)}
                        marks={[
                          { value: 0, label: "" },
                          { value: 0.25, label: `Q1:${data.q1[4]}` },
                          { value: 0.5, label: `Q2: ${data.q2[4]}` },
                          { value: 0.75, label: `Q3: ${data.q3[4]}` },
                          { value: 1, label: `` },
                        ]}
                        valueLabelDisplay="auto"
                        color={school}
                        scale={() =>
                          "LEET 환산(추리): " +
                          reverseScaleQ(
                            scaleQ(score.chu, data, 4),
                            data,
                            4
                          ).toFixed(2)
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Slider
                        step={0.01}
                        min={0}
                        max={1}
                        value={scaleQ(score.gpa, data, 7)}
                        marks={[
                          { value: 0, label: "" },
                          { value: 0.25, label: `Q1:${data.q1[7]}` },
                          { value: 0.5, label: `Q2:${data.q2[7]}` },
                          { value: 0.75, label: `Q3:${data.q3[7]}` },
                          { value: 1, label: `` },
                        ]}
                        valueLabelDisplay="auto"
                        color={school}
                        scale={() =>
                          "학점 환산: " +
                          reverseScaleQ(
                            scaleQ(score.gpa, data, 7),
                            data,
                            7
                          ).toFixed(2)
                        }
                      />
                    </Grid>
                  </>
                )}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </ThemeProvider>
  );
};

export default SchoolSummary;
