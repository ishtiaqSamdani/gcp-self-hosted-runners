import functions_framework
from flask import abort, jsonify
from http.client import HTTPException
from validate_webhook import validate_webhook
from handle_webhook import handle_webhook

@functions_framework.http
def main(request):
    if request.method == "POST":
        try:
            validate_webhook(request)
            handle_webhook(request)
            return jsonify({"message": "Webhook received and verified successfully."}), 200
        except HTTPException as e:
            print("HTTPException caught.", str(e))
            return jsonify({"error": str(e)}), 403
    else:
        return jsonify({"message": "Method not allowed."}), 405