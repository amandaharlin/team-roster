import "semantic-ui-css/semantic.min.css";

import "./App.css";

import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Progress,
  Segment,
  Table
} from "semantic-ui-react";
import linearScale from "simple-linear-scale";

import { mockTeamPlayers } from "./mockTeamPlayers";

this.state = {
  mockTeamPlayers
};

class Pez extends Component {
  render() {
    const { isActive, color, onClick } = this.props;

    return (
      <Button
        key={Math.random()}
        icon
        color={color}
        size="big"
        basic={!isActive}
        checked={isActive}
        onClick={(e, data) => {
          if (typeof onClick === "function") {
            onClick(e, data);
          }
        }}
      />
    );
  }
}

class App extends Component {
  state = {
    redTeam: [],
    greenTeam: [
      ...mockTeamPlayers.slice(0, 5),
      ...mockTeamPlayers.slice(10, 15)
    ],
    blueTeam: [...mockTeamPlayers.slice(18, 23)],
    allTeam: mockTeamPlayers
  };

  iExistInList = (listItem, list) => {
    return (
      list.filter((li, i) => {
        if (li.ssn === listItem.ssn) {
          return true;
        }
      }).length > 0
    );
  };

  toggleEmployeeInTeam = (employee, team) => {
    const active = this.iExistInList(employee, team);
    const newData = active
      ? team.filter((teamMember, i) => {
          return teamMember.ssn !== employee.ssn;
        })
      : [...team, employee];
    return newData;
  };

  removeEmployeeFromTeam = (employee, team) => {
    return team.filter((teamMember, i) => {
      return teamMember.ssn !== employee.ssn;
    });
  };

  renderRosterTable = () => {
    const { redTeam, greenTeam, blueTeam } = this.state;

    const employeeToRow = this.state.allTeam.map((employee, i) => {
      let activeRed = this.iExistInList(employee, redTeam);
      let activeGreen = this.iExistInList(employee, greenTeam);
      let activeBlue = this.iExistInList(employee, blueTeam);

      return (
        <Table.Row textAlign="center" key={employee.username}>
          <Table.Cell collapsing>
            <Pez
              color="red"
              isActive={activeRed}
              onClick={(e, data) => {
                this.setState({
                  redTeam: this.toggleEmployeeInTeam(employee, redTeam),
                  greenTeam: this.removeEmployeeFromTeam(employee, greenTeam),
                  blueTeam: this.removeEmployeeFromTeam(employee, blueTeam)
                });
              }}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Pez
              color="green"
              isActive={activeGreen}
              onClick={(e, data) => {
                this.setState({
                  greenTeam: this.toggleEmployeeInTeam(employee, greenTeam),
                  redTeam: this.removeEmployeeFromTeam(employee, redTeam),
                  blueTeam: this.removeEmployeeFromTeam(employee, blueTeam)
                });
              }}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Pez
              color="blue"
              isActive={activeBlue}
              onClick={(e, data) => {
                this.setState({
                  blueTeam: this.toggleEmployeeInTeam(employee, blueTeam),
                  redTeam: this.removeEmployeeFromTeam(employee, redTeam),
                  greenTeam: this.removeEmployeeFromTeam(employee, greenTeam)
                });
              }}
            />
          </Table.Cell>
          <Table.Cell>
            {employee.name.first} {employee.name.last}
          </Table.Cell>
          <Table.Cell>{employee.department}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div>
        <Divider hidden />
        <Header>Roster List</Header>
        <Table selectable>
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>R</Table.HeaderCell>
              <Table.HeaderCell>G</Table.HeaderCell>
              <Table.HeaderCell>B</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{employeeToRow}</Table.Body>
        </Table>
      </div>
    );
  };

  getTeamPercent = (sublist, masterlist) => {
    var teamLengthToLinearScale = linearScale([0, masterlist.length], [0, 100]);

    return teamLengthToLinearScale(sublist.length);
  };

  renderColorViz = () => {
    const { redTeam, greenTeam, blueTeam, allTeam } = this.state;

    var scaleTeamLengthToColor = linearScale([0, allTeam.length], [0, 255]);
    let redTeamColor = scaleTeamLengthToColor(redTeam.length);
    let greenTeamColor = scaleTeamLengthToColor(greenTeam.length);
    let blueTeamColor = scaleTeamLengthToColor(blueTeam.length);

    var colorVizStyle = {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      marginTop: "10%",
      marginBottom: "25%",
      backgroundColor: `rgba(${redTeamColor}, ${greenTeamColor}, ${blueTeamColor}, 1)`
    };

    return (
      <div>
        <Header as="h4">Team Percentages as RGBA</Header>
        <div style={colorVizStyle} />
      </div>
    );
  };

  renderWalkthrough = () => {
    return (
      <Segment>
        <Header as="h5">What is this project about?</Header>
        <div>
          The Team Roster project was made to demonstrate comphrehension in a
          few areas: React, ES6, React Semantic UI, native Map and Filter
          functions, and state management without using Redux.
        </div>
        <Header as="h5">How do I interact with this project?</Header>
        <div>
          <p>
            This project has a mock list of people. You can add the people to
            any of 3 teams: the Red Team, the Green Team, or the Blue Team. The
            amount of people on a team is visualized with Progress Bars and a
            Circular-Shaped Div.
          </p>
          <p>
            The Team Roster section shows what percentage of people are on a
            team with Progress Bars. The percentages are transformed with a
            linear scale function into RGBA, which colors the circular shaped
            div.
            <i>
              (For example: the more people that are added to the Red team, the
              more progress appears on the red Progress Bar and the redder the
              circle becomes.)
            </i>
          </p>
          <p>
            The Roster List section shows that everyone can be added to a team.
            Click on or off the Red, Green, and Blue buttons next to their names
            in order to add that person to a specific team. People can join 1
            team at a time.
            <i>
              (For example: try adding `Adam Ministrator` to the Blue Team.
              Check out how they're no longer be on the Green Team, that the
              Green Button will becomes inactive, how the Blue Progress Bar
              grows, and how the Circular Div becomes slightly Bluer.)
            </i>
          </p>
        </div>
      </Segment>
    );
  };

  renderRosterSum = () => {
    const { allTeam, redTeam, greenTeam, blueTeam } = this.state;

    const redPercent = this.getTeamPercent(redTeam, allTeam);
    const greenPercent = this.getTeamPercent(greenTeam, allTeam);
    const bluePercent = this.getTeamPercent(blueTeam, allTeam);

    return (
      <div>
        <Grid columns={2} padded>
          <Grid.Column width="12">
            <Header>Team Roster </Header>
            <Table basic="very" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={3}>Teams</Table.HeaderCell>
                  <Table.HeaderCell width={13}>
                    Percentage of People on a Team
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon
                        name={"user circle outline"}
                        color="red"
                        size="mini"
                      />
                      <Header.Content>red team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Progress percent={redPercent} color="red" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon
                        name={"user circle outline"}
                        color="green"
                        size="mini"
                      />
                      <Header.Content>green team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Progress percent={greenPercent} color="green" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon
                        name={"user circle outline"}
                        color="blue"
                        size="mini"
                      />
                      <Header.Content>blue team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Progress percent={bluePercent} color="blue" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width="4">{this.renderColorViz()}</Grid.Column>
        </Grid>
      </div>
    );
  };

  render() {
    return (
      <Container className="App">
        <Divider hidden />
        {this.renderWalkthrough()}
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        {this.renderRosterSum()}
        <Divider horizontal>Select your Team Players</Divider>
        {this.renderRosterTable()}
      </Container>
    );
  }
}

export default App;
