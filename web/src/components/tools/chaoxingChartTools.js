/**
 * Created by Aaron on 2018/7/21.
 */
/**
 * Created by Aaron on 2018/7/18.
 */
/**
 * Created by Aaron on 2018/7/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router';

import {Glyphicon, Row, Col} from 'react-bootstrap';
import {browserHistory} from 'react-router'
import {getBaiKeData} from "../../actions";
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import {withStyles} from '@material-ui/core/styles';
import WordClouds from "../charts/wordClouds"
import FilterScatter from "../charts/filterScatter"
import MapTools from "../charts/mapTool"
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    cardAction: {
        textAlign: "right",
        display: "block"
    },
    buttonOk: {
        backgroundColor: "#8c1515",
        fontSize: '12px',
        '&:hover': {
            color: "#ffffff",
            backgroundColor: "#b93939"
        },
        color: "#ffffff",
    },
    buttonToggle: {
        display: "inline-block",
        color: "#a09d9d",
        border: "0",
        fontSize: "12px",
        minWidth: '25px',
        minHeight: '20px',
        textAlign: "center",
      
    }, buttonToggleShow: {
        display: "block",
        color: "#868585",
        border: "0",
        height: "50px",
        fontSize: "1.1rem",
        backgroundColor: "#ffffff",
        width: "100%",
        textAlign: "center"
    }


});


class ChaoxingChartTools extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
        onFilterSelect: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.searchValue = "";

        this.state = {};

    }

    componentDidMount() {

        this.searchValue = this.props.searchValue;

    }

    componentWillReceiveProps(nextProps) {


    }


    render() {


        return (
            <div>
                <div style={{padding: "1rem",backgroundColor:"#ffffff"}}>
                    <WordClouds searchValue={this.props.searchValue||''} filterOpenMode={true}/>
                </div>
                <div style={{padding: "1rem",backgroundColor:"#ffffff",marginTop:"20px"}}>
                    <FilterScatter searchValue={this.props.searchValue||''} filterOpenMode={true}/>
                </div>
                <div style={{padding: "1rem",backgroundColor:"#ffffff",marginTop:"20px"}}>
                    <MapTools searchValue={this.props.searchValue||''} filterOpenMode={true}/>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, props) => {

    return {
        routing: state.routing,
        userInfos: state.userInfos,
        chaoxingData: state.chaoxingData
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        getBaiKeData: (searchValue) => dispatch(getBaiKeData(searchValue))


    }
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(ChaoxingChartTools)));
