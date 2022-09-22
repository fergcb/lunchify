import { ReactElement, useEffect, useState } from 'react'
import { api, getRandomTrackFromLibrary } from '../api'
import Button from './Button'

const trackData = {
  name: '',
  album: {
    images: [
      { url: '' },
    ],
  },
  artists: [
    { name: '' },
  ],
}

export default function Player (): ReactElement {
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined)

  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(false)
  const [track, setTrack] = useState(trackData)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Lunchify',
        getOAuthToken: cb => { cb(api.auth.token) },
        volume: 0.5,
      })

      setPlayer(player)

      player.addListener('ready', data => {
        console.log('Ready with Device ID', data.device_id)

        getRandomTrackFromLibrary([])
          .then(track => {
            const deviceId: string = encodeURIComponent(data.device_id)
            void api.put(`/me/player/play?device_id=${deviceId}`, {
              body: JSON.stringify({
                uris: [track.uri],
              }),
            })
          })
          .catch(console.error)
      })

      player.addListener('not_ready', data => {
        console.log('Device ID has gone offline', data.device_id)
      })

      player.addListener('player_state_changed', state => {
        if (state === null) {
          return
        }

        setTrack(state.track_window.current_track)
        setPaused(state.paused)

        player.getCurrentState().then(state => {
          state === null ? setActive(false) : setActive(true)
        }).catch(console.error)
      })

      void player.connect()
    }
  }, [])

  const prev = (): void => {
    void player?.previousTrack()
  }

  const next = (): void => {
    void player?.nextTrack()
  }

  const togglePlaying = (): void => {
    void player?.togglePlay()
  }

  return <div>
    <img src={track.album.images[0].url} alt="" />

    <div>
        <div>{track.name}</div>
        <div>{track.artists[0].name}</div>
    </div>

    <div>active: {String(active)}</div>
    <div>paused: {String(paused)}</div>

    <Button bgColor='bg-purple-500' onClick={prev} >
      &lt;&lt;
    </Button>

    <Button bgColor='bg-purple-500' onClick={togglePlaying} >
      { paused ? 'PLAY' : 'PAUSE' }
    </Button>

    <Button bgColor='bg-purple-500' onClick={next} >
        &gt;&gt;
    </Button>
  </div>
}
