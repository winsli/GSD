/**
 * Created by Aaron on 2018/7/5.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col,Glyphicon} from 'react-bootstrap'
import Paper from '@material-ui/core/Paper';
import {injectIntl, intlShape, FormattedMessage} from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import {getAllLibTags,addGroupContainTags,getGroupContainTags,removeGroupContainTags} from "../../actions";
import Chip from '@material-ui/core/Chip';
import {connect} from 'react-redux'
import {PreImage} from '../plugins'
import swal from 'sweetalert2'
const styles = theme => ({
    chip: {
        fontSize:"0.9rem",
        margin: theme.spacing.unit  ,
        backgroundColor:"#ffffff",
        color:"#d45f5f",
        border:"solid 1px #d45f5f",
        '&:hover': {
            fontSize:"0.9rem",
            color: '#ffffff',
            border: 'solid 1px #d45f5f00',
backgroundColor: '#e88a8a',
            textDecoration:'none'
        },
        '&:focus': {
            fontSize:"0.9rem",
            backgroundColor:"#ffffff",
            color:"#d45f5f",
            border:"solid 1px #d45f5f",
            textDecoration:'none'
        },
    },
    chipSelected:{
        fontSize:"0.9rem",
        margin: theme.spacing.unit  ,
        backgroundColor:"#d45f5f",
        color:"#ffffff",
        border:"solid 1px #d45f5f",
        '&:hover': {
            fontSize:"0.9rem",
            color: '#ffffff',
            border: 'solid 1px #d45f5f00',
            backgroundColor: '#e88a8a',
            textDecoration:'none'
        },
        '&:focus': {
            fontSize:"0.9rem",
            backgroundColor:"#d45f5f",
            color:"#ffffff",
            border:"solid 1px #d45f5f",
            textDecoration:'none'
        },
    }
});

const chipData=[
    {id:"1",name:<FormattedMessage
        id="CBDB"
    />},
    {id:"2",name:<FormattedMessage
        id="CTEXT"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />},
    {id:"3",name:<FormattedMessage
        id="DDBC"
    />}
];

class Databases extends Component {
    static propTypes={
        classes: PropTypes.object.isRequired,
        intl: intlShape.isRequired
    }
    constructor(props) {
        super(props);
        this.state={snakeOpen:false}
    }

    componentDidMount(){

    }

    toggleTag(itemId,selcted){
        var currentIndex=this.props.personality.pageInfos.tabIndex;
        var currentTab=this.props.personality.myGroupTags[currentIndex];
        if(!!currentTab){//当前标签存在
           if(!!selcted){
               var header={userid:this.props.userInfos.responseUserInfo.userid,token:this.props.userInfos.responseUserInfo.token};
               this.props.removeGroupContainTags(this.props.userInfos.responseUserInfo.userid,currentTab.categoryid,itemId,header)}
           else{
               var header={userid:this.props.userInfos.responseUserInfo.userid,token:this.props.userInfos.responseUserInfo.token};
               this.props.addGroupContainTags(this.props.userInfos.responseUserInfo.userid,currentTab.categoryid,itemId,header)
           }
        }else{
            console.log("toggleTag");
            swal({
                title: this.props.intl.formatMessage({id: 'NOT CHOOSED TAGS'}),
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: this.props.intl.formatMessage({id: 'Ok'})
            }).then((result) => {
                if (result.value) {

                }
            })
        }

    }


    renderChips(){


        const { classes } = this.props;
        if(!!this.props.personality.allLibs){
            var componentArr=[];
            var key=0;
            var locale=this.props.userInfos.language||'auto';
            if(locale=='auto'){
                var lang=navigator.language;
                var locale = "en";
                if (lang === "zh" ||lang === "zh-CN"||lang==="zh-TW") {
                    locale = "zh";
                }
            }
            for(var k in this.props.personality.allLibs){
                if(!!this.props.personality.allLibs[k]&&this.props.personality.allLibs[k].length>0) {
                    var tagList=this.props.personality.allLibs[k];
                    key++;
                    var comp=(<div key={`div_wrapper_${key}`}>
                        <h4 style={{margin:'14px 4px'}} ><FormattedMessage
                            id={k}
                        /></h4>{
                        tagList.map((item,index)=>{
                            var selcted=this.props.personality.currentSelTags.find(sel=>sel==item.libid)
                            return  <Chip
                                key={item.libid||Math.random()*1000}
                                label={locale=='en'?item.nameeng:item.namecha}
                                className={selcted?classes.chipSelected:classes.chip}
                                component="span"
                                onClick={()=>this.toggleTag(item.libid,selcted)}
                                clickable
                            />
                        })
                    }</div>)
                    componentArr.push(comp);
                }
            }

            return componentArr;
        }else{
            return (<div style={{textAlign:'center',color:"#666"}}><FormattedMessage
                id="NO_DATA"
            /></div>)
        }
    }

    componentDidMount(){
        this.props.getAllLibTags();
    }

    render() {

        return (
            <div style={{marginTop:'20px'}}>

                {this.renderChips()}

            </div>
        );
    }

}



const mapStateToProps = (state, props) => {

    return {
        routing: state.routing,
        userInfos: state.userInfos,
        personality:state.personality
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllLibTags: () => dispatch(getAllLibTags()),
        addGroupContainTags:(userId,groupId,libId,header)=>dispatch(addGroupContainTags(userId,groupId,libId,header)),
        removeGroupContainTags:(userId,groupId,libId,header)=>dispatch(removeGroupContainTags(userId,groupId,libId,header)),
        getGroupContainTags:(userId,groupId,header)=>dispatch(getGroupContainTags(userId,groupId,header))

    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(injectIntl(Databases)));

