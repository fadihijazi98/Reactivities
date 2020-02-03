import React from "react";
import { Grid } from "semantic-ui-react";
import ActivitiyList from "./ActivitiyList";
import { observer } from "mobx-react-lite";

const ActivitiyDashboard: React.FC = () => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiyList />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Activitiy filters</h2>
        {/* {selectedActivity && !editMode && (
          <ActivitiyDetails />
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity && selectedActivity.id || 0}
            activity={selectedActivity!}
          />
        )} */}
      </Grid.Column>  
    </Grid>
  );
};
export default observer(ActivitiyDashboard);
