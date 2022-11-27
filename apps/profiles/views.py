from django.shortcuts import render
from profiles.serializers import UserSerializer
from django.contrib.auth.models import User
from core.views import BaseViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, filters


class ProfileViewSet(BaseViewSet):
    queryset = User.objects.all()
    lookup_field = 'username'
    serializer_class = UserSerializer
    search_fields = ['first_name', 'last_name', 'username']
    ordering = ['first_name','last_name']

    @action(detail=False)
    def auth(self, request):
        if request.user.is_authenticated:
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def deactivate(self, request, username=None):
        user = self.get_object()
        if user == request.user:
            user.is_active = False
            user.save()
        return Response({"message": "Account Deactivated"}, status=status.HTTP_200_OK)

    def destroy(self, request, username=None):
        user = self.get_object()
        if user == request.user:
            user.is_requesting_delete = True
            user.save()
            return Response(
                {'success': True,
                'message': "You request for account deletion has been sent. Your account will be deleted in 15 days"}, status=status.HTTP_200_OK
            )
        return Response(
            {'success': False, 'message': "You are not authorized to delete this account."},
            status=status.HTTP_401_UNAUTHORIZED
        )


class IsAuthenticatedView(APIView):
    def get(self, request):
        if request.user and request.user.is_authenticated:
            fb = {'provider': u'facebook'}
            if request.user.socialaccount_set.count() != 0\
                    and fb in request.user.socialaccount_set\
                    .values('provider'):
                return Response(
                    data={'authenticated': True}, status=status.HTTP_200_OK)
            if not request.user.emailaddress_set\
                    .filter(verified=True).exists():
                return Response(
                    data={'authenticated': False},
                    status=status.HTTP_401_UNAUTHORIZED)
            return Response(
                data={'authenticated': True}, status=status.HTTP_200_OK)
        else:
            return Response(
                data={'authenticated': False},
                status=status.HTTP_401_UNAUTHORIZED)
