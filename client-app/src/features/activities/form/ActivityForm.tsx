import React, { useState, FormEvent } from "react";
import {
  Form,
  Button,
  Segment,
} from "semantic-ui-react";
import { IActivity } from "../../../app/layout/models/activity";
import { v4 as uuid } from "uuid";
interface IProps {
  setEditMode: (editMode: boolean) => void;
  activity: IActivity;
  createActivity: (activity: IActivity) => void;
  editActivity: (activity: IActivity) => void;
}
export const ActivityForm: React.FC<IProps> = ({
  setEditMode,
  activity: initialFormState,
  createActivity,
  editActivity
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
      };
    }
  };
  const [activity, setActivity] = useState<IActivity>(initializeForm);
  const handelInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  const handelSubmit = () => {
      if(activity.id.length === 0) {
        let newActivity = {
          ...activity,
          id: uuid()
        }
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
  }
  return (
    <Segment clearing>
      <Form onSubmit={handelSubmit}>
        <Form.Input
          onChange={handelInputChange}
          name="title"
          placeholder="Title"
          value={activity.title}
        />
        <Form.TextArea
          onChange={handelInputChange}
          name="description"
          rows={3}
          placeholder="Description"
          value={activity.description}
        />
        <Form.Input
          onChange={handelInputChange}
          name="category"
          placeholder="Category"
          value={activity.category}
        />
        <Form.Input
          onChange={handelInputChange}
          name="date"
          type="datetime-local"
          placeholder="Date"
          value={activity.date}
        />
        <Form.Input
          onChange={handelInputChange}
          name="city"
          placeholder="City"
          value={activity.city}
        />
        <Form.Input
          onChange={handelInputChange}
          name="venue"
          placeholder="Venue"
          value={activity.venue}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};
