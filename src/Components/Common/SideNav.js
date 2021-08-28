
import React from "react";

import Nav from 'react-bootstrap/Nav';
import TabPane from 'react-bootstrap/TabPane';
import TabContent from 'react-bootstrap/TabContent';
import TabContainer from 'react-bootstrap/TabContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DefaultPollPage from "../Tabs/Poll/DefaultPollPage";
import DefaultLessonPlan from "../Tabs/LessonPlan/DefaultLessonPlan";
import Commands from "../Tabs/Commands";
import DefaultProgress from "../Tabs/DefaultProgress";
import DefaultMeeting from '../Tabs/Meetings/DefaultMeeting'
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
                            <DefaultMeeting />
                        </TabPane>
                        <TabPane eventKey="second">
                            <DefaultProgress />
                        </TabPane>
                        <TabPane eventKey="third">
                            <DefaultPollPage />
                        </TabPane>
                        <TabPane eventKey="fourth">
                            <DefaultLessonPlan />
                        </TabPane>
                        <TabPane eventKey="fifth">
                            <Commands />
                        </TabPane>
                    </TabContent>
                    </Col>
                </Row>
            </TabContainer>
        </div>
    );
}

export default SideNav;