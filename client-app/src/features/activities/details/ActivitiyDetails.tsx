import React, { useContext, useEffect } from "react";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import { ActivityDetailsChat } from "./ActivityDetailsChat";
import { ActivityDetailsSideBar } from "./ActivityDetailsSideBar";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
interface DetailsProps {
  id: string;
}
const ActivitiyDetails: React.FC<RouteComponentProps<DetailsProps>> = ({
  match
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    loadActivity,
    loadingInitial
  } = activityStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);
  if (loadingInitial || !activity) {
    console.log(activity);
    return <LoadingComponent content="loading ..." />;
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity} />
        <ActivityDetailsInfo activity={activity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSideBar />
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivitiyDetails);









{/*
import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";
interface DetailsProps {
  id: string;
}
const ActivitiyDetails: React.FC<RouteComponentProps<DetailsProps>> = ({
  match,
  history
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    activity,
    loadActivity,
    loadingInitial
  } = activityStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity]);
  if (loadingInitial || !activity) {
    console.log(activity);
    return <LoadingComponent content="loading ..." />;
  }
  return (
    
    <Card fluid>
      <Image
        src={"/assets/categoryImages/" + activity!.category + ".jpg"}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity!.title}</Card.Header>
        <Card.Meta>
          <span>{activity!.date}</span>
        </Card.Meta>
        <Card.Description>{activity!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            // onClick={() => openEditForm(activity!.id)}
            as={Link} to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => {history.push("/activities")}}
            // onClick={cancelSelectedForm}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};
export default observer(ActivitiyDetails);
*/}