function solution(id_list, report, k) {
  // 각 유저가 신고한 사람들 중 2번이상 신고된 사람의 수를 배열로 반환하는 문제
  // 1. 각 유저의 신고된 횟수를 저장해서 2번 이상 신고된 사람을 알아낸다
  // 2. 유저들의 신고대상 리스트에서 1번에서 구한 사람들이 몇명 포함되었는지 배열로 만들어 반환한다
  // id_list <= 1000 , report <= 200000

  // report 배열에서 동일한 신고 아이템 제거
  const uniqueRpt = [...new Set(report)];

  // report를 통해 알아낼 것 (1) 신고횟수 (2) 각 유저의 신고목록 -> O(n)
  const rCount = {};
  const rList = {};
  uniqueRpt
    .map((v) => v.split(" "))
    .forEach((line, index) => {
      rCount[line[1]] = rCount[line[1]] ? rCount[line[1]] + 1 : 1;
      rList[line[0]] = rList[line[0]]
        ? [...rList[line[0]], line[1]]
        : [line[1]];
    });

  // 신고횟수 가 2 이상인 유저 목록을 알아낸다. rGT2 : 2번 이상 (Reported Greater Than 2) report 된 유저 목록
  const rGT2 = Object.entries(rCount)
    .filter((item) => item[1] >= k)
    .map((item) => item[0]);

  // 신고목록에 2이상 신고받은 유저 수를 각각 구해서 새로운 배열로 반환한다
  return id_list.map((id, index) => {
    let count = 0;
    let currList = rList[`${id}`];
    rGT2.forEach((user) => {
      if (currList?.includes(user)) count++;
    });

    return count;
  });
}

// 시간 복잡도 : O(n)
// 아쉬운 점 : 문제 잘 읽자... 'k' 놓친 거 뭔데..?
