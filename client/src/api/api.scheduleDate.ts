import { API_ROOT } from "./api";
import { ScheduleDate, UpdatescheduleDate } from "../types/scheduleDate";
import { ResponseErrorType } from "./api";

export async function updateScheduleDate(
  id: number,
  data: UpdatescheduleDate,
  accessToken: string
): Promise<ScheduleDate | ResponseErrorType> {
  const response = await fetch(`${API_ROOT}/api/classes/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // todo: change this
  if (response.ok) {
    return response.json();
  } else {
    return response.json();
  }
}