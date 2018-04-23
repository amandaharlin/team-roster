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
  Table
} from "semantic-ui-react";
import { linearScale } from "simple-linear-scale";

import { mockTeamPlayers } from "./mockTeamPlayers";

this.state = { mockTeamPlayers };

class Pez extends Component {
  render() {
    const isActive = false;
    //Selected In Model?

    function iExistInTeamList(person, team) {
      return;
    }

    return (
      <Button //pez
        key={this.props.color}
        icon
        color={this.props.color}
        size="big"
        basic={!isActive}
        checked={isActive}
        onClick={(event, data) => {
          const { checked } = data;

          const newTeamList = iExistInTeamList
            ? console.log(`they're on this team, take em out`)
            : console.log(`add them to this team`);
          //this.setState({oldTeam: newTeam});
        }}
      />
    );
  }
}

class ColorViz extends Component {
  render() {
    // const { redTeam, greenTeam, blueTeam, allTeam, allTeamsColors } = this.props;
    // var linearScaleToColor = linearScale([0, allTeam.length], [0, 255], true);
    // let redTeamColor = linearScaleToColor(redTeam.length);
    // let greenTeamColor = linearScaleToColor(greenTeam.length);
    // let blueTeamColor = linearScaleToColor(blueTeam.length);

    var colorVizStyle = {
      width: "200px",
      height: "200px",
      backgroundColor: `rgba(34, 128, 50,1)`
      //backgroundColor: `rgba(${redTeamColor}, ${greenTeamColor}, ${blueTeamColor}, 1)`
    };

    return (
      <div>
        Make the Color Component here
        <div style={colorVizStyle} />
      </div>
    );
  }
}

class App extends Component {
  state = {
    redTeam: [],
    redTeamPercent: 0,
    greenTeam: [
      ...mockTeamPlayers.slice(0, 5),
      ...mockTeamPlayers.slice(10, 15)
    ],
    greenTeamPercent: 90,
    blueTeam: [...mockTeamPlayers.slice(7, 12)],
    blueTeamPercent: 20,
    allTeamsColor: "rgba(34,128,50,1)",
    allTeam: mockTeamPlayers
  };

  renderRosterTable = () => {
    const employeeToRow = this.state.allTeam.map((employee, i) => {
      return (
        <Table.Row textAlign="center" key={employee.username}>
          <Table.Cell collapsing>
            <Pez color="red" />
          </Table.Cell>
          <Table.Cell collapsing>
            <Pez color="green" />
          </Table.Cell>
          <Table.Cell collapsing>
            <Pez color="blue" />
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

  renderRosterSum = () => {
    return (
      <div>
        <Grid columns={2} padded>
          <Grid.Column>
            <Header>Team Roster</Header>
            <Table basic="very" celled collapsing>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Teams</Table.HeaderCell>
                  <Table.HeaderCell>Points</Table.HeaderCell>
                  <Table.HeaderCell>Progress Bar</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon name={"user circle outline"} size="mini" />
                      <Header.Content>red team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell> 32</Table.Cell>
                  <Table.Cell>
                    <Progress percent={32} color="red" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon name={"user circle outline"} size="mini" />
                      <Header.Content>green team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell> 59</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <Progress percent={59} color="green" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon name={"user circle outline"} size="mini" />
                      <Header.Content>blue team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell> 5</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <Progress percent={5} color="blue" />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>

          <Grid.Column>
            <ColorViz />
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  render() {
    return (
      <Container className="App">
        <Divider hidden />
        {this.renderRosterSum()}

        <Divider />

        {this.renderRosterTable()}
      </Container>
    );
  }
}

export default App;
