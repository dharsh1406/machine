from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MachineSettingsViewSet, ProductCountViewSet

router = DefaultRouter()
router.register(r'settings', MachineSettingsViewSet)
router.register(r'product-count', ProductCountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]