const input = document.getElementById('matchinp');
const button = document.getElementById('submitbtn');

async function run(x) {
    const res = await fetch('https://api.mcsrranked.com/matches/' + x)
    const data = await res.json()
    const players = {};

    for (const player of data.data.players) {
    players[player.uuid] = player.nickname;
    }
    const vods = data['data']['vod']
    if (vods.length === 0) {
        alert('This match has no vods')
    } else if (vods.length === 1) {
        console.log('1 vod')
        openvod(vods, data)
    } else if (vods.length === 2) {
        console.log('2 vod')
        openvods(vods)
    } else {
        alert('Too many vods (this shouldnt be able to happen)')
    }
}

function openvod(vod, data) {
    const url = vod[0].url;
    const matchStart = data.data.date; // already seconds per API
    const vodStart = vod[0].startsAt;
    const matchresult = data['data']['result']['time'] / 1000
    const vodSeek = matchStart - vodStart - 10 - matchresult;
    console.log(url + '?t=' + Math.floor(vodSeek) + 's');
}

input.addEventListener('input', () => {
  const match = input.value.match(
    /^https?:\/\/mcsrranked\.com\/stats\/[^/]+\/([^/?]+)/
  );

  if (match) {
    input.value = match[1];
  }
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    run(input.value)
  }
});

button.addEventListener('click', () => {
  run(input.value)
});
