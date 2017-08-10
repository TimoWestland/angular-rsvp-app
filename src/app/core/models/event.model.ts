export class EventModel {
  constructor(
    public title: string,
    public location: string,
    public startDatetime: Date,
    public endDatetime: Date,
    public viewPublic: boolean,
    public description?: string,
    public _id?: string
  ) { }
}
