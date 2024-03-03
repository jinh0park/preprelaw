export const SchoolScore = (year, school) => {
  const data = {};
  switch (school) {
    case "SEOUL":
      data.verboseName = "서울대";
      switch (year) {
        case "2024":
          return {
            ...data,
            status: "TBU",
          };
        case "2023":
          return {
            ...data,
            status: "OK",
            // LEET (전체 일반 특전) GPA (전체 일반 특전)
            mean: [58.33, 58.44, 56.84, 58.25, 58.29, 57.73],
            q4: [60, 60, 60, 60, 60, 60],
            q3: [59.1, 59.22, 58.83, 58.92, 58.92, 58.56],
            q2: [58.54, 58.54, 56.82, 58.32, 58.32, 57.72],
            q1: [57.82, 57.9, 56.32, 57.72, 57.72, 57.6],
          };
        default:
          return {
            ...data,
            status: "TBU",
          };
      }
    case "YONSEI":
      data.verboseName = "연세대";
      switch (year) {
        case "2024":
          return {
            ...data,
            status: "TBU",
          };
        case "2023":
          return {
            ...data,
            status: "OK",
            mean: [140.47, 137.7, 140.27, 147.02, 147.0, 147.2],
            q4: [150, 150, 150, 150, 150, 150],
            q3: [141.75, 142.2, 138.9, 148, 148, 148],
            q2: [140.4, 138.1, 140.4, 147.2, 147.6, 147.2],
            q1: [138.9, 136.5, 138.9, 146.1, 146.05, 147],
          };
        default:
          return {
            ...data,
            status: "TBU",
          };
      }
    case "KOREA":
      data.verboseName = "고려대";
      switch (year) {
        case "2024":
          return {
            ...data,
            status: "TBU",
          };
        case "2023":
          return {
            ...data,
            status: "OK",
            mean: ["-", 197.31, 192.37, "-", 197.37, 197.25],
            q4: ["-", 200, 200, 200, "-", 200, 200, 200],
            q3: ["-", 198.8, 196.38, "-", 198.32, 198.18],
            q2: ["-", 197.2, 194.63, "-", 197.62, 197.9],
            q1: ["-", 196.6, 192.38, "-", 196.57, 196.34],
          };
        default:
          return {
            ...data,
            status: "TBU",
          };
      }
    default:
      return {
        state: "TBU",
      };
  }
};
