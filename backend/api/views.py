from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MachineSettings, ProductCount
from .serializers import MachineSettingsSerializer, ProductCountSerializer

class MachineSettingsViewSet(viewsets.ModelViewSet):
    queryset = MachineSettings.objects.all()
    serializer_class = MachineSettingsSerializer

    def get_object(self):
        # Always return the latest settings or create one if none exists
        settings, created = MachineSettings.objects.get_or_create(
            id=1,
            defaults={
                'speed': 15.0,
                'acceleration': 150,
                'deceleration': 150,
                'single_step': 7.0,
                'last_step': 106.0,
                'coil_number': 4
            }
        )
        return settings

    @action(detail=False, methods=['post'])
    def update_coil_number(self, request):
        settings = self.get_object()
        action_type = request.data.get('action')
        
        if action_type == 'increment':
            settings.coil_number += 1
        elif action_type == 'decrement':
            settings.coil_number = max(0, settings.coil_number - 1)
        
        settings.save()
        serializer = self.get_serializer(settings)
        return Response(serializer.data)

class ProductCountViewSet(viewsets.ModelViewSet):
    queryset = ProductCount.objects.all()
    serializer_class = ProductCountSerializer

    def get_object(self):
        # Always return the latest count or create one if none exists
        count, created = ProductCount.objects.get_or_create(
            id=1,
            defaults={'pieces': 7784, 'user_count': 1356}
        )
        return count

    @action(detail=False, methods=['post'])
    def reset_pieces(self, request):
        count = self.get_object()
        count.pieces = 0
        count.save()
        serializer = self.get_serializer(count)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def reset_user_count(self, request):
        count = self.get_object()
        count.user_count = 0
        count.save()
        serializer = self.get_serializer(count)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def reset_all(self, request):
        count = self.get_object()
        count.pieces = 0
        count.user_count = 0
        count.save()
        serializer = self.get_serializer(count)
        return Response(serializer.data)