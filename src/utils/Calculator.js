//import { ScoreOutlined } from "@material-ui/icons";
export const Calculator = ({ year, school, data }) => {
  let { gpa, eonPer, chuPer, eonScore, chuScore } = data;
  [gpa, eonPer, chuPer, eonScore, chuScore] = [
    gpa,
    eonPer,
    chuPer,
    eonScore,
    chuScore,
  ].map((x) => Number(x));
  const score = {};
  let f1, f2, es, cs;

  // GPA 최소 85 이상
  switch (school) {
    case "SEOUL":
      score.gpa = 0.6 * gpa;
      score.leet = 0.6 * (eonPer * 0.4 + chuPer * 0.6);
      score.total = score.gpa + score.leet;
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }
    case "YONSEI":
      f1 = (leetScore) => {
        const delta = Math.max(168 - leetScore, 0);
        if (delta <= 33) {
          return 150 - 0.3 * delta;
        } else if (delta <= 43) {
          return 150 - 0.3 * 33 - 0.4 * (delta - 33);
        } else if (delta <= 58) {
          return 150 - 0.3 * 33 - 0.4 * (43 - 33) - 0.5 * (delta - 43);
        } else if (delta <= 63) {
          return (
            150 -
            0.3 * 33 -
            0.4 * (43 - 33) -
            0.5 * (58 - 43) -
            0.7 * (delta - 58)
          );
        } else if (delta <= 73) {
          return 122 - 3 * (delta - 64);
        } else {
          return 122 - 3 * (73 - 64) - 4.5 * (delta - 73);
        }
      };
      f2 = (gpa) => {
        if (gpa >= 70) {
          return 150 - (100 - gpa);
        } else {
          return 0;
        }
      };
      score.leet = f1(Math.round(eonScore + chuScore));
      score.gpa = f2(gpa);
      score.total = score.leet + score.gpa;
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }
    case "KOREA":
      f1 = (eonPer, chuPer) => {
        if (eonPer >= 88) {
          es = 80 - 0.2 * (100 - eonPer);
        } else if (eonPer >= 56) {
          es = 80 - 0.2 * (100 - 88) - 0.27 * (88 - eonPer);
        } else {
          es = 80 - 0.2 * (100 - 88) - 0.27 * (88 - 56) - 1 * (56 - eonPer);
        }

        if (chuPer >= 88) {
          cs = 120 - 0.3 * (100 - chuPer);
        } else if (chuPer >= 56) {
          cs = 120 - 0.3 * (100 - 88) - 0.4 * (88 - chuPer);
        } else {
          cs = 120 - 0.3 * (100 - 88) - 0.4 * (88 - 56) - 1 * (56 - chuPer);
        }
        return { es, cs };
      };
      switch (year) {
        case "2024":
          f2 = (gpa) => {
            if (gpa >= 92) {
              return 150 - 0.4 * (100 - gpa);
            } else if (gpa >= 90) {
              return 150 - 0.4 * (100 - 92) - 0.7 * (92 - gpa);
            } else if (gpa >= 87) {
              return 150 - 0.4 * (100 - 92) - 0.7 * (92 - 90) - 4 * (90 - gpa);
            } else {
              return (
                150 -
                0.4 * (100 - 92) -
                0.7 * (92 - 90) -
                4 * (90 - 87) -
                6 * (87 - gpa)
              );
            }
          };
          score.tmp = f1(Math.floor(eonPer), Math.floor(chuPer));
          score.leet = score.tmp.es + score.tmp.cs;
          score.gpa = f2(gpa);
          score.total = score.leet + score.gpa;
          score.eon = score.tmp.es;
          score.chu = score.tmp.cs;
          return score;
        case "2023":
          f2 = (gpa) => {
            if (gpa >= 82.9) {
              return 200 - 0.7 * (100 - gpa);
            } else if (gpa >= 78) {
              return 200 - 0.7 * (100 - 82.9) - 6 * (82.9 - gpa);
            } else if (gpa >= 73) {
              return (
                200 - 0.4 * (100 - 82.9) - 6 * (82.9 - 78) - 8 * (78 - gpa)
              );
            } else {
              return (
                200 -
                0.4 * (100 - 82.9) -
                6 * (82.9 - 78) -
                8 * (78 - 73) -
                10 * (73 - gpa)
              );
            }
          };
          score.tmp = f1(Math.floor(eonPer), Math.floor(chuPer));
          score.leet = score.tmp.es + score.tmp.cs;
          score.gpa = f2(gpa);
          score.total = score.leet + score.gpa;
          score.eon = score.tmp.es;
          score.chu = score.tmp.cs;
          return score;
        default:
          return;
      }

    case "SKKU":
      score.leet =
        30 - 0.15 * (170 - Math.min(170, parseInt(eonScore + chuScore)));
      score.gpa = 30 - 0.18 * (100 - gpa);
      score.total = score.leet + score.gpa;
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }

    case "HYU":
      score.gpa = 6 + 0.35 * (gpa - 60);
      score.leet = ((es, cs) => {
        const A = es / 80.9;
        const B = cs / 97.5;
        const C = (A + B) / 2;
        if (C >= 0.95) return 40;
        else if (C >= 0.45) return 12 + (C - 0.45) * 56;
        else return 12;
      })(eonScore, chuScore);
      score.total = score.leet + score.gpa;
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }

    case "EWHA":
      score.gpa = gpa * 0.4;
      score.leet = Math.min(70, (eonScore + chuScore) * 0.7 - 30);
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }

    default:
      return;
  }
};
