import { observable, action, computed } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../layout/models/activity";
import agent from "../api/agent";
class ActivityStore {
  @observable activitesRegister = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitesByDate() {
    return Array.from(this.activitesRegister.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if(activity)
      this.activity = activity;
    else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activites.details(id);
        this.loadingInitial = false;
        this.activity = activity;
      } catch(error) {
        this.loadingInitial = false;
        console.log(error);
      } 
    }
  }
  @action clearActivity = () => {
    this.activity = null;
  }
  getActivity = (id: string) => {
    let activity = this.activitesRegister.get(id);
    return activity;
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
      this.submitting = false;
    } catch (err) {
      this.submitting = false;
      console.log(err);
    }
  };
  @action selectActivity = (id: string) => {
    //this.selectedActivity = this.activities.find(a => a.id === id);
    this.activity = this.activitesRegister.get(id);
  };
  @action openCreateForm = () => {
    this.activity = null;
  };
  @action cancelFormOpen = () => {
  };
  @action openEditForm = (id: string) => {
    this.activity = this.activitesRegister.get(id);
  };
  @action cancelSelectedForm = () => {
    this.activity = null;
  };
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      const activ = await agent.Activites.update(activity);
      this.activitesRegister.set(activity.id, activity);
      this.selectActivity(activ.id);
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
      this.activity = null;
      
    } catch (err) {
      this.submitting = false;
      this.target = "";
      console.log(err);
    }
  };
}
export default createContext(new ActivityStore());
