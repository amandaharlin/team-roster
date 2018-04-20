import "semantic-ui-css/semantic.min.css";

import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Dropdown,
  Form,
  Header,
  Icon,
  List,
  Table
} from "semantic-ui-react";

import { mockTeamPlayers } from "./mockTeamPlayers";

this.state = { mockTeamPlayers };
class Pez extends Component {
  render() {
    const isActive = true;
    return (
      <Button
        key={this.props.color}
        icon
        color={this.props.color}
        size="big"
        basic={!isActive}
        checked={isActive}
        onClick={(event, data) => {
          const { checked } = data;
          console.log("d.checked", checked, "color", this.props.color);
        }}
      />
    );
  }
}

class App extends Component {
  state = {
    redTeamRoster: "",
    greenTeamRoster: "",
    blueTeamRoster: "",
    winningTeamColor: "",
    mockTeam: []
  };

  renderRosterTable = () => {
    const employeeToRow = mockTeamPlayers.map((employee, i) => {
      return (
        <Table.Row textAlign="center">
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
                  <Icon name={"winner"} size="mini" />
                  <Header.Content>
                    Red Team<Header.Subheader>Human Resources</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>22</Table.Cell>
              <Table.Cell>22</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Icon name={"user circle outline"} size="mini" />
                  <Header.Content>
                    Green Team
                    <Header.Subheader>Fabric Design</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>15</Table.Cell> <Table.Cell>22</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as="h4" image>
                  <Icon name={"user circle outline"} size="mini" />
                  <Header.Content>
                    Blue Team
                    <Header.Subheader>Accounting</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>13</Table.Cell>
              <Table.Cell>22</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <div>Make the RosterColorComponent here</div>
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
