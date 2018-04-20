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

class Pez extends Component {
  render() {
    const isActive = true;
    return (
      <Button
        color="red"
        basic={!isActive}
        checked={isActive}
        onClick={(event, data) => {
          const { checked } = data;
          console.log("d.checked", checked);
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
    return (
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
        <Table.Body>
          <Table.Row textAlign="center">
            <Table.Cell collapsing>
              <Checkbox checked={true} />
            </Table.Cell>
            <Table.Cell collapsing>
              <Checkbox checked={false} />
            </Table.Cell>
            <Table.Cell collapsing>
              <Checkbox checked={false} />
            </Table.Cell>
            <Table.Cell>Yolanda </Table.Cell>
            <Table.Cell>Sales</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  render() {
    mockTeamPlayers.forEach(function(player) {
      console.log(
        player.name.first,
        player.name.last,
        " ~ ",
        player.department
      );
    });
    return (
      <Container className="App">
        <Header>Team Roster</Header>
        <List>
          <List.Item>Red</List.Item>
          <List.Item>Green</List.Item>
          <List.Item>Blue</List.Item>
        </List>
        <div>Roster Icon Color Component</div>
        <Divider hidden />
        <Header>Roster List</Header>
        {this.renderRosterTable()}
        <Pez />
      </Container>
    );
  }
}

export default App;
