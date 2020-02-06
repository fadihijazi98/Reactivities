import React, { SyntheticEvent, useContext, Fragment } from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import AcitivityStore from "../../../app/stores/activityStore";
import { Link } from "react-router-dom";
import ActivityListItem from "./ActivityListItem";
import { IActivity } from "../../../app/layout/models/activity";

const ActivitiyList: React.FC = () => {
  const activityStore = useContext(AcitivityStore);
  const { ActivityByDate } = activityStore;
  return (
    <Fragment>
      {ActivityByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Label size="large" color="blue">
            {group}
          </Label>
          <Item.Group divided>
            {activities.map(activity => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};
export default observer(ActivitiyList);
