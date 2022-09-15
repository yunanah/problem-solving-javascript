const solution = (n, info) => {
  // 탐색의 목표인 가장 큰 차이값과 그 중 작은 점수에 화살이 더 많은 점수판 배열
  let answer = [];
  let score = 0;

  const dfs = (index, remain, board) => {
    // 남은 화살이 0보다 작으면 조건에서 벗어나므로 return 해서 탐색을 종료한다.
    if (remain < 0) {
      return;
    }

    // 남은 화살이 없는 경우 각각의 점수판을 돌아 점수 차이를 계산해서 score를 갱신한다.
    if (remain === 0) {
      let rScore = 0;
      let aScore = 0;

      for (let i = 0; i < 11; i++) {
        if (info[i] === 0 && board[i] === 0) {
          continue;
        }

        const diff = info[i] - board[i];

        if (diff >= 0) {
          aScore += 10 - i;
        } else if (diff < 0) {
          rScore += 10 - i;
        }
      }

      const diff = rScore - aScore;

      if (score === diff) {
        // 이전과 동일한 경우 작은 점수가 더 많은 목록을 골라 갱신한다.
        const aReverse = [...answer].reverse().join("");
        const bReverse = [...board].reverse().join("");

        if (aReverse < bReverse) {
          answer = [...board];
        }
      } else if (score < diff) {
        answer = [...board];
        score = diff;
      }

      return;
    }

    // 아직 남은 화살이 있는 경우
    for (let i = index; i < 11; i++) {
      const origin = board[i];
      // 내가 의문이 든 부분 굳이 1씩 줄여볼 필요가 있을까? Yes => 가장 낮은 점수가 많이 분포된 경우를 찾아야 하니까
      for (let j = info[i] + 1; j >= 0; j--) {
        board[i] = j;
        dfs(i + 1, remain - j, board);
      }
      board[i] = origin;
    }
  };

  for (let i = 0; i < 11; i++) {
    const board = Array(11).fill(0);

    board[i] = info[i] + 1;
    dfs(i + 1, n - board[i], board);
  }

  return score === 0 ? [-1] : answer;
};
