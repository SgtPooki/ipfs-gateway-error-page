// cid is defined to the given CID for the page.
const userActionBtn = document.querySelector('#js-user-troubleshoot-btn');

// backend url: https://ipfs-check-backend.ipfs.io
// const ipfsCheckUrl = 'http://127.0.0.1:3333'
const ipfsCheckUrl = 'http://147.75.198.229:3333' // js-libp2p-amino-dht-bootstrapper

async function getMaddrs() {
  const maddrs = await fetch(`https://delegated-ipfs.dev/routing/v1/providers/${cid}`)
    .then((response) => response.json())
    .then((data) => {

      console.log('data', data);
      const maddrs = data.Providers.flatMap((provider) => provider.Addrs.map((addr) => `${addr}/p2p/${provider.ID}`));
      console.log('maddrs', maddrs);
      return maddrs;
    });

  return maddrs;
}

/**
 * Calls the ipfs-check endpoint with the given cid and a list of multiaddrs
 * time out quickly if the request takes too long for a single multiaddr
 */
async function callIpfsCheck(cid, multiaddrs) {

  const maddrChecks = Promise.all(multiaddrs.map(async (maddr) => {
    return await fetch(ipfsCheckUrl + `?cid=${cid}&multiaddr=${maddr}`, {
      method: 'POST',
      signal: AbortSignal.timeout(60000),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        console.log(data);
        return data;
      }).catch((error) => {
        console.error('Error:', error);
      })
  }))
  // console.log(maddrChecks);
  return maddrChecks
}
userActionBtn.addEventListener('click', async () => {
  // alert('User action button clicked');
  const maddrs = await getMaddrs();
  // update
  const ipfsCheckResponse = await callIpfsCheck(cid, maddrs);
  console.log(ipfsCheckResponse);
});
