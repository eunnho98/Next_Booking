// string에서 number만 가져오는 함수
export const getNumber = (string: string) => {
  if (string === undefined) {
    return 0;
  }
  const regex = /[^0-9]/g;
  const result = string.replace(regex, '');
  return result;
};
