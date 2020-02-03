import React, { useEffect, useContext, Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivitiyDashboard";
import LoadingComponent from "./LoadingComponent";
import ActivityStore from "../stores/activityStore";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { HomePage } from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivitiyDetails from "../../features/activities/details/ActivitiyDetails";
const App: React.FC<RouteComponentProps> = ({ location }) => {
  const activityStore = useContext(ActivityStore);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);
  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Component ... " />;
  return (
    <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path={"/(.+)"}
          render={() => (
            <Fragment>
              <Container style={{ marginTop: "7em" }}>
                <NavBar />
                <Route
                  exact
                  path="/activities"
                  component={ActivitiyDashboard}
                />
                <Route path="/activities/:id" component={ActivitiyDetails} />
                <Route
                  key={location.key}
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                />
              </Container>
            </Fragment>
          )}
        />
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
export default withRouter(observer(App));
