function solution(n, k) {
  // k진법으로 바뀐 문자열만 필요함
  // 1. k진법으로 변환한 후 양쪽에 0 또는 아무것도 없는 경우에 해당하는 subString 목록을 구한다
  const target = n.toString(k);

  // 2. 해당 목록에서 소수인 것만 필터해서 개수를 반환한다
  return String(target)
    .split("0")
    .filter((x) => {
      if (x === "" || x == 1) return false;

      for (let i = 2; i <= Math.abs(Math.sqrt(x)); i++) {
        if (x % i === 0 && x != i) return false;
      }
      return true;
    }).length;
}

// 1번 테케 시간초관디.. 왜지? => 자릿수가 매우 큰 소수가 존재했다..
// 따라서 반복문을 사용할 때 소수 판별은 제곱근까지만 실행해도 알 수 있으므로
// 숫자의 크기를 줄여서 반복문을 돌려야한다!
