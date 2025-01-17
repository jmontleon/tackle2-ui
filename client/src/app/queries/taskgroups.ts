import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTaskgroup,
  deleteTaskgroup,
  removeFileTaskgroup,
  submitTaskgroup,
  uploadFileTaskgroup,
} from "@app/api/rest";
import { Taskgroup } from "@app/api/models";
import { AxiosError } from "axios";
import { TasksQueryKey } from "./tasks";

export const useCreateTaskgroupMutation = (
  onSuccess: (res: any) => void,
  onError: (err: Error | unknown) => void
) =>
  useMutation(createTaskgroup, {
    onSuccess,
    onError,
  });

export const useSubmitTaskgroupMutation = (
  onSuccess: (data: Taskgroup) => void,
  onError: (err: Error | unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(submitTaskgroup, {
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries([TasksQueryKey]);
    },
    onError: (err) => {
      onError(err);
      queryClient.invalidateQueries([TasksQueryKey]);
    },
  });
};

export const useRemoveUploadedFileMutation = (
  successCallback?: (res: any) => void,
  errorCallback?: (err: AxiosError) => void
) => {
  return useMutation(removeFileTaskgroup, {
    onSuccess: (res) => {
      successCallback && successCallback(res);
    },
    onError: (err: AxiosError) => {
      errorCallback && errorCallback(err);
    },
  });
};
export const useUploadFileTaskgroupMutation = (
  successCallback?: (res: any) => void,
  errorCallback?: (err: AxiosError) => void
) => {
  return useMutation(uploadFileTaskgroup, {
    mutationKey: ["upload"],
    onSuccess: (res) => {
      successCallback && successCallback(res);
    },
    onError: (err: AxiosError) => {
      errorCallback && errorCallback(err);
    },
  });
};

export const useDeleteTaskgroupMutation = (
  onSuccess: () => void,
  onError: (err: Error | unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation(deleteTaskgroup, {
    onSuccess,
    onError: (err) => {
      onError(err);
      queryClient.invalidateQueries([TasksQueryKey]);
    },
  });
};

export const useUploadFileMutation = (
  successCallback: (res: any) => void,
  errorCallback: (err: Error | null) => void
) => {
  return useMutation(uploadFileTaskgroup, {
    onSuccess: (res) => {
      successCallback && successCallback(res);
    },
    onError: (err: Error) => {
      errorCallback && errorCallback(err);
    },
  });
};
