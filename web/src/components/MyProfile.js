import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col} from 'react-bootstrap'
import {withStyles} from '@material-ui/core/styles';
import {FormattedMessage} from 'react-intl';
import {Glyphicon} from 'react-bootstrap';
import {Breadcrumb} from 'antd';
import Header  from "./header";
import {connect} from 'react-redux'
import {injectIntl} from 'react-intl';
import {browserHistory} from 'react-router'

import { Tabs } from 'antd';

import MyProfileHome from "./sys/MyProfileHome"
import MyIndexs from './myIndexs'
import MySource from './mySource'
import HistoryList from './history/history'
import CompareTags from './compare'
import Account from "./sys/Account"

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: "20px",
        paddingBottom: "30px",
        marginTop: "10px"
    },
    buttonInfo: {
        display: "inline-block",
        fontSize: "12px",
        minWidth: '30px',
        minHeight: "30px",
        color: "rgb(138, 135, 135)",
        '&:hover': {
            // backgroundColor: "#d45f5f",
            // color:"#ffffff"

        },
    },
    buttonEmail:{
        background: "#2196f3",
        display: "block",
        width:"100%",
        color: "#ffffff",
        border: "none",
        fontSize: "14px",
        '&:disabled': {
            backgroundColor: "#cccccc",
            // color:"#ffffff"

        },
        '&:hover': {
            backgroundColor: "#46a6f3",
            // color:"#ffffff"

        },
    },

});


const TabPane = Tabs.TabPane;

class MyProfile extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {isEditing: false, userFileNumData: {}, searchRankList: [], userFrequencyList: [],currentMyDataPage:1,myDataList:[],currentTabIndex:"0"}
        this.cxId;

    }




    componentDidMount() {
        document.title=this.props.intl.formatMessage({id: 'MY_PROFILE'})+"-"+this.props.intl.formatMessage({id: 'PROJECT_NAME'});
        var curentTabIndex=this.props.location.query.tabIndex||"0";
        this.setState({currentTabIndex:curentTabIndex});


    }


    componentWillReceiveProps(nextProps) {

    }

    handleTabKeyChange(key){
        this.setState({currentTabIndex:key})
        history.replaceState({data:111},"1222","/myProfile?tabIndex="+key);
    }


    render() {
        const {classes} = this.props;


        return (
            <div>
                <Header/>
                <Grid style={{marginTop:"30px"}}>

                    <Breadcrumb separator=">">
                        <Breadcrumb.Item href="/"><FormattedMessage id="HOME"/></Breadcrumb.Item>
                        <Breadcrumb.Item ><FormattedMessage id="MY_PROFILE"/></Breadcrumb.Item>

                    </Breadcrumb>
                    <Tabs style={{marginTop:"20px"}} className="gsd-tabs" defaultActiveKey="0" activeKey={this.state.currentTabIndex} onChange={(key)=>{this.handleTabKeyChange(key)}}>
                        <TabPane tab={<FormattedMessage
                            id="Use Record"/>} key="0"><MyProfileHome/></TabPane>
                        {/* <TabPane tab={<FormattedMessage
                            id="reference_collection"/>}  key="1"><MyIndexs type="literature" route={this.props.route}/></TabPane>
                        <TabPane tab={<FormattedMessage
                            id="gsd_notes"/>}  key="6"><MyIndexs type="webpage" route={this.props.route}/></TabPane>
                        <TabPane tab={<FormattedMessage
                            id="cloud_storage​"/>}  key="2"><MySource route={this.props.route}/></TabPane> */}
                         {/* 去掉我的文献、我的笔记、云盘资源 */}
                        <TabPane tab={<FormattedMessage
                            id="Literature Comparation"/>}  key="3"><CompareTags location={this.props.location}/></TabPane>
                        <TabPane tab={<FormattedMessage
                            id="Search History"/>}  key="4"><HistoryList  route={this.props.route} location={this.props.location}/></TabPane>
                        <TabPane tab={<FormattedMessage
                            id="Account Management"/>} key="5"><Account/></TabPane>

                    </Tabs>



                </Grid>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {

    return {
        routing: state.routing,
        userInfos: state.userInfos,
        myIndexs: state.myIndexs
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(injectIntl(MyProfile)))
