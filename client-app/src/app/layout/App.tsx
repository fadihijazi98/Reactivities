import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { List, Container } from "semantic-ui-react";
import { IActivity } from "./models/activity";
import { NavBar } from "../../features/nav/NavBar";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivitiyDashboard";
import { v4 as uuid } from 'uuid'
const App = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActvity] = useState<IActivity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const handelOpenCreateForm = () => {
    setSelectedActvity(null);
    setEditMode(true);
  }
  const handelSelectedActitivty = (id: String) => {
    setSelectedActvity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };
  const handelCreateActivity = (activity: IActivity) => {
    setActivities([...activities, activity]);
    setSelectedActvity(activity);
    setEditMode(false);
  }
  const handelEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActvity(activity);
    setEditMode(false);
  }
  const handelDeleteActivity = (id: string) => {
    setActivities([...activities.filter(a => a.id !== id)]);
    setSelectedActvity(null);
    setEditMode(false);
  }
  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5000/api/activities")
      .then(response => {
        let activiteis: IActivity[] = [];
        response.data.forEach(activity => {
          activity.date =  activity.date.split(".")[0];
          activiteis.push(activity);
        });
        setActivities(response.data);
      });
  }, []);
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
