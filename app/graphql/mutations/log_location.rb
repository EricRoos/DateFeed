module Mutations
  class LogLocation < BaseMutation
     field :logged, Boolean, null: false

    # TODO: define arguments
    argument :latitude, Float, required: true
    argument :longitude, Float, required: true

    # TODO: define resolve method
    def resolve(latitude:, longitude:)
      geo_detail = context[:current_user].profile.profile_geo_detail
      geo_detail ||= ProfileGeoDetail.new(profile: context[:current_user].profile)
      { logged: geo_detail.update(latitude: latitude, longitude: longitude) }
    end
  end
end
