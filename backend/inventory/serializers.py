# inventory/serializers.py
from rest_framework import serializers
from .models import Drug, Supplier, Order

class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['price'] = float(representation['price']) if representation['price'] else 0.00
        return representation

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

    def validate_email(self, value):
        if self.instance and value == self.instance.email:
            return value
        if Supplier.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

class OrderSerializer(serializers.ModelSerializer):
    drug = DrugSerializer(read_only=True)
    supplier = SupplierSerializer(read_only=True)
    drug_id = serializers.IntegerField(write_only=True)
    supplier_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['total_cost'] = float(representation['total_cost']) if representation['total_cost'] else 0.00
        
        if instance.supplier and instance.supplier.location_coords:
            try:
                lat, lng = instance.supplier.location_coords.split(',')
                representation['supplier']['location_coords'] = [float(lat), float(lng)]
            except (ValueError, AttributeError):
                representation['supplier']['location_coords'] = None
            
        return representation

    def create(self, validated_data):
        drug_id = validated_data.pop('drug_id')
        supplier_id = validated_data.pop('supplier_id')
        try:
            drug = Drug.objects.get(id=drug_id)
            supplier = Supplier.objects.get(id=supplier_id)
        except (Drug.DoesNotExist, Supplier.DoesNotExist) as e:
            raise serializers.ValidationError(f"Invalid related object ID: {str(e)}")
            
        order = Order.objects.create(drug=drug, supplier=supplier, **validated_data)
        return order

    def update(self, instance, validated_data):
        if 'drug_id' in validated_data:
            drug_id = validated_data.pop('drug_id')
            try:
                instance.drug = Drug.objects.get(id=drug_id)
            except Drug.DoesNotExist:
                raise serializers.ValidationError("Invalid drug ID")
                
        if 'supplier_id' in validated_data:
            supplier_id = validated_data.pop('supplier_id')
            try:
                instance.supplier = Supplier.objects.get(id=supplier_id)
            except Supplier.DoesNotExist:
                raise serializers.ValidationError("Invalid supplier ID")
        
        instance.status = validated_data.get('status', instance.status)
        if instance.status == 'Delivered':
            instance.update_drug_quantity()
        instance.quantity_ordered = validated_data.get('quantity_ordered', instance.quantity_ordered)
        instance.delivery_date = validated_data.get('delivery_date', instance.delivery_date)
        instance.tracking_number = validated_data.get('tracking_number', instance.tracking_number)
        instance.total_cost = validated_data.get('total_cost', instance.total_cost)
        instance.save()
        return instance