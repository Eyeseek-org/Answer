export const moralisApiConfig = {
  headers: {
    'X-Parse-Application-Id': `${process.env.NEXT_PUBLIC_DAPP_ID}`,
    'Content-Type': 'application/json',
    'x-Parse-Master-Key': `${process.env.NEXT_PUBLIC_MORALIS}`,
  },
};
