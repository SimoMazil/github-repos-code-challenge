import React from 'react';
import { Item } from 'semantic-ui-react'

import { datesDiffInDays } from '../../utils/getDates'

const Repo = ({details}) => {
  const { name, description, stargazers_count, watchers_count, created_at } = details
  const { avatar_url, login } = details.owner
  
  return (
    <Item>
      <Item.Image size='tiny' src={avatar_url} />

      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Meta>{description}</Item.Meta>
        <Item.Extra>
          <span>Stars: {stargazers_count}</span>
          <span>Issues: {watchers_count}</span>
          <span>submitted {datesDiffInDays(created_at, new Date())} days ago by {login}</span>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
 
export default Repo;