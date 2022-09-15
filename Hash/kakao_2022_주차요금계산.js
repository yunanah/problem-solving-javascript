function solution(fees, records) {
  // 23:59 의 분 시간 계산값
  const lastTime = 23 * 60 + 59;
  // 시간정보를 분으로 계산해주는 함수
  const calTime = (strTime) => {
    const [h, m] = strTime.split(":");
    return Number(h) * 60 + Number(m);
  };

  const calFee = (time) => {
    if (time <= fees[0]) return fees[1];
    else {
      const extraTime = time - fees[0];

      return fees[1] + Math.ceil(extraTime / fees[2]) * fees[3];
    }
  };

  // key가 차 번호이고 value는 { in : 순서대로 배열, out  : 순서대로 배열 } 형태로 저장한다
  const recMap = {};

  records.forEach((record, index) => {
    const [time, carNum, kind] = record.split(" ");

    if (kind === "IN") {
      recMap[carNum] = recMap[carNum]
        ? { ...recMap[carNum], in: [...recMap[carNum].in, calTime(time)] }
        : { in: [calTime(time)], out: [] };
    } else {
      recMap[carNum] = recMap[carNum]
        ? { ...recMap[carNum], out: [...recMap[carNum].out, calTime(time)] }
        : { in: [], out: [calTime(time)] };
    }
  });

  // 각 차마다 내야하는 요금을 계산한다  (1) 들어온 경우마다 몇 분 씩 머물렀는지에 대한 시간 정보를 먼저 구한다
  // 각 시간은 분으로 변환한뒤에 OUT 에서 IN을 빼서 구한다. 만약 OUT이 없는 경우에는 23:59에 출차된 것으로 간주하고 계산.
  Object.keys(recMap).forEach((car, index) => {
    recMap[car] = calFee(
      recMap[car].in
        .map((iTime, index) => {
          if (recMap[car].out[index]) return recMap[car].out[index] - iTime;
          else return lastTime - iTime;
        })
        .reduce((acc, curr) => acc + curr, 0)
    );
  });

  return Object.entries(recMap)
    .sort((a, b) => a[0] - b[0])
    .map((x) => x[1]);
}
