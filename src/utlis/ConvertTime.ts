import moment from "moment";

export default function ConvertTime(input_date: string) {
  return moment(input_date).format("llll");
}
