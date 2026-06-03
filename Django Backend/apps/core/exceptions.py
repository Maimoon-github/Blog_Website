# apps/core/exceptions.py
from rest_framework.views import exception_handler
from rest_framework import status

def global_core_exception_handler(exc, context):
    """
    Custom global error handler wrapping default DRF errors into an
    explicit, scannable format.
    """
    response = exception_handler(exc, context)

    if response is not None:
        custom_data = {
            "success": False,
            "error": {
                "status_code": response.status_code,
                "type": exc.__class__.__name__,
                "details": response.data
            }
        }
        response.data = custom_data

    return response