import React from 'react';
import { Item } from 'semantic-ui-react'

const Repo = () => {
  return (
    <Item>
      <Item.Image size='tiny' src='https://identicons.github.com/jasonlong.png' />

      <Item.Content>
        <Item.Header>Repo Title</Item.Header>
        <Item.Meta>Repo Description</Item.Meta>
        <Item.Extra>
          <span>Stars: 000</span>
          <span>Issues: 000</span>
          <span>submitted 30 days ago by Owner</span>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
 
export default Repo;