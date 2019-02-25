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
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    buttonToggle:{
        display: "inline-block",
        color: "#a09d9d",
        border: "0",
        fontSize: "12px",
        minWidth:'25px',
        minHeight:'20px',
        textAlign:"center"
    },buttonToggleShow:{
        display: "block",
        color: "#868585",
        border: "0",
        height: "50px",
        fontSize: "1.1rem",
        backgroundColor: "#ffffff",
        width:"100%",
        textAlign:"center",
        '&:hover':{
            backgroundColor:"#ffffff"
        }
    }


});


class ChaoxingTools extends Component {
    static propTypes = {
        intl: intlShape.isRequired,
        onFilterSelect: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.searchValue="";

        this.state = {yearchannelList: [], initFlag: false,toggleState:true};

    }

    componentDidMount() {

        this.searchValue=this.props.searchValue;
        this.props.getBaiKeData(this.props.searchValue);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.searchValue!=this.searchValue){
            this.searchValue=nextProps.searchValue;
            this.props.getBaiKeData(nextProps.searchValue);
        }


    }


    render() {

        const {classes}=this.props;

        const isAccessing = this.props.chaoxingData.pageInfos.isAccessing;

        console.log(isAccessing);
        const toolData = (this.props.chaoxingData.chaoxingToolData.data || {}).toolData || "";
        const baike = (this.props.chaoxingData.chaoxingToolData.data || {}).baike || "";
        var html = toolData.replace(/http:\/\/ss.chaoxing.com\/search\?sw=/g, "/search?searchValue=");
        html = (html || "").replace(/<a\b[^>]+\bhref="javascript:showrelatedpraDiv([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "");
        html = (html || "").replace(/<h3\b[^>]+\bonclick="showmorerelatedphrases([^"]*)"[^>]*>([\s\S]*?)<\/h3>/g, "");
        html = (html || "").replace(/<a\b[^>]+\bhref="http:\/\/user.dayainfo.com\/dsa([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "");

        const baikeUrl = (this.props.chaoxingData.chaoxingToolData.data || {}).baikeUrl || "";
        console.log(baikeUrl);
        console.log(html);

        return (
            <div  style={{marginTop: "20px",display:!!baikeUrl?"block":"none"}}>
                {
                //     this.state.toggleState&&isAccessing &&
                // <div style={{margin:"10px auto",textAlign:"center",backgroundColor:"#ffffff"}}><CircularProgress color="secondary"/></div>
                }
                {!isAccessing &&<div className={this.state.toggleState?"rightTool":"rightTool slideHide"} style={{paddingTop:isAccessing?"0px":"15px"}}>
                    {!isAccessing&&this.state.toggleState&&<div className="toolCloseIcon"><Button
                        className={classes.buttonToggle}
                        variant="outlined" size="small" onClick={()=>this.setState({toggleState:false})}>
                        <i className="glyphicon glyphicon-menu-up"></i>
                    </Button></div>}
                    <div className={this.state.toggleState?"tool_toggleDiv":"tool_toggleDiv slideShow"}  onClick={()=>this.setState({toggleState:true})}><div className="tool_toggleDiv_wrapper">
                        <Button
                            className={classes.buttonToggleShow}
                            variant="outlined" size="small" onClick={()=>this.setState({toggleState:true})}>
                            <i className="glyphicon glyphicon-menu-down"></i>&nbsp;<FormattedMessage id="Expand Search Tools"/>
                    </Button></div></div>
                    {!!baike&&!isAccessing&&<div className="baike" style={{position:'relative'}}>

                        <h4
                        className="baikeTitle">{this.props.searchValue}</h4>
                        <div style={{paddingBottom:'1em',fontSize: '13px',lineHeight: "1.6em"}}>{baike}
                            <div style={{marginTop:'0.5em',textAlign:"right"}}><a href={baikeUrl} target="_blank">详细</a></div>
                        </div>
                    </div>}

                    <div className="searchTools" style={{display:isAccessing?"none":"block"}}>
                        <div dangerouslySetInnerHTML={{__html: html}}></div>
                    </div>
                </div>}
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


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(ChaoxingTools)));
