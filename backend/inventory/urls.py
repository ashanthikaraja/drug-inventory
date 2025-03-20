from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DrugViewSet, SupplierViewSet, OrderViewSet, UserLoginView

router = DefaultRouter()
router.register(r'drugs', DrugViewSet)
router.register(r'suppliers', SupplierViewSet)
router.register(r'orders', OrderViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/login/', UserLoginView.as_view(), name='user-login'),
]
