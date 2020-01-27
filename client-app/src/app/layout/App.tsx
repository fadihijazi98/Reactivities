import React, { useState, useEffect, Fragment, SyntheticEvent } from "react";
import { List, Container } from "semantic-ui-react";
import { IActivity } from "./models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivitiyDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActvity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
  const handelOpenCreateForm = () => {
    setSelectedActvity(null);
    setEditMode(true);
  }
  const handelSelectedActitivty = (id: String) => {
    setSelectedActvity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };
  const handelCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activites.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActvity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }
  const handelEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activites.update(activity).then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActvity(activity);
      setEditMode(false);
    }).then(() => setSubmitting(false));
  }
  const handelDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);
    agent.Activites.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
      setSelectedActvity(null);
      setEditMode(false);
    }).then(() => setSubmitting(false));;
  }
  useEffect(() => {
      agent.Activites.list()
      .then(response => {
        let activiteis: IActivity[] = [];
        response.forEach((activity) => {
          activity.date =  activity.date.split(".")[0];
          activiteis.push(activity);
        });
        setActivities(response);
      }).then(() => setLoading(false));
  }, []);
  if(loading)
    return <LoadingComponent content="Loading Component ... " />
  return (
    <Fragment>
      <NavBar openCreateForm={handelOpenCreateForm} />
      <List>
        <Container style={{ marginTop: "7em" }}>
          <ActivitiyDashboard
            activities={activities}
            selectActivity={handelSelectedActitivty}
            selectedActivity={selectedActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            setSelectedActivity={setSelectedActvity}
            createActivity = {handelCreateActivity}
            editActivity = {handelEditActivity}
            deleteActivity={handelDeleteActivity}
            submitting={submitting}
            target={target}
          />
        </Container>
      </List>
    </Fragment>
  );
};
/*
    componentDidMount() {
      axios.get<IActivity[]>("http://localhost:5000/api/values").then((response) => {
        console.log("here answer:  "+response);
        this.setState({
          activities: response.data
        })
      })
  
      // this.setState({
      //   values: [{id: 1, name: "value 01"}, {id: 2, name: "value 02"}]
      // })
    }
  */
export default App;
