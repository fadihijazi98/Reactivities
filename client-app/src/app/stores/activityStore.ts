import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../layout/models/activity";
import agent from "../api/agent";
import { array } from "prop-types";
class ActivityStore {
  @observable activitesRegister = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitesByDate() {
    return Array.from(this.activitesRegister.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      this.loadingInitial = true;
      const activities = await agent.Activites.list();
      activities.forEach(activity => {
        activity.date = activity.date.split(".")[0];
        //this.activities.push(activity);
        this.activitesRegister.set(activity.id, activity);
      });
      this.loadingInitial = false;
    } catch (err) {
      console.log(err);
      this.loadingInitial = false;
    }
  };
  @action createActivity = async (activity: IActivity) => {
    try {
      this.submitting = true;
      await agent.Activites.create(activity);
      //this.activities.push(activity);
      this.activitesRegister.set(activity.id, activity);
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };
  @action selectActivity = (id: string) => {
    //this.selectedActivity = this.activities.find(a => a.id === id);
    this.selectedActivity = this.activitesRegister.get(id);
    this.editMode = false;
  };
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };
  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activitesRegister.get(id);
    this.editMode = true;
  };
  @action cancelSelectedForm = () => {
    this.selectedActivity = undefined;
  };
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      const activ = await agent.Activites.update(activity);
      this.activitesRegister.set(activity.id, activity);
      this.selectedActivity = activity;
      this.editMode = false;
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };
  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activites.delete(id);
      this.activitesRegister.delete(id);
      this.submitting = false;
      this.target = "";
      this.selectedActivity = undefined;
      
    } catch (err) {
      this.submitting = false;
      this.target = "";
      console.log(err);
    }
  };
}
export default createContext(new ActivityStore());
