import React, { useEffect, useContext, Fragment } from "react";
import { List, Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivitiyDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
const App = () => {
  const activityStore = useContext(ActivityStore)
   
  useEffect(() => {
      activityStore.loadActivities()
  }, [activityStore]);
  if(activityStore.loadingInitial)
    return <LoadingComponent content="Loading Component ... " />
  return (
    <Fragment>
      <NavBar/>
      <List>
        <Container style={{ marginTop: "7em" }}>
          <ActivitiyDashboard />
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
export default observer(App);
