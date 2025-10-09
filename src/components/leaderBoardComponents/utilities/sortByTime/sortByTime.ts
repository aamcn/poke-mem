//Turns finish_time strings into numbers and returns input arguments by quickest finish_time.

interface TimeArg {
  finish_time: string;
}

function sortByTime(a: TimeArg, b: TimeArg): number | undefined {
  if (typeof a.finish_time === "string" && typeof b.finish_time === "string") {
    const timeA: number = parseInt(a.finish_time.replaceAll(":", ""), 10);
    const timeB: number = parseInt(b.finish_time.replaceAll(":", ""), 10);
    return timeA - timeB;
  }
}

export { sortByTime };
