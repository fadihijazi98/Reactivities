import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import ActivitiyList from "./ActivitiyList";
import ActivitiyDetails from "../details/ActivitiyDetails";
import ActivityForm  from "../form/ActivityForm";
import { observer } from "mobx-react-lite";
import AcitivityStore from "../../../app/stores/activityStore";

const ActivitiyDashboard: React.FC = () => {
  const activityStore = useContext(AcitivityStore);
  const {editMode, selectedActivity}= activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivitiyList />
      </Grid.Column>

      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivitiyDetails />
        )}
        {editMode && (
          <ActivityForm
            key={selectedActivity && selectedActivity.id || 0}
            activity={selectedActivity!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default observer(ActivitiyDashboard);
