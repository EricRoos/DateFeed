module GraphqlDevise
  module Mutations
    class ProfileRegister < Register
      def build_resource(attrs)
        resource_class.new(attrs.merge(profile_attributes: {}))
      end
    end
  end
end
