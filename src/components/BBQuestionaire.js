import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { res1, res2, res1Border, res2Border } from 'config/colors';
import Hotkeys from 'react-hot-keys';
import {api} from 'utils/data';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        padding: 0,
        flexGrow: 1,
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        width: '80vw',
        height: '70vh',
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: '30vh'
    },
    cell: {
        width: '40%',
        margin: '0 5%',
        background: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        transition: 'height 1s ease-out'
    },
    cellNum: {
        fontFamily: 'arial',
        fontWeight: 'bold',
        transition: 'font-size 1s ease-out',
    },
    indication: {
        fontFamily: 'arial',
        position: 'absolute',
        bottom: '-13vh',
        fontWeight: 'normal',
        fontSize: '10vh'
    }
});

class BBQuestionaire extends React.Component {

    calcHeight = id => {
        const total = (this.props.results['1'] || 0) + (this.props.results['2'] || 0);
        return total > 0 ? `${(this.props.results[id] / total) * 100}%` : '0%'
    }

    calcCellNumFontSize = id => {
        const pHeight = parseInt(this.calcHeight(id).replace('%', ''));
        return pHeight > 10 ? 80 : pHeight * 8;
    }

    reset = () => {
        console.log('reset');
        api({type:'reset', data: {auth: 'alexmizrachi'}});
    }

    render() {
        const { classes } = this.props;

        return (
            <Hotkeys
                keyName="shift+r"
                onKeyUp={()=>this.reset()}>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <div className={classes.cell} style={{ background: res1, border: `1px solid ${res1Border}`, height: this.calcHeight('1') }}>
                        <div className={classes.cellNum} style={{fontSize: this.calcCellNumFontSize('1')}}>{this.props.results['1'] > 0 && this.props.results['1']}</div>
                        <div className={classes.indication}>1</div>
                    </div>
                    <div className={classes.cell} style={{ background: res2, border: `1px solid ${res2Border}`, height: this.calcHeight('2') }}>
                        <div className={classes.cellNum} style={{fontSize: this.calcCellNumFontSize('2')}}>{this.props.results['2'] > 0 && this.props.results['2']}</div>
                        <div className={classes.indication}>2</div>
                    </div>
                </div>
            </div>
            </Hotkeys>
        );
    }
}

BBQuestionaire.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(state => ({
    results: state.results
}))(withStyles(styles)(BBQuestionaire));
