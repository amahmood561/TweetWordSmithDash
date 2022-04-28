
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister,faGlobe,faHourglass, faChartLine,faUser,faUserFriends ,faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import {decodeToken} from "../twitter-client-side"
import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../pageWidgets/Widgets";
import {PageVisitsTable, TransactionsTable, TweetsTable} from "../../pageWidgets/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import {getCLS} from "web-vitals";

export class DashboardOverviewInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      props:props,
      DashBoardData:undefined,
      hasError: false,
      followers: 0,
      friends: 0,
      statuses: 0,
      tweets: 0

    };
  }

  async getDashBoardInfo() {
    let DashBoardData = {}
    let existingToken = localStorage.getItem('token')
    let axios = require('axios');
    let data = JSON.stringify({
      "tokenEncoded": existingToken
    });
    let config = {
      mode: 'no-cors',
      method: 'post',
      url: 'http://127.0.0.1:5000/DashBoardInfoApi1',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let val = await axios(config)
    DashBoardData = val.data
    this.setState({ DashBoardData: DashBoardData });
    this.props.setUsrData(DashBoardData);
  }

  async componentDidMount() {
    let existingToken = localStorage.getItem('token')
    if (existingToken === 'undefined' || existingToken == null) {
      let url = window.location.href;
      let split_url = url.split("token=")
      localStorage.setItem("token", split_url[1])
    }
    await this.getDashBoardInfo()
    this.setState({followers: this.state.DashBoardData.BySN.followers_count})
    this.setState({friends: this.state.DashBoardData.BySN.friends_count})
    this.setState({statuses: this.state.DashBoardData.BySN.statuses_count})
    let tweets = []
    let entries = Object.entries(this.state.DashBoardData.UserTweets.data)
    entries.forEach(element => tweets.push(element[1]))
    this.setState({tweets: tweets})

  }

  render() {
    return (
        <>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
            <Dropdown className="btn-toolbar">
              <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
                <FontAwesomeIcon icon={faPlus} className="me-2"/>New Task
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faTasks} className="me-2"/> New Task
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2"/> Upload Files
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2"/> Preview Security
                </Dropdown.Item>
                <Dropdown.Divider/>

                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faRocket} className="text-danger me-2"/> Upgrade to Pro
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <ButtonGroup>
              <Button variant="outline-primary" size="sm">Share</Button>
              <Button variant="outline-primary" size="sm">Export</Button>
            </ButtonGroup>
          </div>

          <Row className="justify-content-md-center">
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                  category="Followers"
                  title={this.state.DashBoardData != undefined ? this.state.followers: '345k'}
                  //period="Feb 1 - Apr 1"
                  //percentage={18.2}
                  icon={faUserFriends}
                  iconColor="shape-secondary"
                  enableGlobe={false}
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                  category="Following"
                  //title="$43,594"
                  title={this.state.DashBoardData != undefined ? this.state.friends: '345k'}
                  //period="Feb 1 - Apr 1"
                  percentage={28.4}
                  icon={faGlobe}
                  iconColor="shape-tertiary"
                  enableGlobe={false}

              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                  category="Status Count"
                  //title="$43,594"
                  title={this.state.DashBoardData != undefined ? this.state.statuses: '345k'}
                  //period="Feb 1 - Apr 1"
                  //percentage={28.4}
                  icon={faHourglass}
                  iconColor="shape-tertiary"
                  enableGlobe={false}

              />
            </Col>
            {/*<Col xs={12} sm={6} xl={4} className="mb-4">
              <CircleChartWidget
                  title="Followers Count"
                  data={trafficShares}/>
            </Col>*/}
          </Row>
          <TweetsTable tweets={this.state.tweets}/>

        </>
    );
  };
}
