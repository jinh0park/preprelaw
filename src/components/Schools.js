import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import SchoolSummary from "../components/SchoolSummary";
import SchoolDetail from "../components/SchoolDetail";

const Schools = ({ year, hwansan, schoolList }) => {
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>학교별 환산 결과</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {schoolList.map((school, i) => (
              <SchoolSummary
                key={i}
                year={year}
                school={school}
                score={hwansan[school]}
              ></SchoolSummary>
            ))}
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
            {schoolList.map((school, i) => (
              <SchoolDetail
                key={i}
                year={year}
                school={school}
                score={hwansan[school]}
              ></SchoolDetail>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Schools;
