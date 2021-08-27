
import React, { useState, useEffect } from "react";

import Nav from 'react-bootstrap/Nav';
import TabPane from 'react-bootstrap/TabPane';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BarObject from "./BarObject";
import BuildPoll from "../Tabs/BuildPoll"
import { BsFillCameraVideoFill, BsBarChart, BsClipboard, BsTerminal, BsFillPersonLinesFill } from "react-icons/bs";

const SideNav = (props) => {

    const camera = <BsFillCameraVideoFill className="nav-icon"/>
    const poll = <BsBarChart className="nav-icon"/>
    const lesson = <BsClipboard className="nav-icon"/>
    const commands = <BsTerminal className="nav-icon"/>
    const progress = <BsFillPersonLinesFill className="nav-icon"/>

    return (
        <div className="side-nav">
            <TabContainer id="left-tabs-example" defaultActiveKey="first">
                <Row className="nav-row">
                    <Col className="side-tabs">
                        <Nav variant="pills" className="flex-column">
                            <h1 className="nav-header">Vroom</h1>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="custom-nav">{camera}Meeting</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className="custom-nav">{progress}Progress</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third" className="custom-nav">{poll}Polls</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth" className="custom-nav">{lesson}Lesson Plan</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth" className="custom-nav">{commands}Commands</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                    <TabContent>
                        <TabPane eventKey="first">
                            <p>Meeting</p>
                        </TabPane>
                        <TabPane eventKey="second">
                            <p>Progress</p>
                        </TabPane>
                        <TabPane eventKey="third">
                            <BarObject />
                            <BuildPoll />
                        </TabPane>
                        <TabPane eventKey="fourth">
                            <p>Hello</p>
                        </TabPane>
                        <TabPane eventKey="fifth">
                        <p>Lesson Plan</p>
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </TabContainer>
        </div>
    );
}

export default SideNav;