from google.cloud import run_v2

def handle_webhook(request):
    print("Handling webhook...")
    webhook_event = request.headers.get("X-GitHub-Event")
    print("Received webhook_event:", webhook_event)
    action = request.json.get('action')
    print("Received action:", action)

    # Handle the webhook event based on its type and action
    if webhook_event == "workflow_job" and action == "queued":
        labels = request.json.get("workflow_job", {}).get('labels', [])
        print("Received labels:", labels)

        # code for executing cloud run JOB based on label as job name.

        # build job name based on label value.
        # labels => ["quicksilver-2cpu-4gb"]  ->   labels[0] => "quicksilver-2cpu-4gb"
        # job_name => projects/project-name/locations/loc-name/jobs/quicksilver-2cpu-4gb"

        job_name = f"projects/zpl-dev-self-hosted-runners/locations/us-central1/jobs/{labels[0]}"
        print("job_name:", job_name)
        run_job(job_name)


def run_job(job_name):
    client = run_v2.JobsClient()
    request = run_v2.RunJobRequest(
        name=job_name,
    )
    operation = client.run_job(request=request)
    print("Waiting for operation to complete...")
    response = operation.result()
    print("operation result", response)