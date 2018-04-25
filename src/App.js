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

this.state = {
  mockTeamPlayers
};

class Pez extends Component {
  render() {
    const { isActive, color, person } = this.props;

    return (
      <Button
        key={Math.random()} //fix this
        icon
        color={color}
        size="big"
        basic={!isActive}
        checked={isActive}
        onClick={(event, data) => {
          const { checked } = data;
          const clickedOnTeam = `${color}Team`; //remember empty values
          const newData = isActive
            ? console.log(`remove from`, color, person)
            : this.setState({ ...clickedOnTeam, person });
          console.log(`add to`, color, person);

          this.setState({ clickedOnTeam: newData });
        }}
      />
    );
  }
}

class ColorViz extends Component {
  render() {
    const {
      redTeam,
      greenTeam,
      blueTeam,
      allTeam,
      allTeamsColors
    } = this.props;

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
        Make the Color Component here <div style={colorVizStyle} />
      </div>
    );
  }
}

//0-totalTeamLength to 0-100, and the color component 0-255.
//run scale fun each time
//componentWillUpdate could be used

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

  iExistInList = (listItem, list) => {
    return (
      list.filter((li, i) => {
        if (li.ssn === listItem.ssn) {
          return true;
        }
      }).length > 0
    );
  };

  renderRosterTable = () => {
    const { redTeam, greenTeam, blueTeam } = this.state;
    const employeeToRow = this.state.allTeam.map((employee, i) => {
      console.log("employee", employee, "i", i);
      console.log("blueTeam", blueTeam);
      return (
        <Table.Row textAlign="center" key={employee.username}>
          <Table.Cell collapsing>
            <Pez
              color="red"
              person={employee}
              isActive={this.iExistInList(employee, redTeam)}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Pez
              color="green"
              person={employee}
              isActive={this.iExistInList(employee, greenTeam)}
            />
          </Table.Cell>
          <Table.Cell collapsing>
            <Pez
              color="blue"
              person={employee}
              isActive={this.iExistInList(employee, blueTeam)}
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
    const { redTeamPercent, greenTeamPercent, blueTeamPercent } = this.state;
    return (
      <div>
        <Grid columns={2} padded>
          <Grid.Column>
            <Header>Team Roster </Header>
            <Table basic="very" celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Teams</Table.HeaderCell>
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
                  <Table.Cell>
                    <Progress percent={redTeamPercent} color="red" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon name={"user circle outline"} size="mini" />
                      <Header.Content>green team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Progress percent={greenTeamPercent} color="green" />
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Icon name={"user circle outline"} size="mini" />
                      <Header.Content>blue team</Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Progress percent={blueTeamPercent} color="blue" />
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
