import React, {Component} from 'react';

import VideoBoard from '../components/videoBoard';
//MUI stuff
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
class home extends Component{
    render(){
        return (
            <div>
                <VideoBoard />     
            </div>
        );
    }
}

export default home