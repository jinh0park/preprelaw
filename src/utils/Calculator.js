export const Calculator = ({ year, school, data }) => {
  var { gpa, eonPer, chuPer, eonScore, chuScore } = data;
  [gpa, eonPer, chuPer, eonScore, chuScore] = [
    gpa,
    eonPer,
    chuPer,
    eonScore,
    chuScore,
  ].map((x) => Number(x));

  // GPA 최소 85 이상
  switch (school) {
    case "SEOUL":
      var _gpa = 0.6 * gpa;
      var _leet = 0.6 * (eonPer * 0.4 + chuPer * 0.6);
      var score = {
        leet: _leet,
        gpa: _gpa,
        total: _leet + _gpa,
      };
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }
    case "YONSEI":
      var f1 = (leetScore) => {
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
      var f2 = (gpa) => {
        if (gpa >= 70) {
          return 150 - (100 - gpa);
        } else {
          return 0;
        }
      };
      var _leet = f1(Math.round(eonScore + chuScore));
      var _gpa = f2(gpa);
      var score = {
        leet: _leet,
        gpa: _gpa,
        total: _leet + _gpa,
      };
      switch (year) {
        case "2024":
          return score;
        case "2023":
          return score;
        default:
          return;
      }
    case "KOREA":
      var es = 0;
      var cs = 0;
      var f1 = (eonPer, chuPer) => {
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
          var f2 = (gpa) => {
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
          var { es, cs } = f1(Math.floor(eonPer), Math.floor(chuPer));
          var _leet = es + cs;
          var _gpa = f2(gpa);
          var score = {
            leet: _leet,
            gpa: _gpa,
            eon: es,
            chu: cs,
            total: _leet + _gpa,
          };
          return score;
        case "2023":
          var f2 = (gpa) => {
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
          var { es, cs } = f1(Math.floor(eonPer), Math.floor(chuPer));
          var _leet = es + cs;
          var _gpa = f2(gpa);
          var score = {
            leet: _leet,
            gpa: _gpa,
            eon: es,
            chu: cs,
            total: _leet + _gpa,
          };
          return score;
        default:
          return;
      }
    default:
      return;
  }
};
