const api_key = `e50134282f-45ca4d34ac-s3wq55`;

export function getUrl({ from, to, amount }, isMulty = false) {
  const main_url = `https://api.fastforex.io/${
    isMulty ? `fetch-multi` : `convert`
  }?from=${from}&to=${to}&amount=${amount}&api_key=${api_key}`;

  return main_url;
}
