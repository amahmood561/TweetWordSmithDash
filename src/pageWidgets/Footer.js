
import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card, OverlayTrigger, Tooltip, Image, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faDownload, faRocket } from "@fortawesome/free-solid-svg-icons";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import GitHubButton from 'react-github-btn';
import { Link } from 'react-router-dom';
import { Routes } from "../routes";

export default (props) => {
  const currentYear = moment().get("year");
  const showSettings = props.showSettings;

  const toggleSettings = (toggle) => {
    props.toggleSettings(toggle);
  }

  return (
    <div>
      { showSettings ? (
        <Card className="theme-settings">
          <Card.Body className="pt-4">
            <Button className="theme-settings-close" variant="close" size="sm" aria-label="Close" onClick={() => { toggleSettings(false) }} />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="m-0 mb-1 fs-7">Made with open source <span role="img" aria-label="gratitude">💙</span></p>
              <GitHubButton href="https://github.com/amahmood561/TweetWordSmithDash" data-size="large" data-show-count="true" aria-label="Staramahmood561/TweetWordSmithDash on GitHub">Star</GitHubButton>
            </div>
            <Button href="https://github.com/amahmood561/TweetWordSmithDash" target="_blank" variant="primary" className="mb-3 w-100"><FontAwesomeIcon icon={faDownload} className="me-1" /> Download</Button>
            <p className="fs-7 text-gray-700 text-center">Available in the following technologies:</p>
            <div className="d-flex justify-content-center">
              <Card.Link href="https://github.com/amahmood561/TweetWordSmithDash" target="_blank">
                <OverlayTrigger placement="top" trigger={['hover', 'focus']} overlay={<Tooltip>Bootstrap 5 · The most popular HTML, CSS, and JS library in the world.</Tooltip>}>
                  <Image src={BS5Logo} className="image image-xs" />
                </OverlayTrigger>
              </Card.Link>

              <Card.Link href="https://github.com/amahmood561/TweetWordSmithDash" target="_blank">
                <OverlayTrigger placement="top" trigger={['hover', 'focus']} overlay={<Tooltip>React · A JavaScript library for building user interfaces.</Tooltip>}>
                  <Image src={ReactLogo} className="image image-xs" />
                </OverlayTrigger>
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      ) : (
          <Card className="theme-settings theme-settings-expand" onClick={() => { toggleSettings(true) }}>
            <Card.Body className="p-3 py-2">
              <span className="fw-bold h6"><FontAwesomeIcon icon={faCogs} className="me-1 fs-7" /> Settings</span>
            </Card.Body>
          </Card>
        )}
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2019-{`${currentYear} `}
              <Card.Link href="https://github.com/amahmood561" target="_blank" className="text-blue text-decoration-none fw-normal">
                AliTech
            </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/amahmood561" target="_blank">
                  About
              </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/amahmood561" target="_blank">
                  Themes
              </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/amahmood561" target="_blank">
                  Blog
              </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://github.com/amahmood561" target="_blank">
                  Contact
              </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
