from django.urls import path, include
from rest_framework import routers
from .views import CreateDestroyUpdateGetInstructorViewSet

router = routers.SimpleRouter()
router.register(r'instructor', CreateDestroyUpdateGetInstructorViewSet, basename='instructor')

urlpatterns = [
    path('v1/', include(router.urls)),
]
