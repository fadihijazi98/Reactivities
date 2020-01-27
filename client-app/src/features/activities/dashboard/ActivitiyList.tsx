import React, { SyntheticEvent } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  deleteActivity: (event: SyntheticEvent<HTMLButtonElement>, id: string) => void;
  submitting: boolean;
  target: string;
}

const ActivitiyList: React.FC<IProps> = props => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {props.activities.map(activity => (
          <Item key={activity.id}>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            />
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => props.selectActivity(activity.id)}
                  floated="right"
                  content="view"
                  color="blue"
                />
                <Button
                  name={activity.id}
                  loading={props.target === activity.id && props.submitting}
                  onClick={(e) => props.deleteActivity(e, activity.id)}
                  floated="right"
                  content="delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
export default ActivitiyList;
