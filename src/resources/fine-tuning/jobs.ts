// File generated from our OpenAPI spec by Stainless.

import * as Core from 'openai/core';
import { APIResource } from 'openai/resource';
import { isRequestOptions } from 'openai/core';
import * as JobsAPI from 'openai/resources/fine-tuning/jobs';
import { CursorPage, type CursorPageParams } from 'openai/pagination';

export class Jobs extends APIResource {
  /**
   * Creates a job that fine-tunes a specified model from a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  create(body: JobCreateParams, options?: Core.RequestOptions): Core.APIPromise<FineTuningJob> {
    return this.post('/fine_tuning/jobs', { body, ...options });
  }

  /**
   * Get info about a fine-tuning job.
   *
   * [Learn more about fine-tuning](https://platform.openai.com/docs/guides/fine-tuning)
   */
  retrieve(fineTuningJobId: string, options?: Core.RequestOptions): Core.APIPromise<FineTuningJob> {
    return this.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
  }

  /**
   * List your organization's fine-tuning jobs
   */
  list(
    query?: JobListParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FineTuningJobsPage, FineTuningJob>;
  list(options?: Core.RequestOptions): Core.PagePromise<FineTuningJobsPage, FineTuningJob>;
  list(
    query: JobListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FineTuningJobsPage, FineTuningJob> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/fine_tuning/jobs', FineTuningJobsPage, { query, ...options });
  }

  /**
   * Immediately cancel a fine-tune job.
   */
  cancel(fineTuningJobId: string, options?: Core.RequestOptions): Core.APIPromise<FineTuningJob> {
    return this.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
  }

  /**
   * Get status updates for a fine-tuning job.
   */
  listEvents(
    fineTuningJobId: string,
    query?: JobListEventsParams,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FineTuningJobEventsPage, FineTuningJobEvent>;
  listEvents(
    fineTuningJobId: string,
    options?: Core.RequestOptions,
  ): Core.PagePromise<FineTuningJobEventsPage, FineTuningJobEvent>;
  listEvents(
    fineTuningJobId: string,
    query: JobListEventsParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.PagePromise<FineTuningJobEventsPage, FineTuningJobEvent> {
    if (isRequestOptions(query)) {
      return this.listEvents(fineTuningJobId, {}, query);
    }
    return this.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, {
      query,
      ...options,
    });
  }
}

export class FineTuningJobsPage extends CursorPage<FineTuningJob> {}

export class FineTuningJobEventsPage extends CursorPage<FineTuningJobEvent> {}

/**
 * The `fine_tuning.job` object represents a fine-tuning job that has been created
 * through the API.
 */
export interface FineTuningJob {
  /**
   * The object identifier, which can be referenced in the API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the fine-tuning job was created.
   */
  created_at: number;

  /**
   * For fine-tuning jobs that have `failed`, this will contain more information on
   * the cause of the failure.
   */
  error: FineTuningJob.Error | null;

  /**
   * The name of the fine-tuned model that is being created. The value will be null
   * if the fine-tuning job is still running.
   */
  fine_tuned_model: string | null;

  /**
   * The Unix timestamp (in seconds) for when the fine-tuning job was finished. The
   * value will be null if the fine-tuning job is still running.
   */
  finished_at: number | null;

  /**
   * The hyperparameters used for the fine-tuning job. See the
   * [fine-tuning guide](https://platform.openai.com/docs/guides/fine-tuning) for
   * more details.
   */
  hyperparameters: FineTuningJob.Hyperparameters;

  /**
   * The base model that is being fine-tuned.
   */
  model: string;

  /**
   * The object type, which is always "fine_tuning.job".
   */
  object: string;

  /**
   * The organization that owns the fine-tuning job.
   */
  organization_id: string;

  /**
   * The compiled results file ID(s) for the fine-tuning job. You can retrieve the
   * results with the
   * [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).
   */
  result_files: Array<string>;

  /**
   * The current status of the fine-tuning job, which can be either
   * `validating_files`, `queued`, `running`, `succeeded`, `failed`, or `cancelled`.
   */
  status: string;

  /**
   * The total number of billable tokens processed by this fine-tuning job. The value
   * will be null if the fine-tuning job is still running.
   */
  trained_tokens: number | null;

  /**
   * The file ID used for training. You can retrieve the training data with the
   * [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).
   */
  training_file: string;

  /**
   * The file ID used for validation. You can retrieve the validation results with
   * the
   * [Files API](https://platform.openai.com/docs/api-reference/files/retrieve-contents).
   */
  validation_file: string | null;
}

export namespace FineTuningJob {
  /**
   * For fine-tuning jobs that have `failed`, this will contain more information on
   * the cause of the failure.
   */
  export interface Error {
    /**
     * A machine-readable error code.
     */
    code: string;

    /**
     * A human-readable error message.
     */
    message: string;

    /**
     * The parameter that was invalid, usually `training_file` or `validation_file`.
     * This field will be null if the failure was not parameter-specific.
     */
    param: string | null;
  }

  /**
   * The hyperparameters used for the fine-tuning job. See the
   * [fine-tuning guide](https://platform.openai.com/docs/guides/fine-tuning) for
   * more details.
   */
  export interface Hyperparameters {
    /**
     * The number of epochs to train the model for. An epoch refers to one full cycle
     * through the training dataset. "auto" decides the optimal number of epochs based
     * on the size of the dataset. If setting the number manually, we support any
     * number between 1 and 50 epochs.
     */
    n_epochs: 'auto' | number;
  }
}

/**
 * Fine-tuning job event object
 */
export interface FineTuningJobEvent {
  id: string;

  created_at: number;

  level: 'info' | 'warn' | 'error';

  message: string;

  object: string;
}

export interface JobCreateParams {
  /**
   * The name of the model to fine-tune. You can select one of the
   * [supported models](https://platform.openai.com/docs/guides/fine-tuning/what-models-can-be-fine-tuned).
   */
  model: (string & {}) | 'babbage-002' | 'davinci-002' | 'gpt-3.5-turbo';

  /**
   * The ID of an uploaded file that contains training data.
   *
   * See [upload file](https://platform.openai.com/docs/api-reference/files/upload)
   * for how to upload a file.
   *
   * Your dataset must be formatted as a JSONL file. Additionally, you must upload
   * your file with the purpose `fine-tune`.
   *
   * See the [fine-tuning guide](https://platform.openai.com/docs/guides/fine-tuning)
   * for more details.
   */
  training_file: string;

  /**
   * The hyperparameters used for the fine-tuning job.
   */
  hyperparameters?: JobCreateParams.Hyperparameters;

  /**
   * A string of up to 18 characters that will be added to your fine-tuned model
   * name.
   *
   * For example, a `suffix` of "custom-model-name" would produce a model name like
   * `ft:gpt-3.5-turbo:openai:custom-model-name:7p4lURel`.
   */
  suffix?: string | null;

  /**
   * The ID of an uploaded file that contains validation data.
   *
   * If you provide this file, the data is used to generate validation metrics
   * periodically during fine-tuning. These metrics can be viewed in the fine-tuning
   * results file. The same data should not be present in both train and validation
   * files.
   *
   * Your dataset must be formatted as a JSONL file. You must upload your file with
   * the purpose `fine-tune`.
   *
   * See the [fine-tuning guide](https://platform.openai.com/docs/guides/fine-tuning)
   * for more details.
   */
  validation_file?: string | null;
}

export namespace JobCreateParams {
  /**
   * The hyperparameters used for the fine-tuning job.
   */
  export interface Hyperparameters {
    /**
     * The number of epochs to train the model for. An epoch refers to one full cycle
     * through the training dataset.
     */
    n_epochs?: 'auto' | number;
  }
}

export interface JobListParams extends CursorPageParams {}

export interface JobListEventsParams extends CursorPageParams {}

export namespace Jobs {
  export import FineTuningJob = JobsAPI.FineTuningJob;
  export import FineTuningJobEvent = JobsAPI.FineTuningJobEvent;
  export import FineTuningJobsPage = JobsAPI.FineTuningJobsPage;
  export import FineTuningJobEventsPage = JobsAPI.FineTuningJobEventsPage;
  export import JobCreateParams = JobsAPI.JobCreateParams;
  export import JobListParams = JobsAPI.JobListParams;
  export import JobListEventsParams = JobsAPI.JobListEventsParams;
}
