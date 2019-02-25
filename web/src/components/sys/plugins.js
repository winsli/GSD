import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, Row, Col} from 'react-bootstrap'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import {FormattedMessage,injectIntl} from 'react-intl';
import { Collapse } from 'antd';
import swal from 'sweetalert2'
const Panel = Collapse.Panel;
import Header  from "../header"
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: "20px",
    paddingBottom: "30px"
  },
});

const text = (
    <p style={{ paddingLeft: 24 }}>
        A dog is a type of domesticated animal.
        Known for its loyalty and faithfulness,
        it can be found as a welcome guest in many households across the world.
    </p>
);


class Contact extends Component {
  static propTypes={
    classes: PropTypes.object.isRequired
  }
  constructor(props) {
    super(props);
    this.state={contactEmail:"",adviceInfo:""}
  }


  componentDidMount(){
      document.title=this.props.intl.formatMessage({id: 'How to Collect'})+"-GSD";
  }

  submitAdvice(){
    swal(
        `接口调整中`
        ,
        '',
        'info'
    )
  }

    showDialog(){
        swal({
            html: `<h4>安装GSD采集工具小窍门</h4><div><ul className ="list-group" style={{textAlign:'left'}}> <li className="list-group-item">1 将下载文件解压到指定文件夹，并打开Chrome浏览器扩展程序页面。<br/></li> <li className="list-group-item">2 点击“加载已解压的扩展程序”选择文件点击确定。<br/></li> <li className="list-group-item">3 重新打开Chrome，右侧会显示GSD图标表示安装成功。
</li></ul></div>`,
            showCancelButton:false,
            cancelButtonText: this.props.intl.formatMessage({id: 'CANCEL'}),
            confirmButtonText: this.props.intl.formatMessage({id: 'Ok'})
        }).then(result=>{

        });
    }

  render() {
    const { classes } = this.props;

    return (
        <div>
          <Header/>

          <div className="jumbotron" style={{background:`url('/sourceImages/plugins_bg.png') no-repeat top center`,height:"278px",backgroundSize:"cover"}}>
          <Grid >
            <h2 style={{marginTop:"50px",color:"#676464",color:"#ffffff",textAlign:"center"}}>GSD采集工具</h2>
            <p style={{fontSize:'1rem',color:"#ffffff",textAlign:"center"}}> 把记录的事交给我们&nbsp;一键收藏、全端全文检索</p>
          </Grid>
            </div>

            <div className="container" style={{marginTop:"30px"}}>
                <Paper className={classes.root} elevation={1}>

                    <div>
                        <Collapse bordered={false} defaultActiveKey={['1']} className="gsd-collapse">
                            <Panel header={<span><span className="chrome-icon"></span>&nbsp;全球智慧数据平台chrome浏览器</span>} key="1">
                                <div>
                                    <div style={{backgroundColor:"rgb(236, 236, 236)",textAlign: 'center',padding:"40px 0"}}><a target="_blank" href="https://chrome.google.com/webstore/detail/global-smart-data/anmgpomamahefkfniihbohdkachcmppo" className="btn btn-lg btn-danger">安装全球智慧数据平台chrome扩展</a>
                                    <a href="/templates/GsdExtension.zip" onClick={()=>this.showDialog()} style={{display:"block",margin:'0 auto',color:"#797979",marginTop:'0.5rem'}} target="_blank">手动安装插件</a>
                                    </div>
                                </div>
                                <h5 style={{marginTop:'15px'}}>如何使用全球智慧数据平台chrome扩展?</h5>
                                <p>&nbsp;&nbsp;浏览网页时，看到页面上感兴趣的网页内容，点击右键选择“保存至GSD”，进行全网页内容采集。</p>
                                <div style={{textAlign:"center"}}>
                                    <img src="/sourceImages/capture_01.png" style={{width:"400px",margin:'0 auto'}}/>
                                </div>
                            </Panel>
                            <Panel header={<span><span className="gsd-app-icon"></span>&nbsp;全球智慧数据平台客户端下载</span>} key="2">

                                <div className="row">
                                    <div className="col-sm-6">
                                        <h5>IOS二维码</h5>
                                        <img src="/sourceImages/erweima.png"/></div>
                                    <div className="col-sm-6"><h4>开发中...</h4></div>
                                </div>
                            </Panel>
                            <Panel header={<span><span className="gsd-download-icon"></span>&nbsp;其他浏览器</span>} key="3">
                                <div style={{textAlign:'center'}}><h3>建设中</h3></div>
                            </Panel>
                        </Collapse>
                    </div>
                </Paper>

            </div>
        </div>
    );
  }

}
export default withStyles(styles)(injectIntl(Contact))
