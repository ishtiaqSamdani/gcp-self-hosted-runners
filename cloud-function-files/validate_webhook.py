import hashlib
import hmac
import os
from http.client import HTTPException

def validate_webhook(request):
    WEBHOOK_SECRET = os.environ.get('WEBHOOK_SECRET')

    if WEBHOOK_SECRET is None:
        raise HTTPException("WEBHOOK_SECRET environment variable is not set.")

    print("Validating webhook...")
    payload_body = request.get_data()
    signature_header = request.headers.get("x-hub-signature-256")

    # Verify the signature
    verify_signature(payload_body, WEBHOOK_SECRET, signature_header)


def verify_signature(payload_body, secret_token, signature_header):
    # Verify that the payload was sent from GitHub by validating SHA256.
    if not signature_header:
        raise HTTPException("x-hub-signature-256 header is missing!")
    hash_object = hmac.new(secret_token.encode('utf-8'), msg=payload_body, digestmod=hashlib.sha256)
    expected_signature = "sha256=" + hash_object.hexdigest()

    if not hmac.compare_digest(expected_signature, signature_header):
        raise HTTPException("Request signatures didn't match!")