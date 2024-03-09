import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SchoolScore } from "../utils/SchoolScore";

const SchoolDetail = ({ year, school, score }) => {
  const data = SchoolScore(year, school);
  if (!score) return;
  return (
    <>
      {data.leet !== "SPLIT" && (
        <Grid item xs={12}>
          <TableContainer>
            <Table size="small" aria-label="입시결과">
              <TableHead>
                <TableRow>
                  <TableCell align="center" rowSpan={2}>
                    {data.verboseName}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    LEET (MY: {score.leet.toFixed(2)})
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    학점 (MY: {score.gpa.toFixed(2)})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">전체</TableCell>
                  <TableCell align="center">일전</TableCell>
                  <TableCell align="center">특전</TableCell>
                  <TableCell align="center">전체</TableCell>
                  <TableCell align="center">일전</TableCell>
                  <TableCell align="center">특전</TableCell>
                </TableRow>
              </TableHead>
              {data.status !== "OK" && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      {year}년도 사분위 자료는 준비 중입니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {data.status === "OK" && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center">평균</TableCell>
                    {data.mean.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Q3</TableCell>
                    {data.q3.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Q2</TableCell>
                    {data.q2.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Q1</TableCell>
                    {data.q1.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      )}
      {data.leet === "SPLIT" && (
        <Grid item xs={12}>
          <TableContainer>
            <Table size="small" aria-label="입시결과">
              <TableHead>
                <TableRow>
                  <TableCell align="center" rowSpan={2}>
                    {data.verboseName}
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    LEET(언어) (MY: {score.eon.toFixed(2)})
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    LEET(추리) (MY: {score.chu.toFixed(2)})
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    학점 (MY: {score.gpa.toFixed(2)})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">전체</TableCell>
                  <TableCell align="center">일전</TableCell>
                  <TableCell align="center">특전</TableCell>
                  <TableCell align="center">전체</TableCell>
                  <TableCell align="center">일전</TableCell>
                  <TableCell align="center">특전</TableCell>
                  <TableCell align="center">전체</TableCell>
                  <TableCell align="center">일전</TableCell>
                  <TableCell align="center">특전</TableCell>
                </TableRow>
              </TableHead>
              {data.status !== "OK" && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={7}>
                      {year}년도 사분위 자료는 준비 중입니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {data.status === "OK" && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center">평균</TableCell>
                    {data.mean.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Q3</TableCell>
                    {data.q3.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Q2</TableCell>
                    {data.q2.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Q1</TableCell>
                    {data.q1.map((x, i) => (
                      <TableCell align="center" key={i}>
                        {typeof x == "number" ? x.toFixed(2) : x}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
      )}
    </>
  );
};

export default SchoolDetail;
