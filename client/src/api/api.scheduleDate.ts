import { API_ROOT } from "./api";
import { ScheduleDate, UpdateScheduleDate, CreateScheduleDate } from "../types/scheduleDate";
import { ResponseErrorType } from "./api";

export async function createScheduleDate(
  profileId: number,
  scheduleDate: CreateScheduleDate,
  accessToken: string
): Promise<ScheduleDate | ResponseErrorType> {
  const response = await fetch(`${API_ROOT}/api/classes/${profileId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleDate),
  });

  // todo: change this
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

export async function updateScheduleDate(
  id: number,
  data: UpdateScheduleDate,
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

export async function deleteScheduleDate(
  id: number,
  accessToken: string
): Promise<{id: number, method: string} | ResponseErrorType> {
  const response = await fetch(`${API_ROOT}/api/classes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // todo: change this
  if (response.ok) {
    return response.json();
  } else {
    return response.json();
  }
}