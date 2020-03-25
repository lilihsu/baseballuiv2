import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'

//css
import './range.css'

//MUI stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';


const VIDEO_SOURCES = [
    { src: 'https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/ugly.mp4?alt=media&token=a412d3b0-90f2-4894-8f76-9bcaa6cfee8d', type: 'video/mp4' },
    { src: 'https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/node.mp4?alt=media&token=5a45a671-b302-49c4-aa27-280fb3d1a089', type: 'video/mp4' }
  ]


const useStyles = makeStyles(theme => ({
root: {
    flexGrow: 1,
},
paper: {
    height:'50%',
    padding: 15,
    textAlign: 'center',
    color: theme.palette.text.secondary,
},
grid: {
    padding: '25px 50px 75px 100px',
    }
}));
  

class VideoBoard extends Component{
    state = {
        url: null,
        pip: false,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
      }
    
      load = url => {
        this.setState({
          url,
          played: 0,
          loaded: 0,
          pip: false
        })
      }
      handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
      }
    
      handleStop = () => {
        this.setState({ url: null, playing: false })
      }
    
      handleToggleControls = () => {
        const url = this.state.url
        this.setState({
          controls: !this.state.controls,
          url: null
        }, () => this.load(url))
      }
    
      handleToggleLight = () => {
        this.setState({ light: !this.state.light })
      }
    
      handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
      }
    
      handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
      }
    
      handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
      }
    
      handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
      }
    
      handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
      }
    
      handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
      }
    
      handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
      }
    
      handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
      }
    
      handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
      }
    
      handleSeekMouseDown = e => {
        this.setState({ seeking: true })
      }
    
      handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
      }
    
      handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
        this.player2.seekTo(parseFloat(e.target.value))
      }
    
      handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
      }
    
      handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
      }
    
      handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
      }
    
      handleClickFullscreen = () => {
        screenfull.request(findDOMNode(this.player))
      }
    
      renderLoadButton = (url, label) => {
        return (
          <button onClick={() => this.load(url)}>
            {label}
          </button>
        )
      }
    
      ref = player => {
        this.player = player
      }
      ref2 = player2 => {
        this.player2 = player2
      }

      render(){
        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state;
        const SEPARATOR = ' · ';

        return(
            <div className={useStyles.root}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Paper className={useStyles.paper} style={{ padding: 15 }}>
                    <ReactPlayer url='https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/ugly.mp4?alt=media&token=a412d3b0-90f2-4894-8f76-9bcaa6cfee8d' 
                    width='100%'
                    height='100%'
                    ref={this.ref}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                     />
                </Paper>
              </Grid>
              <Grid item xs={6} className={useStyles.grid} >
                <Paper className={useStyles.paper} style={{ padding: 15 }}>
                    <ReactPlayer url='https://firebasestorage.googleapis.com/v0/b/baseball-ui.appspot.com/o/node.mp4?alt=media&token=5a45a671-b302-49c4-aa27-280fb3d1a089' 
                    width='100%'
                    height='100%'
                    ref={this.ref2}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                     />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={useStyles.paper} elevation={3} >
                    <Grid container spacing={2}>
                        <Grid item>
                            <IconButton 
                                onClick={this.handlePlayPause}
                                aria-label={playing ? 'Pause' : 'Play'}
                                style={{padding:15}}
                                >
                                {!playing?<PlayCircleOutlineIcon />:<PauseCircleOutlineIcon />}
                            </IconButton>
                        </Grid>
                        <Grid item xs style={{padding:18}}>
                            <input
                                type='range' min={0} max={1} step='any'
                                value={played}
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={this.handleSeekChange}
                                onMouseUp={this.handleSeekMouseUp}
                            />
                        </Grid>
                        <Grid item xs style={{padding:15}} >
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<CloudUploadIcon />}
                                
                            >
                                Upload
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        );
      }
    
}

export default VideoBoard;