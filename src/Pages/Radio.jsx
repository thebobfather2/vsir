// import "./Radio.css";
// import {ElvWalletClient} from "@eluvio/elv-client-js/src/walletClient/index";

// const Radio = () => {

// return (

// <div className="RadioMain">
// <h1>Radio Coming Soon</h1>
// </div>
    
//     );
// };

// await ElvWalletClient.Initialize({
//     network: "main | demo",
//     mode: "production | staging",
//     marketplaceParams: {
//       tenantSlug,
//       marketplaceSlug
//     }
//   })

// export default Radio;

import React, { Component } from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import CircularProgress from "@material-ui/core/CircularProgress";

import Hls from "hls.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 60
  },
  image: {
    marginLeft: 24,
    width: 200,
    height: 200
  },
  img: {
    display: "block",
    width: 200,
    height: 200,
    maxWidth: "100%",
    maxHeight: "100%"
  },
  detail: {
    marginLeft: 16
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class Video extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {
    if (props.episode && this.player) {
      var hlsUrl = props.episode.assets.hls;
      var video = this.player;
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // If HLS is natively supported, let the browser do the work!
        video.src = "hlsUrl";
        video.addEventListener("loadedmetadata", function() {
          video.play();
        });
      } else if (Hls.isSupported()) {
        // If the browser supports MSE, use hls.js to play the video
        var hls = new Hls({
          // This configuration is required to insure that only the
          // viewer can access the content by sending a session cookie
          // to api.video service
          xhrSetup: function(xhr, url) {
            xhr.withCredentials = true;
          }
        });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play();
        });
      } else {
        alert("Please use a modern browser to play the video");
      }
    }
  }

  handleSerieClick = () => {
    this.props.history.push("/" + this.props.serie.apiName);
  };

  _onTouchInsidePlayer() {
    if (this.player.paused) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  render() {
    const { classes, theme } = this.props;
    if (this.props.episode) {
      const { assets, title, description, videoId } = this.props.episode;
      return (
        <Grid className={classes.root} item xs={12}>
          <video
            controls
            onClick={this._onTouchInsidePlayer}
            ref={player => (this.player = player)}
            autoPlay={true}
          />
        </Grid>
      );
    } else {
      return (
        <Grid className={classes.progress} item xs={12}>
          <CircularProgress size={100} />
        </Grid>
      );
    }
  }
}

export default withStyles(styles, { withTheme: true })(Video);