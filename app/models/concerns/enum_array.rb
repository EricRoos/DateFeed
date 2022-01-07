require 'active_support/concern'

module EnumArray
  extend ActiveSupport::Concern
  module ClassMethods
    def enum_array(association, opts={})
      enum_class = opts[:enum_class]
      validates_each association do |record, attr, value|
        record.errors.add(attr, 'contains an invalid value') unless value.all?{ |v| enum_class.keys.include?(v.to_sym) }
      end
     
      enum_class.keys.each do |key| 
        define_method "#{association}_#{key}?" do
          self.send(association).map(&:to_s).include?(key.to_s)
        end
      end
    end
  end
end
