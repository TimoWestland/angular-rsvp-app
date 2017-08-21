class EventModel {
  constructor(
    public title: string,
    public location: string,
    public startDatetime: Date,
    public endDatetime: Date,
    public viewPublic: boolean,
    public description?: string,
    public _id?: string) { }
}

class FormEventModel {
  constructor(
    public title: string,
    public location: string,
    public startDate: string,
    public startTime: string,
    public endDate: string,
    public endTime: string,
    public viewPublic: boolean,
    public description?: string
  ) { }
}

export {
  EventModel,
  FormEventModel
};
